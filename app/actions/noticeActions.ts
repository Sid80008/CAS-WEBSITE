// app/actions/noticeActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { NoticeTargetRole } from '@prisma/client';

export async function createNotice(formData: FormData) {
  // DEV WORKAROUND: Get the first admin user, or create a mock one if the DB is empty
  let admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: 'admin@cas.com',
        passwordHash: 'mock_hashed_password',
        role: 'ADMIN',
      },
    });
  }

  await prisma.notice.create({
    data: {
      titleEn: formData.get('titleEn') as string,
      titleHi: (formData.get('titleHi') as string) || null,
      contentEn: formData.get('contentEn') as string,
      contentHi: (formData.get('contentHi') as string) || null,
      isPublic: formData.get('isPublic') === 'true',
      isPinned: formData.get('isPinned') === 'true',
      targetRole: (formData.get('targetRole') as NoticeTargetRole) || 'ALL',
      postedById: admin.id,
    },
  });

  revalidatePath('/admin/notices');
}
