import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Share2 } from "lucide-react";
import { SCHOOL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t-4 border-school-amber">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Central Academy Senior Secondary School Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-bold">{SCHOOL.shortName} – Central Academy</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dedicated to excellence in education, fostering a community of learners who are prepared to lead with integrity and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-school-amber font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h5>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link href="/notices" className="hover:text-white transition-colors">Notices</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">News & Events</Link></li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h5 className="text-school-amber font-bold mb-6 uppercase tracking-wider text-sm">Portals</h5>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li><Link href="/login" className="hover:text-white transition-colors">Staff Login</Link></li>
              <li><Link href="/portal" className="hover:text-white transition-colors">Student Portal</Link></li>
              <li><Link href="/portal" className="hover:text-white transition-colors">Parent Portal</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-school-amber font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h5>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li className="flex gap-3">
                <MapPin className="text-school-amber h-5 w-5 shrink-0 mt-0.5" />
                <span>{SCHOOL.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-school-amber h-5 w-5 shrink-0" />
                <span>{SCHOOL.phone1}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="text-school-amber h-5 w-5 shrink-0" />
                <a href={`mailto:${SCHOOL.email}`} className="hover:text-white transition-colors">
                  {SCHOOL.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} {SCHOOL.name}. All Rights Reserved. {SCHOOL.yearsOfExcellence}+ Years of Excellence.
          </p>
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </nav>
          <div className="flex gap-4">
            <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-school-blue transition-colors">
              <Share2 className="h-4 w-4 text-white" />
            </a>
            <a href="#" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-school-blue transition-colors">
              <Share2 className="h-4 w-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
