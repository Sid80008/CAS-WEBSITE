export const dynamic = "force-dynamic";

import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import prisma from "@/lib/prisma";
import { GraduationCap, Award, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBanner } from "@/components/layout/PageBanner";

async function getStaff() {
  try {
    const staff = await prisma.staff.findMany({
      include: {
        subjects: {
          include: {
            subject: true
          }
        }
      }
    });
    if (staff.length > 0) return staff;
  } catch {
    // Database connection error fallback
  }

  // Static fallback if DB is not populated
  return [
    {
      id: "st1",
      name: "Siddharth Meena",
      subjects: [{ subject: { name: "Mathematics" } }],
    },
    {
      id: "st2",
      name: "Garvit Damadiya",
      subjects: [{ subject: { name: "Computer Science" } }],
    },
    {
      id: "st3",
      name: "Rekhraj Meena",
      subjects: [{ subject: { name: "Administrative Head" } }],
    },
  ];
}

export default async function PublicStaff() {
  const staff = await getStaff();

  return (
    <PublicLayout>
      {/* Header Banner */}
      <PageBanner
        titleEn="Meet Our Faculty"
        titleHi="हमारे शिक्षकगण"
        eyebrowEn="Our Educators"
        eyebrowHi="हमारे शिक्षक"
        imageSrc="/gallery/photo-dump/1741166362_slider-17.jpg"
      />

      {/* Faculty Grid */}
      <section className="py-24 px-6 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {staff.map((member) => (
              <div key={member.id} className="group">
                 <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg mb-6 bg-white border border-slate-200/50 transition-all duration-500 group-hover:border-school-saffron/30">
                    <div className="absolute inset-0 bg-gradient-to-t from-school-ink via-school-navy/85 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex flex-col justify-end p-8">
                       <div className="flex gap-3 mb-4">
                          <button className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-school-saffron transition-colors border border-white/10">
                             <Mail className="h-4 w-4" />
                          </button>
                          <button className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-school-saffron transition-colors border border-white/10">
                             <MessageSquare className="h-4 w-4" />
                          </button>
                       </div>
                       <p className="text-xs text-white/80 italic leading-relaxed">
                         "Committed to nurturing curiosity and excellence in every student I mentor."
                       </p>
                    </div>
                    
                    <div className="w-full h-full flex flex-col items-center justify-center bg-school-saffron-ghost/25 text-school-saffron">
                       <GraduationCap className="h-20 w-20 opacity-30 group-hover:scale-110 transition-transform duration-500" />
                       <span className="text-[10px] font-bold uppercase tracking-widest mt-4 text-slate-500">Faculty ID: {member.id.substring(0, 5)}</span>
                    </div>

                    <div className="absolute top-6 right-6">
                       <div className="h-10 w-10 rounded-full bg-white shadow-xl flex items-center justify-center border border-slate-100 transform rotate-12 group-hover:rotate-0 transition-transform">
                          <Award className="h-5 w-5 text-school-saffron" />
                       </div>
                    </div>
                 </div>

                 <div className="text-center group-hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-school-navy mb-1 font-display">{member.name}</h3>
                    <p className="text-[10px] font-black text-school-saffron uppercase tracking-[0.2em] mb-3">
                      {member.subjects?.map(s => s.subject.name).join(", ") || "Administrative Expert"}
                    </p>
                    <div className="flex items-center justify-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Available for Consultation</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-school-saffron-ghost/30 border border-school-saffron/10 p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-school-navy font-display mb-6 tracking-tight">Join Our Excellence Network</h2>
            <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">We are always looking for passionate educators and skilled professionals to join our growing family. Shape the leaders of tomorrow with us.</p>
            <div className="flex flex-wrap justify-center gap-4">
               <Button className="h-14 px-10 bg-gradient-to-r from-school-saffron to-school-saffron-light hover:brightness-110 text-white font-bold rounded-xl uppercase tracking-widest text-[10px] shadow-2xl transition-all duration-300 border-0">
                  View Careers
               </Button>
               <Button variant="outline" className="h-14 px-10 border-school-saffron text-school-saffron hover:bg-school-saffron-ghost font-bold rounded-xl uppercase tracking-widest text-[10px] transition-all">
                  Contact HR
               </Button>
            </div>
         </div>
      </section>
    </PublicLayout>
  );
}
