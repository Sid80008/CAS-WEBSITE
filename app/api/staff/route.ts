import { NextRequest, NextResponse } from 'next/server'
// Lazy prisma import added inside handlers
import { verifyAuth, hasPermission } from '@/lib/auth-utils'

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { prisma } = await import('@/lib/prisma');
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    
    const skip = (page - 1) * limit

    const where = search ? {
      name: { contains: search, mode: 'insensitive' as const }
    } : {}

    const [staff, total] = await Promise.all([
      prisma.staff.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { email: true, isActive: true } },
          subjects: { 
            include: { 
              subject: true,
              section: { include: { class: true } }
            } 
          }
        }
      }),
      prisma.staff.count({ where })
    ])

    return NextResponse.json({
      data: staff,
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

export async function POST(req: NextRequest) {
    const { prisma } = await import('@/lib/prisma');
  try {
    const user = await verifyAuth(req)
    if (!hasPermission(user, 'CREATE_STAFF')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const staff = await prisma.staff.create({
      data: { name: body.name }
    })

    return NextResponse.json(staff, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

