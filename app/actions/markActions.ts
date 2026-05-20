// app/actions/markActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveBulkMarks(formData: FormData) {
  const subjectId = formData.get('subjectId') as string;
  const examId = formData.get('examId') as string;
  const maxMarks = parseFloat(formData.get('maxMarks') as string);

  // DEV WORKAROUND: Grab a mock staff member to act as the one entering marks
  let staff = await prisma.staff.findFirst();
  if (!staff) {
    // Create a mock office staff if needed (same pattern as other actions)
    const user = await prisma.user.create({
      data: { email: 'office@cas.com', passwordHash: 'mock', role: 'OFFICE' },
    });
    staff = await prisma.staff.create({
      data: { empCode: 'EMP001', name: 'Office Admin', designation: 'Clerk', userId: user.id },
    });
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

      // Check if a mark already exists for this student/subject/exam
      const promise = prisma.mark
        .findFirst({ where: { studentId, subjectId, examId } })
        .then((existing) => {
          if (existing) {
            return prisma.mark.update({
              where: { id: existing.id },
              data: { marksObtained, maxMarks, grade, enteredById: staff.id },
            });
          }
          return prisma.mark.create({
            data: {
              marksObtained,
              maxMarks,
              grade,
              studentId,
              subjectId,
              examId,
              enteredById: staff.id,
            },
          });
        });

      marksPromises.push(promise);
    }
  }

  await Promise.all(marksPromises);
  revalidatePath('/admin/marks');
}
