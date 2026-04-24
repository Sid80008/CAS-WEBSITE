import app from './app.js'
import 'dotenv/config'

const PORT = process.env.PORT || 4001

if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not set in environment variables. Auth will fail.')
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
