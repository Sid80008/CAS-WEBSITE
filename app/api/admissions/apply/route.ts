import { NextRequest, NextResponse } from 'next/server'
// Lazy prisma import added inside handlers
import { admissionSchema } from '@/lib/validators/admission'

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

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

