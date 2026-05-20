// app/admin/fees/page.tsx
import prisma from '@/lib/prisma';
import { markFeeAsPaid } from '@/app/actions/feeActions';

export const dynamic = 'force-dynamic';

export default async function FeesPage() {
  // Fetch only pending fee records
  const pendingFees = await prisma.feeRecord.findMany({
    where: { status: 'PENDING' },
    include: {
      student: true,
      feeStructure: true,
    },
    orderBy: { dueDate: 'asc' },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Fee Management (Pending Dues)</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Due</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-black">
            {pendingFees.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No pending fees found.
                </td>
              </tr>
            ) : (
              pendingFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {fee.student.name} <br />
                    <span className="text-xs text-gray-500">Adm No: {fee.student.admissionNo}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {fee.feeStructure.feeType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                    ₹{fee.amountDue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(fee.dueDate).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <form action={markFeeAsPaid.bind(null, fee.id)}>
                      <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700 transition">
                        Mark Paid (Cash)
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
