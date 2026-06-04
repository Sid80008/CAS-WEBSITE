import React from "react";
import { Metadata } from "next";
import { Bus, ShieldCheck, MapPin } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "School Transport | Central Academy Anta",
  description: "Safe and reliable school transport services covering major routes in and around Anta, Baran.",
};

const routes = [
  { area: "Anta City Area", stops: ["Main Market", "Railway Station", "Civil Lines", "Housing Board"] },
  { area: "Baran Road Route", stops: ["Kota Bypass", "Industrial Area", "Naya Gaon", "Siswa"] },
  { area: "Mangrol Route", stops: ["Batawadi", "Siswali", "Mangrol Bypass"] },
];

export default function TransportPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#FAFAF5] text-text-primary">
        {/* Page Banner (3-layer depth) */}
        <PageBanner
          titleEn="School Transport"
          titleHi="स्कूल परिवहन"
          eyebrowEn="SECURE JOURNEYS"
          eyebrowHi="सुरक्षित यात्रा"
          imageSrc="/gallery/students/1741166878-13.jpeg"
        />

        {/* Breadcrumb */}
        <section className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-sans">
            <Link href="/" className="hover:text-school-saffron transition-colors">Home</Link>
            <span>/</span>
            <Link href="/facilities" className="hover:text-school-saffron transition-colors">Facilities</Link>
            <span>/</span>
            <span className="text-school-navy font-bold">School Transport</span>
          </nav>
        </section>

        {/* Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-school-navy font-display flex items-center gap-3">
              <ShieldCheck className="text-school-saffron h-8 w-8" /> Safety First
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base font-sans">
              <p>
                We provide safe, comfortable, and reliable transport facilities for our students across Anta and surrounding areas. Our vehicle fleet undergoes periodic inspection and audits to maintain global safety standards.
              </p>
            </div>
            <ul className="space-y-4 font-sans text-sm md:text-base">
              {[
                "All buses are equipped with GPS tracking.",
                "Speed governors installed to ensure safe driving limits.",
                "First-aid kits and fire extinguishers in every vehicle.",
                "Trained and verified drivers with female attendants.",
                "Regular maintenance and safety audits of the fleet."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <div className="w-2 h-2 rounded-full bg-school-saffron mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Sidebar Guidelines */}
          <aside className="lg:col-span-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-lg">
              <h2 className="text-2xl font-black text-school-navy font-display mb-6 flex items-center gap-3">
                <MapPin className="text-school-saffron h-6 w-6" /> Major Routes Covered
              </h2>
              <div className="space-y-6 font-sans">
                {routes.map((route, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-100 bg-[#FAFAF5]">
                    <h3 className="font-bold text-school-navy font-display mb-1">{route.area}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {route.stops.join(" • ")}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xs text-slate-400 italic font-sans">
                * Note: Please contact the school transport office for exact timing and fee details for your specific location.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </PublicLayout>
  );
}
