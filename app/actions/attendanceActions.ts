// app/actions/attendanceActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { AttendanceStatus } from '@prisma/client';

export async function saveBulkAttendance(formData: FormData) {
  const classId = formData.get('classId') as string;
  const dateStr = formData.get('date') as string;
  const date = new Date(dateStr);

  // DEV WORKAROUND: Grab a mock staff member to act as the one marking attendance
  let staff = await prisma.staff.findFirst();
  if (!staff) {
    // Create a mock office staff if none exists – minimal data for the foreign key
    const user = await prisma.user.create({
      data: { email: 'office@cas.com', passwordHash: 'mock', role: 'OFFICE' },
    });
    staff = await prisma.staff.create({
      data: { empCode: 'EMP001', name: 'Office Admin', designation: 'Clerk', userId: user.id },
    });
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
          markedById: staff.id,
        },
        create: {
          studentId,
          classId,
          date,
          status,
          markedById: staff.id,
        },
      });
      attendancePromises.push(promise);
    }
  }

  // Run all upserts in a transaction for atomicity
  await prisma.$transaction(attendancePromises);

  revalidatePath('/admin/attendance');
}
