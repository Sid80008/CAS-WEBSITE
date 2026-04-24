import prisma from '../prisma/client.js'
import { HttpError } from '../lib/http-error.js'
import { slugify } from '../lib/utils.js'

export const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', publishedOnly = 'false' } = req.query
    const skip = (page - 1) * limit

    const where = {
      ...(search ? {
        OR: [
          { titleEn: { contains: search, mode: 'insensitive' } },
          { descriptionEn: { contains: search, mode: 'insensitive' } },
        ]
      } : {}),
      ...(publishedOnly === 'true' ? { published: true } : {})
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { date: 'desc' },
        include: { author: { select: { email: true } } }
      }),
      prisma.event.count({ where })
    ])

    res.json({
      data: events,
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
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: { author: { select: { email: true } } }
    })

    if (!event) throw new HttpError(404, 'Event not found')
    res.json(event)
  } catch (e) {
    next(e)
  }
}

export const create = async (req, res, next) => {
  try {
    const slug = slugify(req.body.titleEn)
    const event = await prisma.event.create({
      data: {
        ...req.body,
        slug: `${slug}-${Date.now()}`,
        createdBy: req.user.id
      }
    })
    res.status(201).json(event)
  } catch (e) {
    next(e)
  }
}

export const update = async (req, res, next) => {
  try {
    const data = { ...req.body }
    if (data.titleEn) {
      data.slug = `${slugify(data.titleEn)}-${Date.now()}`
    }

    const event = await prisma.event.update({
      where: { id: req.params.id },
      data
    })
    res.json(event)
  } catch (e) {
    next(e)
  }
}

export const remove = async (req, res, next) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
