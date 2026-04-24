import * as service from '../services/notice.service.js'
import { noticeSchema } from '../validators/notice.js'

export const create = async (req, res, next) => {
  try {
    const data = noticeSchema.parse(req.body)
    const notice = await service.createNotice(data, req.user.id)
    res.json(notice)
  } catch (e) {
    next(e)
  }
}

export const getPublic = async (req, res, next) => {
  try {
    const data = await service.getPublic()
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
