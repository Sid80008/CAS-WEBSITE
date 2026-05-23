import PublicLayout from "@/components/layout/PublicLayout";
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
    color: "bg-blue-50 text-school-blue",
  },
  {
    title: "Commerce Stream",
    description:
      "Accountancy, Business Studies, Economics, Maths — a strong foundation for CA, MBA, and business careers.",
    icon: <Calculator className="h-7 w-7" />,
    color: "bg-amber-50 text-school-amber",
  },
  {
    title: "Arts Stream",
    description:
      "History, Geography, Political Science, Hindi, English — nurturing thinkers, writers, and civil service aspirants.",
    icon: <BookOpen className="h-7 w-7" />,
    color: "bg-emerald-50 text-emerald-600",
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
      {/* Hero */}
      <section className="bg-school-blue py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-[0.3em] mb-6">
            RBSE Affiliated · Affiliation No. 1212
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Academics
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Classes Nursery to XII — a structured, holistic curriculum designed to build strong foundations and prepare every student for their future.
          </p>
        </div>
      </section>

      {/* Streams Grid */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-school-blue tracking-tight">
              Our Academic Programmes
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              A complete academic journey from early childhood through Senior Secondary, tailored for Rajasthan's competitive academic environment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STREAMS.map((s) => (
              <div
                key={s.title}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-5 ${s.color}`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-school-blue mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board info */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-school-blue mb-4">Board Affiliation</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Central Academy Senior Secondary School is affiliated with the{" "}
            <strong className="text-school-blue">
              Rajasthan Board of Secondary Education (RBSE)
            </strong>
            , Affiliation No. <strong>1212</strong>. Our curriculum strictly follows RBSE guidelines while supplementing with enrichment programmes in sports, arts, and life skills.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
