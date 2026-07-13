// app/actions/tcActions.ts
'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from "@/auth";

export async function issueTC(formData: FormData) {
  const studentId = formData.get('studentId') as string;
  const reasonForLeaving = formData.get('reasonForLeaving') as string;
  const conductGrade = formData.get('conductGrade') as string;
  const dateOfLeaving = formData.get('dateOfLeaving') as string;

  const session = await auth();
  const userId = (session?.user as any)?.id;
  
  if (!userId) {
    throw new Error("Unauthorized: Must be logged in");
  }

  const staff = await prisma.staff.findUnique({ where: { userId } });
  if (!staff) {
    throw new Error("Unauthorized: Must be logged in as Staff");
  }

  // Fetch student to get their current class
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { enrollments: { include: { section: { include: { class: true } } } } },
  });

  if (!student) throw new Error('Student not found');

  const tcNumber = `TC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Use a transaction to ensure both records update simultaneously
  const currentEnrollment = student.enrollments[0];
  const classAtLeaving = currentEnrollment ? `${currentEnrollment.section.class.name} - ${currentEnrollment.section.name}` : "Unknown";
  
  await prisma.$transaction([
    prisma.tcRecord.create({
      data: {
        certificateNo: tcNumber,
        dateOfLeaving: new Date(dateOfLeaving),
        classAtLeaving,
        reason: reasonForLeaving,
        conductGrade,
        studentId,
        issuedById: staff.id,
        approvedBy: staff.userId,
        issuedAt: new Date(),
        fileUrl: "#",
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
