import Link from "next/link";
import { ReactNode } from "react";
import { LogoutButton } from "@/components/LogoutButton";
import ProfileDropdown from "@/components/portal/ProfileDropdown";

export default function TeacherPortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#fcf9f8] text-[#1c1b1b] font-body overflow-x-hidden">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 z-50 flex flex-col bg-[#f6f3f2] border-r border-[#E2E0DB] pt-20 hidden md:flex">
        <div className="px-6 py-4 mb-4">
          <h2 className="text-[18px] leading-[1.4] font-bold text-[#085041]">Teacher Portal</h2>
          <p className="text-[12px] text-[#424750]">Academic Year 2023-24</p>
        </div>
        <nav className="flex-grow px-2">
          <ul className="space-y-1">
            <li>
              <Link href="/portal/teacher" className="text-[#085041] font-bold bg-[#E1F5EE] rounded-lg flex items-center px-4 py-3 gap-3 transition-transform hover:translate-x-1">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-[14px] font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/portal/teacher/students" className="text-[#424750] px-4 py-3 flex items-center gap-3 transition-all hover:bg-[#e5e2e1] rounded-lg">
                <span className="material-symbols-outlined">group</span>
                <span className="text-[14px] font-medium">Students</span>
              </Link>
            </li>
            <li>
              <Link href="/portal/teacher/attendance" className="text-[#424750] px-4 py-3 flex items-center gap-3 transition-all hover:bg-[#e5e2e1] rounded-lg">
                <span className="material-symbols-outlined">fact_check</span>
                <span className="text-[14px] font-medium">Attendance</span>
              </Link>
            </li>
            <li>
              <Link href="/portal/teacher/academics" className="text-[#424750] px-4 py-3 flex items-center gap-3 transition-all hover:bg-[#e5e2e1] rounded-lg">
                <span className="material-symbols-outlined">school</span>
                <span className="text-[14px] font-medium">Academics</span>
              </Link>
            </li>
            <li>
              <Link href="/portal/teacher/reports" className="text-[#424750] px-4 py-3 flex items-center gap-3 transition-all hover:bg-[#e5e2e1] rounded-lg">
                <span className="material-symbols-outlined">assessment</span>
                <span className="text-[14px] font-medium">Reports</span>
              </Link>
            </li>
            <li>
              <Link href="/portal/teacher/settings" className="text-[#424750] px-4 py-3 flex items-center gap-3 transition-all hover:bg-[#e5e2e1] rounded-lg">
                <span className="material-symbols-outlined">settings</span>
                <span className="text-[14px] font-medium">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto border-t border-[#E2E0DB] p-4 space-y-4">
          <Link href="/portal/teacher/help" className="flex items-center gap-3 px-4 py-2 text-[#424750] hover:text-[#00386b] transition-colors">
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span className="text-[12px]">Help Center</span>
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 w-full flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="sticky top-0 z-40 shadow-sm bg-[#fcf9f8] flex justify-between items-center w-full px-6 py-2">
          <div className="flex items-center gap-4">
            <span className="text-[22px] font-bold text-[#0C447C] md:hidden">SMA ERP</span>
          </div>
          <div className="flex items-center gap-6 ml-auto">
            <div className="relative hidden md:block">
              <input 
                className="bg-[#f6f3f2] border-none rounded-full py-2 px-6 text-[14px] focus:ring-2 focus:ring-[#00386b] w-64 outline-none" 
                placeholder="Search students, marks..." 
                type="text"
              />
              <span className="material-symbols-outlined absolute right-3 top-1.5 text-[#424750]">search</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="material-symbols-outlined text-[#00386b] cursor-pointer active:scale-95 transition-transform">notifications</button>
              <button className="material-symbols-outlined text-[#00386b] cursor-pointer active:scale-95 transition-transform">help</button>
              <ProfileDropdown align="right" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-16">
          {children}
        </div>

        {/* Footer */}
        <footer className="w-full mt-auto bg-[#ffffff] border-t border-[#E2E0DB] flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-4 gap-4">
          <div className="flex items-center gap-6">
            <span className="text-[12px] text-[#424750]">© 2024 Institutional Excellence Management System. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="text-[12px] text-[#424750] hover:text-[#00386b] transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-[12px] text-[#424750] hover:text-[#00386b] transition-colors">Data Privacy</Link>
            <Link href="/contact" className="text-[12px] text-[#424750] hover:text-[#00386b] transition-colors">Support</Link>
          </div>
        </footer>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#00386b] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined">chat</span>
      </button>
    </div>
  );
}
