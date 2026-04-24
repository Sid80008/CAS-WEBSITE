import { z } from 'zod'

export const createStudentSchema = z.object({
  userId: z.string().cuid().optional().nullable(),
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  dob: z.coerce.date(),
  gender: z.string().min(1).max(20).trim(),
  admissionNo: z.string().min(1).max(50).trim(),
})

export const updateStudentSchema = createStudentSchema.partial()
