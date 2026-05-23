import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function TeacherStudentsPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return <div className="p-8 text-center text-red-600">Please log in to view this page.</div>;
  }

  // Get teacher profile
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
  const sectionsMap = new Map<string, { id: string; className: string; sectionName: string }>();
  teacher.subjects.forEach(sub => {
    if (sub.section) {
      sectionsMap.set(sub.section.id, {
        id: sub.section.id,
        className: sub.section.class.name,
        sectionName: sub.section.name
      });
    }
  });
  const taughtSections = Array.from(sectionsMap.values());

  // Fetch student enrollments for these sections for current academic year (ay-2026-27)
  const enrollments = await prisma.enrollment.findMany({
    where: {
      sectionId: { in: taughtSections.map(s => s.id) },
      yearId: 'ay-2026-27'
    },
    include: {
      student: true,
      section: {
        include: {
          class: true
        }
      }
    },
    orderBy: [
      { section: { class: { name: 'asc' } } },
      { section: { name: 'asc' } },
      { student: { firstName: 'asc' } }
    ]
  });

  // Group enrollments by section name
  const groupedStudents = taughtSections.map(sec => {
    const studentsInSection = enrollments.filter(e => e.sectionId === sec.id).map(e => e.student);
    return {
      ...sec,
      students: studentsInSection
    };
  });

  return (
    <div className="space-y-8 max-w-[1280px] mx-auto w-full text-[#1c1b1b]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#00386b] tracking-tight">Class Students</h1>
          <p className="text-[16px] text-[#555555]">View students enrolled in your taught classes for academic year 2026-27.</p>
        </div>
        <div className="bg-[#E6F1FB] text-[#00386b] px-4 py-2 rounded-lg text-sm font-semibold border border-[#b2d4f5]">
          Active Classes: {taughtSections.length}
        </div>
      </div>

      {groupedStudents.length === 0 ? (
        <div className="bg-white border border-[#E2E0DB] rounded-xl p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-[#737781] mb-4">group_off</span>
          <h3 className="text-xl font-bold text-[#1c1b1b] mb-1">No Assigned Classes</h3>
          <p className="text-[#555555]">You are not currently assigned to teach any subjects/sections in the system.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedStudents.map(group => (
            <div key={group.id} className="bg-white border border-[#E2E0DB] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#f6f3f2] px-6 py-4 border-b border-[#E2E0DB] flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-[#00386b]">
                    {group.className} - {group.sectionName}
                  </h3>
                  <p className="text-xs text-[#555555]">Total Enrolled: {group.students.length} students</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/portal/teacher/attendance?sectionId=${group.id}`} className="bg-[#085041] hover:opacity-90 text-white text-xs px-3 py-2 rounded font-bold flex items-center gap-1 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-[16px]">fact_check</span>
                    Mark Attendance
                  </Link>
                  <Link href={`/portal/teacher/reports?sectionId=${group.id}`} className="bg-[#00386b] hover:opacity-90 text-white text-xs px-3 py-2 rounded font-bold flex items-center gap-1 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-[16px]">assessment</span>
                    Enter Marks
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fcf9f8] border-b border-[#E2E0DB] text-[11px] font-semibold tracking-wider text-[#424750] uppercase">
                      <th className="px-6 py-3">Roll No.</th>
                      <th className="px-6 py-3">Student Name</th>
                      <th className="px-6 py-3">Admission No.</th>
                      <th className="px-6 py-3">Gender</th>
                      <th className="px-6 py-3">Parent's Name</th>
                      <th className="px-6 py-3">Contact</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E0DB]">
                    {group.students.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-[#555555] italic">No students enrolled in this section.</td>
                      </tr>
                    ) : (
                      group.students.map((student, idx) => (
                        <tr key={student.id} className="hover:bg-[#F0F6FC] transition-colors">
                          <td className="px-6 py-4 font-semibold text-sm text-[#00386b]">
                            {student.rollNo || (idx + 1)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#E6F1FB] text-[#00386b] flex items-center justify-center font-bold text-xs uppercase">
                                {student.firstName[0]}{student.lastName[0]}
                              </div>
                              <div>
                                <div className="font-bold text-sm text-[#1c1b1b]">{student.firstName} {student.lastName}</div>
                                <div className="text-xs text-[#555555]">{student.dob.toLocaleDateString()}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-[#424750]">
                            {student.admissionNo}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#424750]">
                            {student.gender}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#1c1b1b]">
                            {student.parentName || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#424750]">
                            {student.parentPhone || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              student.status === 'ACTIVE' ? 'bg-[#E1F5EE] text-[#085041]' : 'bg-[#FAEEDA] text-[#633806]'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
