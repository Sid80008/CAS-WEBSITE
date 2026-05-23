import Link from "next/link";
import { ReactNode } from "react";
import NotificationBell from "@/components/portal/NotificationBell";

export default function OfficePortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#fcf9f8] text-[#1c1b1b] font-body overflow-x-hidden">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 z-50 bg-[#f6f3f2] border-r border-[#E2E0DB] flex flex-col hidden md:flex">
        <div className="px-6 py-8 border-b border-[#E2E0DB]">
          <h2 className="text-[18px] font-bold text-[#085041]">Office Portal</h2>
          <p className="text-[#424750] text-[12px]">Academic Year 2023-24</p>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link href="/portal/office" className="flex items-center gap-3 text-[#085041] font-bold bg-[#E1F5EE] rounded-lg mx-2 px-4 py-3 hover:translate-x-1 transition-all duration-200">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[14px]">Dashboard</span>
          </Link>
          <Link href="/portal/office/students" className="flex items-center gap-3 text-[#424750] px-4 py-3 hover:bg-[#e5e2e1] transition-all duration-150 hover:translate-x-1 rounded-lg">
            <span className="material-symbols-outlined">group</span>
            <span className="text-[14px]">Students</span>
          </Link>
          <Link href="/portal/office/attendance" className="flex items-center gap-3 text-[#424750] px-4 py-3 hover:bg-[#e5e2e1] transition-all duration-150 hover:translate-x-1 rounded-lg">
            <span className="material-symbols-outlined">fact_check</span>
            <span className="text-[14px]">Attendance</span>
          </Link>
          <Link href="/portal/office/academics" className="flex items-center gap-3 text-[#424750] px-4 py-3 hover:bg-[#e5e2e1] transition-all duration-150 hover:translate-x-1 rounded-lg">
            <span className="material-symbols-outlined">school</span>
            <span className="text-[14px]">Academics</span>
          </Link>
          <Link href="/portal/office/reports" className="flex items-center gap-3 text-[#424750] px-4 py-3 hover:bg-[#e5e2e1] transition-all duration-150 hover:translate-x-1 rounded-lg">
            <span className="material-symbols-outlined">assessment</span>
            <span className="text-[14px]">Reports</span>
          </Link>
          <Link href="/portal/office/settings" className="flex items-center gap-3 text-[#424750] px-4 py-3 hover:bg-[#e5e2e1] transition-all duration-150 hover:translate-x-1 rounded-lg">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-[14px]">Settings</span>
          </Link>
        </nav>
        <div className="p-6 mt-auto border-t border-[#E2E0DB]">
          <Link href="/portal/office/help" className="flex items-center gap-3 text-[#424750] px-4 py-3 hover:bg-[#e5e2e1] transition-all rounded-lg">
            <span className="material-symbols-outlined">help</span>
            <span className="text-[14px]">Help Center</span>
          </Link>
          <button className="mt-4 w-full flex items-center justify-center gap-2 bg-[#993C1D] text-white py-2 rounded-lg text-[14px] font-medium hover:bg-opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col w-full">
        {/* TopAppBar */}
        <header className="sticky top-0 z-40 bg-[#fcf9f8] shadow-sm flex justify-between items-center w-full px-6 py-2">
          <div className="flex items-center gap-6">
            <h1 className="text-[22px] font-bold text-[#0C447C]">St. Mary's Academy ERP</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <input 
                className="bg-[#f6f3f2] border-none rounded-full px-8 py-2 text-[14px] w-64 focus:ring-2 focus:ring-[#BA7517] transition-all outline-none" 
                placeholder="Search records..." 
                type="text"
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#424750]">search</span>
            </div>
            <div className="flex items-center gap-2">
              <NotificationBell />
              <button className="p-2 rounded-full hover:bg-[#eae7e7] transition-colors cursor-pointer active:scale-95">
                <span className="material-symbols-outlined text-[#00386b]">help</span>
              </button>
              <button className="p-2 rounded-full hover:bg-[#eae7e7] transition-colors cursor-pointer active:scale-95">
                <span className="material-symbols-outlined text-[#00386b]">account_circle</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="flex-1 p-6 md:p-16 space-y-12">
          {children}
        </div>

        {/* Footer */}
        <footer className="w-full mt-auto border-t border-[#E2E0DB] flex justify-between items-center px-16 py-4 bg-[#ffffff]">
          <div className="flex items-center gap-4">
            <span className="text-[12px] text-[#424750]">© 2024 Institutional Excellence Management System. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="text-[12px] text-[#424750] hover:text-[#00386b] transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-[12px] text-[#424750] hover:text-[#00386b] transition-colors">Data Privacy</Link>
            <Link href="/contact" className="text-[12px] text-[#424750] hover:text-[#00386b] transition-colors">Accessibility</Link>
            <Link href="/contact" className="text-[12px] text-[#424750] hover:text-[#00386b] transition-colors">Support</Link>
          </div>
        </footer>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#BA7517] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined">chat</span>
      </button>
    </div>
  );
}
