import express from 'express'
import * as controller from '../controllers/student.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { createStudentSchema, updateStudentSchema } from '../validators/student.js'

const router = express.Router()

router.get('/', authenticate, requirePermission('VIEW_STUDENT'), controller.getAll)
router.post('/', authenticate, requirePermission('CREATE_STUDENT'), validateBody(createStudentSchema), controller.create)
router.put('/:id', authenticate, requirePermission('UPDATE_STUDENT'), validateBody(updateStudentSchema), controller.update)
router.delete('/:id', authenticate, requirePermission('DELETE_STUDENT'), controller.remove)

export default router
