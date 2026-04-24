import app from './app.js'
import 'dotenv/config'
import { env } from './config/env.js'
import { logger } from './lib/logger.js'
import prisma from './prisma/client.js'

const { PORT } = env

const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info(`API server started`, { port: PORT, env: env.NODE_ENV })
})

const gracefulShutdown = async (signal) => {
  logger.warn(`Received ${signal}, shutting down gracefully`)
  server.close(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
}

process.on('SIGINT', () => {
  void gracefulShutdown('SIGINT')
})

process.on('SIGTERM', () => {
  void gracefulShutdown('SIGTERM')
})
