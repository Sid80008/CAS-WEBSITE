import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyAuth, hasPermission } from '@/lib/auth-utils'
import { slugify } from '@/lib/utils'
import { eventSchema } from '@/lib/validators/event'

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
          { descriptionEn: { contains: search, mode: 'insensitive' as const } },
        ]
      } : {}),
      ...(publishedOnly ? { published: true } : {})
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: { author: { select: { email: true } } }
      }),
      prisma.event.count({ where })
    ])

    return NextResponse.json({
      data: events,
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
    if (!hasPermission(user, 'CREATE_EVENTS')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = eventSchema.parse(body)
    const slug = slugify(validated.titleEn)
    
    const event = await prisma.event.create({
      data: {
        ...validated,
        slug: `${slug}-${Date.now()}`,
        createdBy: user!.id
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
