'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { EventType } from '@prisma/client';

export async function createEvent(formData: FormData) {
  // Find an admin user to attach as creator
  let admin = await prisma.user.findFirst({
    where: {
      roles: {
        some: {
          role: {
            name: 'ADMIN',
          },
        },
      },
    },
  });

  if (!admin) {
    admin = await prisma.user.findFirst();
  }

  if (!admin) {
    throw new Error('No user found to assign as event creator.');
  }

  const titleEn = formData.get('titleEn') as string;
  const descriptionEn = formData.get('descriptionEn') as string;
  const dateStr = formData.get('date') as string;
  const eventType = formData.get('eventType') as EventType;
  const targetClass = (formData.get('targetClass') as string) || null;
  const published = formData.get('published') === 'on' || formData.get('published') === 'true';

  if (!titleEn || !descriptionEn || !dateStr) {
    throw new Error('Title, description and date are required.');
  }

  const slug = titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  await prisma.event.create({
    data: {
      titleEn,
      descriptionEn,
      date: new Date(dateStr),
      slug,
      published,
      eventType,
      targetClass,
      createdBy: admin.id,
    },
  });

  revalidatePath('/admin/events');
}

export async function updateEvent(id: string, formData: FormData) {
  const titleEn = formData.get('titleEn') as string;
  const descriptionEn = formData.get('descriptionEn') as string;
  const dateStr = formData.get('date') as string;
  const eventType = formData.get('eventType') as EventType;
  const targetClass = (formData.get('targetClass') as string) || null;
  const published = formData.get('published') === 'on' || formData.get('published') === 'true';

  if (!titleEn || !descriptionEn || !dateStr) {
    throw new Error('Title, description and date are required.');
  }

  await prisma.event.update({
    where: { id },
    data: {
      titleEn,
      descriptionEn,
      date: new Date(dateStr),
      published,
      eventType,
      targetClass,
    },
  });

  revalidatePath('/admin/events');
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({
    where: { id },
  });

  revalidatePath('/admin/events');
}
