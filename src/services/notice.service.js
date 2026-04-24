import prisma from '../prisma/client.js'

export const createNotice = (data, userId) =>
  prisma.notice.create({ 
    data: { 
      ...data, 
      createdBy: userId 
    } 
  })

export const getPublic = () =>
  prisma.notice.findMany({ 
    where: { published: true },
    orderBy: [
      { isPinned: 'desc' },
      { createdAt: 'desc' }
    ]
  })

export const getAll = () =>
  prisma.notice.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { email: true } }
    }
  })

export const updateNotice = (id, data) =>
  prisma.notice.update({ 
    where: { id }, 
    data 
  })

export const deleteNotice = (id) =>
  prisma.notice.delete({ 
    where: { id } 
  })
