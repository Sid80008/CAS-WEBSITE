import express from 'express'
import * as controller from '../controllers/gallery.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { gallerySchema, updateGallerySchema } from '../validators/gallery.js'

const router = express.Router()

// Public route
router.get('/public', controller.getAll)

// Protected routes
router.get('/', authenticate, requirePermission('VIEW_GALLERY'), controller.getAll)
router.get('/:id', authenticate, requirePermission('VIEW_GALLERY'), controller.getOne)
router.post('/', authenticate, requirePermission('CREATE_GALLERY'), validateBody(gallerySchema), controller.create)
router.put('/:id', authenticate, requirePermission('UPDATE_GALLERY'), validateBody(updateGallerySchema), controller.update)
router.delete('/:id', authenticate, requirePermission('DELETE_GALLERY'), controller.remove)

export default router
