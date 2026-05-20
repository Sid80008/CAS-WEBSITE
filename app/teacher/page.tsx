// app/teacher/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function TeacherDashboard() {
  const session = await getServerSession(authOptions);
  
  // Fetch the staff profile linked to this login
  const staff = await prisma.staff.findUnique({
    where: { userId: (session?.user as any).id },
    include: {
      taughtSubjects: { // corrected field name according to Prisma schema
        include: { class: true }
      }
    }
  });

  if (!staff) {
    return <div className="text-red-500 font-bold p-4">Error: No staff profile linked to this account.</div>;
  }

  // Group subjects by class for a cleaner UI
  const classAssignments = staff.taughtSubjects.reduce((acc, subject) => {
    const className = `${subject.class.name}`;
    if (!acc[className]) acc[className] = { classId: subject.class.id, subjects: [] };
    acc[className].subjects.push(subject);
    return acc;
  }, {} as Record<string, { classId: string, subjects: any[] }>);

  return (
    <div className="text-black space-y-6">
      <div className="bg-white p-6 rounded shadow-md border-t-4 border-amber-500 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Welcome, {staff.name}</h2>
          <p className="text-gray-600 mt-1">{staff.designation} | Emp Code: {staff.empCode}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-500 uppercase">Today's Date</p>
          <p className="text-lg font-bold text-amber-700">{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">My Assigned Classes</h3>
      
      {Object.keys(classAssignments).length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-500">
          You have not been assigned any subjects/classes yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(classAssignments).map(([className, data]) => (
            <div key={className} className="bg-white rounded shadow-md overflow-hidden">
              <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
                <h4 className="font-bold text-lg">Class {className}</h4>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-2">Subjects You Teach</p>
                  <div className="flex flex-wrap gap-2">
                    {data.subjects.map((sub: any) => (
                      <span key={sub.id} className="bg-amber-100 text-amber-900 px-2 py-1 rounded text-xs font-bold">
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <hr />
                
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href={`/admin/attendance?classId=${data.classId}`}
                    className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded text-sm font-bold transition"
                  >
                    Mark Attendance
                  </Link>
                  <Link 
                    href={`/admin/marks?classId=${data.classId}`}
                    className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded text-sm font-bold transition"
                  >
                    Enter Marks
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
