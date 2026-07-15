'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { AdmissionStatus } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { hasPermission } from '@/lib/auth-utils';

async function requirePermission(permission: string) {
  const session = await auth();
  if (!session?.user || !hasPermission(session.user, permission)) {
    throw new Error("Unauthorized");
  }
}

const admissionSchema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  parentName: z.string().min(1, "Parent name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  grade: z.string().min(1, "Grade/Class is required"),
});

// Submit Enquiry (Client form callback)
export async function submitEnquiryClient(prevState: any, formData: FormData) {
  const data = {
    studentName: formData.get('studentName') as string,
    parentName: formData.get('parentName') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    grade: formData.get('grade') as string,
  };

  const parsed = admissionSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    await prisma.admission.create({
      data: {
        studentName: parsed.data.studentName,
        parentName: parsed.data.parentName,
        phone: parsed.data.phone,
        email: parsed.data.email || '',
        grade: parsed.data.grade,
        status: 'PENDING',
      },
    });
    return { success: true, message: "Your enquiry has been received. Our office will contact you soon." };
  } catch (e) {
    console.error("submitEnquiryClient error:", e);
    return { success: false, error: "Database error. Please try again." };
  }
}

// Public form submission (Redirect version)
export async function submitEnquiry(formData: FormData) {
  const studentName = formData.get('studentName') as string;
  const parentName = formData.get('parentName') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const grade = formData.get('grade') as string;

  await prisma.admission.create({
    data: {
      studentName,
      parentName,
      phone,
      email: email || '',
      grade,
      status: 'PENDING',
    },
  });

  redirect('/admissions?success=true');
}

// Create Admission manual entry (For Admin UI)
export async function createAdmission(formData: FormData) {
  await requirePermission('MANAGE_ADMISSIONS');
  const studentName = formData.get('studentName') as string;
  const parentName = formData.get('parentName') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const grade = formData.get('grade') as string;

  if (!studentName || !parentName || !phone || !grade) {
    throw new Error("Missing required fields");
  }

  await prisma.admission.create({
    data: {
      studentName,
      parentName,
      phone,
      email: email || '',
      grade,
      status: 'PENDING',
    },
  });

  revalidatePath('/admin/admissions');
}

// Admin status update
export async function updateAdmissionStatus(id: string, status: AdmissionStatus) {
  await requirePermission('MANAGE_ADMISSIONS');
  await prisma.admission.update({
    where: { id },
    data: { status },
  });

  revalidatePath('/admin/admissions');
}

// Delete admission
export async function deleteAdmission(id: string) {
  await requirePermission('MANAGE_ADMISSIONS');
  await prisma.admission.delete({
    where: { id },
  });

  revalidatePath('/admin/admissions');
}
