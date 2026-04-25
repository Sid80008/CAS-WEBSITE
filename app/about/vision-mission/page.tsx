import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Visibility, TrackChanges, Verified } from "@mui/icons-material";
import { Eye, Target, ShieldCheck, Flame } from "lucide-react";

export default function VisionMission() {
  return (
    <PublicLayout>
      <section className="bg-school-blue py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-[0.3em] mb-6">Our DNA</span>
           <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">Vision, Mission & Core Values</h1>
           <p className="text-school-blue-light/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium italic">
             "Defining the path towards a brighter future through purposeful education and unwavering values."
           </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
           
           {/* Vision Card */}
           <div className="p-12 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:border-school-blue transition-all duration-500">
              <div className="h-20 w-20 rounded-3xl bg-school-blue-light text-school-blue flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-transform shadow-lg shadow-school-blue/10">
                 <Eye className="h-10 w-10" />
              </div>
              <h2 className="text-4xl font-bold text-school-blue mb-6">Our Vision</h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                To be a premier institution of global repute, fostering an environment where innovation meets tradition, and where every learner is empowered to reach their zenith of potential through holistic and value-based education.
              </p>
           </div>

           {/* Mission Card */}
           <div className="p-12 rounded-[2rem] bg-school-blue text-white shadow-xl shadow-school-blue/30 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
              <div className="h-20 w-20 rounded-3xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform border border-white/20">
                 <Target className="h-10 w-10" />
              </div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                To provide a nurturing and inclusive learning community that inspires academic rigour, develops critical thinking, and cultivates compassionate citizens who are prepared to contribute positively to the ever-evolving global society.
              </p>
           </div>

        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-school-blue tracking-tight">Our Core Values</h2>
              <p className="text-text-secondary mt-4 max-w-xl mx-auto">The foundational pillars that guide our every decision and action within the CAS community.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ValueCard 
                title="Academic Rigour" 
                desc="Striving for the highest standards in teaching and learning." 
                icon={<Flame />} 
              />
              <ValueCard 
                title="Integrity" 
                desc="Building trust through honesty, transparency and ethical conduct." 
                icon={<ShieldCheck />} 
              />
              <ValueCard 
                title="Global Mindset" 
                desc="Understanding and respecting diverse cultures and perspectives." 
                icon={<Eye />} 
              />
              <ValueCard 
                title="Innovation" 
                desc="Embracing new ideas and creative problem-solving approaches." 
                icon={<Target />} 
              />
           </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function ValueCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group text-center flex flex-col items-center border-b-8 border-b-transparent hover:border-b-school-amber">
       <div className="h-14 w-14 rounded-2xl bg-slate-50 text-school-blue flex items-center justify-center mb-6 group-hover:bg-school-blue group-hover:text-white transition-all shadow-sm">
          {icon}
       </div>
       <h4 className="text-xl font-bold text-school-blue mb-4 leading-tight">{title}</h4>
       <p className="text-sm text-text-tertiary leading-relaxed">{desc}</p>
    </div>
  );
}
