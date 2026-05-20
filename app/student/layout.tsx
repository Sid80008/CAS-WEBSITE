// app/student/layout.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "STUDENT") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">CAS Student Portal</h1>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/student" className="hover:underline">Dashboard</Link>
          <Link href="/student/marks" className="hover:underline">Marks</Link>
          <Link href="/student/fees" className="hover:underline">Fees</Link>
          <Link href="/student/attendance" className="hover:underline">Attendance</Link>
          <Link href="/api/auth/signout" className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-900">Logout</Link>
        </nav>
      </header>
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
