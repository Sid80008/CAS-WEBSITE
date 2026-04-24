import express from 'express'
import * as controller from '../controllers/notice.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { noticeSchema, updateNoticeSchema } from '../validators/notice.js'

const router = express.Router()

// Public route to get published notices for website
router.get('/public', controller.getAll)

// Protected routes
router.get('/', authenticate, requirePermission('VIEW_NOTICES'), controller.getAll)
router.get('/:id', authenticate, requirePermission('VIEW_NOTICES'), controller.getOne)
router.post('/', authenticate, requirePermission('CREATE_NOTICES'), validateBody(noticeSchema), controller.create)
router.put('/:id', authenticate, requirePermission('UPDATE_NOTICES'), validateBody(updateNoticeSchema), controller.update)
router.delete('/:id', authenticate, requirePermission('DELETE_NOTICES'), controller.remove)

export default router
