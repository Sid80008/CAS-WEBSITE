import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth, hasPermission } from '@/lib/auth-utils'
import { slugify } from '@/lib/utils'
import { noticeSchema, updateNoticeSchema } from '@/lib/validators/notice'

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const notice = await prisma.notice.findUnique({
      where: { id },
      include: { author: { select: { email: true } } }
    })

    if (!notice) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 })
    }

    return NextResponse.json(notice)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await verifyAuth(req)
    if (!hasPermission(user, 'UPDATE_NOTICES')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data: any = { ...body }
    
    if (data.titleEn) {
      data.slug = `${slugify(data.titleEn)}-${Date.now()}`
    }

    const notice = await prisma.notice.update({
      where: { id },
      data
    })

    return NextResponse.json(notice)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await verifyAuth(req)
    if (!hasPermission(user, 'DELETE_NOTICES')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.notice.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
