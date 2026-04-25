import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { 
  Library, 
  FlaskConical, 
  Monitor, 
  Wind, 
  ShieldCheck, 
  Globe, 
  Coffee, 
  Palette,
  Music,
  Dribbble,
  BookOpenCheck,
  Microscope
} from "lucide-react";

export default function Facilities() {
  const facilityData = [
    { 
      title: "Smart Classrooms", 
      desc: "Fully digitized classrooms equipped with high-definition interactive panels and audio-visual tools.", 
      icon: <Monitor />, 
      img: "/gallery/photo-dump/1741166362_slider-17.jpg",
      color: "blue"
    },
    { 
      title: "Science Laboratories", 
      desc: "Advanced physics, chemistry, and biology labs for hands-on experimental learning.", 
      icon: <Microscope />, 
      img: "/gallery/photo-dump/1741166776-5.jpeg",
      color: "amber"
    },
    { 
      title: "Digital Library", 
      desc: "A vast collection of 10,000+ books, journals, and e-resources in a quiet, modern space.", 
      icon: <Library />, 
      img: "/gallery/slider/1774511691_slider-52.jpg",
      color: "blue"
    },
    { 
      title: "Sports Complex", 
      desc: "State-of-the-art courts for basketball, volleyball, and a professional-grade cricket ground.", 
      icon: <Dribbble />, 
      img: "/gallery/photo-dump/1741166412_slider-20.jpg",
      color: "amber"
    },
    { 
      title: "Art & Culture Studio", 
      desc: "Creative spaces for fine arts, dance, and music to nurture the artistic side of students.", 
      icon: <Palette />, 
      img: "/gallery/photo-dump/celebration.jpg",
      color: "blue"
    },
    { 
      title: "Safe Transport", 
      desc: "A fleet of school buses with GPS tracking and dedicated attendants for secure commuting.", 
      icon: <ShieldCheck />, 
      img: "/gallery/students/1741166878-13.jpeg",
      color: "amber"
    }
  ];

  return (
    <PublicLayout>
      <section className="bg-school-blue py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-[0.3em] mb-6">World Class Infrastructure</span>
           <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">Beyond the Classroom</h1>
           <p className="text-school-blue-light/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
             From logic-driven laboratories to character-building playgrounds, explore the facilities that shape a holistic school life.
           </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {facilityData.map((f, i) => (
                 <div key={i} className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 hover:-translate-y-2 transition-all duration-500">
                    <div className="aspect-video relative overflow-hidden">
                       <img src={f.img} alt={f.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                       <div className={`absolute bottom-6 left-6 h-12 w-12 rounded-xl flex items-center justify-center text-white backdrop-blur-md shadow-2xl ${f.color === 'blue' ? 'bg-school-blue/80' : 'bg-school-amber/80'}`}>
                          {React.cloneElement(f.icon as React.ReactElement, { className: "h-6 w-6" })}
                       </div>
                    </div>
                    <div className="p-10">
                       <h3 className="text-2xl font-bold text-school-blue mb-4 group-hover:text-school-amber transition-colors">{f.title}</h3>
                       <p className="text-text-secondary leading-relaxed text-sm mb-8">{f.desc}</p>
                       <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest leading-none">Operational • Fully Inspected</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-24 px-6 bg-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-10">
               <div className="space-y-4">
                  <span className="text-xs font-bold text-school-blue uppercase tracking-[0.3em]">Quick Overview</span>
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight">Safety & Support Systems</h2>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <FeatureItem title="RO Drinking Water" icon={<Coffee />} />
                  <FeatureItem title="24/7 CCTV Security" icon={<ShieldCheck />} />
                  <FeatureItem title="Full Power Backup" icon={<Globe />} />
                  <FeatureItem title="First Aid & Medical" icon={<BookOpenCheck />} />
               </div>

               <p className="p-8 bg-slate-50 rounded-3xl text-sm italic text-text-secondary border-l-4 border-school-blue">
                 "Our campus is designed not just for learning, but for ensuring the absolute safety, comfort and hygiene of every student who walks through our gates."
               </p>
            </div>

            <div className="relative">
               <div className="absolute -inset-10 bg-school-amber opacity-10 rounded-full filter blur-3xl animate-pulse"></div>
               <img 
                 className="relative w-full aspect-square object-cover rounded-[3rem] shadow-2xl border-solid border-8 border-white" 
                 src="/gallery/photo-dump/1746853764_DSC_3837.jpg" 
                 alt="Safety" 
               />
               <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-xs transform -rotate-6">
                  <h4 className="text-3xl font-black text-school-blue mb-2">100%</h4>
                  <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest leading-relaxed">Secure Campus Environment</p>
               </div>
            </div>

         </div>
      </section>
    </PublicLayout>
  );
}

function FeatureItem({ title, icon }: { title: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 group">
       <div className="h-10 w-10 rounded-xl bg-school-blue-light text-school-blue flex items-center justify-center group-hover:bg-school-blue group-hover:text-white transition-all shadow-sm">
          {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4" })}
       </div>
       <span className="font-bold text-text-primary uppercase text-[10px] tracking-widest">{title}</span>
    </div>
  );
}
