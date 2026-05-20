// app/parent/page.tsx
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ParentDashboard() {
  const session = await auth();

  // Ensure the user is logged in and has the PARENT role
  if (!session || (session.user as any).role !== "PARENT") {
    return <div className="text-center p-10 text-red-600 font-bold">Unauthorized access.</div>;
  }

  // Fetch all students linked to this parent's phone number
  const children = await prisma.student.findMany({
    where: {
      parentPhone: (session.user as any).phone,
    },
    include: {
      class: true,
      feeRecords: { where: { status: { in: ['PENDING', 'OVERDUE', 'PARTIAL'] } } },
      attendances: true,
    },
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-800 mb-6">My Children</h1>
      {children.length === 0 ? (
        <p className="text-gray-600">No children linked to this account.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {children.map((child) => {
            // Calculate quick stats for the dashboard card
            const pendingDues = child.feeRecords.reduce((sum, fee) => sum + (fee.amountDue - fee.amountPaid), 0);
            const totalDays = child.attendances.length;
            const presentDays = child.attendances.filter((a) => a.status === 'PRESENT' || a.status === 'LATE').length;
            const attendancePct = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

            return (
              <div key={child.id} className="bg-white rounded shadow-md overflow-hidden border-t-4 border-teal-600 flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">
                        {child.firstName} {child.lastName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Class: {child.class?.name || "N/A"}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${child.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}> 
                      {child.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-50 p-3 rounded border">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Attendance</p>
                      <p className={`text-lg font-bold ${attendancePct < 75 ? 'text-red-600' : 'text-green-600'}`}> 
                        {totalDays > 0 ? `${attendancePct}%` : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded border">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pending Fees</p>
                      <p className={`text-lg font-bold ${pendingDues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ₹{pendingDues}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="bg-slate-100 p-4 border-t flex justify-between">
                  <button className="text-teal-700 font-bold text-sm hover:underline">View Report Card</button>
                  {pendingDues > 0 ? (
                    <button className="bg-teal-600 text-white px-4 py-1 rounded shadow hover:bg-teal-700 text-sm font-bold transition">
                      Pay Fees
                    </button>
                  ) : (
                    <span className="text-green-600 font-bold text-sm">All Dues Cleared ✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
