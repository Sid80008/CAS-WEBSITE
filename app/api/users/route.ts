import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth, hasPermission } from '@/lib/auth-utils'
import { userSchema } from '@/lib/validators/user'
import bcrypt from 'bcrypt'

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await verifyAuth(req)
    if (!hasPermission(user, 'VIEW_USERS')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        isActive: true,
        createdAt: true,
        roles: {
          include: { role: true }
        }
      }
    })

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await verifyAuth(req)
    if (!hasPermission(user, 'CREATE_USER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = userSchema.parse(body)
    const hashed = await bcrypt.hash(validated.password, 10)
    
    const newUser = await prisma.user.create({
      data: { 
        email: validated.email,
        password: hashed,
        isActive: body.isActive ?? true
      },
      select: {
        id: true,
        email: true,
        isActive: true,
        createdAt: true
      }
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

