'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

/**
 * Create a new album (gallery) entry.
 */
export async function createAlbum(formData: FormData) {
  const title = formData.get('title') as string;
  const eventDate = formData.get('eventDate') as string;
  const isPublished = formData.get('isPublished') === 'true';

  const session = await auth();
  const userId = session?.user?.id || 'system';

  const album = await prisma.gallery.create({
    data: {
      titleEn: title,
      eventDate: new Date(eventDate),
      published: isPublished,
      createdBy: userId,
    },
  });

  revalidatePath('/admin/gallery');
  return { success: true, id: album.id };
}

/**
 * Associate an uploaded image URL with an existing album.
 */
export async function addMediaToAlbum(galleryId: string, url: string) {
  if (!galleryId || !url) {
    throw new Error('Gallery ID and URL are required');
  }

  // Update album coverImage if it's the first image
  const gallery = await prisma.gallery.findUnique({
    where: { id: galleryId },
    include: { media: true }
  });

  if (gallery && !gallery.coverImage) {
    await prisma.gallery.update({
      where: { id: galleryId },
      data: { coverImage: url }
    });
  }

  const media = await prisma.media.create({
    data: {
      url,
      galleryId,
    },
  });

  revalidatePath('/admin/gallery');
  return { success: true, media };
}

/**
 * Delete an album and all associated media records.
 */
export async function deleteAlbum(galleryId: string) {
  await prisma.media.deleteMany({
    where: { galleryId }
  });
  
  await prisma.gallery.delete({
    where: { id: galleryId }
  });

  revalidatePath('/admin/gallery');
  return { success: true };
}

/**
 * Delete a single image record.
 */
export async function deleteMedia(mediaId: string) {
  const media = await prisma.media.findUnique({ where: { id: mediaId } });
  if (!media) throw new Error('Media not found');

  await prisma.media.delete({
    where: { id: mediaId }
  });

  // If this was the cover image, clear it or pick another
  const gallery = await prisma.gallery.findUnique({
    where: { id: media.galleryId },
    include: { media: true }
  });

  if (gallery && gallery.coverImage === media.url) {
    const nextMedia = gallery.media.length > 0 ? gallery.media[0].url : null;
    await prisma.gallery.update({
      where: { id: gallery.id },
      data: { coverImage: nextMedia }
    });
  }

  revalidatePath('/admin/gallery');
  return { success: true };
}
