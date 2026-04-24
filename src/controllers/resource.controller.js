import prisma from '../prisma/client.js'
import { HttpError } from '../lib/http-error.js'

export const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search = '', type = '' } = req.query
    const skip = (page - 1) * limit

    const where = {
      ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
      ...(type ? { type } : {})
    }

    const [resources, total] = await Promise.all([
      prisma.resource.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.resource.count({ where })
    ])

    res.json({
      data: resources,
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

export const create = async (req, res, next) => {
  try {
    const resource = await prisma.resource.create({
      data: {
        ...req.body,
        createdBy: req.user.id
      }
    })
    res.status(201).json(resource)
  } catch (e) {
    next(e)
  }
}

export const update = async (req, res, next) => {
  try {
    const resource = await prisma.resource.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(resource)
  } catch (e) {
    next(e)
  }
}

export const remove = async (req, res, next) => {
  try {
    await prisma.resource.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
