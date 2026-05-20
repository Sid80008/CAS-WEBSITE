// app/actions/studentActions.ts
'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createStudent(formData: FormData) {
  const admissionNo = formData.get('admissionNo') as string;
  const name = formData.get('name') as string;
  const dob = formData.get('dob') as string;
  const gender = formData.get('gender') as string;
  const parentName = formData.get('parentName') as string;
  const parentPhone = formData.get('parentPhone') as string;
  const classId = formData.get('classId') as string;
  const sessionId = formData.get('sessionId') as string;

  await prisma.student.create({
    data: {
      admissionNo,
      name,
      dob: new Date(dob),
      gender,
      parentName,
      parentPhone,
      classId,
      sessionId,
    },
  });

  revalidatePath('/admin/students');
  redirect('/admin/students');
}
