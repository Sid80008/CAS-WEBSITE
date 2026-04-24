import express from 'express'
import * as controller from '../controllers/staff.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { staffSchema, updateStaffSchema } from '../validators/staff.js'

const router = express.Router()

router.get('/', authenticate, requirePermission('VIEW_STAFF'), controller.getAll)
router.get('/:id', authenticate, requirePermission('VIEW_STAFF'), controller.getOne)
router.post('/', authenticate, requirePermission('CREATE_STAFF'), validateBody(staffSchema), controller.create)
router.put('/:id', authenticate, requirePermission('UPDATE_STAFF'), validateBody(updateStaffSchema), controller.update)
router.delete('/:id', authenticate, requirePermission('DELETE_STAFF'), controller.remove)

export default router
