import { z } from 'zod'

export const noticeSchema = z.object({
  titleEn: z.string().min(1, 'English title is required'),
  titleHi: z.string().optional().nullable(),
  contentEn: z.string().min(1, 'English content is required'),
  contentHi: z.string().optional().nullable(),
  slug: z.string().min(1, 'Slug is required').optional(),
  published: z.boolean().optional().default(false),
  isPinned: z.boolean().optional().default(false)
})

export const updateNoticeSchema = noticeSchema.partial()
