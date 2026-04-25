"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about/vision-mission" },
  { name: "Facilities", href: "/facilities" },
  { name: "Notices", href: "/notices" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Admissions", href: "/admissions" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white/95 backdrop-blur-md text-school-blue font-sans sticky top-0 w-full z-50 border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-20">
        <Link href="/" className="flex items-center gap-4 group">
          <img 
            alt="Central Academy Anta Logo" 
            className="h-12 w-12 object-contain transition-transform group-hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida/ADBb0uhpGmpLBOIZQweyrdd5jlaYGAcWQ51IS6Q_XovFqk44qkfU8aOEm_YtbNmoI4z7ODHUiBUnFFwWr_MJIeI6IIXsX8bc4O3A03x_UNCqIcbzA-pSFKbqzjr8ADLazZdkPDsQ6gP1TfdwxJS9gFNyFXOnGAPzuNYc1H6yY6FeTpDuw0CtqkyX83dfWPvuyfLJ58VnafgOvDKu37lUqMPnvaZ9xaAXZJLtJC-phweJ1H_d7_av_j_DCmqMWywCUYPTIX1toHZkw3IRP54" 
          />
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-school-blue leading-tight">Central Academy Anta</span>
            <span className="text-[10px] font-bold tracking-widest text-school-amber uppercase">Education for Excellence</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 items-center">
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
          <button className="flex items-center gap-1 text-school-blue font-semibold text-sm hover:text-school-amber transition-colors">
            <Globe className="h-4 w-4" />
            हिन्दी
          </button>
          <Link href="/login">
            <Button className="bg-school-blue text-white hover:bg-school-blue-dark transition-all shadow-md flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Portal
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-school-blue">
          <Menu className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
}
