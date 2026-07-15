// app/admin/admissions/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import AdmissionsClient from "./AdmissionsClient";
import { getGlobalSettings } from "@/app/actions/settingsActions";

export const metadata: Metadata = { title: "Admissions | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function AdmissionsPage() {
  const enquiries = await prisma.admission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const settings = await getGlobalSettings();

  const stats = {
    total: enquiries.length,
    pending: enquiries.filter((e) => e.status === "PENDING").length,
    enrolled: enquiries.filter((e) => e.status === "ENROLLED" || e.status === "CONVERTED").length,
    called: enquiries.filter((e) => e.status === "CALLED" || e.status === "CONTACTED").length,
  };

  return <AdmissionsClient enquiries={enquiries} stats={stats} settings={settings} />;
}
