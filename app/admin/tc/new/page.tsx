// app/admin/tc/new/page.tsx
import prisma from '@/lib/prisma';
import { issueTC } from '@/app/actions/tcActions';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NewTcPage() {
  // Fetch active students (status ACTIVE)
  const activeStudents = await prisma.student.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Issue Transfer Certificate</h1>
        <Link href="/admin/tc" className="text-gray-500 hover:text-gray-700">Cancel</Link>
      </div>

      <form action={issueTC} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select Active Student *</label>
          <select name="studentId" required className="mt-1 block w-full border border-gray-300 rounded p-2">
            <option value="">Search student...</option>
            {activeStudents.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} (Adm: {student.admissionNo})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Leaving *</label>
            <input type="date" name="dateOfLeaving" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Conduct / Behavior Grade *</label>
            <select name="conductGrade" required className="mt-1 block w-full border border-gray-300 rounded p-2">
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Satisfactory">Satisfactory</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reason for Leaving *</label>
          <input
            type="text"
            name="reasonForLeaving"
            required
            placeholder="e.g., Parent transferred to another city"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 font-bold transition"
          >
            Generate TC &amp; Terminate Active Status
          </button>
        </div>
      </form>
    </div>
  );
}
