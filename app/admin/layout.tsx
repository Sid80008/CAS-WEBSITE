// app/admin/layout.tsx
import Link from 'next/link';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) redirect("/admin/login");

  const roles = (session.user as any).roles || [];
  if (!roles.includes("ADMIN")) redirect("/admin/login");

  return (
    <div className="bg-background text-on-surface min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <AdminSidebar />
      {/* Main content - offset for sidebar */}
      <main className="lg:ml-[260px] pt-16 min-h-screen">
        <div className="max-w-[1440px] mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
