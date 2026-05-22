"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

interface ProfileDropdownProps {
  align?: "left" | "right";
}

export default function ProfileDropdown({ align = "right" }: ProfileDropdownProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session || !session.user) {
    return null;
  }

  const user = session.user;
  const roles = (user as any).roles || [];
  
  // Determine primary role label and profile URL prefix
  let roleLabel = "User";
  let profileUrl = "/portal/profile";
  
  if (roles.includes("ADMIN")) {
    roleLabel = "Administrator";
    profileUrl = "/admin/profile";
  } else if (roles.includes("TEACHER")) {
    roleLabel = "Teacher";
    profileUrl = "/portal/teacher/profile";
  } else if (roles.includes("STUDENT")) {
    roleLabel = "Student";
    profileUrl = "/portal/student/profile";
  } else if (roles.includes("PARENT")) {
    roleLabel = "Parent";
    profileUrl = "/portal/parent/profile";
  } else if (roles.includes("OFFICE")) {
    roleLabel = "Office Staff";
    profileUrl = "/portal/office/profile";
  }

  const displayName = user.name || user.email || "User";
  
  // Get initials
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const photo = user.image;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {photo ? (
          <Image
            src={photo}
            alt={displayName}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover border border-outline-variant hover:opacity-85 transition-opacity"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary-container hover:bg-primary/95 text-white flex items-center justify-center font-bold text-sm border border-outline-variant hover:opacity-85 transition-opacity">
            {initials || "U"}
          </div>
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-56 bg-white border border-outline-variant rounded-xl shadow-lg py-2 z-50 text-[#1c1b1b]`}
        >
          {/* User Header */}
          <div className="px-4 py-2.5 border-b border-outline-variant/60">
            <p className="font-label text-sm font-bold text-on-surface truncate">
              {displayName}
            </p>
            <p className="font-caption text-xs text-[#555555] truncate">
              {user.email}
            </p>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded">
              {roleLabel}
            </span>
          </div>

          {/* Links */}
          <div className="py-1">
            <Link
              href={profileUrl}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-on-surface-variant hover:bg-[#f6f3f2] hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
              <span className="font-label">Profile Settings</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-outline-variant/60 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error-container/30 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="font-label">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
