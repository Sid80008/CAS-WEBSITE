import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { BookOpen, Computer, ShieldCheck, CheckCircle, GraduationCap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "School Library | Central Academy Anta",
  description: "Explore the Digital Library at Central Academy Anta. A sanctuary of knowledge with 10,000+ books and digital research resources.",
};

export default function LibraryPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#fcf9f8]">
        {/* Breadcrumb */}
        <section className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-school-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href="/facilities" className="hover:text-school-blue transition-colors">Facilities</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">School Library</span>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="relative h-[450px] w-full overflow-hidden flex items-end">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDRfVrq57P6xqBMsbQgys51YgtF1SfWQrRxj7KiV7i2ggySOOiGOq02rMTMH_BiR3XsAor6NrOXKfUqvkBNgG_jtMreS5fuA5thHR6BXLyZYFo_vT4pyC1QIxpTgXOqT_IIBYlbPFF-ze5wFCEj2czuqtOIEgCrrgajBeuyB_Ovt_s5YHzs4EadTlaoMDPoNWciz_N8PnAcEg2_7llEqwyskz3BzH4-ZHBjGyfREj7dbbO7-4kfndV-57Ez6CzL5X6DfHf30ZjufHc')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00386b]/95 via-[#00386b]/60 to-transparent" />
          <div className="relative w-full max-w-7xl mx-auto px-6 pb-12 z-10 text-white">
            <span className="bg-school-amber text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              ACADEMIC HUB
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">School Library</h1>
            <p className="text-base md:text-lg max-w-2xl opacity-90 italic border-l-4 border-school-amber pl-4 font-light">
              "Igniting curiosity and fostering a lifelong passion for learning through a world-class collection of literature and digital resources."
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-extrabold text-school-blue mb-6">A Sanctuary of Knowledge</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
              <p>
                The Central Academy Anta Library is more than just a repository of books; it is the intellectual heart of our institution. Designed to meet the evolving needs of 21st-century learners, our library provides a serene environment where students can escape into the worlds created by authors or dive deep into rigorous academic research.
              </p>
              <p>
                We believe that literacy and information fluency are fundamental to student success. Our facility supports the curriculum across all grades, offering a balanced collection that caters to both leisure reading and advanced inquiry. From the earliest learners discovering picture books to senior students conducting complex digital research, the library serves as a critical partner in the academic journey of every Centralian.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-school-blue mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-amber/10 rounded-xl flex items-center justify-center text-school-amber mb-4">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">10,000+ Books</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Extensive collection spanning fiction, non-fiction, and academic journals.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-blue/10 rounded-xl flex items-center justify-center text-school-blue mb-4">
                    <Computer className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">Digital Center</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">High-speed terminals with access to global research databases and e-books.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">Quiet Study Zones</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Ergonomically designed pods for focused, distraction-free individual study.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <aside className="lg:col-span-4">
            <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold text-school-blue mb-6 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-school-amber" /> Library Guidelines
              </h3>
              <ul className="space-y-4">
                {[
                  "Silence must be maintained at all times within the library premises.",
                  "A valid Student ID/Library Card is required for all book transactions.",
                  "Eating and drinking (except water) are strictly prohibited.",
                  "Return all resources by the specified due date to avoid late fees."
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-school-amber flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-400 mb-4">Questions about availability?</p>
                <Link 
                  href="/contact" 
                  className="w-full inline-block text-center bg-school-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-school-blue-dark active:scale-95 transition-all shadow-sm"
                >
                  Contact Dept Head
                </Link>
              </div>
            </div>
          </aside>
        </section>

        {/* Gallery Section */}
        <section className="bg-school-blue-light py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-school-blue">Library Life in Action</h2>
              <p className="text-slate-600 mt-2 text-sm">A glimpse into how our students engage with our learning spaces.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDRiSbMiwrMCWMLRoJEOpgSIsCNO75qdEI35eMHIRW1kKkj_Gvzpr0hhyFGp14zgWoi9W6PzbtmYYgCaaV-ph9_1afz4sa2iXyRqSG3gw3W8R0yQOcehs6D4PSia1GCSzqTU1g9mS0rJmDNKdym4IgBK2BcIw0av5jrFNZt8DmmQYf_-noAovWxOQU_3YJXUINpZ7kIMjGAzKTENmRC7GW4G49CXp_nrm_crzMrKK2UrGh8-cAt2EQQMnjgMYPIva7o6qtjG944I8Sz",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBntIf3OXQRwA9bbSZdGR8MuwcpSkAdlYXH5YAb0squhyx84E5Pzh7Hw2xAD38RaRnWROCBXoWOuocap4Z7iGcoSVLU8pFNg_2X-Nm3gxD5yUCe3KWquMbJergk8-gMU0UUPjpc-VfVj135QJV0BMSZJ9YScokm8bkvVaTD6lU0UXh-Xxi-NuEmHgsJKfSowQVsBw45_pqs3PQDxFUmVzBUMbi5B4SDpPsLDeOpIQVi4TNR7DXpBL_0-_u1oAAjTnk20Y0Jxce3ZPui",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC0OokHmhnsgY0F5b0N2IsRNs6u1fsEfDfmibNTQVFMyY6s769GeeeoPcOsGe0igWYy-I80JAY1LfDqKF3Ixo-qAj4VQGIQkeT9a6jWGe_-ldM_5cSQ7NEA7WyyovJhnXhqQC6LhhKkL9p_hbpVHlMLNrYRtL4xpAX8soAo7-46HqOrpQ5ybAXNgnzWTXMggQ89iiHOXlItBNhV7m8ni-90hDJ-8dHLYrYFuomgcsUqw-hr6wifBHH3TqeXA9Uej54jQHuTA4py1d0m",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCCHRNPF-ZeS6jGOCSLHJABF7w2JCArksdN6VssDvCY7z2dJq8ZrVCr7FSlq5844oB6ruf4ojp6VARQuVZZm_KOtRNZsCDn4MKOWHgoai6xsAN6vMz2QIEFwtsbU2i-Vai5YKD_Yc3g6K5ltzS-xLbrToEbuuiG6QaYaWcDljpYOPRZ5pyhWBVm3uQwpnE23ibuVwhmH9Hp8gNMJTwsvkPuzlJ4fKzaTn-UW7Lr5uhM5Mc7fOIOR4ir6ir-08jnNzYsQrIc3sbgOTkl"
              ].map((url, i) => (
                <div key={i} className="overflow-hidden rounded-2xl h-60 relative group shadow-sm">
                  <img src={url} alt={`Library Life ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-school-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 max-w-7xl mx-auto px-6 text-center">
          <div className="bg-[#00386b] rounded-3xl p-12 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <h2 className="text-3xl font-extrabold mb-4 relative z-10">Want to see our facility in person?</h2>
            <p className="text-slate-200 mb-8 max-w-2xl mx-auto relative z-10">
              We welcome prospective parents and students to tour our campus and experience the Central Academy environment firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link 
                href="/admissions" 
                className="bg-school-amber text-white px-8 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
              >
                Inquire for Visit
              </Link>
              <Link 
                href="/downloads" 
                className="border border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 active:scale-95 transition-all"
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
