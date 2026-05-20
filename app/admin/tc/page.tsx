// app/admin/tc/page.tsx
import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TcDashboardPage() {
  const tcRecords = await prisma.tcRecord.findMany({
    include: {
      student: true,
      issuedBy: true,
    },
    orderBy: { issuedAt: 'desc' },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transfer Certificates (TC)</h1>
        <Link
          href="/admin/tc/new"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition font-bold"
        >
          + Issue New TC
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">TC Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class at Leaving</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date of Leaving</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-black">
            {tcRecords.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No TCs issued yet.
                </td>
              </tr>
            ) : (
              tcRecords.map((tc) => (
                <tr key={tc.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {tc.tcNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {tc.student.name}<br />
                    <span className="text-xs text-gray-500">Adm: {tc.student.admissionNo}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {tc.classAtLeaving}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(tc.dateOfLeaving).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900 font-medium">
                      Print PDF
                    </button>
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
