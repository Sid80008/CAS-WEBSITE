// app/admin/fees/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import FeesClient from "./FeesClient";

export const metadata: Metadata = { title: "Fee Management | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function FeesPage() {
  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  firstDayOfMonth.setHours(0, 0, 0, 0);

  const [feeRecords, feeStructures, currentMonthRevenue, pendingDuesRecords, overdueRecords] = await Promise.all([
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
    }),
    prisma.feeRecord.aggregate({
      _sum: { amountPaid: true },
      where: {
        paidDate: { gte: firstDayOfMonth },
      },
    }),
    prisma.feeRecord.findMany({
      where: { status: "PENDING" },
      select: { amountDue: true, amountPaid: true },
    }),
    prisma.feeRecord.findMany({
      where: { status: "OVERDUE", dueDate: { lt: new Date() } },
      select: { amountDue: true, amountPaid: true },
    }),
  ]);

  const totalDuePending = pendingDuesRecords.reduce((sum, r) => sum + ((r.amountDue ?? 0) - r.amountPaid), 0);
  const totalOverdue = overdueRecords.reduce((sum, r) => sum + ((r.amountDue ?? 0) - r.amountPaid), 0);
  const totalDueAll = feeRecords.reduce((sum, r) => sum + (r.amountDue ?? 0), 0);
  const totalPaidAll = feeRecords.reduce((sum, r) => sum + r.amountPaid, 0);

  const stats = {
    totalPaidMTD: currentMonthRevenue._sum.amountPaid ?? 0,
    totalDuePending,
    totalOverdue,
    totalDueAll,
    totalPaidAll,
    pendingCount: pendingDuesRecords.length,
    overdueCount: overdueRecords.length,
  };

  return <FeesClient records={feeRecords as any} structures={feeStructures as any} stats={stats} />;
}
