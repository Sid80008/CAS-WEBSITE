import { ZodError } from 'zod'
import { logger } from '../lib/logger.js'

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} not found`,
    },
  })
}

export const errorHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: err.flatten(),
      },
    })
  }

  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  logger.error('Request failed', {
    method: req.method,
    path: req.originalUrl,
    statusCode,
    message,
    stack: err.stack,
  })

  res.status(statusCode).json({
    error: {
      code: statusCode >= 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
      message: statusCode >= 500 ? 'Something went wrong' : message,
      details: err.details ?? undefined,
    },
  })
}
