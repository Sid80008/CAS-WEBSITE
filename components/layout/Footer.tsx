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
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Dedicated to excellence in education, fostering a community of learners who are prepared to lead with integrity and innovation.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100084479980362"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#1B4F8A] transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/central_academy_school_anta/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#E1306C] transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@centralacademysecondarysch4542"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#FF0000] transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
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
              <li><Link href="/admin/login" className="hover:text-white transition-colors">Staff Login</Link></li>
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
        </div>
      </div>
    </footer>
  );
}
