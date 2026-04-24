import { z } from 'zod'

export const eventSchema = z.object({
  titleEn: z.string().min(5, 'Title (English) is too short'),
  titleHi: z.string().optional(),
  descriptionEn: z.string().min(10, 'Description (English) is too short'),
  descriptionHi: z.string().optional(),
  date: z.string().transform((val) => new Date(val)),
  published: z.boolean().default(false),
})

export const updateEventSchema = eventSchema.partial()
