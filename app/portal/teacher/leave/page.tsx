import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { submitLeaveRequest } from "@/app/actions/leaveActions";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function TeacherLeavePage() {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return <div className="p-8 text-center text-red-600">Please log in to view this page.</div>;
  }

  // Get teacher profile
  const teacher = await prisma.staff.findUnique({
    where: { userId }
  });

  if (!teacher) {
    return <div className="p-8 text-center text-red-600">Teacher profile not found.</div>;
  }

  // Fetch past leave requests for this teacher
  const leaveRequests = await prisma.leaveRequest.findMany({
    where: { staffId: teacher.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8 max-w-[1280px] mx-auto w-full text-[#1c1b1b]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-[32px] font-bold text-[#00386b] tracking-tight">Leave Requests</h1>
          <p className="text-[16px] text-[#555555]">Submit a new leave request or track the status of your past requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Submit Leave Request Form */}
        <div className="lg:col-span-5 bg-white border border-[#E2E0DB] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 text-[#00386b]">
            <span className="material-symbols-outlined text-[28px]">event_busy</span>
            <h2 className="text-xl font-bold">New Leave Request</h2>
          </div>

          <form action={submitLeaveRequest} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-[4px]">
                <label className="text-sm font-medium text-[#424750]">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] bg-white outline-none"
                />
              </div>
              <div className="space-y-[4px]">
                <label className="text-sm font-medium text-[#424750]">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] bg-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-[4px]">
              <label className="text-sm font-medium text-[#424750]">Reason for Leave</label>
              <textarea
                name="reason"
                required
                rows={4}
                placeholder="Briefly describe the reason for your leave request..."
                className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] bg-white outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#00386b] hover:bg-[#002246] text-white rounded-lg font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">send</span>
              Submit Request
            </button>
          </form>
        </div>

        {/* Past Leave Requests History */}
        <div className="lg:col-span-7 bg-white border border-[#E2E0DB] rounded-xl overflow-hidden shadow-sm">
          <div className="bg-[#f6f3f2] px-6 py-4 border-b border-[#E2E0DB]">
            <h3 className="text-lg font-bold text-[#00386b]">Request History</h3>
            <p className="text-xs text-[#555555]">Track status of submitted leave requests</p>
          </div>

          <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcf9f8] border-b border-[#E2E0DB] text-[11px] font-semibold tracking-wider text-[#424750] uppercase">
                  <th className="px-6 py-3">Duration</th>
                  <th className="px-6 py-3">Reason</th>
                  <th className="px-6 py-3">Submitted On</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E0DB]">
                {leaveRequests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-[#555555] italic">No leave requests found.</td>
                  </tr>
                ) : (
                  leaveRequests.map(req => {
                    const diffTime = Math.abs(req.endDate.getTime() - req.startDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                    return (
                      <tr key={req.id} className="hover:bg-[#fcf9f8] transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-sm text-[#1c1b1b]">
                            {req.startDate.toLocaleDateString()} - {req.endDate.toLocaleDateString()}
                          </div>
                          <div className="text-xs text-[#555555]">{diffDays} {diffDays === 1 ? 'day' : 'days'}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#424750] max-w-[200px] truncate" title={req.reason}>
                          {req.reason}
                        </td>
                        <td className="px-6 py-4 text-xs text-[#555555]">
                          {req.createdAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            req.status === 'APPROVED' ? 'bg-[#E1F5EE] text-[#085041]' :
                            req.status === 'REJECTED' ? 'bg-[#FAEEDA] text-[#633806]' : 'bg-[#F0F6FC] text-[#1B4F8A]'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
