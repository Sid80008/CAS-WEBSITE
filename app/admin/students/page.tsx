// app/admin/students/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";
import StudentsClient from "./StudentsClient";

export const metadata: Metadata = { title: "Students | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  const [students, totalCount, activeCount] = await Promise.all([
    prisma.student.findMany({
      orderBy: { admissionNo: "asc" },
      take: 50,
    }),
    prisma.student.count(),
    prisma.student.count({ where: { status: "ACTIVE" } }),
  ]);

  const stats = {
    total: totalCount,
    active: activeCount,
    tcIssued: totalCount - activeCount,
  };

  return <StudentsClient students={students} stats={stats} />;
}
