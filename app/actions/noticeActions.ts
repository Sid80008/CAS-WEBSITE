'use server';
// app/actions/noticeActions.ts
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { NoticeTargetRole } from '@prisma/client';

export async function createNotice(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Not authenticated');

  const titleEn = formData.get('titleEn') as string;
  const contentEn = formData.get('contentEn') as string;
  const imageUrl = formData.get('imageUrl') as string;

  // Build a URL-safe slug
  const slug = titleEn
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60) + '-' + Date.now();

  await prisma.notice.create({
    data: {
      titleEn,
      titleHi: (formData.get('titleHi') as string) || null,
      contentEn,
      slug,
      imageUrl: imageUrl || null,
      published: formData.get('published') === 'on',
      isPinned: formData.get('isPinned') === 'on',
      targetRole: (formData.get('targetRole') as NoticeTargetRole) || 'ALL',
      createdBy: session.user.id,
    },
  });

  revalidatePath('/admin/notices');
  revalidatePath('/notices');
}

export async function toggleNoticePublished(id: string, published: boolean) {
  await prisma.notice.update({ where: { id }, data: { published } });
  revalidatePath('/admin/notices');
  revalidatePath('/notices');
}

export async function toggleNoticePinned(id: string, isPinned: boolean) {
  await prisma.notice.update({ where: { id }, data: { isPinned } });
  revalidatePath('/admin/notices');
}
