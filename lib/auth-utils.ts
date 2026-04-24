import jwt from 'jsonwebtoken'
// removed static prisma import
import { NextRequest } from 'next/server'
import { auth } from "@/auth"

export async function verifyAuth(req: NextRequest) {
  try {
    // 1. Try NextAuth session first
    const session = await auth()
    if (session?.user) {
      return {
        id: session.user.id,
        email: session.user.email,
        roles: (session.user as any).roles,
        permissions: (session.user as any).permissions
      }
    }

    // 2. Fallback to legacy JWT for backward compatibility
    const token = req.headers.get('authorization')?.split(' ')[1] || req.cookies.get('access_token')?.value
    if (!token) return null

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    const { prisma } = await import('./prisma')

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: { permission: true }
                }
              }
            }
          }
        }
      }
    })

    if (!user || !user.isActive) return null

    return {
      id: user.id,
      email: user.email,
      roles: user.roles.map((r: any) => r.role.name),
      permissions: user.roles.flatMap((r: any) =>
        r.role.permissions.map((p: any) => p.permission.name)
      )
    }
  } catch (err) {
    return null
  }
}

export function hasPermission(user: any, permission?: string) {
  if (!user) return false
  if (user.roles?.includes('ADMIN')) return true
  if (!permission) return true
  return user.permissions?.includes(permission)
}
