import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import { BookOpen, FlaskConical, Calculator, Globe, Music, Trophy } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Academic programmes at Central Academy antah — Classes I to XII. RBSE affiliated. Strong faculty in Science, Commerce, and Arts streams.",
};

const STREAMS = [
  {
    title: "Science Stream",
    description:
      "Physics, Chemistry, Biology, Mathematics — rigorous preparation for engineering, medical, and research careers.",
    icon: <FlaskConical className="h-7 w-7" />,
    color: "bg-school-blue-light/50 text-school-blue",
  },
  {
    title: "Commerce Stream",
    description:
      "Accountancy, Business Studies, Economics, Maths — a strong foundation for CA, MBA, and business careers.",
    icon: <Calculator className="h-7 w-7" />,
    color: "bg-school-saffron-ghost text-school-saffron-dark",
  },
  {
    title: "Arts Stream",
    description:
      "History, Geography, Political Science, Hindi, English — nurturing thinkers, writers, and civil service aspirants.",
    icon: <BookOpen className="h-7 w-7" />,
    color: "bg-[#E0F2EE] text-[#0A4A3C]",
  },
  {
    title: "Primary (I–V)",
    description:
      "Activity-based learning, foundational literacy and numeracy, value education, and creative development.",
    icon: <Music className="h-7 w-7" />,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Middle School (VI–VIII)",
    description:
      "Subject specialisation begins — structured curriculum with Hindi, English, Maths, Science and Social Studies.",
    icon: <Globe className="h-7 w-7" />,
    color: "bg-rose-50 text-rose-600",
  },
  {
    title: "Secondary (IX–X)",
    description:
      "RBSE Board curriculum with focus on conceptual clarity, regular assessments, and board exam preparation.",
    icon: <Trophy className="h-7 w-7" />,
    color: "bg-teal-50 text-teal-600",
  },
];

export default function AcademicsPage() {
  return (
    <PublicLayout>
      {/* ── Page Banner (3-layer depth) ── */}
      <PageBanner
        titleEn="Academic Programs"
        titleHi="शैक्षणिक कार्यक्रम"
        eyebrowEn="RBSE Affiliated · Est. 2013"
        eyebrowHi="आरबीएसई संबद्ध · स्थापना 2013"
        imageSrc="/banner-main.png"
      />

      {/* Streams Grid */}
      <section className="py-24 px-6 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] mb-3 inline-block">OUR CURRICULUM</span>
            <h2 className="text-4xl md:text-5xl font-black text-school-navy font-display tracking-tight">
              Our Academic Programmes
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto font-sans">
              A complete academic journey from early childhood through Senior Secondary, tailored for Rajasthan's competitive academic environment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STREAMS.map((s) => (
              <div
                key={s.title}
                className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-6 border border-black/5 group-hover:scale-108 transition-transform duration-300 ${s.color}`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-black text-school-navy font-display mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-sans">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board info */}
      <section className="py-24 px-6 bg-school-ink border-t border-white/5 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(232,98,26,0.04)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] inline-block">RBSE AFFILIATION</span>
          <h2 className="text-3xl md:text-4xl font-black text-white font-display">Affiliation Details</h2>
          <p className="text-slate-300 leading-relaxed text-base md:text-lg font-sans">
            Central Academy Senior Secondary School is affiliated with the{" "}
            <strong className="text-school-saffron-light">
              Rajasthan Board of Secondary Education (RBSE)
            </strong>
            , Affiliation No. <strong>1212</strong>. Our curriculum strictly follows RBSE guidelines while supplementing with enrichment programmes in sports, arts, and life skills.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
