import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import { Trophy, Dumbbell, ShieldAlert, CheckCircle, Heart } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sports Complex | Central Academy Anta",
  description: "Explore the athletic developments at Central Academy Anta. Facilities for Basketball, Volleyball, Cricket, and Athletics.",
};

export default function SportsPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#FAFAF5] text-text-primary">
        {/* Page Banner (3-layer depth) */}
        <PageBanner
          titleEn="Sports Complex"
          titleHi="खेल परिसर"
          eyebrowEn="ATHLETIC EXCELLENCE"
          eyebrowHi="खेल उत्कृष्टता"
          imageSrc="/gallery/photo-dump/1741166412_slider-20.jpg"
        />

        {/* Breadcrumb */}
        <section className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-sans">
            <Link href="/" className="hover:text-school-saffron transition-colors">Home</Link>
            <span>/</span>
            <Link href="/facilities" className="hover:text-school-saffron transition-colors">Facilities</Link>
            <span>/</span>
            <span className="text-school-navy font-bold">Sports Complex</span>
          </nav>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-school-navy font-display">Nurturing Athletic Character</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base font-sans">
              <p>
                At Central Academy Anta, physical health and athletic character development are key components of a well-balanced lifestyle. Our extensive sports complex features professionally maintained basketball and volleyball courts, a massive cricket ground, and layouts for badminton and athletics.
              </p>
              <p>
                We believe that participation in sports instills coordination, mutual leadership, discipline, and strategic thinking. Our school teams regularly compete in district and state-level RBSE championships, guided by qualified coaches who focus on peak performance and clean sportsmanship.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-black text-school-navy font-display mb-6">Athletic Offerings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-xl flex items-center justify-center text-school-saffron mb-4 border border-school-saffron/10">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Championship Focus</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Regular tournaments and specialized coaching to prepare teams for district/state meets.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-xl flex items-center justify-center text-school-saffron-dark mb-4 border border-school-saffron/10">
                    <Dumbbell className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Diverse Training</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Facilities for both outdoor matches and indoor chess/table tennis training.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-blue-light/80 text-school-blue rounded-xl flex items-center justify-center mb-4">
                    <Heart className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Fitness Programs</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Daily physical training schedules, yoga classes, and flexibility workshops.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <aside className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-school-navy font-display mb-6 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-school-saffron" /> Complex Guidelines
              </h3>
              <ul className="space-y-4 font-sans">
                {[
                  "Appropriate athletic uniforms and sports shoes must be worn at all times.",
                  "Respect teammates, opponents, coaches, and referee decisions.",
                  "All sports equipment must be signed out and returned in perfect state.",
                  "Hydration is key; always carry personal refillable water bottles."
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-school-saffron flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-100 text-center font-sans">
                <p className="text-xs text-slate-400 mb-4">Questions about sports events?</p>
                <Link 
                  href="/contact" 
                  className="w-full inline-block text-center bg-gradient-to-r from-school-saffron to-school-saffron-light text-white py-3 rounded-xl font-bold text-sm hover:opacity-95 active:scale-95 transition-all shadow-md"
                >
                  Contact Sports HOD
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
              <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] mb-3 inline-block">ATHLETICS</span>
              <h2 className="text-3xl md:text-4xl font-black text-white font-display">Sports Complex in Action</h2>
              <p className="text-slate-400 mt-2 text-sm font-sans">Glimpses of active championships, yoga workshops, and match practices.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "/gallery/photo-dump/1741166412_slider-20.jpg",
                "/gallery/photo-dump/1741166362_slider-17.jpg",
                "/gallery/photo-dump/1741166776-5.jpeg",
                "/gallery/photo-dump/celebration.jpg"
              ].map((url, i) => (
                <div key={i} className="overflow-hidden rounded-3xl h-60 relative group shadow-lg border border-white/5">
                  <img src={url} alt={`Sports Complex ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
