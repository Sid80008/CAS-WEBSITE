'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Role } from '@prisma/client';

export async function createStaff(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const role = formData.get('role') as Role;
  const empCode = formData.get('empCode') as string;
  const designation = formData.get('designation') as string;
  const dateOfJoining = new Date(formData.get('dateOfJoining') as string);
  const isPublic = formData.get('isPublic') === 'true';

  // Run in a transaction to ensure both User and Staff records are created safely
  await prisma.$transaction(async (tx) => {
    // 1. Create the base User for authentication
    const user = await tx.user.create({
      data: {
        email: email || null,
        phone: phone || null,
        // In a real production app, use bcrypt to hash a secure generated password
        passwordHash: 'default_password_123',
        role,
      },
    });

    // 2. Create the Staff profile and link it to the User
    await tx.staff.create({
      data: {
        empCode,
        name,
        designation,
        dateOfJoining,
        isPublic,
        userId: user.id,
      },
    });
  });

  revalidatePath('/admin/staff');
}
