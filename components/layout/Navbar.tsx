"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ABOUT_LINKS = [
  { name: "Vision & Mission", href: "/about/vision-mission" },
  { name: "Director's Message", href: "/about/vision-mission" }, // TODO Phase 4: update to /about/director
  { name: "Principal's Message", href: "/about/vision-mission" }, // TODO Phase 4: update to /about/principal
];

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Facilities", href: "/facilities" },
  { name: "Notices", href: "/notices" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Admissions", href: "/admissions" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAboutActive = pathname.startsWith("/about");

  return (
    <header className="bg-white/95 backdrop-blur-md text-school-blue font-sans sticky top-0 w-full z-50 border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <img
            alt="Central Academy Senior Secondary School Logo"
            className="h-12 w-12 object-contain transition-transform group-hover:scale-105"
            src="/logo.png"
          />
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-school-blue leading-tight">Central Academy Anta</span>
            <span className="text-[10px] font-bold tracking-widest text-school-amber uppercase">Education for Excellence</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 items-center">
          {/* About — dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-1 font-semibold transition-all hover:text-school-amber outline-none ${
                isAboutActive
                  ? "text-school-amber border-b-2 border-school-amber py-1"
                  : "text-school-blue"
              }`}
            >
              About <ChevronDown className="h-3.5 w-3.5 mt-0.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52 rounded-xl shadow-xl border-slate-100 p-1">
              {ABOUT_LINKS.map((link) => (
                <DropdownMenuItem key={link.name} asChild>
                  <Link
                    href={link.href}
                    className="flex items-center px-3 py-2 text-sm font-medium text-school-blue hover:bg-school-blue-light hover:text-school-blue rounded-lg cursor-pointer transition-colors"
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Other nav links */}
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold transition-all hover:text-school-amber ${
                  isActive
                    ? "text-school-amber border-b-2 border-school-amber py-1"
                    : "text-school-blue"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {/* Hindi toggle hidden — not yet implemented */}
          {/* TODO: Wire up i18n before re-enabling */}
          <Link href="/login">
            <Button className="bg-school-blue text-white hover:bg-school-blue-dark transition-all shadow-md flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Portal
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-school-blue p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/98 backdrop-blur-md px-8 py-6 flex flex-col gap-4 shadow-lg">
          {/* About sub-links */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-school-amber mb-1">About</span>
            {ABOUT_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="pl-2 text-sm font-semibold text-school-blue hover:text-school-amber transition-colors py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Other links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`font-semibold transition-all hover:text-school-amber text-sm ${
                pathname === link.href ? "text-school-amber" : "text-school-blue"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link href="/login" onClick={() => setMobileOpen(false)} className="mt-2">
            <Button className="w-full bg-school-blue text-white hover:bg-school-blue-dark flex items-center gap-2 justify-center">
              <LogIn className="h-4 w-4" />
              Staff / Admin Portal
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
