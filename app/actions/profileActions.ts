"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// Helper to verify current password and return hashed password if changing
async function verifyAndHashPassword(userId: string, currentPassword?: string, newPassword?: string) {
  if (!newPassword) return null;
  if (!currentPassword) {
    throw new Error("Current password is required to change password");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const passwordsMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordsMatch) {
    throw new Error("Current password is incorrect");
  }

  return await bcrypt.hash(newPassword, 10);
}

export async function updateStudentProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const userId = session.user.id;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const dob = formData.get("dob") as string;
  const gender = formData.get("gender") as string;
  const parentName = formData.get("parentName") as string;
  const parentPhone = formData.get("parentPhone") as string;
  const address = formData.get("address") as string;
  const photo = formData.get("photo") as string | null;

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  try {
    const hashedPassword = await verifyAndHashPassword(userId, currentPassword, newPassword);

    await prisma.$transaction(async (tx) => {
      // 1. Update Student Table
      await tx.student.update({
        where: { userId },
        data: {
          firstName,
          lastName,
          dob: new Date(dob),
          gender,
          parentName,
          parentPhone,
          address,
          ...(photo && { photo }),
        },
      });

      // 2. If password changed, update User Table
      if (hashedPassword) {
        await tx.user.update({
          where: { id: userId },
          data: { password: hashedPassword },
        });
      }
    });

    revalidatePath("/portal/student/profile");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateParentProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const userId = session.user.id;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  try {
    const hashedPassword = await verifyAndHashPassword(userId, currentPassword, newPassword);

    await prisma.$transaction(async (tx) => {
      // 1. Update Parent Table
      await tx.parent.update({
        where: { userId },
        data: {
          name,
          phone,
        },
      });

      // 2. If password changed, update User Table
      if (hashedPassword) {
        await tx.user.update({
          where: { id: userId },
          data: { password: hashedPassword },
        });
      }
    });

    revalidatePath("/portal/parent/profile");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTeacherProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const userId = session.user.id;
  const name = formData.get("name") as string;
  const designation = formData.get("designation") as string;
  const qualification = formData.get("qualification") as string;
  const photo = formData.get("photo") as string | null;

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  try {
    const hashedPassword = await verifyAndHashPassword(userId, currentPassword, newPassword);

    await prisma.$transaction(async (tx) => {
      // 1. Update Staff Table
      await tx.staff.update({
        where: { userId },
        data: {
          name,
          designation,
          qualification,
          ...(photo && { photo }),
        },
      });

      // 2. If password changed, update User Table
      if (hashedPassword) {
        await tx.user.update({
          where: { id: userId },
          data: { password: hashedPassword },
        });
      }
    });

    revalidatePath("/portal/teacher/profile");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAdminProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const userId = session.user.id;
  const email = formData.get("email") as string;

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  try {
    const hashedPassword = await verifyAndHashPassword(userId, currentPassword, newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    revalidatePath("/admin/profile");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
