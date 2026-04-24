import prisma from '../prisma/client.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { HttpError } from '../lib/http-error.js'

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new HttpError(401, 'Invalid credentials')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new HttpError(401, 'Invalid credentials')

    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    )

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    })

    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (e) {
    next(e)
  }
}

export const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true }
    })
    res.json(user)
  } catch (e) {
    next(e)
  }
}

export const logout = async (_req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })
  res.status(204).end()
}
