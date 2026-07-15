import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import { Monitor, Cpu, Sparkles, CheckCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Smart Classrooms | Central Academy Anta",
  description: "Learn in digitized classrooms at Central Academy Anta. High-definition interactive panels and audio-visual setups.",
};

export default function SmartClassroomsPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#FAFAF5] text-text-primary">
        {/* Page Banner (3-layer depth) */}
        <PageBanner
          titleEn="Smart Classrooms"
          titleHi="स्मार्ट कक्षाएं"
          eyebrowEn="MODERN LEARNING"
          eyebrowHi="आधुनिक शिक्षा"
          imageSrc="/banner-main.png"
        />

        {/* Breadcrumb */}
        <section className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-sans">
            <Link href="/" className="hover:text-school-saffron transition-colors">Home</Link>
            <span>/</span>
            <Link href="/facilities" className="hover:text-school-saffron transition-colors">Facilities</Link>
            <span>/</span>
            <span className="text-school-navy font-bold">Smart Classrooms</span>
          </nav>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-school-navy font-display">Active Digital Environments</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base font-sans">
              <p>
                At Central Academy Anta, we understand that modern learners require engaging, dynamic, and interactive learning frameworks. Our classrooms are fully integrated with digital smart boards, specialized sound systems, and high-definition projectors.
              </p>
              <p>
                Through rich animations, visual charts, and educational software, teachers explain complex scientific diagrams, mathematical functions, and historical maps with absolute clarity. Students participate in quiz programs, presentations, and interactive modules, turning standard study into an exciting journey.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-black text-school-navy font-display mb-6 font-display">Smart Facilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-xl flex items-center justify-center text-school-saffron mb-4 border border-school-saffron/10">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Interactive Boards</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Advanced touch-sensitive panel screens supporting stylus draw, video play, and web links.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-xl flex items-center justify-center text-school-saffron-dark mb-4 border border-school-saffron/10">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Multimedia Library</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Access to preloaded 3D animations, simulations, and virtual experiments for RBSE curriculum.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-blue-light/80 text-school-blue rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Optimal Ergonomics</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Designed with adequate ventilation, non-glare lighting, and comfortable seating layouts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <aside className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-school-navy font-display mb-6 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-school-saffron" /> Classroom Norms
              </h3>
              <ul className="space-y-4 font-sans">
                {[
                  "Maintain focus during interactive screen presentations.",
                  "Stylus panels must be handled gently and only by teachers or under permission.",
                  "Report any visual panel errors or device lag immediately to the teacher.",
                  "Keep the classroom tidy and avoid placing water bottles near power switches."
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-school-saffron flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-100 text-center font-sans">
                <p className="text-xs text-slate-400 mb-4">Interested in visiting?</p>
                <Link 
                  href="/contact" 
                  className="w-full inline-block text-center bg-gradient-to-r from-school-saffron to-school-saffron-light text-white py-3 rounded-xl font-bold text-sm hover:opacity-95 active:scale-95 transition-all shadow-md"
                >
                  Contact Admissions
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
              <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] mb-3 inline-block">SMART LEARNING</span>
              <h2 className="text-3xl md:text-4xl font-black text-white font-display">Technology Meets Education</h2>
              <p className="text-slate-400 mt-2 text-sm font-sans">Visual recordings of digital learning modules and active classroom interactions.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              {[
                "/facilities/smart class 1.jpeg",
                "/facilities/smarrt class 2.jpeg"
              ].map((url, i) => (
                <div key={i} className="overflow-hidden rounded-3xl h-60 relative group shadow-lg border border-white/5">
                  <Image src={url} alt={`Smart Classroom ${i+1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
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
