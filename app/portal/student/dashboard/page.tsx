import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function StudentDashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/portal/login")

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      enrollments: {
        include: {
          year: true,
          section: true
        }
      }
    }
  })

  if (!student) return <div>No profile found</div>

  const enrollment = student.enrollments[0]

  // Calculate Attendance
  const attendances = enrollment ? await prisma.attendance.findMany({
    where: { studentId: student.id, yearId: enrollment.yearId }
  }) : []
  const totalDays = attendances.length || 1 // Avoid div by zero
  const presentDays = attendances.filter(a => a.status === 'PRESENT').length
  const attendancePercentage = Math.round((presentDays / totalDays) * 100) || 0

  // Calculate GPA roughly based on ExamResults
  const examResults = await prisma.examResult.findMany({
    where: { studentId: student.id }
  })
  
  let gpaText = "N/A"
  let gpaValue = 0
  if (examResults.length > 0) {
    const totalMarks = examResults.reduce((acc, curr) => acc + curr.marksObtained, 0)
    const maxMarks = examResults.reduce((acc, curr) => acc + curr.maxMarks, 0)
    gpaValue = (totalMarks / maxMarks) * 10 // scale to 10
    gpaText = gpaValue.toFixed(1) + " / 10"
  }

  // Pending Homework
  const pendingHomework = await prisma.homeworkSubmission.findMany({
    where: { studentId: student.id, status: 'PENDING' },
    include: { homework: true }
  })

  // Fetch Latest Notice
  const latestNotice = await prisma.notice.findFirst({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  })

  // Fetch Upcoming Exams for this student's class
  const upcomingExams = await prisma.exam.findMany({
    where: { 
      startDate: { gte: new Date() },
      classId: enrollment?.section.classId
    },
    orderBy: { startDate: 'asc' },
    take: 3
  })

  return (
    <div className="max-w-[1280px] mx-auto p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-h1 text-3xl font-bold text-[#00386b]">Good Morning, {student.firstName}!</h1>
        <p className="text-[#424750] mt-1">Here is what&apos;s happening today in Central Academy.</p>
      </div>

      {/* Top Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Attendance */}
        <div className="bg-[#ffffff] p-6 rounded-xl border border-[#E2E0DB] shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-[#E1F5EE] text-[#085041] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">event_available</span>
            </div>
          </div>
          <p className="font-label text-sm text-[#424750]">Overall Attendance</p>
          <h3 className="font-h2 text-2xl font-bold text-[#00386b]">{attendancePercentage}%</h3>
          <div className="w-full bg-[#eae7e7] h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#085041] h-full rounded-full" style={{ width: `${attendancePercentage}%`, transition: 'width 1s ease' }}></div>
          </div>
        </div>

        {/* GPA */}
        <div className="bg-[#ffffff] p-6 rounded-xl border border-[#E2E0DB] shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-[#d4e3ff] text-[#00386b] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">grade</span>
            </div>
          </div>
          <p className="font-label text-sm text-[#424750]">Current GPA</p>
          <h3 className="font-h2 text-2xl font-bold text-[#00386b]">{gpaText}</h3>
          <div className="mt-4 flex gap-1">
            <div className={`h-1 flex-grow rounded-full ${gpaValue >= 2 ? 'bg-[#00386b]' : 'bg-[#eae7e7]'}`}></div>
            <div className={`h-1 flex-grow rounded-full ${gpaValue >= 4 ? 'bg-[#00386b]' : 'bg-[#eae7e7]'}`}></div>
            <div className={`h-1 flex-grow rounded-full ${gpaValue >= 6 ? 'bg-[#00386b]' : 'bg-[#eae7e7]'}`}></div>
            <div className={`h-1 flex-grow rounded-full ${gpaValue >= 8 ? 'bg-[#00386b]' : 'bg-[#eae7e7]'}`}></div>
            <div className={`h-1 flex-grow rounded-full ${gpaValue >= 9.5 ? 'bg-[#00386b]' : 'bg-[#eae7e7]'}`}></div>
          </div>
        </div>

        {/* Pending Homework */}
        <div className="bg-[#ffffff] p-6 rounded-xl border border-[#E2E0DB] shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-[#FAEEDA] text-[#633806] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">pending_actions</span>
            </div>
            {pendingHomework.length > 0 && <span className="font-label text-[#993C1D] font-bold text-sm bg-[#993C1D]/10 px-2 py-1 rounded">Due soon</span>}
          </div>
          <p className="font-label text-sm text-[#424750]">Pending Homework</p>
          <h3 className="font-h2 text-2xl font-bold text-[#00386b]">
            {pendingHomework.length < 10 ? `0${pendingHomework.length}` : pendingHomework.length}
          </h3>
          <div className="mt-4">
            {pendingHomework.length > 0 ? (
              <span className="font-caption text-xs font-bold text-[#424750] uppercase tracking-wider">
                Next: {pendingHomework[0].homework.title}
              </span>
            ) : (
              <span className="font-caption text-xs font-bold text-[#424750] uppercase tracking-wider">
                All caught up!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bento Content Layout */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Notice Banner */}
          {latestNotice ? (
            <section className="relative h-64 rounded-xl overflow-hidden group shadow-lg">
              {latestNotice.imageUrl ? (
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${latestNotice.imageUrl})` }}></div>
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00386b] to-[#00386b]/80"></div>
              <div className="absolute inset-0 flex flex-col justify-center p-12 text-white relative z-10">
                <span className="inline-block px-3 py-1 bg-[#fdad4e] text-[#633806] font-bold text-xs rounded-full w-fit mb-4">NOTICE OF THE DAY</span>
                <h2 className="font-h2 text-2xl font-bold mb-2 max-w-md line-clamp-2">{latestNotice.titleEn}</h2>
                <p className="text-[#F0F6FC]/80 max-w-sm font-body mb-6 line-clamp-2">{latestNotice.contentEn}</p>
              </div>
            </section>
          ) : (
            <section className="relative h-64 rounded-xl overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00386b] to-[#00386b]/60"></div>
              <div className="absolute inset-0 flex flex-col justify-center p-12 text-white relative z-10">
                <span className="inline-block px-3 py-1 bg-[#fdad4e] text-[#633806] font-bold text-xs rounded-full w-fit mb-4">NOTICES</span>
                <h2 className="font-h2 text-2xl font-bold mb-2 max-w-md">No Recent Notices</h2>
                <p className="text-[#F0F6FC]/80 max-w-sm font-body mb-6">Check back later for school announcements.</p>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <section className="bg-[#ffffff] p-6 rounded-xl border border-[#E2E0DB] shadow-sm">
            <h3 className="font-h3 text-xl text-[#00386b] font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">assignment</span>Upcoming Tests
            </h3>
            <div className="space-y-4">
              {upcomingExams.length > 0 ? (
                upcomingExams.map(exam => (
                  <div key={exam.id} className="p-4 rounded-lg bg-[#F0F6FC] border border-[#E6F1FB] hover:shadow-sm transition-all">
                    <h4 className="font-bold text-[#00386b]">{exam.title}</h4>
                    <p className="text-xs text-[#424750] mt-1">Starts: {exam.startDate?.toLocaleDateString() || "TBD"}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-[#424750] text-sm bg-[#f6f3f2] rounded-lg">
                  No upcoming tests scheduled for this week.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
