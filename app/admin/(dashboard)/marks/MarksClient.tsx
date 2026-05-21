"use client";
// app/admin/marks/MarksClient.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";

type Exam = { id: string; title: string; date: Date; term: string | null; class: { name: string } };
type Result = {
  id: string; marksObtained: number; maxMarks: number; grade: string | null;
  student: { firstName: string; lastName: string; admissionNo: string };
  subject: { name: string };
};

interface Props {
  exams: Exam[];
  selectedExam: Exam | null;
  results: Result[];
}

function gradeColor(grade: string | null) {
  if (!grade) return "bg-[#eae7e7] text-outline";
  if (grade.startsWith("A")) return "bg-tertiary-fixed/30 text-tertiary-container";
  if (grade.startsWith("B")) return "bg-primary-fixed/30 text-primary";
  if (grade.startsWith("C")) return "bg-secondary-fixed/30 text-secondary";
  return "bg-error-container text-error";
}

export default function MarksClient({ exams, selectedExam, results }: Props) {
  const router = useRouter();

  // Group results by student
  const byStudent = results.reduce((acc, r) => {
    const key = r.student.admissionNo;
    if (!acc[key]) acc[key] = { student: r.student, subjects: [] };
    acc[key].subjects.push(r);
    return acc;
  }, {} as Record<string, { student: Result["student"]; subjects: Result[] }>);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Marks & Results</h1>
          <p className="text-sm text-on-surface-variant">View and enter exam results by subject and student.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm">
          <span className="material-symbols-outlined">add</span>Create Exam
        </button>
      </div>

      {/* Exam Selector */}
      <div className="bg-white border border-outline-variant rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="font-bold text-base text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">quiz</span> Select Exam
        </h2>
        {exams.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No exams created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {exams.map(e => (
              <button
                key={e.id}
                onClick={() => router.push(`/admin/marks?examId=${e.id}`)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedExam?.id === e.id
                    ? "border-primary bg-primary-fixed/20 ring-2 ring-primary"
                    : "border-outline-variant bg-[#f6f3f2] hover:bg-primary-fixed/10 hover:border-primary/50"
                }`}
              >
                <p className="font-bold text-sm text-primary">{e.title}</p>
                <p className="text-xs text-on-surface-variant mt-1">{e.class.name} · {e.term ?? "—"}</p>
                <p className="text-xs text-on-surface-variant">{new Date(e.date).toLocaleDateString("en-IN")}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Table */}
      {selectedExam && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl text-primary">{selectedExam.title} — {selectedExam.class.name}</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant font-semibold rounded-lg hover:bg-[#f6f3f2] transition-all text-sm">
              <span className="material-symbols-outlined text-xl">download</span>Export CSV
            </button>
          </div>

          {Object.keys(byStudent).length === 0 ? (
            <div className="bg-white border border-outline-variant rounded-xl py-16 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl block mb-2 text-outline">grade</span>
              <p className="text-sm">No results entered for this exam yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.values(byStudent).map(({ student, subjects }) => {
                const totalObtained = subjects.reduce((s, r) => s + r.marksObtained, 0);
                const totalMax = subjects.reduce((s, r) => s + r.maxMarks, 0);
                const pct = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;
                return (
                  <div key={student.admissionNo} className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 bg-[#f6f3f2] border-b border-outline-variant flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary font-bold text-xs">
                          {student.firstName[0]}{student.lastName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-on-surface">{student.firstName} {student.lastName}</p>
                          <p className="text-xs text-on-surface-variant">#{student.admissionNo}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-primary">{totalObtained}/{totalMax}</p>
                        <p className="text-xs text-on-surface-variant">{pct}%</p>
                      </div>
                    </div>
                    <table className="w-full text-left border-collapse">
                      <tbody className="divide-y divide-outline-variant/30">
                        {subjects.map(r => (
                          <tr key={r.id} className="hover:bg-[#f6f3f2] transition-colors">
                            <td className="px-6 py-3 text-sm font-medium text-on-surface">{r.subject.name}</td>
                            <td className="px-6 py-3 text-sm text-on-surface-variant">{r.marksObtained} / {r.maxMarks}</td>
                            <td className="px-6 py-3 text-sm text-on-surface-variant">{Math.round((r.marksObtained / r.maxMarks) * 100)}%</td>
                            <td className="px-6 py-3">
                              {r.grade && (
                                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${gradeColor(r.grade)}`}>{r.grade}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
