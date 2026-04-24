import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../prisma/generated/index.js'
import 'dotenv/config'
import { env } from '../config/env.js'

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })
const prisma = new PrismaClient({
  adapter,
  log: env.isProduction ? ['error'] : ['query', 'info', 'warn', 'error'],
})

export default prisma
