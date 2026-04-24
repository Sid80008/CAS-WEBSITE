import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4001),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(200),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const formatted = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
  throw new Error(`Invalid environment configuration: ${formatted}`)
}

export const env = {
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === 'production',
  corsOrigins: parsed.data.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean),
}
