"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTopper(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    
    await prisma.topper.create({
      data: {
        name: data.name as string,
        class: data.class as string,
        section: (data.section as string) || null,
        year: data.year as string,
        percentage: parseFloat(data.percentage as string),
        rank: data.rank ? parseInt(data.rank as string) : null,
        imageUrl: (data.imageUrl as string) || null,
      },
    });

    revalidatePath("/admin/toppers");
    revalidatePath("/academics/toppers");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create topper:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTopper(id: string) {
  try {
    await prisma.topper.delete({ where: { id } });
    revalidatePath("/admin/toppers");
    revalidatePath("/academics/toppers");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
