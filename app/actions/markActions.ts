// app/actions/markActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from "@/auth";

export async function saveBulkMarks(formData: FormData) {
  const subjectId = formData.get('subjectId') as string;
  const examId = formData.get('examId') as string;
  const maxMarks = parseFloat(formData.get('maxMarks') as string);

  if (!subjectId || !examId || isNaN(maxMarks)) {
    throw new Error("Missing or invalid subject, exam, or max marks");
  }

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

  const marksPromises: Promise<any>[] = [];

  for (const [key, value] of formData.entries()) {
    if (key.startsWith('mark_')) {
      const studentId = key.replace('mark_', '');
      const marksObtained = parseFloat(value as string);

      if (isNaN(marksObtained)) continue;

      const percentage = (marksObtained / maxMarks) * 100;
      let grade = 'F';
      if (percentage >= 90) grade = 'A+';
      else if (percentage >= 80) grade = 'A';
      else if (percentage >= 70) grade = 'B';
      else if (percentage >= 60) grade = 'C';
      else if (percentage >= 33) grade = 'D';

      const promise = prisma.examResult.upsert({
        where: {
          examId_studentId_subjectId: {
            examId,
            studentId,
            subjectId
          }
        },
        update: {
          marksObtained,
          maxMarks,
          grade,
          enteredById: staffId,
        },
        create: {
          examId,
          studentId,
          subjectId,
          marksObtained,
          maxMarks,
          grade,
          enteredById: staffId,
        }
      });

      marksPromises.push(promise);
    }
  }

  await Promise.all(marksPromises);
  revalidatePath('/admin/marks');
  revalidatePath('/portal/teacher/reports');
}
