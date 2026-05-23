// app/actions/attendanceActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { AttendanceStatus } from '@prisma/client';
import { auth } from "@/auth";

export async function saveBulkAttendance(formData: FormData) {
  const classId = formData.get('classId') as string;
  const dateStr = formData.get('date') as string;
  const date = new Date(dateStr);

  const session = await auth();
  const userId = (session?.user as any)?.id;
  let staffId: string | null = null;

  if (userId) {
    const staff = await prisma.staff.findUnique({ where: { userId } });
    if (staff) {
      staffId = staff.id;
    }
  }

  if (!staffId) {
    let staff = await prisma.staff.findFirst();
    if (!staff) {
      const user = await prisma.user.create({
        data: { email: 'office@cas.com', passwordHash: 'mock', role: 'OFFICE' },
      });
      staff = await prisma.staff.create({
        data: { empCode: 'EMP001', name: 'Office Admin', designation: 'Clerk', userId: user.id },
      });
    }
    staffId = staff.id;
  }

  const attendancePromises: Promise<any>[] = [];

  for (const [key, value] of formData.entries()) {
    if (key.startsWith('status_')) {
      const studentId = key.replace('status_', '');
      const status = value as AttendanceStatus;

      const promise = prisma.attendance.upsert({
        where: {
          studentId_date: { studentId, date },
        },
        update: {
          status,
          markedById: staffId,
        },
        create: {
          studentId,
          classId,
          yearId: 'ay-2026-27',
          date,
          status,
          markedById: staffId,
        },
      });
      attendancePromises.push(promise);
    }
  }

  await prisma.$transaction(attendancePromises);

  revalidatePath('/admin/attendance');
  revalidatePath('/portal/teacher/attendance');
}
