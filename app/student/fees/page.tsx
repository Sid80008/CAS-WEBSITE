// app/student/fees/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function StudentFeesPage() {
  const session = await getServerSession(authOptions);
  
  const student = await prisma.student.findUnique({
    where: { userId: (session?.user as any).id },
  });

  if (!student) return <div>Student profile not found.</div>;

  const feeRecords = await prisma.feeRecord.findMany({
    where: { studentId: student.id },
    include: { feeStructure: true },
    orderBy: { dueDate: 'asc' }
  });

  const pendingFees = feeRecords.filter(f => f.status === 'PENDING' || f.status === 'PARTIAL' || f.status === 'OVERDUE');
  const paidFees = feeRecords.filter(f => f.status === 'PAID');

  const totalDue = pendingFees.reduce((sum, record) => sum + (record.amountDue - record.amountPaid), 0);

  return (
    <div className="text-black space-y-8">
      <h2 className="text-2xl font-bold">Fee Management</h2>

      {/* Summary Card */}
      <div className="bg-white p-6 rounded shadow-md border-l-4 border-red-600 flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Outstanding Dues</p>
          <p className="text-3xl font-bold text-red-600">₹{totalDue}</p>
        </div>
        {totalDue > 0 && (
          <button className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 font-bold transition">
            Pay Online (Razorpay)
          </button>
        )}
      </div>

      {/* Pending Fees Table */}
      <div className="bg-white rounded shadow-md overflow-hidden">
        <div className="bg-slate-800 text-white p-4">
          <h3 className="font-bold text-lg">Pending & Overdue</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount Due</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingFees.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No pending dues. Great job!</td></tr>
            ) : (
              pendingFees.map(fee => (
                <tr key={fee.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{fee.feeStructure.feeType}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(fee.dueDate).toLocaleDateString('en-IN')}</td>
                  <td className="px-6 py-4 font-bold text-red-600">₹{fee.amountDue - fee.amountPaid}</td>
                  <td className="px-6 py-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                      {fee.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded shadow-md overflow-hidden mt-8">
        <div className="bg-slate-100 text-slate-800 p-4 border-b">
          <h3 className="font-bold text-lg">Payment History</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mode</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paidFees.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No payment history found.</td></tr>
            ) : (
              paidFees.map(fee => (
                <tr key={fee.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{fee.feeStructure.feeType}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {fee.paidDate ? new Date(fee.paidDate).toLocaleDateString('en-IN') : '-'}
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">₹{fee.amountPaid}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{fee.paymentMode || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
