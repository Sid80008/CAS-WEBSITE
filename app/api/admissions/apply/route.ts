import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { admissionSchema } from '@/lib/validators/admission'

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
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
