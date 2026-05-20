// app/actions/tcActions.ts
'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function issueTC(formData: FormData) {
  const studentId = formData.get('studentId') as string;
  const reasonForLeaving = formData.get('reasonForLeaving') as string;
  const conductGrade = formData.get('conductGrade') as string;
  const dateOfLeaving = formData.get('dateOfLeaving') as string;

  // DEV WORKAROUND: Get or create a mock Staff member since issuedBy requires a Staff ID
  let staff = await prisma.staff.findFirst();
  if (!staff) {
    const user = await prisma.user.create({
      data: { email: 'office@cas.com', passwordHash: 'mock', role: 'OFFICE' },
    });
    staff = await prisma.staff.create({
      data: { empCode: 'EMP001', name: 'Office Admin', designation: 'Clerk', userId: user.id },
    });
  }

  // Fetch student to get their current class
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { class: true },
  });

  if (!student) throw new Error('Student not found');

  const tcNumber = `TC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Use a transaction to ensure both records update simultaneously
  await prisma.$transaction([
    prisma.tcRecord.create({
      data: {
        tcNumber,
        dateOfLeaving: new Date(dateOfLeaving),
        classAtLeaving: `${student.class.name} - ${student.class.section}`,
        reasonForLeaving,
        conductGrade,
        studentId,
        issuedById: staff.id,
      },
    }),
    prisma.student.update({
      where: { id: studentId },
      data: { status: 'TC_ISSUED' },
    }),
  ]);

  revalidatePath('/admin/tc');
  redirect('/admin/tc');
}
