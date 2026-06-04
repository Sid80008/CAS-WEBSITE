import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import Link from "next/link";
import { 
  Library, 
  ShieldCheck, 
  Globe, 
  Coffee, 
  Palette,
  Music,
  Trophy,
  BookOpenCheck,
  Microscope,
  Monitor
} from "lucide-react";

export function FacilitiesContent() {
  const facilityData = [
    { 
      title: "Smart Classrooms", 
      desc: "Fully digitized classrooms equipped with high-definition interactive panels and audio-visual tools.", 
      icon: <Monitor />, 
      img: "/gallery/photo-dump/1741166362_slider-17.jpg",
      color: "saffron",
      slug: "smart-classrooms"
    },
    { 
      title: "Science Laboratories", 
      desc: "Advanced physics, chemistry, and biology labs for hands-on experimental learning.", 
      icon: <Microscope />, 
      img: "/gallery/photo-dump/1741166776-5.jpeg",
      color: "blue",
      slug: "labs"
    },
    { 
      title: "Digital Library", 
      desc: "A well-stocked library with books, journals, and reference materials to support academic research and a love of reading.", 
      icon: <Library />, 
      img: "/gallery/slider/1774511691_slider-52.jpg",
      color: "saffron",
      slug: "library"
    },
    { 
      title: "Sports Complex", 
      desc: "State-of-the-art courts for basketball, volleyball, and a professional-grade cricket ground.", 
      icon: <Trophy />, 
      img: "/gallery/photo-dump/1741166412_slider-20.jpg",
      color: "blue",
      slug: "sports"
    },
    { 
      title: "Art & Culture Studio", 
      desc: "Creative spaces for fine arts, dance, and music to nurture the artistic side of students.", 
      icon: <Palette />, 
      img: "/gallery/photo-dump/celebration.jpg",
      color: "saffron",
      slug: "art-culture"
    },
    { 
      title: "Safe Transport", 
      desc: "A fleet of school buses with GPS tracking and dedicated attendants for secure commuting.", 
      icon: <ShieldCheck />, 
      img: "/gallery/students/1741166878-13.jpeg",
      color: "blue",
      slug: "transport"
    }
  ];

  return (
    <PublicLayout>
      {/* ── Page Banner (3-layer depth) ── */}
      <PageBanner
        titleEn="Beyond the Classroom"
        titleHi="कक्षा से परे"
        eyebrowEn="World Class Infrastructure"
        eyebrowHi="विश्व स्तरीय बुनियादी ढांचा"
        imageSrc="/gallery/slider/1758787566_WhatsApp Image 2025-09-14 at 6.jpeg"
      />

      {/* Grid Section */}
      <section className="py-24 px-6 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {facilityData.map((f, i) => (
              <div key={i} className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200/60 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                <div className="aspect-video relative overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-ink/75 to-transparent"></div>
                  <div className={`absolute bottom-6 left-6 h-12 w-12 rounded-xl flex items-center justify-center text-white backdrop-blur-md shadow-2xl ${f.color === 'saffron' ? 'bg-school-saffron/80' : 'bg-school-blue/80'}`}>
                    {React.cloneElement(f.icon as React.ReactElement, { className: "h-6 w-6" })}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-school-navy mb-4 font-display group-hover:text-school-saffron transition-colors">
                      <Link href={`/facilities/${f.slug}`}>{f.title}</Link>
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-sm mb-8 font-sans">{f.desc}</p>
                  </div>
                  <div>
                    <Link 
                      href={`/facilities/${f.slug}`} 
                      className="inline-flex items-center text-sm font-bold text-school-blue group-hover:text-school-saffron transition-colors"
                    >
                      Explore Detail →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section (Alternating rhythm: Cinematic dark background) */}
      <section className="py-24 px-6 bg-school-ink overflow-hidden relative border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(232,98,26,0.06)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-school-saffron/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.3em] block">Safety & Support Systems</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight font-display leading-tight">Securing Your Child's Environment</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <FeatureItem title="RO Drinking Water" icon={<Coffee />} />
              <FeatureItem title="24/7 CCTV Security" icon={<ShieldCheck />} />
              <FeatureItem title="Full Power Backup" icon={<Globe />} />
              <FeatureItem title="First Aid & Medical" icon={<BookOpenCheck />} />
            </div>

            <p className="p-8 bg-school-navy/60 rounded-3xl text-sm italic text-slate-300 border-l-4 border-school-saffron font-sans">
              "Our campus is designed not just for learning, but for ensuring the absolute safety, comfort and hygiene of every student who walks through our gates."
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-school-saffron opacity-10 rounded-full filter blur-3xl animate-pulse"></div>
            <img 
              className="relative w-full aspect-square object-cover rounded-[3rem] shadow-2xl border-solid border-8 border-school-navy/80" 
              src="/gallery/photo-dump/1746853764_DSC_3837.jpg" 
              alt="Safety" 
            />
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-school-navy/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 max-w-xs transform -rotate-6">
              <h4 className="text-3xl font-black text-white font-display mb-2">Safe Campus</h4>
              <p className="text-[10px] font-bold text-school-saffron uppercase tracking-widest leading-relaxed">CCTV • Trained Staff • Medical Room</p>
            </div>
          </div>

        </div>
      </section>
    </PublicLayout>
  );
}

interface FeatureItemProps {
  title: string;
  icon: React.ReactNode;
}

function FeatureItem({ title, icon }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-school-saffron-light flex items-center justify-center group-hover:bg-school-saffron group-hover:text-white transition-all shadow-sm">
        {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4" })}
      </div>
      <span className="font-bold text-white uppercase text-[10px] tracking-widest font-sans">{title}</span>
    </div>
  );
}
