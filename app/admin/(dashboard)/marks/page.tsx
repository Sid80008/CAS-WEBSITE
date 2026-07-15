// app/admin/marks/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import MarksClient from "./MarksClient";

export const metadata: Metadata = { title: "Marks & Results | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function MarksPage({ searchParams }: { searchParams: Promise<{ examId?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const [exams, classes] = await Promise.all([
    prisma.exam.findMany({ orderBy: { date: "desc" }, include: { class: true } }),
    prisma.class.findMany({ orderBy: { name: "asc" } }),
  ]);

  const selectedExam = resolvedSearchParams.examId
    ? exams.find((e) => e.id === resolvedSearchParams.examId)
    : null;

  let results: any[] = [];
  if (selectedExam) {
    results = await prisma.examResult.findMany({
      where: { examId: selectedExam.id },
      include: {
        student: true,
        subject: true,
      },
      orderBy: [{ student: { firstName: "asc" } }],
    });
  }

  return <MarksClient exams={exams as any} selectedExam={selectedExam as any} results={results} />;
}
