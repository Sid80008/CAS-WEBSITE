'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import { hasPermission } from '@/lib/auth-utils';

async function requirePermission(permission: string) {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user, permission)) {
    throw new Error("Unauthorized");
  }
}

export async function createStaff(formData: FormData) {
  await requirePermission('MANAGE_STAFF');
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string; // 'ADMIN', 'TEACHER', 'OFFICE'
  const empCode = formData.get('empCode') as string;
  const designation = formData.get('designation') as string;
  const dateOfJoining = new Date(formData.get('dateOfJoining') as string);
  const isPublic = formData.get('isPublic') === 'true';

  if (!name || !email || !role || !empCode) {
    throw new Error("Missing required fields");
  }

  // Run in a transaction to ensure both User and Staff records are created safely
  await prisma.$transaction(async (tx) => {
    // 1. Create the base User for authentication
    const hashedPassword = await bcrypt.hash('default_password_123', 10);
    const user = await tx.user.create({
      data: {
        email: email,
        password: hashedPassword,
        isActive: true,
      },
    });

    // 2. Assign the Role
    const dbRole = await tx.role.findUnique({
      where: { name: role },
    });
    if (!dbRole) {
      throw new Error(`Role ${role} not found in database`);
    }

    await tx.userRole.create({
      data: {
        userId: user.id,
        roleId: dbRole.id,
      },
    });

    // 3. Create the Staff profile and link it to the User
    await tx.staff.create({
      data: {
        empCode,
        name,
        designation,
        dateOfJoining,
        isPublic,
        userId: user.id,
        isActive: true,
      },
    });
  });

  revalidatePath('/admin/staff');
}

export async function updateStaff(id: string, formData: FormData) {
  await requirePermission('MANAGE_STAFF');
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
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
        email: email,
      },
    });

    if (role) {
      const dbRole = await tx.role.findUnique({
        where: { name: role },
      });
      if (dbRole) {
        // Remove existing roles
        await tx.userRole.deleteMany({
          where: { userId: staff.userId },
        });
        // Create new role connection
        await tx.userRole.create({
          data: {
            userId: staff.userId,
            roleId: dbRole.id,
          },
        });
      }
    }
  });

  revalidatePath('/admin/staff');
}

export async function deleteStaff(id: string) {
  await requirePermission('MANAGE_STAFF');
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

export async function assignStaffSubject(staffId: string, sectionId: string, subjectId: string) {
  await requirePermission('MANAGE_STAFF');
  // Check if link already exists
  const existing = await prisma.staffSubject.findUnique({
    where: {
      staffId_subjectId_sectionId: {
        staffId,
        subjectId,
        sectionId,
      },
    },
  });

  if (!existing) {
    await prisma.staffSubject.create({
      data: {
        staffId,
        subjectId,
        sectionId,
      },
    });
  }

  revalidatePath('/admin/staff');
}

export async function unassignStaffSubject(staffId: string, sectionId: string, subjectId: string) {
  await requirePermission('MANAGE_STAFF');
  await prisma.staffSubject.delete({
    where: {
      staffId_subjectId_sectionId: {
        staffId,
        subjectId,
        sectionId,
      },
    },
  });

  revalidatePath('/admin/staff');
}
