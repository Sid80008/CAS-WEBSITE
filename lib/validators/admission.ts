import { z } from 'zod'

export const admissionSchema = z.object({
  studentName: z.string().min(3),
  parentName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  grade: z.string(),
  status: z.enum(['PENDING', 'CALLED', 'ENROLLED', 'REJECTED']).default('PENDING'),
})

export const updateAdmissionSchema = admissionSchema.partial()
