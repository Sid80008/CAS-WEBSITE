import express from 'express'
import * as controller from '../controllers/event.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { eventSchema, updateEventSchema } from '../validators/event.js'

const router = express.Router()

// Public route
router.get('/public', controller.getAll)

// Protected routes
router.get('/', authenticate, requirePermission('VIEW_EVENTS'), controller.getAll)
router.get('/:id', authenticate, requirePermission('VIEW_EVENTS'), controller.getOne)
router.post('/', authenticate, requirePermission('CREATE_EVENTS'), validateBody(eventSchema), controller.create)
router.put('/:id', authenticate, requirePermission('UPDATE_EVENTS'), validateBody(updateEventSchema), controller.update)
router.delete('/:id', authenticate, requirePermission('DELETE_EVENTS'), controller.remove)

export default router
