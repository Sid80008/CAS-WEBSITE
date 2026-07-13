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
    throw new Error("Unauthorized: Must be logged in as Staff");
  }

  const activeYear = await prisma.academicYear.findFirst({ orderBy: { startDate: 'desc' } });
  const yearId = activeYear ? activeYear.id : 'ay-2026-27';

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
          yearId,
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
