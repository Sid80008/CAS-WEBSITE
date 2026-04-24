import { env } from '../config/env.js'

const allowedOrigins = new Set(env.corsOrigins)
const writeMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export const csrfBasicProtection = (req, res, next) => {
  if (!writeMethods.has(req.method)) {
    return next()
  }

  const origin = req.get('origin')
  const referer = req.get('referer')
  let refererOrigin = null
  if (referer) {
    try {
      refererOrigin = new URL(referer).origin
    } catch {
      refererOrigin = null
    }
  }
  const requestOrigin = origin || refererOrigin

  if (!requestOrigin) {
    return next()
  }

  if (!allowedOrigins.has(requestOrigin)) {
    return res.status(403).json({
      error: {
        code: 'FORBIDDEN_ORIGIN',
        message: 'Request origin not allowed',
      },
    })
  }

  next()
}
