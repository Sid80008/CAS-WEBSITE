import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { saveBulkAttendance } from "@/app/actions/attendanceActions";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ sectionId?: string; date?: string }>;
}

export default async function TeacherAttendancePage({ searchParams }: PageProps) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  
  const resolvedParams = await searchParams;
  const sectionId = resolvedParams.sectionId;
  const dateStr = resolvedParams.date || new Date().toISOString().split('T')[0];

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

  // Find unique sections taught by this teacher
  const sectionsMap = new Map<string, { id: string; classId: string; className: string; sectionName: string }>();
  teacher.subjects.forEach(sub => {
    if (sub.section) {
      sectionsMap.set(sub.section.id, {
        id: sub.section.id,
        classId: sub.section.classId,
        className: sub.section.class.name,
        sectionName: sub.section.name
      });
    }
  });
  const taughtSections = Array.from(sectionsMap.values());

  const selectedSection = sectionId ? taughtSections.find(s => s.id === sectionId) : taughtSections[0];

  // Fetch students in selected section
  let students: any[] = [];
  let existingAttendance: Record<string, string> = {};

  if (selectedSection) {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        sectionId: selectedSection.id,
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

    // Fetch existing attendance records for the selected date
    const records = await prisma.attendance.findMany({
      where: {
        classId: selectedSection.classId,
        date: {
          gte: new Date(`${dateStr}T00:00:00.000Z`),
          lte: new Date(`${dateStr}T23:59:59.999Z`)
        }
      }
    });

    records.forEach(rec => {
      existingAttendance[rec.studentId] = rec.status;
    });
  }

  return (
    <div className="space-y-8 max-w-[1280px] mx-auto w-full text-[#1c1b1b]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#00386b] tracking-tight">Daily Attendance</h1>
          <p className="text-[16px] text-[#555555]">Record or update daily attendance for your taught classes.</p>
        </div>
      </div>

      {/* Select section & date */}
      <div className="bg-white border border-[#E2E0DB] rounded-xl p-6 shadow-sm">
        <form method="GET" className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="space-y-[4px]">
            <label className="text-[14px] font-medium text-[#424750]">Class & Section</label>
            <select
              name="sectionId"
              defaultValue={selectedSection?.id}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] bg-white outline-none"
            >
              {taughtSections.map(sec => (
                <option key={sec.id} value={sec.id}>
                  {sec.className} - {sec.sectionName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-[4px]">
            <label className="text-[14px] font-medium text-[#424750]">Date</label>
            <input
              type="date"
              name="date"
              defaultValue={dateStr}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] bg-white outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-[#00386b] hover:bg-[#002246] text-white rounded-lg font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">search</span>
              Load Students
            </button>
          </div>
        </form>
      </div>

      {selectedSection && students.length > 0 ? (
        <form action={saveBulkAttendance} className="bg-white border border-[#E2E0DB] rounded-xl overflow-hidden shadow-sm">
          <input type="hidden" name="classId" value={selectedSection.classId} />
          <input type="hidden" name="date" value={dateStr} />
          
          <div className="bg-[#f6f3f2] px-6 py-4 border-b border-[#E2E0DB] flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#00386b]">
                Marking Attendance for {selectedSection.className} - {selectedSection.sectionName}
              </h3>
              <p className="text-xs text-[#555555]">Date: {new Date(dateStr).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex gap-4">
              <span className="text-xs font-semibold flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Present</span>
              <span className="text-xs font-semibold flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Absent</span>
              <span className="text-xs font-semibold flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span> Leave</span>
              <span className="text-xs font-semibold flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Late</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcf9f8] border-b border-[#E2E0DB] text-[11px] font-semibold tracking-wider text-[#424750] uppercase">
                  <th className="px-6 py-3">Roll No.</th>
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Admission No.</th>
                  <th className="px-6 py-3 text-center">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E0DB]">
                {students.map((student, idx) => {
                  const currentStatus = existingAttendance[student.id] || "PRESENT";
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
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-4">
                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="radio"
                              name={`status_${student.id}`}
                              value="PRESENT"
                              defaultChecked={currentStatus === "PRESENT"}
                              className="w-4 h-4 text-green-600 border-[#E2E0DB] focus:ring-green-500"
                            />
                            <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">Present</span>
                          </label>

                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="radio"
                              name={`status_${student.id}`}
                              value="ABSENT"
                              defaultChecked={currentStatus === "ABSENT"}
                              className="w-4 h-4 text-red-600 border-[#E2E0DB] focus:ring-red-500"
                            />
                            <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">Absent</span>
                          </label>

                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="radio"
                              name={`status_${student.id}`}
                              value="LEAVE"
                              defaultChecked={currentStatus === "LEAVE"}
                              className="w-4 h-4 text-yellow-600 border-[#E2E0DB] focus:ring-yellow-500"
                            />
                            <span className="text-xs font-bold text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full">Leave</span>
                          </label>

                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="radio"
                              name={`status_${student.id}`}
                              value="LATE"
                              defaultChecked={currentStatus === "LATE"}
                              className="w-4 h-4 text-blue-600 border-[#E2E0DB] focus:ring-blue-500"
                            />
                            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">Late</span>
                          </label>
                        </div>
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
              <span className="material-symbols-outlined">save</span>
              Save Attendance
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white border border-[#E2E0DB] rounded-xl p-12 text-center shadow-sm">
          <span className="material-symbols-outlined text-5xl text-[#737781] mb-4">info</span>
          <h3 className="text-xl font-bold text-[#1c1b1b] mb-1">No Students Available</h3>
          <p className="text-[#555555]">Please select a class/section and click "Load Students" to begin marking attendance.</p>
        </div>
      )}
    </div>
  );
}
