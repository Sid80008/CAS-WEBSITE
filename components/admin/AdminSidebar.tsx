"use client";
// components/admin/AdminSidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin",            icon: "dashboard",       label: "Dashboard" },
  { href: "/admin/students",   icon: "school",          label: "Students",        fill: true },
  { href: "/admin/admissions", icon: "how_to_reg",      label: "Admissions" },
  { href: "/admin/fees",       icon: "payments",        label: "Finance" },
  { href: "/admin/attendance", icon: "event_available", label: "Attendance" },
  { href: "/admin/marks",      icon: "grade",           label: "Marks & Results" },
  { href: "/admin/staff",      icon: "badge",           label: "Staff" },
  { href: "/admin/tc",         icon: "description",     label: "TC & Certificates" },
  { href: "/admin/notices",    icon: "campaign",        label: "Notices" },
  { href: "/admin/gallery",    icon: "photo_library",   label: "Gallery" },
  { href: "/admin/events",     icon: "event",           label: "Events" },
  { href: "/admin/downloads",  icon: "folder_open",     label: "Downloads" },
  { href: "/admin/settings",   icon: "settings",        label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-4 md:px-8 bg-surface-container-lowest border-b border-outline-variant h-16 shadow-sm backdrop-blur-md bg-white/80">
        <div className="flex items-center gap-4">
          <span className="lg:hidden material-symbols-outlined text-primary cursor-pointer">menu</span>
          <span className="font-bold text-xl text-primary" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Central Academy</span>
        </div>
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-outline text-sm">search</span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-[#f6f3f2] border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm"
              placeholder="Search students, admission no..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-[#eae7e7] transition-all">
            <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          </button>
          <button className="p-2 rounded-full hover:bg-[#eae7e7] transition-all">
            <span className="material-symbols-outlined text-on-surface-variant">help</span>
          </button>
          <div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center ml-2">
            <span className="text-white text-xs font-bold">AD</span>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[260px] hidden lg:flex flex-col bg-[#F6F3F2] border-r border-outline-variant z-50">
        <div className="py-6 px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
            <div>
              <h2 className="font-bold text-lg text-primary leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Central Academy</h2>
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Admin Portal</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                    active
                      ? "bg-primary/10 text-primary font-bold border-l-4 border-primary rounded-l-none"
                      : "text-on-surface-variant hover:bg-[#eae7e7]"
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
        </div>

        <div className="mt-auto p-6 space-y-4">
          <Link
            href="/admin/students/new"
            className="w-full bg-secondary-container text-on-secondary-container font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">person_add</span>
            New Admission
          </Link>
          <div className="pt-4 border-t border-outline-variant">
            <a
              href="mailto:support@casanta.ac.in"
              className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-[#eae7e7] transition-colors text-sm rounded-lg"
            >
              <span className="material-symbols-outlined">help_outline</span>
              <span>Help Center</span>
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full flex items-center gap-3 text-error px-4 py-2 hover:bg-error-container transition-colors text-sm rounded-lg mt-1"
            >
              <span className="material-symbols-outlined">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
