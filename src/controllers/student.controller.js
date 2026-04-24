import prisma from '../prisma/client.js'
import { HttpError } from '../lib/http-error.js'

export const getAll = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1)
    const pageSize = Math.min(Number(req.query.pageSize || 20), 100)
    const skip = (page - 1) * pageSize

    const [students, total] = await prisma.$transaction([
      prisma.student.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          admissionNo: true,
          gender: true,
          dob: true,
          user: { select: { id: true, email: true } },
        },
      }),
      prisma.student.count(),
    ])
    res.json({ data: students, total, page, pageSize })
  } catch (error) {
    next(error)
  }
}

export const create = async (req, res, next) => {
  try {
    const student = await prisma.student.create({
      data: req.body
    })
    res.status(201).json(student)
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    if (!req.params.id) throw new HttpError(400, 'Student id is required')
    const student = await prisma.student.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(student)
  } catch (error) {
    next(error)
  }
}

export const remove = async (req, res, next) => {
  try {
    await prisma.student.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
