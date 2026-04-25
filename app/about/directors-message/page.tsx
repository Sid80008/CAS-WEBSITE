import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Award, Target, Heart } from "lucide-react";

export default function DirectorsMessage() {
  return (
    <PublicLayout>
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-4">
              <span className="text-xs font-bold text-school-amber uppercase tracking-[0.3em]">Founding Vision</span>
              <h1 className="text-5xl font-bold text-school-blue leading-tight tracking-tight">Our Commitment to <br /><span className="text-slate-900 underline decoration-school-amber underline-offset-8">Educational Excellence</span></h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 group hover:bg-school-blue transition-all duration-300">
                <Target className="h-8 w-8 text-school-blue group-hover:text-white" />
                <h4 className="font-bold text-sm text-school-blue group-hover:text-white">Precision</h4>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 group hover:bg-school-blue transition-all duration-300">
                <Heart className="h-8 w-8 text-school-amber" />
                <h4 className="font-bold text-sm text-school-blue group-hover:text-white">Integrity</h4>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 group hover:bg-school-blue transition-all duration-300">
                <Award className="h-8 w-8 text-emerald-600 group-hover:text-white" />
                <h4 className="font-bold text-sm text-school-blue group-hover:text-white">Success</h4>
              </div>
            </div>

            <div className="prose prose-lg text-text-primary leading-relaxed">
              <p className="font-bold text-xl text-school-blue/80 mb-6 italic">
                "We don't just build schools; we build foundations for a lifetime of success and meaningful contribution to society."
              </p>
              <p>
                As the Director of Central Academy School, Anta, it has been my lifelong mission to provide world-class education that is accessible and transformative. Since our inception in 1994, we have remained steadfast in our pursuit of excellence.
              </p>
              <p>
                Our vision is to create a learning ecosystem that goes beyond textbooks. We invest heavily in technology, infrastructure, and most importantly, in our people. Our teachers are mentors who ignite the fire of learning in every student.
              </p>
              <p>
                Education at CAS is a partnership between the school, the parents, and the student. Together, we create a supportive environment where dreams take flight.
              </p>
            </div>

            <div className="pt-10 flex items-center gap-6">
               <div className="h-px flex-1 bg-slate-200"></div>
               <div className="text-right">
                  <p className="font-black text-school-blue text-2xl tracking-tighter uppercase">Mr. Harish Pathak</p>
                  <p className="text-xs font-bold text-school-amber tracking-widest uppercase">Director & Founder</p>
               </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative group">
             <div className="absolute inset-0 bg-school-blue rounded-[40px] transform rotate-3 group-hover:rotate-1 transition-transform duration-500"></div>
             <img 
               alt="Director" 
               className="relative w-full h-[700px] object-cover rounded-[40px] shadow-2xl transition-transform duration-500 group-hover:-translate-y-2" 
               src="/gallery/photo-dump/1746853764_DSC_3837.jpg" 
             />
             <div className="absolute top-10 left-10 bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 text-white max-w-xs shadow-2xl">
                <span className="text-4xl font-black block mb-2">30+</span>
                <span className="text-xs font-bold tracking-widest uppercase">Years of Educational Leadership</span>
             </div>
          </div>

        </div>
      </section>
    </PublicLayout>
  );
}
