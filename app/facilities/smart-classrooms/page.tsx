import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { Monitor, BookOpenCheck, LayoutGrid, CheckCircle, Shield, Play } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smart Classrooms | Central Academy Anta",
  description: "Experience modern education in Smart Classrooms at Central Academy Anta. Mapped with 4K touch displays and digitized learning setups.",
};

export default function SmartClassroomsPage() {
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
            <span className="text-slate-800 font-medium">Smart Classrooms</span>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="relative h-[450px] w-full overflow-hidden flex items-end">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('/gallery/photo-dump/1741166362_slider-17.jpg')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00386b]/95 via-[#00386b]/60 to-transparent" />
          <div className="relative w-full max-w-7xl mx-auto px-6 pb-12 z-10 text-white">
            <span className="bg-school-amber text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              MODERN LEARNING
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Smart Classrooms</h1>
            <p className="text-base md:text-lg max-w-2xl opacity-90 italic border-l-4 border-school-amber pl-4 font-light">
              "Transforming standard classrooms into active digital environments where knowledge comes to life."
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-extrabold text-school-blue mb-6">Interactive Audio-Visual Instruction</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
              <p>
                At Central Academy Anta, we believe in integrating advanced educational technology with traditional teaching methods. Our classrooms are fully equipped with smart interactive display systems, high-speed internet, and ergonomic furniture, creating an immersive space where visual learning flourishes.
              </p>
              <p>
                We employ digitized visual maps, 3D simulations, and video explanations to simplify complex concepts in math, science, and history. With interactive panels, teachers can easily pull up educational web tools and write digital notes that are shared directly with students, raising classroom engagement to a whole new level.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-school-blue mb-6">Key Infrastructure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-blue/10 rounded-xl flex items-center justify-center text-school-blue mb-4">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">4K Interactive Displays</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Touchscreen smartboards supporting multi-user inputs and real-time screen writing.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-amber/10 rounded-xl flex items-center justify-center text-school-amber mb-4">
                    <BookOpenCheck className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">Rich Smart Content</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Integrated multimedia content, virtual science labs, and interactive quizzes.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                    <LayoutGrid className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">Comfortable Layout</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Spacious seating, optimized acoustics, and safety power grids in all classes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <aside className="lg:col-span-4">
            <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold text-school-blue mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-school-amber" /> Smart Class Rules
              </h3>
              <ul className="space-y-4">
                {[
                  "Do not touch or write on the interactive panels without teacher permission.",
                  "Return stylus and other board accessories to their chargers/holders.",
                  "Report screen lags, wiring problems, or device faults to IT support immediately.",
                  "Keep the seating area clean, organized, and free of food debris."
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-school-amber flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-400 mb-4">Questions about smart setups?</p>
                <Link 
                  href="/contact" 
                  className="w-full inline-block text-center bg-school-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-school-blue-dark active:scale-95 transition-all shadow-sm"
                >
                  Contact IT Admin
                </Link>
              </div>
            </div>
          </aside>
        </section>

        {/* Gallery Section */}
        <section className="bg-school-blue-light py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-school-blue">Classrooms in Session</h2>
              <p className="text-slate-600 mt-2 text-sm">Where interactive visualization boosts student understanding.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "/gallery/photo-dump/1741166362_slider-17.jpg",
                "/gallery/photo-dump/1741166412_slider-20.jpg",
                "/gallery/photo-dump/1741166776-5.jpeg",
                "/gallery/photo-dump/1746853764_DSC_3837.jpg"
              ].map((url, i) => (
                <div key={i} className="overflow-hidden rounded-2xl h-60 relative group shadow-sm">
                  <img src={url} alt={`Classroom Life ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
