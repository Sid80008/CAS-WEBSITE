import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import hpp from 'hpp'
import routes from './routes/index.js'
import { env } from './config/env.js'
import { sanitizeInput } from './middleware/sanitize.js'
import { csrfBasicProtection } from './middleware/csrf-basic.js'
import { errorHandler, notFoundHandler } from './middleware/error.js'
import { logger } from './lib/logger.js'

const app = express()
app.set('trust proxy', 1)
app.disable('x-powered-by')

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.corsOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('CORS origin not allowed'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(hpp())
app.use(compression())
app.use(cookieParser())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use(sanitizeInput)
app.use(csrfBasicProtection)

app.use(
  rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests, please try again later.',
      },
    },
  }),
)

app.use(
  morgan(env.isProduction ? 'combined' : 'dev', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
)

// Basic health check
app.get('/health', (_req, res) => res.json({ status: 'ok', env: env.NODE_ENV }))

app.use('/api', routes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
