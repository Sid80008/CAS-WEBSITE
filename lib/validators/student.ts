import { z } from 'zod'

export const studentSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  dob: z.string().transform((val) => new Date(val)),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  admissionNo: z.string().min(3, 'Admission number is required'),
})

export const updateStudentSchema = studentSchema.partial()
