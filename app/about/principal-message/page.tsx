import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Quote } from "lucide-react";

export default function PrincipalMessage() {
  return (
    <PublicLayout>
      <section className="bg-school-blue-light py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-school-amber rounded-2xl -z-10 animate-pulse"></div>
             <img 
               alt="Principal" 
               className="w-full h-[500px] object-cover rounded-2xl shadow-2xl border-8 border-white" 
               src="/gallery/photo-dump/1741578082-2.jpg" 
             />
             <div className="absolute bottom-6 right-6 bg-white p-6 rounded-xl shadow-xl border-l-4 border-school-amber">
                <h4 className="text-xl font-bold text-school-blue">Dr. S. K. Pathak</h4>
                <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mt-1">Principal, CAS Anta</p>
             </div>
          </div>
          <div className="md:col-span-7 space-y-8">
             <div className="inline-flex items-center gap-2 px-4 py-1 bg-school-blue text-white rounded-full text-xs font-bold uppercase tracking-widest">
                Leadership
             </div>
             <h1 className="text-4xl md:text-5xl font-bold text-school-blue leading-tight">Nurturing Leaders of Tomorrow</h1>
             
             <div className="relative">
                <Quote className="absolute -top-6 -left-6 h-12 w-12 text-school-amber/20" />
                <p className="text-lg text-text-secondary leading-relaxed italic">
                  "Education is not just about acquiring knowledge; it's about building character and fostering a spirit of inquiry that lasts a lifetime."
                </p>
             </div>

             <div className="space-y-6 text-text-primary leading-relaxed text-sm md:text-base">
                <p>
                  At Central Academy School, Anta, we believe that every child is unique and possesses immense potential. Our role is to provide a fertile ground where these seeds of talent can sprout and flourish into mighty oaks of excellence.
                </p>
                <p>
                  Our curriculum is designed to challenge the mind while nurturing the soul. We integrate traditional values with modern pedagogical techniques, ensuring our students are well-equipped to navigate the complexities of the 21st century.
                </p>
                <p>
                  We focus on holistic development—academics, sports, arts, and ethics. Our dedicated faculty works tirelessly to create an environment where curiosity is encouraged and failures are seen as stepping stones to success.
                </p>
                <p className="font-bold text-school-blue">
                  Join us in this journey of transformation and excellence.
                </p>
             </div>

             <div className="pt-8 border-t border-slate-200">
                <p className="font-bold text-text-primary">Warm Regards,</p>
                <img 
                  alt="Signature" 
                  className="h-16 mt-2 opacity-80" 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png" 
                />
             </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
