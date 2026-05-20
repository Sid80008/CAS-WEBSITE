import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function StudentAcademicsPage({
  searchParams
}: {
  searchParams: { tab?: string }
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      enrollments: {
        include: { year: true, section: { include: { class: true } } }
      }
    }
  })

  if (!student) return <div>No profile found</div>

  const enrollment = student.enrollments[0]
  const className = enrollment?.section.class.name || "N/A"
  const sectionName = enrollment?.section.name || "N/A"
  const yearName = enrollment?.year.name || "N/A"

  const currentTab = searchParams.tab || "marksheet"

  // Fetch Exam Results
  const examResultsRaw = await prisma.examResult.findMany({
    where: { studentId: student.id },
    include: { exam: true, subject: true }
  })
  
  // Fetch Homeworks
  const homeworksRaw = await prisma.homeworkSubmission.findMany({
    where: { studentId: student.id },
    include: { homework: { include: { subject: true } } },
    orderBy: { homework: { dueDate: 'asc' } }
  })

  // Fetch Curriculum Progress
  const syllabus = await prisma.curriculumProgress.findMany({
    where: { sectionId: enrollment?.section.id },
    include: { subject: true }
  })

  return (
    <div className="max-w-[1280px] mx-auto p-8">
      <div className="mb-12">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="font-h1 text-4xl font-bold text-[#00386b]">Academic Progress</h1>
          <p className="text-[#424750] text-lg">{className}-{sectionName} • Academic Session {yearName}</p>
        </div>
        
        <div className="flex gap-2 border-b border-[#E2E0DB]">
          <Link href="?tab=marksheet" className={`px-6 py-4 font-label text-sm ${currentTab === 'marksheet' ? 'border-b-2 border-[#00386b] text-[#00386b] font-bold' : 'border-b-2 border-transparent text-[#424750] hover:text-[#00386b]'}`}>
            Marksheet
          </Link>
          <Link href="?tab=homework" className={`px-6 py-4 font-label text-sm ${currentTab === 'homework' ? 'border-b-2 border-[#00386b] text-[#00386b] font-bold' : 'border-b-2 border-transparent text-[#424750] hover:text-[#00386b]'}`}>
            Homework
          </Link>
          <Link href="?tab=syllabus" className={`px-6 py-4 font-label text-sm ${currentTab === 'syllabus' ? 'border-b-2 border-[#00386b] text-[#00386b] font-bold' : 'border-b-2 border-transparent text-[#424750] hover:text-[#00386b]'}`}>
            Syllabus
          </Link>
        </div>
      </div>

      {currentTab === 'marksheet' && (
        <div className="space-y-8">
          <div className="bg-[#ffffff] rounded-xl border border-[#E2E0DB] overflow-hidden shadow-sm">
            <div className="p-6 bg-[#E6F1FB] border-b border-[#E2E0DB] flex justify-between items-center">
              <h3 className="font-h3 text-xl font-bold text-[#0C447C]">Examination Results</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f6f3f2] border-b border-[#E2E0DB]">
                    <th className="p-4 font-label text-sm text-[#424750] uppercase tracking-wider">Exam</th>
                    <th className="p-4 font-label text-sm text-[#424750] uppercase tracking-wider">Subject</th>
                    <th className="p-4 font-label text-sm text-[#424750] uppercase tracking-wider text-center">Marks Obtained</th>
                    <th className="p-4 font-label text-sm text-[#424750] uppercase tracking-wider text-center">Max Marks</th>
                    <th className="p-4 font-label text-sm text-[#424750] uppercase tracking-wider">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E0DB]">
                  {examResultsRaw.map(res => (
                    <tr key={res.id} className="hover:bg-[#fcf9f8] transition-colors">
                      <td className="p-4 font-body font-bold">{res.exam.title}</td>
                      <td className="p-4 font-body text-[#424750]">{res.subject.name}</td>
                      <td className="p-4 text-center font-bold">{res.marksObtained}</td>
                      <td className="p-4 text-center">{res.maxMarks}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-[#E1F5EE] text-[#085041] rounded-full text-xs font-bold">{res.remarks || '-'}</span>
                      </td>
                    </tr>
                  ))}
                  {examResultsRaw.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-[#424750]">No exam results available yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {currentTab === 'homework' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {homeworksRaw.map(sub => (
            <div key={sub.id} className="p-6 bg-[#ffffff] rounded-xl border border-[#E2E0DB] shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="px-2 py-1 bg-[#F0F6FC] text-[#00386b] font-bold text-[10px] uppercase rounded mb-2 inline-block">
                    {sub.homework.subject.name}
                  </span>
                  <h4 className="font-h4 text-lg font-bold group-hover:text-[#00386b] transition-colors">{sub.homework.title}</h4>
                </div>
                {sub.status === 'PENDING' && (
                  <span className="px-3 py-1 bg-[#FAEEDA] text-[#633806] rounded-full text-xs font-bold">Pending</span>
                )}
                {sub.status === 'SUBMITTED' && (
                  <span className="px-3 py-1 bg-[#E1F5EE] text-[#085041] rounded-full text-xs font-bold">Submitted</span>
                )}
                {sub.status === 'GRADED' && (
                  <span className="px-3 py-1 bg-[#d4e3ff] text-[#00386b] rounded-full text-xs font-bold">Graded: {sub.grade}</span>
                )}
              </div>
              <p className="text-[#424750] text-sm mb-6">{sub.homework.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E0DB]">
                <div className="flex items-center gap-2 text-[#424750]">
                  <span className="material-symbols-outlined text-[18px]">event</span>
                  <span className="text-xs">Due: {new Date(sub.homework.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
          {homeworksRaw.length === 0 && (
            <div className="col-span-2 text-center py-8 text-[#424750]">No homework assigned.</div>
          )}
        </div>
      )}

      {currentTab === 'syllabus' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-3 text-center py-8 text-[#424750]">
            Syllabus progress tracking is currently being updated by the faculty.
          </div>
        </div>
      )}
    </div>
  )
}
