"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createResult(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    
    // Parse subject marks
    const subjectMarksStr = data.subjectMarks as string;
    const subjectMarks = subjectMarksStr ? JSON.parse(subjectMarksStr) : [];
    
    await prisma.result.create({
      data: {
        studentName: data.studentName as string,
        className: data.className as string,
        section: data.section as string,
        academicYear: data.academicYear as string,
        examination: data.examination as string,
        subjectMarks: subjectMarks,
        total: parseFloat(data.total as string) || 0,
        percentage: parseFloat(data.percentage as string) || 0,
        grade: data.grade as string,
        status: data.status as string,
      },
    });

    revalidatePath("/admin/results");
    revalidatePath("/academics/results");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create result:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteResult(id: string) {
  try {
    await prisma.result.delete({ where: { id } });
    revalidatePath("/admin/results");
    revalidatePath("/academics/results");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
