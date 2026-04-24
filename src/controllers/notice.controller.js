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
          { contentEn: { contains: search, mode: 'insensitive' } },
        ]
      } : {}),
      ...(publishedOnly === 'true' ? { published: true } : {})
    }

    const [notices, total] = await Promise.all([
      prisma.notice.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        include: { author: { select: { email: true } } }
      }),
      prisma.notice.count({ where })
    ])

    res.json({
      data: notices,
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
    const notice = await prisma.notice.findUnique({
      where: { id: req.params.id },
      include: { author: { select: { email: true } } }
    })

    if (!notice) throw new HttpError(404, 'Notice not found')
    res.json(notice)
  } catch (e) {
    next(e)
  }
}

export const create = async (req, res, next) => {
  try {
    const slug = slugify(req.body.titleEn)
    const notice = await prisma.notice.create({
      data: {
        ...req.body,
        slug: `${slug}-${Date.now()}`, // Append timestamp for uniqueness
        createdBy: req.user.id
      }
    })
    res.status(201).json(notice)
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

    const notice = await prisma.notice.update({
      where: { id: req.params.id },
      data
    })
    res.json(notice)
  } catch (e) {
    next(e)
  }
}

export const remove = async (req, res, next) => {
  try {
    await prisma.notice.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
