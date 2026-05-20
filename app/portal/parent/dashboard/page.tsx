import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function ParentDashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      students: {
        include: {
          student: true
        }
      }
    }
  })

  if (!parent || parent.students.length === 0) return <div>No linked students found.</div>

  const student = parent.students[0].student

  // Fetch Teacher Remarks
  const remarks = await prisma.teacherRemark.findMany({
    where: { studentId: student.id },
    include: { staff: true },
    orderBy: { date: 'desc' },
    take: 3
  })

  // Fetch Attendance
  const attendances = await prisma.attendance.findMany({
    where: { studentId: student.id }
  })
  const totalDays = attendances.length || 1
  const presentDays = attendances.filter(a => a.status === 'PRESENT').length
  const attendancePercentage = Math.round((presentDays / totalDays) * 100) || 0

  // Fetch Fee Records
  const pendingFees = await prisma.feeRecord.findMany({
    where: { studentId: student.id, status: 'PENDING' },
    include: { structure: true }
  })
  const totalPendingFee = pendingFees.reduce((sum, record) => sum + record.structure.amount, 0)

  return (
    <div className="max-w-[1280px] mx-auto p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-h1 text-3xl font-bold text-[#0C447C]">Welcome, {parent.name}</h1>
        <p className="text-[#424750] mt-1">Here is a quick overview of {student.firstName}'s progress.</p>
      </div>

      {/* Top Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Attendance */}
        <div className="bg-[#ffffff] p-6 rounded-xl border border-[#E2E0DB] shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-[#E1F5EE] text-[#085041] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">event_available</span>
            </div>
            {attendancePercentage < 75 && (
              <span className="font-label text-[#993C1D] font-bold text-sm bg-[#993C1D]/10 px-2 py-1 rounded">Attention Needed</span>
            )}
          </div>
          <p className="font-label text-sm text-[#424750]">{student.firstName}'s Attendance</p>
          <h3 className="font-h2 text-2xl font-bold text-[#0C447C]">{attendancePercentage}%</h3>
          <div className="w-full bg-[#eae7e7] h-2 rounded-full mt-4 overflow-hidden">
            <div className={`h-full rounded-full ${attendancePercentage >= 75 ? 'bg-[#085041]' : 'bg-[#ba1a1a]'}`} style={{ width: `${attendancePercentage}%`, transition: 'width 1s ease' }}></div>
          </div>
        </div>

        {/* Fees */}
        <div className="bg-[#ffffff] p-6 rounded-xl border border-[#E2E0DB] shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-[#FAEEDA] text-[#633806] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">payments</span>
            </div>
          </div>
          <p className="font-label text-sm text-[#424750]">Pending Fees</p>
          <h3 className="font-h2 text-2xl font-bold text-[#0C447C]">₹{totalPendingFee.toLocaleString()}</h3>
          <div className="mt-4">
            <span className="font-caption text-xs font-bold text-[#424750] uppercase tracking-wider">
              {pendingFees.length} Dues Remaining
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <section className="bg-[#ffffff] p-6 rounded-xl border border-[#E2E0DB] shadow-sm">
            <h3 className="font-h3 text-xl font-bold text-[#0C447C] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">forum</span>Teacher Remarks
            </h3>
            <div className="space-y-4">
              {remarks.map(remark => (
                <div key={remark.id} className="p-4 rounded-lg bg-[#F0F6FC] border border-[#E6F1FB] hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-[#0C447C]">{remark.staff.name}</span>
                    <span className="text-xs text-[#424750]">{new Date(remark.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-[#424750]">{remark.content}</p>
                </div>
              ))}
              {remarks.length === 0 && (
                <div className="text-center py-6 text-[#424750]">No remarks recorded yet.</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
