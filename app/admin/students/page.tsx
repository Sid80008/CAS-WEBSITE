// app/admin/students/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import StudentsClient from "./StudentsClient";

export const metadata: Metadata = { title: "Students | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [students, totalCount, activeCount, feeRecords, attendanceAlerts] = await Promise.all([
    prisma.student.findMany({
      orderBy: { admissionNo: "asc" },
      take: 50,
    }),
    prisma.student.count(),
    prisma.student.count({ where: { status: "ACTIVE" } }),
    prisma.feeRecord.findMany({ select: { status: true } }),
    prisma.attendance.groupBy({
      by: ["studentId"],
      where: {
        status: "ABSENT",
        date: { gte: sevenDaysAgo },
      },
      _count: { studentId: true },
    }),
  ]);

  const totalFeeRecords = feeRecords.length;
  const paidFeeRecords = feeRecords.filter(f => f.status === "PAID").length;
  const feePaidPercentage = totalFeeRecords > 0 ? Math.round((paidFeeRecords / totalFeeRecords) * 100) : 0;

  // Students with 1 or more absences in the last 7 days
  const criticalAttendanceCount = attendanceAlerts.filter(a => a._count.studentId >= 1).length;

  const stats = {
    total: totalCount,
    active: activeCount,
    tcIssued: totalCount - activeCount,
    feePaidPercentage,
    attendanceAlerts: criticalAttendanceCount,
  };

  return <StudentsClient students={students} stats={stats} />;
}
