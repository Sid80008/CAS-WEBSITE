// app/actions/eventActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { EventType } from '@prisma/client';

export async function createEvent(formData: FormData) {
  // DEV WORKAROUND: Ensure an admin user exists to attach as creator
  let admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!admin) {
    admin = await prisma.user.create({
      data: { email: 'admin@cas.com', passwordHash: 'mock', role: 'ADMIN' }
    });
  }

  await prisma.event.create({
    data: {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      eventDate: new Date(formData.get('eventDate') as string),
      eventType: formData.get('eventType') as EventType,
      targetClass: (formData.get('targetClass') as string) || null,
      createdById: admin.id,
    }
  });

  revalidatePath('/admin/events');
}
