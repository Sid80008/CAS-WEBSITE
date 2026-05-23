"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import StudentSidebar from "@/components/portal/StudentSidebar";
import ProfileDropdown from "@/components/portal/ProfileDropdown";
import NotificationBell from "@/components/portal/NotificationBell";

interface StudentPortalShellProps {
  student: {
    firstName: string;
    lastName: string;
    photo?: string | null;
  };
  gradeLabel: string;
  children: React.ReactNode;
}

export default function StudentPortalShell({ student, gradeLabel, children }: StudentPortalShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="bg-[#fcf9f8] text-[#1c1b1b] font-body min-h-screen">
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <aside
        className={`h-full w-64 fixed top-0 bottom-0 bg-[#f6f3f2] shadow-sm border-r border-[#E2E0DB] z-50 flex flex-col gap-2 p-4 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0 left-0" : "-translate-x-full lg:left-0"
        }`}
      >
        <div className="mb-8 px-2 pt-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="CAS Logo" width={40} height={40} className="object-contain" />
            <div>
              <h1 className="font-h3 text-xl font-bold text-[#00386b] leading-tight">Central Academy</h1>
              <p className="font-label text-sm text-[#424750]">antah Campus</p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-full hover:bg-[#e5e2e1] text-[#424750]"
            aria-label="Close sidebar"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* We can listen to link clicks in sidebar on mobile to close the sidebar */}
        <div onClick={() => setSidebarOpen(false)}>
          <StudentSidebar />
        </div>

        <div className="mt-auto border-t border-[#E2E0DB] pt-4">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2 border-[#00386b] text-[#00386b] font-bold rounded-lg hover:bg-[#00386b] hover:text-white transition-all text-sm"
          >
            ← Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Top AppBar */}
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 z-30 bg-[#fcf9f8] border-b border-[#E2E0DB]">
        <div className="flex justify-between items-center px-4 md:px-6 h-full">
          <div className="flex items-center gap-3">
            {/* Hamburger button for mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-full text-[#424750] hover:text-[#00386b] hover:bg-[#e5e2e1]/50 transition-all flex items-center justify-center"
              aria-label="Open sidebar"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="font-h4 text-base md:text-lg text-[#00386b] font-bold">Student Portal</h2>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative hidden md:flex items-center bg-[#f0eded] px-4 py-1.5 rounded-full border border-transparent focus-within:border-[#00386b] transition-all">
              <span className="material-symbols-outlined text-[#424750] text-[20px]">search</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-36 lg:w-48 font-label ml-2 outline-none"
                placeholder="Search portal..."
                type="text"
                aria-label="Search portal"
              />
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <NotificationBell />
              
              <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-[#E2E0DB]">
                <div className="text-right hidden sm:block">
                  <p className="font-label text-sm font-bold text-[#1c1b1b] leading-tight">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="font-caption text-xs text-[#424750]">{gradeLabel}</p>
                </div>
                <ProfileDropdown align="right" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 min-h-screen flex flex-col">
        <div className="flex-grow p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
