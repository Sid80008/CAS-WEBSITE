// app/admin/students/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import StudentsClient from "./StudentsClient";
import { StudentStatus } from "@prisma/client";

export const metadata: Metadata = { title: "Students | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; page?: string };
}) {
  const q = searchParams.q || "";
  const statusParam = searchParams.status || "All Status";
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  // Build the dynamic where clause
  const whereCondition: any = {
    ...(q && {
      OR: [
        { firstName: { contains: q, mode: "insensitive" } },
        { lastName: { contains: q, mode: "insensitive" } },
        { admissionNo: { contains: q, mode: "insensitive" } },
      ],
    }),
    ...(statusParam !== "All Status" && {
      status:
        statusParam === "Active"
          ? "ACTIVE"
          : statusParam === "On Leave"
          ? "TC_ISSUED"
          : statusParam === "Inactive"
          ? "DETAINED"
          : undefined,
    }),
  };

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    students,
    totalCount,
    activeCount,
    feeRecords,
    attendanceAlerts,
    filteredCount,
  ] = await Promise.all([
    prisma.student.findMany({
      where: whereCondition,
      include: {
        enrollments: {
          include: {
            section: {
              include: {
                class: true,
              },
            },
          },
        },
      },
      skip,
      take: pageSize,
      orderBy: { admissionNo: "asc" },
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
    prisma.student.count({ where: whereCondition }),
  ]);

  const totalFeeRecords = feeRecords.length;
  const paidFeeRecords = feeRecords.filter((f) => f.status === "PAID").length;
  const feePaidPercentage =
    totalFeeRecords > 0 ? Math.round((paidFeeRecords / totalFeeRecords) * 100) : 0;

  // Students with 1 or more absences in the last 7 days
  const criticalAttendanceCount = attendanceAlerts.filter(
    (a) => a._count.studentId >= 1
  ).length;

  const stats = {
    total: totalCount,
    active: activeCount,
    tcIssued: totalCount - activeCount,
    feePaidPercentage,
    attendanceAlerts: criticalAttendanceCount,
  };

  return (
    <StudentsClient
      students={students}
      stats={stats}
      filteredCount={filteredCount}
      currentPage={page}
      searchQuery={q}
      statusQuery={statusParam}
    />
  );
}
