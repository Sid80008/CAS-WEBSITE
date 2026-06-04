import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import { Palette, Music, Sparkles, CheckCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Art & Culture Studio | Central Academy Anta",
  description: "Explore the creative spaces at Central Academy Anta. Dedicated studios for Fine Arts, Dance, and Instrumental & Vocal Music.",
};

export default function ArtCulturePage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#FAFAF5] text-text-primary">
        {/* Page Banner (3-layer depth) */}
        <PageBanner
          titleEn="Art & Culture Studio"
          titleHi="कला और संस्कृति स्टूडियो"
          eyebrowEn="CREATIVE & EXPRESSIVE"
          eyebrowHi="रचनात्मक और अभिव्यक्ति"
          imageSrc="/gallery/photo-dump/celebration.jpg"
        />

        {/* Breadcrumb - Overlaid nicely */}
        <section className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-sans">
            <Link href="/" className="hover:text-school-saffron transition-colors">Home</Link>
            <span>/</span>
            <Link href="/facilities" className="hover:text-school-saffron transition-colors">Facilities</Link>
            <span>/</span>
            <span className="text-school-navy font-bold">Art & Culture Studio</span>
          </nav>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-school-navy font-display">Nurturing Artistic Expression</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base font-sans">
              <p>
                At Central Academy Anta, creative growth is just as vital as analytical study. Our Art & Culture Studio offers specialized spaces for painting, drawing, sculpture, classical/modern dance, and vocal/instrumental music. Led by experienced artists and musicians, students explore their artistic dimensions and express their individualities.
              </p>
              <p>
                We believe that every child has a unique creative spark. Through our comprehensive arts curriculum and annual cultural festivals, students develop confidence, fine motor skills, spatial coordination, and deep appreciation for diverse heritage and classical traditions.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-black text-school-navy font-display mb-6">Creative Disciplines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-xl flex items-center justify-center text-school-saffron mb-4 border border-school-saffron/10">
                    <Palette className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Fine Arts</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Painting, sketch work, clay sculpting, pottery wheel, and craft designs.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-xl flex items-center justify-center text-school-saffron-dark mb-4 border border-school-saffron/10">
                    <Music className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Music Room</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">Classical Indian and western instruments including synthesizers, guitar, and tabla.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-blue-light/80 text-school-blue rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-school-navy mb-2 text-base font-display">Dance Floor</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans">A wooden-floored studio with wall-to-wall mirrors for practice and training sessions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <aside className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-school-navy font-display mb-6 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-school-saffron" /> Studio Guidelines
              </h3>
              <ul className="space-y-4 font-sans">
                {[
                  "Clean up palettes, paintbrushes, and workspace at the end of every session.",
                  "Store instruments safely in their dedicated cases and stands after practice.",
                  "Clean indoor shoes or bare feet only are allowed on the wooden dance floor.",
                  "Support and respect classmates' designs, creative work, and performances."
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-school-saffron flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-100 text-center font-sans">
                <p className="text-xs text-slate-400 mb-4">Want to see our students' work?</p>
                <Link 
                  href="/contact" 
                  className="w-full inline-block text-center bg-gradient-to-r from-school-saffron to-school-saffron-light text-white py-3 rounded-xl font-bold text-sm hover:opacity-95 active:scale-95 transition-all shadow-md"
                >
                  Contact Arts Dept
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
              <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] mb-3 inline-block">PORTFOLIO</span>
              <h2 className="text-3xl md:text-4xl font-black text-white font-display">Creative Expressions in Progress</h2>
              <p className="text-slate-400 mt-2 text-sm font-sans">A display of performance, colors, and student imagination.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "/gallery/photo-dump/celebration.jpg",
                "/gallery/photo-dump/1741166362_slider-17.jpg",
                "/gallery/photo-dump/1741166412_slider-20.jpg",
                "/gallery/photo-dump/1741166776-5.jpeg"
              ].map((url, i) => (
                <div key={i} className="overflow-hidden rounded-3xl h-60 relative group shadow-lg border border-white/5">
                  <img src={url} alt={`Creative Life ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
