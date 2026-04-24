import express from 'express'
import * as controller from '../controllers/notice.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'

const router = express.Router()

router.get('/public', controller.getPublic)

router.get('/', authenticate, requirePermission('VIEW_NOTICE'), controller.getAll)
router.post('/', authenticate, requirePermission('CREATE_NOTICE'), controller.create)
router.put('/:id', authenticate, requirePermission('UPDATE_NOTICE'), controller.update)
router.delete('/:id', authenticate, requirePermission('DELETE_NOTICE'), controller.remove)

export default router
