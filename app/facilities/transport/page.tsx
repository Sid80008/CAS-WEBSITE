import React from "react";
import { Metadata } from "next";
import { Bus, ShieldCheck, MapPin } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "School Transport",
  description: "Safe and reliable school transport services covering major routes in and around antah, Baran.",
};

const routes = [
  { area: "antah City Area", stops: ["Main Market", "Railway Station", "Civil Lines", "Housing Board"] },
  { area: "Baran Road Route", stops: ["Kota Bypass", "Industrial Area", "Naya Gaon", "Siswa"] },
  { area: "Mangrol Route", stops: ["Batawadi", "Siswali", "Mangrol Bypass"] },
];

export default function TransportPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-[#e29b16]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Bus className="h-8 w-8 text-[#e29b16]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B4F8A] mb-4">School Transport</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            We provide safe, comfortable, and reliable transport facilities for our students across antah and surrounding areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <ShieldCheck className="text-emerald-500 h-6 w-6" /> Safety First
            </h2>
            <ul className="space-y-4">
              {[
                "All buses are equipped with GPS tracking.",
                "Speed governors installed to ensure safe driving limits.",
                "First-aid kits and fire extinguishers in every vehicle.",
                "Trained and verified drivers with female attendants.",
                "Regular maintenance and safety audits of the fleet."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1B4F8A] mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <MapPin className="text-[#e29b16] h-6 w-6" /> Major Routes Covered
            </h2>
            <div className="space-y-6">
              {routes.map((route, i) => (
                <div key={i}>
                  <h3 className="font-bold text-[#1B4F8A] mb-2">{route.area}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {route.stops.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-slate-400 italic">
              * Note: Please contact the school transport office for exact timing and fee details for your specific location.
            </p>
          </div>
        </div>
      </div>
    </main>
    </PublicLayout>
  );
}
