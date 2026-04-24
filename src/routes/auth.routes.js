import express from 'express'
import { login, logout, me } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { loginSchema } from '../validators/auth.js'

const router = express.Router()

router.post('/login', validateBody(loginSchema), login)
router.post('/logout', authenticate, logout)
router.get('/me', authenticate, me)

export default router
