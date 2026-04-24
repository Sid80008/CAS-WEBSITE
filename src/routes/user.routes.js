import express from 'express'
import * as controller from '../controllers/user.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'

const router = express.Router()

router.post('/', authenticate, requirePermission('CREATE_USER'), controller.create)
router.get('/', authenticate, requirePermission('VIEW_USERS'), controller.getAll)

export default router
