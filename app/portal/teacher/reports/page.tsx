import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { saveBulkMarks } from "@/app/actions/markActions";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ sectionId?: string; subjectId?: string; examId?: string }>;
}

export default async function TeacherReportsPage({ searchParams }: PageProps) {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  const resolvedParams = await searchParams;
  const sectionId = resolvedParams.sectionId;
  const subjectId = resolvedParams.subjectId;
  const examId = resolvedParams.examId;

  if (!userId) {
    return <div className="p-8 text-center text-red-600">Please log in to view this page.</div>;
  }

  // Get teacher profile and taught subjects/sections
  const teacher = await prisma.staff.findUnique({
    where: { userId },
    include: {
      subjects: {
        include: {
          section: {
            include: {
              class: true
            }
          },
          subject: true
        }
      }
    }
  });

  if (!teacher) {
    return <div className="p-8 text-center text-red-600">Teacher profile not found.</div>;
  }

  // Flatten taught combinations
  const taughtCombinations = teacher.subjects.map(ts => ({
    sectionId: ts.sectionId,
    sectionName: `${ts.section.class.name} - ${ts.section.name}`,
    classId: ts.section.classId,
    subjectId: ts.subjectId,
    subjectName: ts.subject.name
  }));

  // Select active combination
  const selectedCombo = taughtCombinations.length > 0
    ? (sectionId && subjectId
        ? taughtCombinations.find(c => c.sectionId === sectionId && c.subjectId === subjectId)
        : taughtCombinations[0])
    : null;

  let exams: any[] = [];
  let students: any[] = [];
  let existingMarks: Record<string, number> = {};
  let currentMaxMarks = 100;

  if (selectedCombo) {
    // Fetch exams for this class
    exams = await prisma.exam.findMany({
      where: {
        classId: selectedCombo.classId,
        yearId: 'ay-2026-27'
      }
    });

    // If no exams exist yet for this class, create default ones
    if (exams.length === 0) {
      await prisma.exam.createMany({
        data: [
          {
            title: 'Half-Yearly Examination 2026',
            term: 'Half-Yearly',
            date: new Date('2026-09-10'),
            classId: selectedCombo.classId,
            yearId: 'ay-2026-27',
            isPublished: true
          },
          {
            title: 'Annual Examination 2027',
            term: 'Annual',
            date: new Date('2027-03-05'),
            classId: selectedCombo.classId,
            yearId: 'ay-2026-27',
            isPublished: false
          }
        ]
      });

      exams = await prisma.exam.findMany({
        where: {
          classId: selectedCombo.classId,
          yearId: 'ay-2026-27'
        }
      });
    }

    const activeExam = examId ? exams.find(e => e.id === examId) : exams[0];

    // Fetch students
    const enrollments = await prisma.enrollment.findMany({
      where: {
        sectionId: selectedCombo.sectionId,
        yearId: 'ay-2026-27'
      },
      include: {
        student: true
      },
      orderBy: {
        student: { firstName: 'asc' }
      }
    });
    students = enrollments.map(e => e.student);

    if (activeExam) {
      // Fetch existing exam results
      const results = await prisma.examResult.findMany({
        where: {
          examId: activeExam.id,
          subjectId: selectedCombo.subjectId,
          studentId: { in: students.map(s => s.id) }
        }
      });

      results.forEach(res => {
        existingMarks[res.studentId] = res.marksObtained;
        currentMaxMarks = res.maxMarks;
      });
    }
  }

  const activeExam = examId ? exams.find(e => e.id === examId) : exams[0];

  return (
    <div className="space-y-8 max-w-[1280px] mx-auto w-full text-[#1c1b1b]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#00386b] tracking-tight">Gradebook & Marks Entry</h1>
          <p className="text-[16px] text-[#555555]">Record, review, and update academic marks for your taught classes.</p>
        </div>
      </div>

      {taughtCombinations.length === 0 ? (
        <div className="bg-white border border-[#E2E0DB] rounded-xl p-12 text-center shadow-sm">
          <span className="material-symbols-outlined text-5xl text-[#737781] mb-4">menu_book</span>
          <h3 className="text-xl font-bold text-[#1c1b1b] mb-1">No Assigned Subjects</h3>
          <p className="text-[#555555]">You are not assigned to teach any subjects in any sections.</p>
        </div>
      ) : (
        <>
          {/* Filters card */}
          <div className="bg-white border border-[#E2E0DB] rounded-xl p-6 shadow-sm">
            <form method="GET" className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-[4px]">
                <label className="text-[14px] font-medium text-[#424750]">Class, Section & Subject</label>
                <select
                  name="combo"
                  defaultValue={selectedCombo ? `${selectedCombo.sectionId}_${selectedCombo.subjectId}` : ""}
                  onChange={(e) => {
                    const [secId, subId] = e.target.value.split('_');
                    window.location.search = `?sectionId=${secId}&subjectId=${subId}`;
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] bg-white outline-none"
                >
                  {taughtCombinations.map((combo, idx) => (
                    <option key={idx} value={`${combo.sectionId}_${combo.subjectId}`}>
                      {combo.sectionName} - {combo.subjectName}
                    </option>
                  ))}
                </select>
                {/* Hidden fields so they submit correctly in standard form submissions */}
                {selectedCombo && (
                  <>
                    <input type="hidden" name="sectionId" value={selectedCombo.sectionId} />
                    <input type="hidden" name="subjectId" value={selectedCombo.subjectId} />
                  </>
                )}
              </div>

              <div className="space-y-[4px]">
                <label className="text-[14px] font-medium text-[#424750]">Exam / Term</label>
                <select
                  name="examId"
                  value={activeExam?.id || ""}
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] bg-white outline-none"
                >
                  {exams.map(ex => (
                    <option key={ex.id} value={ex.id}>
                      {ex.title} ({ex.term})
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#00386b] hover:bg-[#002246] text-white rounded-lg font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">filter_alt</span>
                  Load Gradebook
                </button>
              </div>
            </form>
          </div>

          {selectedCombo && activeExam && students.length > 0 ? (
            <form action={saveBulkMarks} className="bg-white border border-[#E2E0DB] rounded-xl overflow-hidden shadow-sm">
              <input type="hidden" name="subjectId" value={selectedCombo.subjectId} />
              <input type="hidden" name="examId" value={activeExam.id} />
              
              <div className="bg-[#f6f3f2] px-6 py-4 border-b border-[#E2E0DB] flex flex-col md:flex-row justify-between md:items-center gap-6">
                <div>
                  <h3 className="text-lg font-bold text-[#00386b]">
                    {selectedCombo.sectionName} • {selectedCombo.subjectName}
                  </h3>
                  <p className="text-xs text-[#555555]">Exam: {activeExam.title}</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 border border-[#E2E0DB] rounded-lg">
                  <label className="text-sm font-semibold text-[#424750] whitespace-nowrap">Max Marks:</label>
                  <input
                    type="number"
                    name="maxMarks"
                    defaultValue={currentMaxMarks}
                    required
                    min={1}
                    className="w-20 px-2 py-1 border border-[#E2E0DB] rounded text-center font-bold text-sm outline-none focus:ring-1 focus:ring-[#00386b]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fcf9f8] border-b border-[#E2E0DB] text-[11px] font-semibold tracking-wider text-[#424750] uppercase">
                      <th className="px-6 py-3">Roll No.</th>
                      <th className="px-6 py-3">Student Name</th>
                      <th className="px-6 py-3">Admission No.</th>
                      <th className="px-6 py-3 text-right w-48">Marks Obtained</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E0DB]">
                    {students.map((student, idx) => {
                      const score = existingMarks[student.id];
                      return (
                        <tr key={student.id} className="hover:bg-[#fcf9f8] transition-colors">
                          <td className="px-6 py-4 font-semibold text-sm text-[#00386b]">
                            {student.rollNo || (idx + 1)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-sm text-[#1c1b1b]">{student.firstName} {student.lastName}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#424750]">
                            {student.admissionNo}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <input
                              type="number"
                              step="0.5"
                              name={`mark_${student.id}`}
                              defaultValue={score !== undefined ? score : ""}
                              placeholder="-"
                              min={0}
                              className="w-32 px-3 py-1.5 border border-[#E2E0DB] rounded text-right font-bold text-sm outline-none focus:ring-2 focus:ring-[#00386b]"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#f6f3f2] px-6 py-4 border-t border-[#E2E0DB] flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#085041] hover:bg-[#063b30] text-white rounded-lg font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">done_all</span>
                  Submit Gradebook
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white border border-[#E2E0DB] rounded-xl p-12 text-center shadow-sm">
              <span className="material-symbols-outlined text-5xl text-[#737781] mb-4">assignment</span>
              <h3 className="text-xl font-bold text-[#1c1b1b] mb-1">No Data Available</h3>
              <p className="text-[#555555]">Please select class/subject and click "Load Gradebook". Make sure students are enrolled.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
