import { z } from 'zod'

export const noticeSchema = z.object({
  titleEn: z.string().min(5, 'Title (English) is too short'),
  titleHi: z.string().optional(),
  contentEn: z.string().min(10, 'Content (English) is too short'),
  contentHi: z.string().optional(),
  published: z.boolean().default(false),
  isPinned: z.boolean().default(false),
})

export const updateNoticeSchema = noticeSchema.partial()
