"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ProfileDropdown from "@/components/portal/ProfileDropdown";
import NotificationBell from "@/components/portal/NotificationBell";

interface ParentPortalShellProps {
  parent: {
    name: string;
    phone: string;
    students: {
      student: {
        firstName: string;
        lastName: string;
      };
    }[];
  };
  children: React.ReactNode;
}

const navItems = [
  { href: "/portal/parent/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/portal/parent/performance", icon: "insights", label: "Performance" },
  { href: "/portal/parent/fees", icon: "account_balance_wallet", label: "Fee Payments" },
  { href: "/portal/parent/connect", icon: "chat", label: "Teacher Connect" },
];

export default function ParentPortalShell({ parent, children }: ParentPortalShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/portal/parent/dashboard") return pathname === "/portal/parent/dashboard";
    return pathname.startsWith(href);
  }

  const childName = parent.students[0]?.student 
    ? `${parent.students[0].student.firstName} ${parent.students[0].student.lastName}`
    : "Student";

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
        
        <nav className="flex-grow space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  active
                    ? "bg-[#00386b]/10 text-[#00386b] font-bold border-l-4 border-[#00386b] rounded-l-none"
                    : "text-[#424750] hover:bg-[#e5e2e1]/50"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

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
            <h2 className="font-h4 text-base md:text-lg text-[#00386b] font-bold">Parent Portal</h2>
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
                    {parent.name}
                  </p>
                  <p className="font-caption text-xs text-[#424750]">Parent of {childName}</p>
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
