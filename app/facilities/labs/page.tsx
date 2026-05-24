import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { Microscope, Beaker, Compass, ShieldAlert, CheckCircle, GraduationCap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Science Laboratories | Central Academy Anta",
  description: "Explore the state-of-the-art Science Laboratories at Central Academy Anta. Workstations designed for Physics, Chemistry, and Biology.",
};

export default function LabsPage() {
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
            <span className="text-slate-800 font-medium">Science Laboratories</span>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="relative h-[450px] w-full overflow-hidden flex items-end">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('/gallery/photo-dump/1741166776-5.jpeg')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00386b]/95 via-[#00386b]/60 to-transparent" />
          <div className="relative w-full max-w-7xl mx-auto px-6 pb-12 z-10 text-white">
            <span className="bg-school-amber text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              SCIENTIFIC INQUIRY
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Science Laboratories</h1>
            <p className="text-base md:text-lg max-w-2xl opacity-90 italic border-l-4 border-school-amber pl-4 font-light">
              "Equipping young minds with the tools of investigation, discovery, and empirical excellence."
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-extrabold text-school-blue mb-6">Hands-On Experimental Learning</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
              <p>
                Our Science Laboratories at Central Academy Anta are fully equipped spaces that encourage students to learn through exploration and inquiry. With custom-built workstations for Physics, Chemistry, and Biology, our students engage in practical applications of theoretical knowledge, building a deep understanding of scientific methods.
              </p>
              <p>
                We believe that true scientific learning happens when students design experiments, measure variables, observe phenomena, and draw empirical conclusions. Our curriculum integrates weekly lab sessions led by subject matter experts, preparing senior secondary students for board exams and higher education research.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-school-blue mb-6">Our Laboratories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-blue/10 rounded-xl flex items-center justify-center text-school-blue mb-4">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">Physics Laboratory</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Equipped with advanced optical benches, electrical circuit trainers, and mechanics setups.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-amber/10 rounded-xl flex items-center justify-center text-school-amber mb-4">
                    <Beaker className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">Chemistry Laboratory</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Features high-grade reagents, safety exhaust hoods, electronic balances, and distillation units.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                    <Microscope className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">Biology Laboratory</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Houses research microscopes, preserved plant/animal specimens, and molecular modeling kits.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <aside className="lg:col-span-4">
            <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold text-school-blue mb-6 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-school-amber" /> Lab Safety Guidelines
              </h3>
              <ul className="space-y-4">
                {[
                  "Lab coats and closed-toe footwear must be worn during all sessions.",
                  "Do not handle any chemicals, burners, or devices without supervisor approval.",
                  "Familiarize yourself with emergency eye-wash stations and exit paths.",
                  "Report any spills, glass breakage, or minor burns immediately to the teacher."
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-school-amber flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-400 mb-4">Interested in visiting our labs?</p>
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
              <h2 className="text-3xl font-extrabold text-school-blue">Lab Sessions in Progress</h2>
              <p className="text-slate-600 mt-2 text-sm">Empowering students through empirical methods and deep discovery.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "/gallery/photo-dump/1741166776-5.jpeg",
                "/gallery/photo-dump/1741166878-13.jpeg",
                "/gallery/photo-dump/1741166362_slider-17.jpg",
                "/gallery/photo-dump/1746853764_DSC_3837.jpg"
              ].map((url, i) => (
                <div key={i} className="overflow-hidden rounded-2xl h-60 relative group shadow-sm">
                  <img src={url} alt={`Lab Session ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
