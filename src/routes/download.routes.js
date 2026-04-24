import express from 'express'
import * as controller from '../controllers/resource.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { resourceSchema, updateResourceSchema } from '../validators/resource.js'

const router = express.Router()

// Public route
router.get('/public', controller.getAll)

// Protected routes
router.get('/', authenticate, requirePermission('VIEW_DOWNLOADS'), controller.getAll)
router.post('/', authenticate, requirePermission('CREATE_DOWNLOADS'), validateBody(resourceSchema), controller.create)
router.put('/:id', authenticate, requirePermission('UPDATE_DOWNLOADS'), validateBody(updateResourceSchema), controller.update)
router.delete('/:id', authenticate, requirePermission('DELETE_DOWNLOADS'), controller.remove)

export default router
