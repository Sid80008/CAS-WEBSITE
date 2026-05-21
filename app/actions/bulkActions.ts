'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function bulkUploadStudents(formData: FormData) {
  const file = formData.get('csvFile') as File;
  if (!file) throw new Error("No file uploaded");

  const text = await file.text();
  const rows = text.split('\n').filter(row => row.trim() !== '');
  
  // Skip header row
  const dataRows = rows.slice(1);
  
  const formattedData = dataRows.map(row => {
    // Assuming CSV format: admissionNo,firstName,lastName,dob,gender,parentName,parentPhone
    const [admissionNo, firstName, lastName, dob, gender, parentName, parentPhone] = row.split(',');
    
    return {
      admissionNo: admissionNo?.trim(),
      firstName: firstName?.trim(),
      lastName: lastName?.trim() || "",
      dob: dob ? new Date(dob.trim()) : new Date(),
      gender: gender?.trim() || "OTHER",
      parentName: parentName?.trim(),
      parentPhone: parentPhone?.trim(),
      status: 'ACTIVE' as const,
    };
  });

  // Filter out any rows that missed admissionNo or firstName
  const validData = formattedData.filter(d => d.admissionNo && d.firstName);

  // Bulk insert
  if (validData.length > 0) {
    await prisma.student.createMany({
      data: validData,
      skipDuplicates: true, // Prevents crashing if an admissionNo already exists
    });
  }

  revalidatePath('/admin/students');
}
