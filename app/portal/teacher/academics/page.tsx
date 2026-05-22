import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createHomework } from "@/app/actions/homeworkActions";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function TeacherAcademicsPage() {
  const session = await auth();
  const teacherId = (session?.user as any)?.id;

  if (!teacherId) {
    return <div className="p-8">Please log in as a teacher.</div>;
  }

  const teacher = await prisma.staff.findUnique({
    where: { userId: teacherId },
    include: {
      subjects: {
        include: {
          subject: true,
          section: { include: { class: true } }
        }
      }
    }
  });

  if (!teacher) return <div className="p-8">Teacher profile not found.</div>;

  // Fetch recent homeworks by this teacher
  const recentHomeworks = await prisma.homework.findMany({
    where: { postedById: teacher.id },
    orderBy: { createdAt: 'desc' },
    include: {
      subject: true,
      section: { include: { class: true } },
      submissions: {
        include: {
          student: true
        }
      }
    }
  });

  // Calculate some stats
  const totalSubmissions = recentHomeworks.reduce((acc, hw) => acc + hw.submissions.filter(s => s.status === 'SUBMITTED' || s.status === 'GRADED').length, 0);
  const totalPendingReview = recentHomeworks.reduce((acc, hw) => acc + hw.submissions.filter(s => s.status === 'SUBMITTED').length, 0);

  // Flatten submissions for the recent list
  const recentSubmissionsList = recentHomeworks.flatMap(hw => hw.submissions.map(sub => ({ ...sub, homework: hw }))).sort((a, b) => {
    return (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0);
  }).slice(0, 10);


  return (
    <div className="space-y-[48px] max-w-[1280px] mx-auto w-full text-[#1c1b1b]">
      <section className="grid grid-cols-12 gap-[24px] items-start">
        {/* Create Homework Form */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-lg border border-[#E2E0DB] p-8 shadow-sm">
          <div className="flex items-center gap-[16px] mb-[24px]">
            <div className="p-3 bg-[#E6F1FB] text-[#1B4F8A] rounded-xl">
              <span className="material-symbols-outlined">add_task</span>
            </div>
            <h2 className="font-h2 text-[28px] font-semibold text-[#1B4F8A]">New Assignment</h2>
          </div>
          <form action={createHomework} className="space-y-[24px]">
            <div className="space-y-[4px]">
              <label className="font-label text-[14px] font-medium text-[#424750]">Homework Title</label>
              <input name="title" required className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#1B4F8A] outline-none transition-all" placeholder="e.g. Calculus: Limits & Continuity" type="text" />
            </div>
            <div className="grid grid-cols-2 gap-[16px]">
              <div className="space-y-[4px]">
                <label className="font-label text-[14px] font-medium text-[#424750]">Subject</label>
                <select name="subjectAndSection" required className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#1B4F8A] outline-none bg-white">
                  {teacher.subjects.map(sub => (
                    <option key={`${sub.subjectId}_${sub.sectionId}`} value={`${sub.subjectId}_${sub.sectionId}`}>
                      {sub.subject?.name || 'Unknown'} ({sub.section?.class?.name}-{sub.section?.name})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-[4px]">
                <label className="font-label text-[14px] font-medium text-[#424750]">Due Date</label>
                <input name="dueDate" required className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#1B4F8A] outline-none bg-white" type="date" />
              </div>
            </div>
            <div className="space-y-[4px]">
              <label className="font-label text-[14px] font-medium text-[#424750]">Assignment Details</label>
              <textarea name="description" className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#1B4F8A] outline-none" placeholder="Describe objectives..." rows={3}></textarea>
            </div>
            <div className="space-y-[4px]">
              <label className="font-label text-[14px] font-medium text-[#424750]">Attachments</label>
              <div className="border-2 border-dashed border-[#E2E0DB] rounded-xl p-8 text-center bg-[#f6f3f2] hover:bg-[#F0F6FC] transition-colors cursor-pointer group">
                <span className="material-symbols-outlined text-4xl text-[#737781] group-hover:text-[#1B4F8A] mb-[8px]">cloud_upload</span>
                <p className="font-body text-[16px] text-[#424750]">Drag and drop files or <span className="text-[#1B4F8A] font-bold underline">browse</span></p>
              </div>
            </div>
            <button className="w-full py-4 bg-[#1B4F8A] text-white rounded-lg font-bold hover:opacity-90 shadow-md transition-all active:scale-95 flex items-center justify-center gap-[16px]" type="submit">
              <span className="material-symbols-outlined">send</span>
              Publish Assignment
            </button>
          </form>
        </div>

        {/* Grading & Submissions Stats & List */}
        <div className="col-span-12 lg:col-span-7 space-y-[24px]">
          {/* Submission Stats */}
          <div className="grid grid-cols-3 gap-[16px]">
            <div className="bg-[#E1F5EE] p-6 rounded-lg border border-[#085041]">
              <p className="font-overline text-[11px] font-semibold tracking-[0.1em] text-[#085041]">SUBMITTED</p>
              <h3 className="font-display text-[36px] font-bold text-[#085041]">{totalSubmissions}</h3>
            </div>
            <div className="bg-[#FAEEDA] p-6 rounded-lg border border-[#633806]">
              <p className="font-overline text-[11px] font-semibold tracking-[0.1em] text-[#633806]">PENDING REVIEW</p>
              <h3 className="font-display text-[36px] font-bold text-[#633806]">{totalPendingReview}</h3>
            </div>
            <div className="bg-[#F0F6FC] p-6 rounded-lg border border-[#1B4F8A]">
              <p className="font-overline text-[11px] font-semibold tracking-[0.1em] text-[#1B4F8A]">AVG. GRADE</p>
              <h3 className="font-display text-[36px] font-bold text-[#1B4F8A]">N/A</h3>
            </div>
          </div>

          {/* Submissions List */}
          <div className="bg-white rounded-lg border border-[#E2E0DB] overflow-hidden flex flex-col h-[520px]">
            <div className="p-6 border-b border-[#E2E0DB] flex justify-between items-center bg-[#f6f3f2]">
              <div>
                <h3 className="font-h3 text-[22px] font-semibold text-[#1c1b1b]">Recent Submissions</h3>
                <p className="font-body-small text-[14px] text-[#424750]">Across all assignments</p>
              </div>
              <button className="flex items-center gap-[8px] px-4 py-2 bg-white border border-[#E2E0DB] rounded-lg hover:bg-[#eae7e7] transition-colors font-label text-[14px] font-medium">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                Filter
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="font-overline text-[11px] font-semibold tracking-[0.1em] text-[#424750] uppercase bg-[#f6f3f2] border-b border-[#E2E0DB]">
                    <th className="px-6 py-3">Student</th>
                    <th className="px-6 py-3">Assignment</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E0DB]">
                  {recentSubmissionsList.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-[#424750]">No recent submissions.</td>
                    </tr>
                  ) : (
                    recentSubmissionsList.map(sub => (
                      <tr key={sub.id} className="hover:bg-[#F0F6FC] transition-colors cursor-pointer">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-[16px]">
                            <div className="w-8 h-8 rounded-full bg-[#e5e2e1] flex items-center justify-center font-bold text-[#1B4F8A] text-xs">
                              {sub.student.firstName[0]}{sub.student.lastName[0]}
                            </div>
                            <span className="font-label text-[14px] font-bold text-[#1c1b1b]">{sub.student.firstName} {sub.student.lastName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-body-small text-[14px] text-[#424750]">
                          {sub.homework.title}
                        </td>
                        <td className="px-6 py-4">
                          {sub.status === 'GRADED' ? (
                            <span className="px-3 py-1 rounded-full bg-[#E1F5EE] text-[#085041] font-label text-[12px] font-bold">Graded</span>
                          ) : sub.status === 'SUBMITTED' ? (
                            <span className="px-3 py-1 rounded-full bg-[#FAEEDA] text-[#633806] font-label text-[12px] font-bold">Pending Review</span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-[#f6f3f2] text-[#424750] font-label text-[12px] font-bold">Pending</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-[#085041]">
                          {sub.status === 'GRADED' ? sub.grade || '-' : (
                            <button className="bg-[#1B4F8A] text-white px-3 py-1 rounded-lg text-[12px] font-bold hover:opacity-90">Grade Now</button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Active Assignments */}
      <section className="space-y-[24px]">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-h2 text-[28px] font-semibold text-[#1c1b1b]">Active Assignments</h2>
            <p className="font-body text-[16px] text-[#424750]">Assignments currently being tracked.</p>
          </div>
          <button className="text-[#1B4F8A] font-bold font-label text-[14px] hover:underline flex items-center gap-[4px]">
            View All Archives <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          
          {recentHomeworks.map(hw => {
            const submissionsCount = hw.submissions.length;
            // Assuming for this demo we're expecting 30 students per class just to show the progress bar if actual student count isn't readily available
            const totalExpected = 30; 
            const percentage = Math.round((submissionsCount / totalExpected) * 100);

            return (
              <div key={hw.id} className="bg-white rounded-lg border border-[#E2E0DB] p-6 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex justify-between mb-[16px]">
                  <span className="px-2 py-1 rounded bg-[#E1F5EE] text-[#085041] font-bold text-[10px] uppercase tracking-wider">
                    {hw.subject?.name?.substring(0, 4) || 'SUBJ'}-{hw.section?.class?.name}{hw.section?.name}
                  </span>
                  <span className="material-symbols-outlined text-[#737781] group-hover:text-[#1B4F8A]">more_vert</span>
                </div>
                <h4 className="font-h4 text-[18px] font-semibold text-[#1c1b1b] mb-[8px] group-hover:text-[#1B4F8A] transition-colors line-clamp-1">{hw.title}</h4>
                <div className="flex items-center gap-[8px] text-[#424750] font-caption text-[12px] mb-[24px]">
                  <span className="material-symbols-outlined text-sm">event</span>
                  Due: {hw.dueDate.toLocaleDateString()}
                </div>
                <div className="w-full bg-[#eae7e7] h-2 rounded-full overflow-hidden mb-[4px]">
                  <div className="bg-[#085041] h-full" style={{ width: `${Math.min(percentage, 100)}%` }}></div>
                </div>
                <div className="flex justify-between items-center font-caption text-[12px] text-[#424750]">
                  <span>{percentage}% Submissions</span>
                  <span className="font-bold text-[#085041]">{submissionsCount}/{totalExpected}</span>
                </div>
              </div>
            );
          })}

          {/* Create New CTA */}
          <div className="bg-[#F0F6FC] rounded-lg border-2 border-dashed border-[#1B4F8A] p-6 flex flex-col items-center justify-center text-center hover:bg-[#E6F1FB] transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1B4F8A] mb-[16px] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">add</span>
            </div>
            <p className="font-label text-[14px] font-bold text-[#1B4F8A]">Create New</p>
            <p className="font-caption text-[12px] text-[#424750]">Start a new assignment flow</p>
          </div>
        </div>
      </section>
    </div>
  );
}
