import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteStudent } from "@/app/actions/studentActions";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const student = await prisma.student.findUnique({
    where: { id: resolvedParams.id },
    include: {
      enrollments: {
        include: {
          section: {
            include: {
              class: true
            }
          }
        }
      },
      attendance: true,
      fees: {
        include: {
          feeStructure: true
        }
      }
    }
  });

  if (!student) {
    notFound();
  }

  // Calculate attendance percentages
  const totalDays = student.attendance.length;
  const presentDays = student.attendance.filter(a => a.status === 'PRESENT').length;
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

  // Calculate fee status
  const totalFees = student.fees.reduce((sum, f) => sum + f.feeStructure.amount, 0);
  const paidFees = student.fees.filter(f => f.status === 'PAID').reduce((sum, f) => sum + f.feeStructure.amount, 0);
  const unpaidFees = totalFees - paidFees;

  const deleteAction = deleteStudent.bind(null, student.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[#1c1b1b]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link href="/admin/students" className="text-sm font-semibold text-[#00386b] hover:underline flex items-center gap-1 mb-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Students List
          </Link>
          <h1 className="text-3xl font-bold text-[#00386b]">
            {student.firstName} {student.lastName}
          </h1>
          <p className="text-sm text-[#555555]">Admission No: {student.admissionNo}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/students/${student.id}/edit`}
            className="px-5 py-3 border border-[#E2E0DB] text-[#00386b] hover:bg-[#E6F1FB] font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            Edit Student
          </Link>
          <form action={deleteAction} onSubmit={(e) => {
            if (!confirm("Are you absolutely sure you want to delete this student profile? This cannot be undone.")) {
              e.preventDefault();
            }
          }}>
            <button
              type="submit"
              className="px-5 py-3 bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">delete</span>
              Delete Student
            </button>
          </form>
        </div>
      </div>

      {/* Details Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-2 bg-white border border-[#E2E0DB] rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#00386b] border-b border-[#E2E0DB] pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined">person</span>
            Personal Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-[#555555] font-semibold uppercase">Date of Birth</p>
              <p className="font-bold text-sm">{student.dob.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-[#555555] font-semibold uppercase">Gender</p>
              <p className="font-bold text-sm">{student.gender}</p>
            </div>
            <div>
              <p className="text-xs text-[#555555] font-semibold uppercase">Class & Section</p>
              <p className="font-bold text-sm">
                {student.enrollments && student.enrollments.length > 0
                  ? `${student.enrollments[0].section.class.name} - ${student.enrollments[0].section.name}`
                  : "Not enrolled"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#555555] font-semibold uppercase">Status</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${
                student.status === 'ACTIVE' ? 'bg-[#E1F5EE] text-[#085041]' :
                student.status === 'TC_ISSUED' ? 'bg-[#FAEEDA] text-[#633806]' : 'bg-[#f6f3f2] text-[#424750]'
              }`}>
                {student.status}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white border border-[#E2E0DB] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#00386b] border-b border-[#E2E0DB] pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined">analytics</span>
              Status Overview
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#555555] font-semibold uppercase">Attendance Rate</p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-3xl font-bold text-[#085041]">{attendanceRate}%</span>
                  <span className="text-xs text-[#555555]">{presentDays} / {totalDays} days</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#555555] font-semibold uppercase">Pending Fees</p>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-3xl font-bold text-[#ba1a1a]">₹{unpaidFees}</span>
                  <span className="text-xs text-[#555555]">Total: ₹{totalFees}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Details Card */}
        <div className="md:col-span-3 bg-white border border-[#E2E0DB] rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#00386b] border-b border-[#E2E0DB] pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined">family_restroom</span>
            Parent & Guardian Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-[#555555] font-semibold uppercase">Parent/Guardian Name</p>
              <p className="font-bold text-sm">{student.parentName || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[#555555] font-semibold uppercase">Parent Phone Number</p>
              <p className="font-bold text-sm">{student.parentPhone || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[#555555] font-semibold uppercase">Residential Address</p>
              <p className="font-bold text-sm">{student.address || "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
