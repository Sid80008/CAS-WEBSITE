// app/parent/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

export default async function ParentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Ensure the user is logged in and has the PARENT role
  if (!session || (session.user as any).role !== "PARENT") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-teal-700 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">CAS Parent Portal</h1>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/parent" className="hover:underline">Dashboard</Link>
          <Link href="/parent/fees" className="hover:underline">Fees</Link>
          <Link href="/parent/attendance" className="hover:underline">Attendance</Link>
          <Link href="/parent/profile" className="hover:underline">Profile</Link>
        </nav>
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">{(session.user as any).email}</span>
          <Link href="/api/auth/signout" className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-medium transition">
            Sign Out
          </Link>
        </div>
      </header>
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <footer className="bg-teal-800 text-white text-center p-3 text-xs">
        © {new Date().getFullYear()} CAS School Management System
      </footer>
    </div>
  );
}
