// app/office/page.tsx
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function OfficeDashboard() {
  const session = await auth();

  // Fetch the staff record for the logged‑in office user
  const staff = await prisma.staff.findUnique({
    where: { userId: (session?.user as any).id },
  });

  // Quick stats for the office portal
  const pendingEnquiries = await prisma.admissionEnquiry.count({
    where: { status: "NEW" },
  });

  const todaysFees = await prisma.feeRecord.aggregate({
    where: {
      paidDate: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
    _sum: { amountPaid: true },
  });

  return (
    <div className="text-black space-y-8">
      <div className="bg-white p-6 rounded shadow-md border-t-4 border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Welcome, {staff?.name || "Office Staff"}</h2>
          <p className="text-gray-600 mt-1">Front Office Dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Admissions */}
        <div className="bg-white p-6 rounded shadow-md border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">📝 Admissions</h3>
            {pendingEnquiries > 0 && (
              <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                {pendingEnquiries} New Enquiries
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Manage incoming student applications, schedule interviews, and update enrollment statuses.
          </p>
          <Link
            href="/admin/admissions"
            className="block text-center bg-slate-800 text-white font-bold py-2 rounded hover:bg-slate-700 transition"
          >
            Open Admissions Module
          </Link>
        </div>

        {/* Fee Collection */}
        <div className="bg-white p-6 rounded shadow-md border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">💰 Fee Desk</h3>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
              ₹{todaysFees._sum.amountPaid || 0} Collected Today
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Collect offline fees (cash/cheque), clear dues, and generate payment receipts for parents.
          </p>
          <Link
            href="/admin/fees"
            className="block text-center bg-slate-800 text-white font-bold py-2 rounded hover:bg-slate-700 transition"
          >
            Open Fee Collection
          </Link>
        </div>

        {/* Certificates & TCs */}
        <div className="bg-white p-6 rounded shadow-md border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📄 Certificates & TCs</h3>
          <p className="text-sm text-gray-600 mb-6">
            Issue Transfer Certificates, bonafide certificates, and manage departing student records.
          </p>
          <Link
            href="/admin/tc"
            className="block text-center bg-slate-800 text-white font-bold py-2 rounded hover:bg-slate-700 transition"
          >
            Manage Certificates
          </Link>
        </div>

        {/* Student Search */}
        <div className="bg-white p-6 rounded shadow-md border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 Student Database</h3>
          <p className="text-sm text-gray-600 mb-6">
            Quick lookup of student profiles, contact info, class assignment, or admission numbers.
          </p>
          <Link
            href="/admin/students"
            className="block text-center bg-slate-800 text-white font-bold py-2 rounded hover:bg-slate-700 transition"
          >
            Search Students
          </Link>
        </div>
      </div>
    </div>
  );
}
