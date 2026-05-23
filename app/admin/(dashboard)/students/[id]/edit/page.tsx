import prisma from "@/lib/prisma";
import { updateStudent } from "@/app/actions/studentActions";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStudentPage({ params }: PageProps) {
  const resolvedParams = await params;
  const student = await prisma.student.findUnique({
    where: { id: resolvedParams.id },
    include: {
      enrollments: {
        where: { yearId: 'ay-2026-27' }
      }
    }
  });

  if (!student) {
    notFound();
  }

  const sections = await prisma.section.findMany({
    include: { class: true }
  });

  const sortedSections = sections.sort((a, b) => {
    const classCompare = a.class.name.localeCompare(b.class.name);
    if (classCompare !== 0) return classCompare;
    return a.name.localeCompare(b.name);
  });

  const updateStudentAction = updateStudent.bind(null, student.id);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded border border-[#E2E0DB] shadow-sm text-[#1c1b1b]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#00386b]">Edit Student Profile</h1>
        <Link href={`/admin/students/${student.id}`} className="text-gray-500 hover:text-gray-700 font-medium">Cancel</Link>
      </div>

      <form action={updateStudentAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-[4px]">
            <label className="text-sm font-medium text-[#424750]">Admission No</label>
            <input
              type="text"
              name="admissionNo"
              required
              defaultValue={student.admissionNo}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] outline-none"
            />
          </div>
          <div className="space-y-[4px]">
            <label className="text-sm font-medium text-[#424750]">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              defaultValue={student.firstName}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] outline-none"
            />
          </div>
          <div className="space-y-[4px]">
            <label className="text-sm font-medium text-[#424750]">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              defaultValue={student.lastName}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-[4px]">
            <label className="text-sm font-medium text-[#424750]">Date of Birth</label>
            <input
              type="date"
              name="dob"
              required
              defaultValue={student.dob.toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] outline-none bg-white"
            />
          </div>
          <div className="space-y-[4px]">
            <label className="text-sm font-medium text-[#424750]">Gender</label>
            <select
              name="gender"
              required
              defaultValue={student.gender}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] outline-none bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-[4px]">
            <label className="text-sm font-medium text-[#424750]">Parent Name</label>
            <input
              type="text"
              name="parentName"
              required
              defaultValue={student.parentName || ""}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] outline-none"
            />
          </div>
          <div className="space-y-[4px]">
            <label className="text-sm font-medium text-[#424750]">Parent Phone</label>
            <input
              type="tel"
              name="parentPhone"
              required
              defaultValue={student.parentPhone || ""}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-[4px]">
            <label className="text-sm font-medium text-[#424750]">Class & Section</label>
            <select
              name="sectionId"
              required
              defaultValue={student.enrollments?.[0]?.sectionId || ""}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] outline-none bg-white"
            >
              <option value="">Select Class & Section...</option>
              {sortedSections.map((sec) => (
                <option key={sec.id} value={sec.id}>{sec.class.name} - {sec.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-[4px]">
            <label className="text-sm font-medium text-[#424750]">Enrollment Status</label>
            <select
              name="status"
              required
              defaultValue={student.status}
              className="w-full px-4 py-3 rounded-lg border border-[#E2E0DB] focus:ring-2 focus:ring-[#00386b] outline-none bg-white"
            >
              <option value="ACTIVE">Active</option>
              <option value="TC_ISSUED">TC Issued</option>
              <option value="DETAINED">Detained</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#00386b] hover:bg-[#002246] text-white py-4 rounded-lg font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">save</span>
            Save Student Changes
          </button>
        </div>
      </form>
    </div>
  );
}
