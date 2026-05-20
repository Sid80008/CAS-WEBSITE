import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().min(1, 'User ID / Email is required'),
  password: z.string().min(6)
})
