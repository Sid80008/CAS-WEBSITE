import jwt from 'jsonwebtoken'
import prisma from '../prisma/client.js'
import { env } from '../config/env.js'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.access_token
    if (!token) return res.status(401).json({ error: 'Unauthorized' })

    const decoded = jwt.verify(token, env.JWT_SECRET)

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

    if (!user || !user.isActive) return res.status(401).json({ error: 'Invalid or inactive user' })

    req.user = {
      id: user.id,
      email: user.email,
      roles: user.roles.map(r => r.role.name),
      permissions: user.roles.flatMap(r =>
        r.role.permissions.map(p => p.permission.name)
      )
    }

    next()
  } catch (err) {
    res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid token',
      },
    })
  }
}

export const requirePermission = (perm) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })
  
  if (req.user.roles?.includes('ADMIN') || req.user.permissions.includes(perm)) {
    return next()
  }
  
  return res.status(403).json({ error: 'Forbidden' })
}
