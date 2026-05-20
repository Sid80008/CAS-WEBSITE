// app/actions/admissionActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { EnquiryStatus } from '@prisma/client';
import { redirect } from 'next/navigation';

// Public form submission
export async function submitEnquiry(formData: FormData) {
  await prisma.admissionEnquiry.create({
    data: {
      studentName: formData.get('studentName') as string,
      parentName: formData.get('parentName') as string,
      parentPhone: formData.get('parentPhone') as string,
      parentEmail: formData.get('parentEmail') as string,
      classAppliedFor: formData.get('classAppliedFor') as string,
      status: 'NEW',
    },
  });

  redirect('/admissions?success=true');
}

// Admin status update
export async function updateEnquiryStatus(formData: FormData) {
  const id = formData.get('id') as string;
  const status = formData.get('status') as EnquiryStatus;

  await prisma.admissionEnquiry.update({
    where: { id },
    data: { status },
  });

  revalidatePath('/admin/admissions');
}
