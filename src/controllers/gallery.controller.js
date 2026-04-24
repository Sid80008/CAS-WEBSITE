import prisma from '../prisma/client.js'
import { HttpError } from '../lib/http-error.js'

export const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, search = '', publishedOnly = 'false' } = req.query
    const skip = (page - 1) * limit

    const where = {
      ...(search ? {
        titleEn: { contains: search, mode: 'insensitive' }
      } : {}),
      ...(publishedOnly === 'true' ? { published: true } : {})
    }

    const [galleries, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.gallery.count({ where })
    ])

    res.json({
      data: galleries,
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
    const gallery = await prisma.gallery.findUnique({
      where: { id: req.params.id }
    })
    if (!gallery) throw new HttpError(404, 'Gallery not found')
    res.json(gallery)
  } catch (e) {
    next(e)
  }
}

export const create = async (req, res, next) => {
  try {
    const gallery = await prisma.gallery.create({
      data: {
        ...req.body,
        createdBy: req.user.id
      }
    })
    res.status(201).json(gallery)
  } catch (e) {
    next(e)
  }
}

export const update = async (req, res, next) => {
  try {
    const gallery = await prisma.gallery.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(gallery)
  } catch (e) {
    next(e)
  }
}

export const remove = async (req, res, next) => {
  try {
    await prisma.gallery.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
