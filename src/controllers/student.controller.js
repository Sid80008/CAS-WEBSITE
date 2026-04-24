import prisma from '../prisma/client.js'
import { HttpError } from '../lib/http-error.js'

export const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query
    const skip = (page - 1) * limit

    const where = search ? {
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { admissionNo: { contains: search, mode: 'insensitive' } },
      ]
    } : {}

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          enrollments: {
            include: {
              section: { include: { class: true } },
              year: true
            }
          }
        }
      }),
      prisma.student.count({ where })
    ])

    res.json({
      data: students,
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
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
      include: {
        enrollments: {
          include: {
            section: { include: { class: true } },
            year: true
          }
        },
        parents: { include: { parent: true } }
      }
    })

    if (!student) throw new HttpError(404, 'Student not found')
    res.json(student)
  } catch (e) {
    next(e)
  }
}

export const create = async (req, res, next) => {
  try {
    const student = await prisma.student.create({
      data: req.body
    })
    res.status(201).json(student)
  } catch (e) {
    if (e.code === 'P2002') {
      return next(new HttpError(400, 'Admission number already exists'))
    }
    next(e)
  }
}

export const update = async (req, res, next) => {
  try {
    const student = await prisma.student.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(student)
  } catch (e) {
    next(e)
  }
}

export const remove = async (req, res, next) => {
  try {
    await prisma.student.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
