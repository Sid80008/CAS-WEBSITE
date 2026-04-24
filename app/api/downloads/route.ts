import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth, hasPermission } from '@/lib/auth-utils'
import { resourceSchema } from '@/lib/validators/resource'

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    
    const skip = (page - 1) * limit

    const where = {
      ...(search ? { title: { contains: search, mode: 'insensitive' as const } } : {}),
      ...(type ? { type } : {})
    }

    const [resources, total] = await Promise.all([
      prisma.resource.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.resource.count({ where })
    ])

    return NextResponse.json({
      data: resources,
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
    if (!hasPermission(user, 'CREATE_RESOURCES')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = resourceSchema.parse(body)
    const resource = await prisma.resource.create({
      data: {
        ...validated,
        createdBy: user!.id
      }
    })

    return NextResponse.json(resource, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

