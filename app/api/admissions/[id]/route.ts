import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth, hasPermission } from '@/lib/auth-utils'
import { updateAdmissionSchema } from '@/lib/validators/admission'

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const admission = await prisma.admission.findUnique({
      where: { id }
    })

    if (!admission) {
      return NextResponse.json({ error: 'Admission record not found' }, { status: 404 })
    }

    return NextResponse.json(admission)
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
    if (!hasPermission(user, 'UPDATE_ADMISSIONS')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = updateAdmissionSchema.parse(body)
    const admission = await prisma.admission.update({
      where: { id },
      data: validated
    })

    return NextResponse.json(admission)
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
    if (!hasPermission(user, 'DELETE_ADMISSIONS')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.admission.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
