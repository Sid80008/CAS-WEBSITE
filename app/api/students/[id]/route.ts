import { NextRequest, NextResponse } from 'next/server'
// Lazy prisma import added inside handlers
import { verifyAuth, hasPermission } from '@/lib/auth-utils'
import { updateStudentSchema } from '@/lib/validators/student'

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { prisma } = await import('@/lib/prisma');
  try {
    const { id } = await params;
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            section: { include: { class: true } },
            year: true
          }
        },
        parents: { include: { parent: true } }
      }
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    return NextResponse.json(student)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { prisma } = await import('@/lib/prisma');
  try {
    const { id } = await params
    const user = await verifyAuth(req)
    if (!hasPermission(user, 'UPDATE_STUDENTS')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = updateStudentSchema.parse(body)
    const student = await prisma.student.update({
      where: { id },
      data: validated
    })

    return NextResponse.json(student)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { prisma } = await import('@/lib/prisma');
  try {
    const { id } = await params
    const user = await verifyAuth(req)
    if (!hasPermission(user, 'DELETE_STUDENTS')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.student.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
