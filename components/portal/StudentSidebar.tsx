"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/portal/student/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/portal/student/academics", icon: "school", label: "Academics" },
  { href: "/portal/student/fees", icon: "payments", label: "Fee Portal" },
  { href: "/portal/student/circulars", icon: "notifications", label: "Circulars" },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/portal/student/dashboard") return pathname === "/portal/student/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <nav className="flex-grow space-y-1">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              active
                ? "bg-[#1b4f8a] text-white font-bold scale-[0.98]"
                : "text-[#424750] hover:bg-[#e5e2e1]/50"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="font-label text-sm">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
