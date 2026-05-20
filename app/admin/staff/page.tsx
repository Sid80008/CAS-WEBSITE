// app/admin/staff/page.tsx
import prisma from '@/lib/prisma';
import { createStaff } from '@/app/actions/staffActions';

export const dynamic = 'force-dynamic';

export default async function StaffPage() {
  const staffMembers = await prisma.staff.findMany({
    include: { user: true },
    orderBy: { displayOrder: 'asc' },
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Left Column: Create Staff Form */}
      <div className="xl:col-span-1 bg-white p-6 rounded shadow h-fit text-black">
        <h2 className="text-xl font-bold mb-4">Add Staff Member</h2>
        <form action={createStaff} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <input type="text" name="name" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Emp Code *</label>
              <input type="text" name="empCode" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Joining *</label>
              <input type="date" name="dateOfJoining" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation *</label>
            <input type="text" name="designation" placeholder="e.g. Senior PGT, Office Clerk" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>

          <hr className="my-4" />
          <p className="text-sm font-bold text-gray-500 mb-2">Portal Access</p>

          <div>
            <label className="block text-sm font-medium text-gray-700">System Role *</label>
            <select name="role" required className="mt-1 block w-full border border-gray-300 rounded p-2">
              <option value="TEACHER">Teacher</option>
              <option value="OFFICE">Office Staff</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" name="phone" className="mt-1 block w-full border border-gray-300 rounded p-2" />
            </div>
          </div>

          <div className="flex items-center pt-2">
            <input type="checkbox" name="isPublic" value="true" className="mr-2" defaultChecked />
            <span className="text-sm text-gray-700">Show on Public \"CAS Team\" Page</span>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 font-bold transition mt-4">
            Create Profile &amp; Login
          </button>
        </form>
      </div>

      {/* Right Column: Existing Staff List */}
      <div className="xl:col-span-2">
        <h2 className="text-xl font-bold mb-4">Staff Directory</h2>
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact / Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portal Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Public Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black">
              {staffMembers.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No staff members found.</td></tr>
              ) : (
                staffMembers.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-gray-900">{staff.name}</p>
                      <p className="text-xs text-gray-500">{staff.designation} · {staff.empCode}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {staff.user?.email || '-'}<br/>{staff.user?.phone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        staff.user?.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                        staff.user?.role === 'TEACHER' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>\n                        {staff.user?.role || 'NO ACCESS'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {staff.isPublic ? (
                        <span className="text-green-600 text-sm font-medium">Visible</span>
                      ) : (
                        <span className="text-gray-400 text-sm font-medium">Hidden</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

