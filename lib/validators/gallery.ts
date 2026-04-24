import { z } from 'zod'

export const gallerySchema = z.object({
  titleEn: z.string().min(3, 'Title (English) is too short'),
  titleHi: z.string().optional(),
  images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
  category: z.string().optional(),
  published: z.boolean().default(false),
})

export const updateGallerySchema = gallerySchema.partial()
