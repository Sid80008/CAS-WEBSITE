import prisma from '../prisma/client.js'

export const getAll = async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({
      include: { user: true, class: true }
    })
    res.json({ data: students, total: students.length })
  } catch (error) {
    next(error)
  }
}

export const create = async (req, res, next) => {
  try {
    const student = await prisma.student.create({
      data: req.body
    })
    res.status(210).json(student)
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const student = await prisma.student.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(student)
  } catch (error) {
    next(error)
  }
}

export const remove = async (req, res, next) => {
  try {
    await prisma.student.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
