'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from "@/auth";
import { hasPermission } from '@/lib/auth-utils';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user, 'MANAGE_STAFF')) {
    throw new Error("Unauthorized");
  }
}

export async function submitLeaveRequest(formData: FormData) {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const startDateStr = formData.get('startDate') as string;
  const endDateStr = formData.get('endDate') as string;
  const reason = formData.get('reason') as string;

  if (!startDateStr || !endDateStr || !reason) {
    throw new Error("Missing required fields");
  }

  // Get teacher
  const teacher = await prisma.staff.findUnique({
    where: { userId }
  });

  if (!teacher) {
    throw new Error("Teacher profile not found");
  }

  await prisma.leaveRequest.create({
    data: {
      staffId: teacher.id,
      startDate: new Date(startDateStr),
      endDate: new Date(endDateStr),
      reason,
      status: "PENDING"
    }
  });

  revalidatePath('/portal/teacher/leave');
}

export async function approveLeaveRequest(id: string) {
  await requireAdmin();
  await prisma.leaveRequest.update({
    where: { id },
    data: { status: 'APPROVED' }
  });
  revalidatePath('/admin/leaves');
  revalidatePath('/portal/teacher/leave');
}

export async function rejectLeaveRequest(id: string) {
  await requireAdmin();
  await prisma.leaveRequest.update({
    where: { id },
    data: { status: 'REJECTED' }
  });
  revalidatePath('/admin/leaves');
  revalidatePath('/portal/teacher/leave');
}
