// app/admin/staff/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import StaffClient from "./StaffClient";

export const metadata: Metadata = { title: "Staff | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function StaffPage() {
  const staffList = await prisma.staff.findMany({
    orderBy: { displayOrder: "asc" },
    include: { user: { select: { email: true } } },
  });

  return <StaffClient staff={staffList as any} />;
}
