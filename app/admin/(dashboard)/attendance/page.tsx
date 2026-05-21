// app/admin/attendance/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import AttendanceClient from "./AttendanceClient";

export const metadata: Metadata = { title: "Attendance | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function AttendancePage({
  searchParams,
}: {
  searchParams: { classId?: string; date?: string };
}) {
  const classes = await prisma.class.findMany({
    orderBy: { name: "asc" },
    include: { sections: true },
  });

  const selectedClassId = searchParams.classId || "";
  const selectedDate = searchParams.date || new Date().toISOString().split("T")[0];

  let students: any[] = [];
  const existingAttendance: Record<string, string> = {};

  if (selectedClassId && selectedDate) {
    // Students via enrollment in a class's sections
    const sections = classes.find(c => c.id === selectedClassId)?.sections ?? [];
    const sectionIds = sections.map(s => s.id);

    students = await prisma.student.findMany({
      where: {
        status: "ACTIVE",
        enrollments: { some: { sectionId: { in: sectionIds } } },
      },
      orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
    });

    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        classId: selectedClassId,
        date: new Date(selectedDate),
      },
    });
    attendanceRecords.forEach((r) => { existingAttendance[r.studentId] = r.status; });
  }

  return (
    <AttendanceClient
      classes={classes}
      students={students}
      existingAttendance={existingAttendance}
      selectedClassId={selectedClassId}
      selectedDate={selectedDate}
    />
  );
}
