import prisma from '../prisma/client.js'
import { HttpError } from '../lib/http-error.js'

export const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query
    const skip = (page - 1) * limit

    const where = {
      ...(search ? {
        OR: [
          { studentName: { contains: search, mode: 'insensitive' } },
          { parentName: { contains: search, mode: 'insensitive' } },
        ]
      } : {}),
      ...(status ? { status } : {})
    }

    const [admissions, total] = await Promise.all([
      prisma.admission.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.admission.count({ where })
    ])

    res.json({
      data: admissions,
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
    const admission = await prisma.admission.findUnique({
      where: { id: req.params.id }
    })
    if (!admission) throw new HttpError(404, 'Admission record not found')
    res.json(admission)
  } catch (e) {
    next(e)
  }
}

export const create = async (req, res, next) => {
  try {
    const admission = await prisma.admission.create({
      data: req.body
    })
    res.status(201).json(admission)
  } catch (e) {
    next(e)
  }
}

export const update = async (req, res, next) => {
  try {
    const admission = await prisma.admission.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(admission)
  } catch (e) {
    next(e)
  }
}

export const remove = async (req, res, next) => {
  try {
    await prisma.admission.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
