// app/teacher/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || (session.user as any).role !== "TEACHER") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-amber-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">CAS Teacher Portal</h1>
        <div className="flex gap-4 text-sm font-medium items-center">
          <Link href="/teacher" className="hover:underline">Dashboard</Link>
          <Link href="/teacher/timetable" className="hover:underline">Timetable</Link>
          <Link href="/api/auth/signout" className="bg-amber-800 px-3 py-1 rounded hover:bg-amber-900">Logout</Link>
        </div>
      </header>
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
