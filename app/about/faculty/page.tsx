import React from "react";
import { Metadata } from "next";
import { Users } from "lucide-react";

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
    <main className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-[#1B4F8A]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="h-8 w-8 text-[#1B4F8A]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B4F8A] mb-4">Our Faculty</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Our team of experienced and dedicated educators are committed to nurturing the academic and personal growth of every student.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((faculty, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-slate-200">
                <Users className="h-8 w-8 text-slate-300" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{faculty.name}</h3>
                <p className="text-school-amber font-semibold text-sm">{faculty.subject}</p>
                <p className="text-slate-500 text-xs mt-1">{faculty.qualification}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
