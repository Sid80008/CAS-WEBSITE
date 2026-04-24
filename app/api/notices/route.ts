import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyAuth, hasPermission } from '@/lib/auth-utils'
import { slugify } from '@/lib/utils'
import { noticeSchema, updateNoticeSchema } from '@/lib/validators/notice'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const publishedOnly = searchParams.get('publishedOnly') === 'true'
    
    const skip = (page - 1) * limit

    const where = {
      ...(search ? {
        OR: [
          { titleEn: { contains: search, mode: 'insensitive' as const } },
          { contentEn: { contains: search, mode: 'insensitive' as const } },
        ]
      } : {}),
      ...(publishedOnly ? { published: true } : {})
    }

    const [notices, total] = await Promise.all([
      prisma.notice.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        include: { author: { select: { email: true } } }
      }),
      prisma.notice.count({ where })
    ])

    return NextResponse.json({
      data: notices,
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
  try {
    const user = await verifyAuth(req)
    if (!hasPermission(user, 'CREATE_NOTICES')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const slug = slugify(body.titleEn)
    
    const notice = await prisma.notice.create({
      data: {
        ...body,
        slug: `${slug}-${Date.now()}`,
        createdBy: user!.id
      }
    })

    return NextResponse.json(notice, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
