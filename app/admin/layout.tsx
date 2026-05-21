import Link from 'next/link';
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const roles = (session.user as any).roles || [];
  if (!roles.includes("ADMIN")) {
    redirect("/portal");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-slate-700">
          CAS Admin
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
          <Link href="/admin" className="block p-2 hover:bg-slate-800 rounded">Dashboard</Link>
          <Link href="/admin/students" className="block p-2 hover:bg-slate-800 rounded">Student Management</Link>
          <Link href="/admin/fees" className="block p-2 hover:bg-slate-800 rounded">Fee Management</Link>
          <Link href="/admin/academics" className="block p-2 hover:bg-slate-800 rounded">Academic Management</Link>
          <Link href="/admin/attendance" className="block p-2 hover:bg-slate-800 rounded">Attendance</Link>
          <Link href="/admin/marks" className="block p-2 hover:bg-slate-800 rounded">Marks & Results</Link>
          <Link href="/admin/staff" className="block p-2 hover:bg-slate-800 rounded">Staff Management</Link>
          <Link href="/admin/admissions" className="block p-2 hover:bg-slate-800 rounded">Admissions</Link>
          <Link href="/admin/tc" className="block p-2 hover:bg-slate-800 rounded">TC & Certificates</Link>
          <Link href="/admin/notices" className="block p-2 hover:bg-slate-800 rounded">Communication</Link>
          <Link href="/admin/gallery" className="block p-2 hover:bg-slate-800 rounded">Gallery & Media</Link>
          <Link href="/admin/events" className="block p-2 hover:bg-slate-800 rounded">Events & Calendar</Link>
          <Link href="/admin/toppers" className="block p-2 hover:bg-slate-800 rounded">Toppers</Link>
          <Link href="/admin/reports" className="block p-2 hover:bg-slate-800 rounded">Reports</Link>
          <Link href="/admin/website" className="block p-2 hover:bg-slate-800 rounded">Website Content</Link>
          <Link href="/admin/settings" className="block p-2 hover:bg-slate-800 rounded">Settings</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
