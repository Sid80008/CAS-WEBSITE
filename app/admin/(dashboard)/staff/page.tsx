// app/admin/staff/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import StaffClient from "./StaffClient";

export const metadata: Metadata = { title: "Staff | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function StaffPage() {
  const [staffList, sections, subjects] = await Promise.all([
    prisma.staff.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        user: {
          select: {
            email: true,
            roles: {
              include: {
                role: true,
              },
            },
          },
        },
        subjects: {
          include: {
            section: {
              include: {
                class: true,
              },
            },
            subject: true,
          },
        },
      },
    }),
    prisma.section.findMany({
      include: { class: true },
      orderBy: { classId: "asc" },
    }),
    prisma.subject.findMany({
      include: { class: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const staffListMapped = staffList.map(s => ({
    ...s,
    user: {
      email: s.user.email,
      role: s.user.roles[0]?.role.name || "TEACHER",
      phone: null,
    },
    assignments: s.subjects.map(sub => ({
      sectionId: sub.sectionId,
      subjectId: sub.subjectId,
      className: sub.section.class.name,
      sectionName: sub.section.name,
      subjectName: sub.subject.name,
    })),
  }));

  return (
    <StaffClient
      staff={staffListMapped as any}
      sections={sections as any}
      subjects={subjects as any}
    />
  );
}
