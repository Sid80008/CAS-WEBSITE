import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { Palette, Music, Sparkles, CheckCircle, ShieldAlert, Heart } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Art & Culture Studio | Central Academy Anta",
  description: "Explore the creative spaces at Central Academy Anta. Dedicated studios for Fine Arts, Dance, and Instrumental & Vocal Music.",
};

export default function ArtCulturePage() {
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
            <span className="text-slate-800 font-medium">Art & Culture Studio</span>
          </nav>
        </section>

        {/* Hero Section */}
        <section className="relative h-[450px] w-full overflow-hidden flex items-end">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('/gallery/photo-dump/celebration.jpg')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00386b]/95 via-[#00386b]/60 to-transparent" />
          <div className="relative w-full max-w-7xl mx-auto px-6 pb-12 z-10 text-white">
            <span className="bg-school-amber text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              CREATIVE & EXPRESSIVE
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Art & Culture Studio</h1>
            <p className="text-base md:text-lg max-w-2xl opacity-90 italic border-l-4 border-school-amber pl-4 font-light">
              "Nurturing fine arts, rhythmic dance, and musical talent to discover and celebrate creative voices."
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-extrabold text-school-blue mb-6">Nurturing Artistic Expression</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
              <p>
                At Central Academy Anta, creative growth is just as vital as analytical study. Our Art & Culture Studio offers specialized spaces for painting, drawing, sculpture, classical/modern dance, and vocal/instrumental music. Led by experienced artists and musicians, students explore their artistic dimensions and express their individualities.
              </p>
              <p>
                We believe that every child has a unique creative spark. Through our comprehensive arts curriculum and annual cultural festivals, students develop confidence, fine motor skills, spatial coordination, and deep appreciation for diverse heritage and classical traditions.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-school-blue mb-6">Creative Disciplines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-blue/10 rounded-xl flex items-center justify-center text-school-blue mb-4">
                    <Palette className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">Fine Arts</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Painting, sketch work, clay sculpting, pottery wheel, and craft designs.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-school-amber/10 rounded-xl flex items-center justify-center text-school-amber mb-4">
                    <Music className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">Music Room</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Classical Indian and western instruments including synthesizers, guitar, and tabla.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-md">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2 text-base">Dance Floor</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">A wooden-floored studio with wall-to-wall mirrors for practice and training sessions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Guidelines */}
          <aside className="lg:col-span-4">
            <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold text-school-blue mb-6 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-school-amber" /> Studio Guidelines
              </h3>
              <ul className="space-y-4">
                {[
                  "Clean up palettes, paintbrushes, and workspace at the end of every session.",
                  "Store instruments safely in their dedicated cases and stands after practice.",
                  "Clean indoor shoes or bare feet only are allowed on the wooden dance floor.",
                  "Support and respect classmates' designs, creative work, and performances."
                ].map((item, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-school-amber flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-400 mb-4">Want to see our students' work?</p>
                <Link 
                  href="/contact" 
                  className="w-full inline-block text-center bg-school-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-school-blue-dark active:scale-95 transition-all shadow-sm"
                >
                  Contact Arts Dept
                </Link>
              </div>
            </div>
          </aside>
        </section>

        {/* Gallery Section */}
        <section className="bg-school-blue-light py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-school-blue">Creative expressions in progress</h2>
              <p className="text-slate-600 mt-2 text-sm">A display of performance, colors, and student imagination.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "/gallery/photo-dump/celebration.jpg",
                "/gallery/photo-dump/1741166362_slider-17.jpg",
                "/gallery/photo-dump/1741166412_slider-20.jpg",
                "/gallery/photo-dump/1741166776-5.jpeg"
              ].map((url, i) => (
                <div key={i} className="overflow-hidden rounded-2xl h-60 relative group shadow-sm">
                  <img src={url} alt={`Creative Life ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
