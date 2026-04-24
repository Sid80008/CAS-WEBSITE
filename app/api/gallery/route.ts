import { NextRequest, NextResponse } from 'next/server'
// Lazy prisma import added inside handlers
import { verifyAuth, hasPermission } from '@/lib/auth-utils'
import { gallerySchema } from '@/lib/validators/gallery'

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { prisma } = await import('@/lib/prisma');
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const publishedOnly = searchParams.get('publishedOnly') === 'true'
    
    const skip = (page - 1) * limit

    const where = {
      ...(search ? {
        titleEn: { contains: search, mode: 'insensitive' as const }
      } : {}),
      ...(publishedOnly ? { published: true } : {})
    }

    const [galleries, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.gallery.count({ where })
    ])

    return NextResponse.json({
      data: galleries,
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
    if (!hasPermission(user, 'CREATE_GALLERY')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = gallerySchema.parse(body)
    const gallery = await prisma.gallery.create({
      data: {
        ...validated,
        createdBy: user!.id
      }
    })

    return NextResponse.json(gallery, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

