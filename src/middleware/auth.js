import jwt from 'jsonwebtoken'
import prisma from '../prisma/client.js'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

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
      permissions: user.roles.flatMap(r =>
        r.role.permissions.map(p => p.permission.name)
      )
    }

    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export const requirePermission = (perm) => (req, res, next) => {
  if (!req.user || !req.user.permissions.includes(perm)) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
