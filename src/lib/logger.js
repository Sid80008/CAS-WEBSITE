import { env } from '../config/env.js'

const levels = ['debug', 'info', 'warn', 'error']
const threshold = levels.indexOf(env.LOG_LEVEL)

const shouldLog = (level) => levels.indexOf(level) >= threshold

const format = (level, message, meta = {}) =>
  JSON.stringify({
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  })

export const logger = {
  debug(message, meta) {
    if (shouldLog('debug')) console.debug(format('debug', message, meta))
  },
  info(message, meta) {
    if (shouldLog('info')) console.info(format('info', message, meta))
  },
  warn(message, meta) {
    if (shouldLog('warn')) console.warn(format('warn', message, meta))
  },
  error(message, meta) {
    if (shouldLog('error')) console.error(format('error', message, meta))
  },
}
