import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyAuth, hasPermission } from '@/lib/auth-utils'
import { updateResourceSchema } from '@/lib/validators/resource'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const user = await verifyAuth(req)
    if (!hasPermission(user, 'UPDATE_RESOURCES')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = updateResourceSchema.parse(body)
    const resource = await prisma.resource.update({
      where: { id },
      data: validated
    })

    return NextResponse.json(resource)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const user = await verifyAuth(req)
    if (!hasPermission(user, 'DELETE_RESOURCES')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.resource.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
