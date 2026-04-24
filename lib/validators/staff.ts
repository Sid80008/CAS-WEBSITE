import { z } from 'zod'

export const staffSchema = z.object({
  name: z.string().min(3, 'Name is too short'),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().min(10).max(15).optional(),
})

export const updateStaffSchema = staffSchema.partial()
