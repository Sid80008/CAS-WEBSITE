// app/office/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

export default async function OfficeLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Ensure the user is logged in and has the OFFICESTAFF role (OFFICE)
  if (!session || (session.user as any).role !== "OFFICE") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-800 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">CAS Office Portal</h1>
        <div className="flex gap-4 text-sm font-medium items-center">
          <Link href="/office" className="hover:underline">Dashboard</Link>
          <Link href="/api/auth/signout" className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">Logout</Link>
        </div>
      </header>
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
