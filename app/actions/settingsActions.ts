"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGlobalSettings() {
  let settings = await prisma.globalSettings.findUnique({
    where: { id: "global" },
  });

  if (!settings) {
    settings = await prisma.globalSettings.create({
      data: { id: "global" },
    });
  }

  return settings;
}

export async function updateAdmissionDates(startDate: Date | null, endDate: Date | null) {
  try {
    await prisma.globalSettings.upsert({
      where: { id: "global" },
      update: {
        admissionStartDate: startDate,
        admissionEndDate: endDate,
      },
      create: {
        id: "global",
        admissionStartDate: startDate,
        admissionEndDate: endDate,
      },
    });

    revalidatePath("/admissions");
    revalidatePath("/admin/admissions");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update admission dates:", error);
    return { success: false, error: error.message };
  }
}
