"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  History, 
  Users, 
  UserRound, 
  Bell, 
  Image as ImageIcon, 
  Calendar, 
  Download, 
  FileCheck, 
  LayoutDashboard,
  LogOut,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Staff", href: "/admin/staff", icon: UserRound },
  { label: "Notices", href: "/admin/notices", icon: Bell },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Downloads", href: "/admin/downloads", icon: Download },
  { label: "Admissions", href: "/admin/admissions", icon: FileCheck },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-gray-900 text-white flex flex-col z-50">
      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">C</span>
          </div>
          <span className="font-bold text-lg tracking-tight uppercase">CA Anta</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                isActive 
                  ? "bg-indigo-600/10 text-indigo-400 border-l-4 border-indigo-600 rounded-l-none" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-indigo-500" : "text-gray-500 group-hover:text-white"
              )} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/40 rounded-xl mb-4">
          <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Admin User</p>
            <p className="text-xs text-gray-400 truncate">admin@casanta.com</p>
          </div>
        </div>
        
        <div className="flex gap-2">
           <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800 flex-1">
             <Settings className="h-5 w-5" />
           </Button>
           <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400 hover:bg-red-400/10 flex-1">
             <LogOut className="h-5 w-5" />
           </Button>
        </div>
      </div>
    </aside>
  );
}

// Minimal Button shim since I might not have imported Button from components/ui
function Button({ children, variant, size, className, ...props }: any) {
  return (
    <button 
      className={cn(
        "flex items-center justify-center rounded-lg transition-colors",
        variant === "ghost" ? "bg-transparent" : "bg-gray-800",
        size === "icon" ? "h-10 w-10" : "px-4 py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
