import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import { Microscope, Beaker, Compass, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Science Laboratories | Central Academy Anta",
  description: "Explore the state-of-the-art Science Laboratories at Central Academy Anta. Workstations designed for Physics, Chemistry, and Biology.",
};

export default function LabsPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#FAFAF5] text-text-primary">
        {/* Page Banner (3-layer depth) */}
        <PageBanner
          titleEn="Science Laboratories"
          titleHi="विज्ञान प्रयोगशालाएं"
          eyebrowEn="SCIENTIFIC INQUIRY"
          eyebrowHi="वैज्ञानिक जांच"
          imageSrc="/banner-main.png"
        />

        {/* Breadcrumb */}
        <section className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-sans">
            <Link href="/" className="hover:text-school-saffron transition-colors">Home</Link>
            <span>/</span>
            <Link href="/facilities" className="hover:text-school-saffron transition-colors">Facilities</Link>
            <span>/</span>
            <span className="text-school-navy font-bold">Science Laboratories</span>
          </nav>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-school-navy font-display">Hands-On Experimental Learning</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base font-sans">
              <p>
                Our Science Laboratories at Central Academy Anta are fully equipped spaces that encourage students to learn through exploration and inquiry. With custom-built workstations for Physics, Chemistry, and Biology, our students engage in practical applications of theoretical knowledge, building a deep understanding of scientific methods.
              </p>
              <p>
                We believe that true scientific learning happens when students design experiments, measure variables, observe phenomena, and draw empirical conclusions. Our curriculum integrates weekly lab sessions led by subject matter experts, preparing senior secondary students for board exams and higher education research.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-black text-school-navy font-display mb-6">Our Laboratories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-xl flex items-center justify-center text-school-saffron mb-4 border border-school-saffron/10">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Physics Laboratory</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Equipped with advanced optical benches, electrical circuit trainers, and mechanics setups.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-xl flex items-center justify-center text-school-saffron-dark mb-4 border border-school-saffron/10">
                    <Beaker className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Chemistry Laboratory</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Features high-grade reagents, safety exhaust hoods, electronic balances, and distillation units.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-blue-light/80 text-school-blue rounded-xl flex items-center justify-center mb-4">
                    <Microscope className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Biology Laboratory</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Houses research microscopes, preserved plant/animal specimens, and molecular modeling kits.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <aside className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-school-navy font-display mb-6 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-school-saffron" /> Lab Safety Guidelines
              </h3>
              <ul className="space-y-4 font-sans">
                {[
                  "Lab coats and closed-toe footwear must be worn during all sessions.",
                  "Handle all chemicals and glass equipment with care under teacher supervision.",
                  "Dispose of chemicals and biological wastes properly in designated bins.",
                  "Familiarize yourself with the location of first-aid kits and fire extinguishers."
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-school-saffron flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-100 text-center font-sans">
                <p className="text-xs text-slate-400 mb-4">Questions about scheduling?</p>
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
              <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] mb-3 inline-block">LAB LIFE</span>
              <h2 className="text-3xl md:text-4xl font-black text-white font-display">Scientific Inquiry in Action</h2>
              <p className="text-slate-400 mt-2 text-sm font-sans">A glimpse of student experiments, analytical charts, and observations.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "/gallery/photo-dump/1741166776-5.jpeg",
                "/gallery/photo-dump/1741166362_slider-17.jpg",
                "/gallery/photo-dump/1741166412_slider-20.jpg",
                "/gallery/photo-dump/celebration.jpg"
              ].map((url, i) => (
                <div key={i} className="overflow-hidden rounded-3xl h-60 relative group shadow-lg border border-white/5">
                  <Image src={url} alt={`Lab Work ${i+1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
