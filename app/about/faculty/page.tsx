import React from "react";
import { Metadata } from "next";
import { Users } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";

export const metadata: Metadata = {
  title: "Faculty Directory",
  description: "Meet our dedicated and experienced faculty at Central Academy antah.",
};

const facultyMembers = [
  { name: "Mr. Rajendra Sharma", subject: "Mathematics (HOD)", qualification: "M.Sc., B.Ed." },
  { name: "Mrs. Sunita Verma", subject: "Science (Physics)", qualification: "M.Sc., B.Ed." },
  { name: "Mr. Anil Kumar", subject: "English Literature", qualification: "M.A., B.Ed." },
  { name: "Mrs. Meena Gupta", subject: "Social Science", qualification: "M.A., B.Ed." },
  { name: "Mr. Vikram Singh", subject: "Computer Science", qualification: "MCA" },
  { name: "Miss Priya Rathore", subject: "Primary Education", qualification: "B.A., D.El.Ed." },
];

export default function FacultyPage() {
  return (
    <PublicLayout>
      <PageBanner
        titleEn="Meet Our Faculty"
        titleHi="हमारे शिक्षकगण"
        eyebrowEn="Our Educators"
        eyebrowHi="हमारे शिक्षक"
        imageSrc="/gallery/slider/1741166412_slider-20.jpg"
      />

      <section className="bg-[#FAFAF5] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] mb-3 inline-block">OUR EXCELLENCE NETWORK</span>
            <h2 className="text-3xl md:text-5xl font-black text-school-navy font-display mb-4">Dedicated to Nurturing Growth</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Our team of experienced and dedicated educators are committed to nurturing the academic and personal growth of every student.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyMembers.map((faculty, index) => (
              <div key={index} className="bg-white p-8 rounded-[2rem] shadow-md border border-slate-200/60 flex items-start gap-5 hover:shadow-xl hover:border-school-saffron/20 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-school-saffron-ghost text-school-saffron flex-shrink-0 flex items-center justify-center border border-school-saffron/10 group-hover:bg-school-saffron group-hover:text-white transition-all duration-300">
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-school-navy text-lg font-display mb-1">{faculty.name}</h3>
                  <p className="text-school-saffron-dark font-bold text-xs uppercase tracking-wider mb-2">{faculty.subject}</p>
                  <p className="text-slate-500 text-xs font-sans">{faculty.qualification}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
