// app/admin/students/new/page.tsx
import prisma from '@/lib/prisma';
import { createStudent } from '@/app/actions/studentActions';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NewStudentPage() {
  // Fetch dropdown data directly from the DB
  const sections = await prisma.section.findMany({
    include: { class: true }
  });

  // Sort sections by Class Name, then Section Name
  const sortedSections = sections.sort((a, b) => {
    const classCompare = a.class.name.localeCompare(b.class.name);
    if (classCompare !== 0) return classCompare;
    return a.name.localeCompare(b.name);
  });

  const years = await prisma.academicYear.findMany({
    orderBy: { startDate: 'desc' }
  });

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Student</h1>
        <Link href="/admin/students" className="text-gray-500 hover:text-gray-700">Cancel</Link>
      </div>

      <form action={createStudent} className="space-y-4 text-black">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Admission No</label>
            <input type="text" name="admissionNo" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" name="firstName" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" name="lastName" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" name="dob" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select name="gender" required className="mt-1 block w-full border border-gray-300 rounded p-2">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Name</label>
            <input type="text" name="parentName" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Phone</label>
            <input type="tel" name="parentPhone" required className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Class & Section</label>
            <select name="sectionId" required className="mt-1 block w-full border border-gray-300 rounded p-2">
              <option value="">Select Class & Section...</option>
              {sortedSections.map((sec) => (
                <option key={sec.id} value={sec.id}>{sec.class.name} - {sec.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Academic Year</label>
            <select name="yearId" required className="mt-1 block w-full border border-gray-300 rounded p-2">
              <option value="">Select Academic Year...</option>
              {years.map((year) => (
                <option key={year.id} value={year.id}>{year.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 font-bold transition">
            Save Student Record
          </button>
        </div>
      </form>
    </div>
  );
}
