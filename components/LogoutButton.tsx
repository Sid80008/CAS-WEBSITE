"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className="w-full flex items-center justify-center gap-2 bg-[#ffdad6] text-[#93000a] py-3 rounded-lg text-[14px] font-medium hover:opacity-90 transition-opacity"
    >
      <span className="material-symbols-outlined">logout</span>
      Logout
    </button>
  );
}
