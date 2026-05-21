// app/admin/fees/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import FeesClient from "./FeesClient";

export const metadata: Metadata = { title: "Fee Management | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function FeesPage() {
  const [feeRecords, feeStructures, totalDue, totalPaid] = await Promise.all([
    prisma.feeRecord.findMany({
      include: {
        student: true,
        structure: true,
      },
      orderBy: { dueDate: "asc" },
      take: 100,
    }),
    prisma.feeStructure.findMany({
      include: { class: true },
      orderBy: { createdAt: "desc" } as any,
    }),
    prisma.feeRecord.aggregate({
      _sum: { amountDue: true },
      where: { status: { in: ["PENDING", "OVERDUE", "PARTIAL"] } },
    }),
    prisma.feeRecord.aggregate({
      _sum: { amountPaid: true },
    }),
  ]);

  const stats = {
    totalDue: totalDue._sum.amountDue ?? 0,
    totalPaid: totalPaid._sum.amountPaid ?? 0,
    pending: feeRecords.filter((r) => r.status === "PENDING").length,
    overdue: feeRecords.filter((r) => r.status === "OVERDUE").length,
  };

  return <FeesClient records={feeRecords as any} structures={feeStructures as any} stats={stats} />;
}
