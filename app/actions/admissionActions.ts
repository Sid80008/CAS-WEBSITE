// app/actions/admissionActions.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { EnquiryStatus } from '@prisma/client';
import { redirect } from 'next/navigation';

import { z } from 'zod';

const admissionSchema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  parentName: z.string().min(1, "Parent name is required"),
  parentPhone: z.string().min(10, "Valid phone number is required"),
  parentEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  classAppliedFor: z.string().min(1, "Class is required"),
});

// New Client Action with useFormState
export async function submitEnquiryClient(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  const parsed = admissionSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  try {
    await prisma.admissionEnquiry.create({
      data: {
        studentName: parsed.data.studentName,
        parentName: parsed.data.parentName,
        parentPhone: parsed.data.parentPhone,
        parentEmail: parsed.data.parentEmail || '',
        classAppliedFor: parsed.data.classAppliedFor,
        status: 'NEW',
      },
    });
    return { success: true, message: "Your enquiry has been received. Our office will contact you soon." };
  } catch (e) {
    return { success: false, error: "Database error. Please try again." };
  }
}

// Public form submission (Legacy)
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
