import prisma from '../prisma/client.js'
import bcrypt from 'bcrypt'

export const createUser = async (data) => {
  const hashed = await bcrypt.hash(data.password, 10)
  return prisma.user.create({
    data: { ...data, password: hashed }
  })
}

export const getUsers = () => prisma.user.findMany({
  select: {
    id: true,
    email: true,
    isActive: true,
    createdAt: true,
    roles: {
      include: { role: true }
    }
  }
})
