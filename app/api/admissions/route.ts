import { NextRequest, NextResponse } from 'next/server'
// Lazy prisma import added inside handlers
import { verifyAuth, hasPermission } from '@/lib/auth-utils'
import { admissionSchema } from '@/lib/validators/admission'

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { prisma } = await import('@/lib/prisma');
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    
    const skip = (page - 1) * limit

    const where = {
      ...(search ? {
        OR: [
          { studentName: { contains: search, mode: 'insensitive' as const } },
          { parentName: { contains: search, mode: 'insensitive' as const } },
        ]
      } : {}),
      ...(status ? { status } : {})
    }

    const [admissions, total] = await Promise.all([
      prisma.admission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.admission.count({ where })
    ])

    return NextResponse.json({
      data: admissions,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Public apply route mirrored here as POST /api/admissions/apply
// But base POST /api/admissions is for admin
export async function POST(req: NextRequest) {
    const { prisma } = await import('@/lib/prisma');
  try {
    const body = await req.json()
    const validated = admissionSchema.parse(body)
    const admission = await prisma.admission.create({
      data: validated
    })
    return NextResponse.json(admission, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

