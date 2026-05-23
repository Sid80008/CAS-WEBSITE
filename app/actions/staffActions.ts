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

export async function updateStaff(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const role = formData.get('role') as any;
  const empCode = formData.get('empCode') as string;
  const designation = formData.get('designation') as string;
  const dateOfJoiningStr = formData.get('dateOfJoining') as string;
  const dateOfJoining = dateOfJoiningStr ? new Date(dateOfJoiningStr) : null;
  const isPublic = formData.get('isPublic') === 'true';

  await prisma.$transaction(async (tx) => {
    const staff = await tx.staff.update({
      where: { id },
      data: {
        name,
        empCode,
        designation,
        dateOfJoining,
        isPublic,
      },
    });

    await tx.user.update({
      where: { id: staff.userId },
      data: {
        email: email || null,
        phone: phone || null,
        role: role || undefined,
      },
    });
  });

  revalidatePath('/admin/staff');
}

export async function deleteStaff(id: string) {
  await prisma.$transaction(async (tx) => {
    const staff = await tx.staff.findUnique({ where: { id } });
    if (staff) {
      // Clean relations
      await tx.staffSubject.deleteMany({ where: { staffId: id } });
      await tx.homework.deleteMany({ where: { postedById: id } });
      await tx.leaveRequest.deleteMany({ where: { staffId: id } });
      // Delete staff
      await tx.staff.delete({ where: { id } });
      // Delete user
      await tx.user.delete({ where: { id: staff.userId } });
    }
  });

  revalidatePath('/admin/staff');
}
