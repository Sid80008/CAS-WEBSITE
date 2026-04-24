import express from 'express'
import authRoutes from './auth.routes.js'
import userRoutes from './user.routes.js'
import noticeRoutes from './notice.routes.js'
import studentRoutes from './student.routes.js'
import staffRoutes from './staff.routes.js'
import admissionRoutes from './admission.routes.js'
import eventRoutes from './event.routes.js'
import galleryRoutes from './gallery.routes.js'
import downloadRoutes from './download.routes.js'

const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Welcome to CAS API', version: '1.0.0' }))

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/notices', noticeRoutes)
router.use('/students', studentRoutes)
router.use('/staff', staffRoutes)
router.use('/admissions', admissionRoutes)
router.use('/events', eventRoutes)
router.use('/gallery', galleryRoutes)
router.use('/downloads', downloadRoutes)

export default router
