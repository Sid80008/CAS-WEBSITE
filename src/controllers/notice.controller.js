import * as service from '../services/notice.service.js'

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const create = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      slug: req.body.slug || slugify(req.body.titleEn),
    }
    const notice = await service.createNotice(data, req.user.id)
    res.json(notice)
  } catch (e) {
    next(e)
  }
}

export const getPublic = async (req, res, next) => {
  try {
    const data = await service.getPublic()
    res.set('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=300')
    res.json(data)
  } catch (e) {
    next(e)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const data = await service.getAll()
    res.json(data)
  } catch (e) {
    next(e)
  }
}

export const update = async (req, res, next) => {
  try {
    const data = await service.updateNotice(req.params.id, req.body)
    res.json(data)
  } catch (e) {
    next(e)
  }
}

export const remove = async (req, res, next) => {
  try {
    await service.deleteNotice(req.params.id)
    res.json({ success: true })
  } catch (e) {
    next(e)
  }
}
