import express from 'express';
import { authenticate, requirePermission } from '../middleware/auth.js';

const router = express.Router();

// Public routes (if any)
// router.get('/public', controller.getPublic);

// Protected routes
router.get('/', authenticate, requirePermission('VIEW_STAFF'), (req, res) => res.json({ message: 'Staff list' }));

export default router;
