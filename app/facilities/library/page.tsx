import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import { BookOpen, Computer, ShieldCheck, CheckCircle, GraduationCap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "School Library | Central Academy Anta",
  description: "Explore the Digital Library at Central Academy Anta. A sanctuary of knowledge with 10,000+ books and digital research resources.",
};

export default function LibraryPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#FAFAF5] text-text-primary">
        {/* Page Banner (3-layer depth) */}
        <PageBanner
          titleEn="Digital Library"
          titleHi="डिजिटल पुस्तकालय"
          eyebrowEn="ACADEMIC HUB"
          eyebrowHi="शैक्षणिक केंद्र"
          imageSrc="/gallery/slider/1774511691_slider-52.jpg"
        />

        {/* Breadcrumb */}
        <section className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-sans">
            <Link href="/" className="hover:text-school-saffron transition-colors">Home</Link>
            <span>/</span>
            <Link href="/facilities" className="hover:text-school-saffron transition-colors">Facilities</Link>
            <span>/</span>
            <span className="text-school-navy font-bold">Digital Library</span>
          </nav>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-school-navy font-display">A Sanctuary of Knowledge</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base font-sans">
              <p>
                The Central Academy Anta Library is more than just a repository of books; it is the intellectual heart of our institution. Designed to meet the evolving needs of 21st-century learners, our library provides a serene environment where students can escape into the worlds created by authors or dive deep into rigorous academic research.
              </p>
              <p>
                We believe that literacy and information fluency are fundamental to student success. Our facility supports the curriculum across all grades, offering a balanced collection that caters to both leisure reading and advanced inquiry. From the earliest learners discovering picture books to senior students conducting complex digital research, the library serves as a critical partner in the academic journey of every Centralian.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-black text-school-navy font-display mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-xl flex items-center justify-center text-school-saffron mb-4 border border-school-saffron/10">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">10,000+ Books</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Extensive collection spanning fiction, non-fiction, and academic journals.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-xl flex items-center justify-center text-school-saffron-dark mb-4 border border-school-saffron/10">
                    <Computer className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Digital Center</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">High-speed terminals with access to global research databases and e-books.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-blue-light/80 text-school-blue rounded-xl flex items-center justify-center mb-4">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Quiet Study Zones</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Ergonomically designed pods for focused, distraction-free individual study.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <aside className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-school-navy font-display mb-6 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-school-saffron" /> Library Guidelines
              </h3>
              <ul className="space-y-4 font-sans">
                {[
                  "Silence must be maintained at all times within the library premises.",
                  "A valid Student ID/Library Card is required for all book transactions.",
                  "Eating and drinking (except water) are strictly prohibited.",
                  "Return all resources by the specified due date to avoid late fees."
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-school-saffron flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-100 text-center font-sans">
                <p className="text-xs text-slate-400 mb-4">Questions about availability?</p>
                <Link 
                  href="/contact" 
                  className="w-full inline-block text-center bg-gradient-to-r from-school-saffron to-school-saffron-light text-white py-3 rounded-xl font-bold text-sm hover:opacity-95 active:scale-95 transition-all shadow-md"
                >
                  Contact Dept Head
                </Link>
              </div>
            </div>
          </aside>
        </section>

        {/* Gallery Section */}
        <section className="bg-school-navy py-24 border-t border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(232,98,26,0.04)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] mb-3 inline-block">LIBRARY LIFE</span>
              <h2 className="text-3xl md:text-4xl font-black text-white font-display">A Sanctuary of Research</h2>
              <p className="text-slate-400 mt-2 text-sm font-sans">A glimpse into how our students engage with our learning spaces.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDRiSbMiwrMCWMLRoJEOpgSIsCNO75qdEI35eMHIRW1kKkj_Gvzpr0hhyFGp14zgWoi9W6PzbtmYYgCaaV-ph9_1afz4sa2iXyRqSG3gw3W8R0yQOcehs6D4PSia1GCSzqTU1g9mS0rJmDNKdym4IgBK2BcIw0av5jrFNZt8DmmQYf_-noAovWxOQU_3YJXUINpZ7kIMjGAzKTENmRC7GW4G49CXp_nrm_crzMrKK2UrGh8-cAt2EQQMnjgMYPIva7o6qtjG944I8Sz",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBntIf3OXQRwA9bbSZdGR8MuwcpSkAdlYXH5YAb0squhyx84E5Pzh7Hw2xAD38RaRnWROCBXoWOuocap4Z7iGcoSVLU8pFNg_2X-Nm3gxD5yUCe3KWquMbJergk8-gMU0UUPjpc-VfVj135QJV0BMSZJ9YScokm8bkvVaTD6lU0UXh-Xxi-NuEmHgsJKfSowQVsBw45_pqs3PQDxFUmVzBUMbi5B4SDpPsLDeOpIQVi4TNR7DXpBL_0-_u1oAAjTnk20Y0Jxce3ZPui",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC0OokHmhnsgY0F5b0N2IsRNs6u1fsEfDfmibNTQVFMyY6s769GeeeoPcOsGe0igWYy-I80JAY1LfDqKF3Ixo-qAj4VQGIQkeT9a6jWGe_-ldM_5cSQ7NEA7WyyovJhnXhqQC6LhhKkL9p_hbpVHlMLNrYRtL4xpAX8soAo7-46HqOrpQ5ybAXNgnzWTXMggQ89iiHOXlItBNhV7m8ni-90hDJ-8dHLYrYFuomgcsUqw-hr6wifBHH3TqeXA9Uej54jQHuTA4py1d0m",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCCHRNPF-ZeS6jGOCSLHJABF7w2JCArksdN6VssDvCY7z2dJq8ZrVCr7FSlq5844oB6ruf4ojp6VARQuVZZm_KOtRNZsCDn4MKOWHgoai6xsAN6vMz2QIEFwtsbU2i-Vai5YKD_Yc3g6K5ltzS-xLbrToEbuuiG6QaYaWcDljpYOPRZ5pyhWBVm3uQwpnE23ibuVwhmH9Hp8gNMJTwsvkPuzlJ4fKzaTn-UW7Lr5uhM5Mc7fOIOR4ir6ir-08jnNzYsQrIc3sbgOTkl"
              ].map((url, i) => (
                <div key={i} className="overflow-hidden rounded-3xl h-60 relative group shadow-lg border border-white/5">
                  <img src={url} alt={`Library Life ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-school-ink/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 max-w-7xl mx-auto px-6 text-center">
          <div className="bg-school-navy rounded-[2.5rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(232,98,26,0.06)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-school-saffron/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <h2 className="text-3xl md:text-4xl font-black mb-4 relative z-10 font-display">Want to see our facility in person?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto relative z-10 font-sans leading-relaxed">
              We welcome prospective parents and students to tour our campus and experience the Central Academy environment firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 font-sans">
              <Link 
                href="/admissions" 
                className="bg-gradient-to-r from-school-saffron to-school-saffron-light text-white px-8 py-3.5 rounded-xl font-bold hover:opacity-95 active:scale-95 transition-all shadow-md"
              >
                Inquire for Visit
              </Link>
              <Link 
                href="/downloads" 
                className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 active:scale-95 transition-all"
              >
                Download Brochure
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
