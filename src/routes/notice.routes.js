import express from 'express'
import * as controller from '../controllers/notice.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { noticeSchema, updateNoticeSchema } from '../validators/notice.js'

const router = express.Router()

router.get('/public', controller.getPublic)

router.get('/', authenticate, requirePermission('VIEW_NOTICE'), controller.getAll)
router.post('/', authenticate, requirePermission('CREATE_NOTICE'), validateBody(noticeSchema), controller.create)
router.put('/:id', authenticate, requirePermission('UPDATE_NOTICE'), validateBody(updateNoticeSchema), controller.update)
router.delete('/:id', authenticate, requirePermission('DELETE_NOTICE'), controller.remove)

export default router
