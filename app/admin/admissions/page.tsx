// app/admin/admissions/page.tsx
import prisma from '@/lib/prisma';
import { updateEnquiryStatus } from '@/app/actions/admissionActions';

export const dynamic = 'force-dynamic';

export default async function AdminAdmissionsPage() {
  const enquiries = await prisma.admissionEnquiry.findMany({
    orderBy: { submittedAt: 'desc' }
  });

  const statusColors: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-800',
    CONTACTED: 'bg-yellow-100 text-yellow-800',
    SCHEDULED: 'bg-purple-100 text-purple-800',
    ADMITTED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admission Enquiries</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Update</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-black">
            {enquiries.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">No enquiries found.</td></tr>
            ) : (
              enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(enq.submittedAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {enq.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {enq.classAppliedFor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {enq.parentName} <br/>
                    <span className="text-xs text-blue-600">{enq.parentPhone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[enq.status]}`}>{enq.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <form action={updateEnquiryStatus} className="flex gap-2">
                      <input type="hidden" name="id" value={enq.id} />
                      <select name="status" defaultValue={enq.status} className="border border-gray-300 rounded p-1 text-sm">
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="ADMITTED">Admitted</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                      <button type="submit" className="bg-slate-800 text-white px-2 py-1 rounded hover:bg-slate-700 text-xs">Save</button>
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
