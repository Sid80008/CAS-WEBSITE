import prisma from '../prisma/client.js'
import { HttpError } from '../lib/http-error.js'

export const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query
    const skip = (page - 1) * limit

    const where = search ? {
      name: { contains: search, mode: 'insensitive' }
    } : {}

    const [staff, total] = await Promise.all([
      prisma.staff.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { email: true, isActive: true } },
          subjects: { 
            include: { 
              subject: true,
              section: { include: { class: true } }
            } 
          }
        }
      }),
      prisma.staff.count({ where })
    ])

    res.json({
      data: staff,
      meta: {
        total,
        page: parseInt(page),
        lastPage: Math.ceil(total / limit)
      }
    })
  } catch (e) {
    next(e)
  }
}

export const getOne = async (req, res, next) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { email: true, isActive: true } },
        subjects: { 
          include: { 
            subject: true,
            section: { include: { class: true } }
          } 
        }
      }
    })

    if (!staff) throw new HttpError(404, 'Staff member not found')
    res.json(staff)
  } catch (e) {
    next(e)
  }
}

export const create = async (req, res, next) => {
  try {
    // For now, we skip user creation logic if not provided, or handle it simply
    const staff = await prisma.staff.create({
      data: {
        name: req.body.name,
        // Linking to user is complex in one go, usually requires two steps
        // But for this project, let's assume Staff are linked to existing users or we create a placeholder
      }
    })
    res.status(201).json(staff)
  } catch (e) {
    next(e)
  }
}

export const update = async (req, res, next) => {
  try {
    const staff = await prisma.staff.update({
      where: { id: req.params.id },
      data: { name: req.body.name }
    })
    res.json(staff)
  } catch (e) {
    next(e)
  }
}

export const remove = async (req, res, next) => {
  try {
    await prisma.staff.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
