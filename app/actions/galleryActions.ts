// app/actions/galleryActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables. Ensure these are set in your .env.local file.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Create a new album (gallery) entry.
 */
export async function createAlbum(formData: FormData) {
  const title = formData.get('title') as string;
  const eventDate = formData.get('eventDate') as string;
  const isPublished = formData.get('isPublished') === 'true';

  await prisma.gallery.create({
    data: {
      titleEn: title,
      eventDate: new Date(eventDate),
      published: isPublished,
    },
  });

  revalidatePath('/admin/gallery');
}

/**
 * Upload an image to Cloudinary and associate it with an existing album.
 * Expects a multipart/form-data request containing:
 *   - galleryId: string (the album ID)
 *   - image: File (the image to upload)
 */
export async function addImageToAlbum(formData: FormData) {
  const galleryId = formData.get('galleryId') as string;
  const file = formData.get('image') as File;

  if (!file) {
    throw new Error('No image file provided');
  }

  // Convert the File to a Buffer for Cloudinary upload.
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadResult: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: `gallery/${galleryId}`,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  // Persist the image URL to the database. Adjust the model name/fields as needed.
  await prisma.media.create({
    data: {
      url: uploadResult.secure_url,
      galleryId,
    },
  });

  // Re‑validate the admin gallery page so the new image appears immediately.
  revalidatePath('/admin/gallery');
}
