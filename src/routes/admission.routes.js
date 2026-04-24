import express from 'express';
import { authenticate, requirePermission } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, requirePermission('VIEW_ADMISSIONS'), (req, res) => res.json({ message: 'Admissions list' }));

export default router;
