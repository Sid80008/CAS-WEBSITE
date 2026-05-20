// app/admin/notices/page.tsx
import prisma from '@/lib/prisma';
import { createNotice } from '@/app/actions/noticeActions';

export const dynamic = 'force-dynamic';

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: [
      { isPinned: 'desc' },
      { publishedAt: 'desc' },
    ],
    include: { postedBy: true },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Create Form */}
      <div className="lg:col-span-1 bg-white p-6 rounded shadow h-fit text-black">
        <h2 className="text-xl font-bold mb-4">Post New Notice</h2>
        <form action={createNotice} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title (English) *</label>
            <input type="text" name="titleEn" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title (Hindi - Optional)</label>
            <input type="text" name="titleHi" className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content (English) *</label>
            <textarea name="contentEn" required rows={4} className="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Role</label>
              <select name="targetRole" className="mt-1 block w-full border border-gray-300 rounded p-2 text-sm">
                <option value="ALL">All Portals</option>
                <option value="PARENT">Parents Only</option>
                <option value="TEACHER">Teachers Only</option>
                <option value="STUDENT">Students Only</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <label className="flex items-center">
              <input type="checkbox" name="isPublic" value="true" className="mr-2" />
              <span className="text-sm text-gray-700">Show on Public Website</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="isPinned" value="true" className="mr-2" />
              <span className="text-sm text-gray-700">Pin to Top</span>
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold transition">
            Publish Notice
          </button>
        </form>
      </div>

      {/* Right Column: Notice List */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold mb-4">Notice History</h2>
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title & Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black">
              {notices.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">No notices posted yet.</td></tr>
              ) : (
                notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {notice.isPinned && <span className="text-amber-500 text-lg">📌</span>}
                        <p className="text-sm font-bold text-gray-900">{notice.titleEn}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Target: {notice.targetRole}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {notice.isPublic ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">Public Site</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">Portals Only</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(notice.publishedAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                      })}
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
