import express from 'express'
import * as controller from '../controllers/admission.controller.js'
import { authenticate, requirePermission } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { admissionSchema, updateAdmissionSchema } from '../validators/admission.js'

const router = express.Router()

// Public route for landing page inquiry form
router.post('/apply', validateBody(admissionSchema), controller.create)

// Protected routes
router.get('/', authenticate, requirePermission('VIEW_ADMISSIONS'), controller.getAll)
router.get('/:id', authenticate, requirePermission('VIEW_ADMISSIONS'), controller.getOne)
router.post('/', authenticate, requirePermission('CREATE_ADMISSIONS'), validateBody(admissionSchema), controller.create)
router.put('/:id', authenticate, requirePermission('UPDATE_ADMISSIONS'), validateBody(updateAdmissionSchema), controller.update)
router.delete('/:id', authenticate, requirePermission('DELETE_ADMISSIONS'), controller.remove)

export default router
