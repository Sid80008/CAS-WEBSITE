import { z } from 'zod'

export const resourceSchema = z.object({
  title: z.string().min(3),
  fileUrl: z.string().url(),
  type: z.enum(['FORM', 'SYLLABUS', 'HOMEWORK', 'OTHER']).default('OTHER'),
  published: z.boolean().default(false),
})

export const updateResourceSchema = resourceSchema.partial()
