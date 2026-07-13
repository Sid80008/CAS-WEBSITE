'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@/auth';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadResource(formData: FormData) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const type = formData.get('type') as string;
  const publishedStr = formData.get('published') as string;
  const file = formData.get('file') as File;

  if (!title || !file) {
    throw new Error('Title and file are required');
  }

  // Generate a basic slug
  const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Cloudinary
  const uploadResult: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'resources',
        resource_type: 'auto', // auto for pdf/doc
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  // Create Resource
  await prisma.resource.create({
    data: {
      title,
      type,
      fileUrl: uploadResult.secure_url,
      slug,
      published: publishedStr === 'true',
      createdBy: userId,
    },
  });

  revalidatePath('/admin/downloads');
}

export async function deleteResource(id: string) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  
  if (!userId) {
    throw new Error('Unauthorized');
  }

  await prisma.resource.delete({
    where: { id }
  });

  revalidatePath('/admin/downloads');
}
