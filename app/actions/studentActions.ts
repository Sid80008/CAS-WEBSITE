// app/actions/studentActions.ts
'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createStudent(formData: FormData) {
  const admissionNo = formData.get('admissionNo') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const dob = formData.get('dob') as string;
  const gender = formData.get('gender') as string;
  const parentName = formData.get('parentName') as string;
  const parentPhone = formData.get('parentPhone') as string;
  const sectionId = formData.get('sectionId') as string;
  const yearId = formData.get('yearId') as string;

  // Use a transaction to create the Student and their Enrollment
  await prisma.$transaction(async (tx) => {
    const student = await tx.student.create({
      data: {
        admissionNo,
        firstName,
        lastName,
        dob: new Date(dob),
        gender,
        parentName,
        parentPhone,
      },
    });

    await tx.enrollment.create({
      data: {
        studentId: student.id,
        sectionId,
        yearId,
      },
    });
  });

  revalidatePath('/admin/students');
  redirect('/admin/students');
}
