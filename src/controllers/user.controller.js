import * as service from '../services/user.service.js'
import { userSchema } from '../validators/user.js'

export const create = async (req, res, next) => {
  try {
    const data = userSchema.parse(req.body)
    const user = await service.createUser(data)
    const { password, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (e) {
    next(e)
  }
}

export const getAll = async (req, res, next) => {
  try {
    const users = await service.getUsers()
    res.json(users)
  } catch (e) {
    next(e)
  }
}
