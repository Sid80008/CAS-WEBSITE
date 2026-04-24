import express from 'express'
import * as controller from '../controllers/student.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'

const router = express.Router()

router.get('/', authenticate, requirePermission('VIEW_STUDENT'), controller.getAll)
router.post('/', authenticate, requirePermission('CREATE_STUDENT'), controller.create)
router.put('/:id', authenticate, requirePermission('UPDATE_STUDENT'), controller.update)
router.delete('/:id', authenticate, requirePermission('DELETE_STUDENT'), controller.remove)

export default router
