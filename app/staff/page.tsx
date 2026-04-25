import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import { GraduationCap, Award, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getStaff() {
  return await prisma.staff.findMany({
    include: {
      subjects: {
        include: {
          subject: true
        }
      }
    }
  });
}

export default async function PublicStaff() {
  const staff = await getStaff();

  return (
    <PublicLayout>
      <section className="bg-school-blue py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 -z-0"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-[0.3em] mb-6">Our Educators</span>
           <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">Meet Our Dedicated Faculty</h1>
           <p className="text-school-blue-light/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
             Crafting the future with expertise, empathy, and an unwavering commitment to educational excellence.
           </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {staff.map((member) => (
              <div key={member.id} className="group">
                 <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl mb-6 bg-white border border-slate-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-school-blue/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col justify-end p-8">
                       <div className="flex gap-3 mb-4">
                          <button className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-school-amber transition-colors">
                             <Mail className="h-4 w-4" />
                          </button>
                          <button className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-school-amber transition-colors">
                             <MessageSquare className="h-4 w-4" />
                          </button>
                       </div>
                       <p className="text-xs text-white/70 italic leading-relaxed">
                         "Committed to nurturing curiosity and excellence in every student I mentor."
                       </p>
                    </div>
                    
                    <div className="w-full h-full flex flex-col items-center justify-center bg-school-blue-light/20 text-school-blue">
                       <GraduationCap className="h-20 w-20 opacity-20 group-hover:scale-110 transition-transform duration-500" />
                       <span className="text-[10px] font-bold uppercase tracking-widest mt-4">Faculty ID: {member.id.substring(0, 5)}</span>
                    </div>

                    <div className="absolute top-6 right-6">
                       <div className="h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-100 transform rotate-12 group-hover:rotate-0 transition-transform">
                          <Award className="h-5 w-5 text-school-amber" />
                       </div>
                    </div>
                 </div>

                 <div className="text-center group-hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-school-blue mb-1">{member.name}</h3>
                    <p className="text-[10px] font-black text-school-amber uppercase tracking-[0.2em] mb-3">
                      {member.subjects?.map(s => s.subject.name).join(", ") || "Administrative Expert"}
                    </p>
                    <div className="flex items-center justify-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                       <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Available for Consultation</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
         <div className="max-w-5xl mx-auto rounded-[3rem] bg-school-blue-light/30 border border-school-blue/10 p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-school-blue mb-6 tracking-tight">Join Our Excellence Network</h2>
            <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">We are always looking for passionate educators and skilled professionals to join our growing family. Shape the leaders of tomorrow with us.</p>
            <div className="flex flex-wrap justify-center gap-4">
               <Button className="h-14 px-10 bg-school-blue hover:bg-school-blue-dark text-white font-bold rounded-xl uppercase tracking-widest text-[10px] shadow-2xl">
                  View Careers
               </Button>
               <Button variant="outline" className="h-14 px-10 border-school-blue text-school-blue font-bold rounded-xl uppercase tracking-widest text-[10px]">
                  Contact HR
               </Button>
            </div>
         </div>
      </section>
    </PublicLayout>
  );
}
