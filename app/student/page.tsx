// app/student/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);
  
  // Fetch the student profile linked to this login
  const student = await prisma.student.findUnique({
    where: { userId: (session?.user as any).id },
    include: {
      // Assuming relations exist for class and session; adjust as needed
      // class: true,
      // session: true,
    }
  });

  if (!student) {
    return <div className="text-red-500 font-bold p-4">Error: No student profile linked to this account.</div>;
  }

  // Fetch notices targeted to students or all
  const notices = await prisma.notice.findMany({
    where: {
      OR: [{ targetRole: 'STUDENT' }, { targetRole: 'ALL' }]
    },
    orderBy: { publishedAt: 'desc' },
    take: 5
  });

  return (
    <div className="text-black space-y-6">
      <div className="bg-white p-6 rounded shadow-md border-t-4 border-blue-600">
        <h2 className="text-2xl font-bold">Welcome, {student.firstName} {student.lastName}</h2>
        <p className="text-gray-600 mt-1">
          {/* Placeholder for class info */}
          Student ID: {student.id}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Quick Stats */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="font-bold text-lg mb-4 text-slate-800">Quick Stats</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded border border-green-100">
                <p className="text-sm text-green-800 font-medium">Attendance</p>
                <p className="text-xl font-bold text-green-900">View Details ➔</p>
              </div>
              <div className="p-4 bg-red-50 rounded border border-red-100">
                <p className="text-sm text-red-800 font-medium">Fee Dues</p>
                <p className="text-xl font-bold text-red-900">Check Fees ➔</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Notice Board */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="font-bold text-lg mb-4 text-slate-800">Notice Board</h3>
            {notices.length === 0 ? (
              <p className="text-gray-500 text-sm">No new notices.</p>
            ) : (
              <div className="space-y-4">
                {notices.map(notice => (
                  <div key={notice.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      {notice.isPinned && <span className="text-amber-500 text-xs">📌 Pinned</span>}
                      <h4 className="font-bold text-md text-gray-900">{notice.titleEn}</h4>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{notice.contentEn}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notice.publishedAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
