import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import { errorHandler } from './middleware/error.js'

const app = express()
app.use(cors())
app.use(express.json())

// Request Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Basic health check
app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api', routes)

app.use(errorHandler)

export default app
