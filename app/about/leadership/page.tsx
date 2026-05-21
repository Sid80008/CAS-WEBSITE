import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & Vision | Central Academy Senior Secondary School, antah",
  description: "Messages from the Founder, Director, and Principal of Central Academy Senior Secondary School, antah.",
};

const leaders = [
  {
    role: "Founder",
    name: "Mr. Hariprakash meena",
    image: "/logo.png", // Replace with real image in production
    message: [
      "Education is not merely the accumulation of facts; it is the preparation of life itself. When we laid the foundation of Central Academy antah, our vision was to create a sanctuary of learning where every child could discover their true potential.",
      "Today, seeing our students excel in various fields brings immense pride. We remain committed to our core values of integrity, discipline, and academic excellence. Our journey has just begun, and we look forward to shaping the leaders of tomorrow."
    ]
  },
  {
    role: "Director",
    name: "Mr. Rekhraj meena",
    image: "/logo.png", // Replace with real image in production
    message: [
      "As the Director of Central Academy School, antah, it has been my lifelong mission to provide world-class education that is accessible and transformative. Since our founding in 2013, we have remained steadfast in our pursuit of excellence.",
      "We focus on holistic development—nurturing the mind, body, and spirit. By integrating modern pedagogy with traditional values, we ensure that our students are well-equipped to navigate the complexities of the 21st century."
    ]
  },
  {
    role: "Principal",
    name: "Mrs. Radha meena",
    image: "/logo.png", // Replace with real image in production
    message: [
      "Welcome to Central Academy antah. As Principal, it is my privilege to lead a dedicated team of educators who are passionate about student success. Our school is a vibrant community where curiosity is encouraged and character is built.",
      "We believe in a student-centric approach, fostering critical thinking, creativity, and compassion. Our doors are always open to parents, as we believe that true education is a partnership between the school and the home. Together, we will achieve greatness."
    ]
  }
];

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B4F8A] mb-4 tracking-tight">
            Leadership & Vision
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the visionaries guiding Central Academy antah towards a future of academic brilliance and holistic growth.
          </p>
        </div>

        <div className="space-y-20">
          {leaders.map((leader, index) => (
            <section key={leader.role} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-1/3 flex flex-col items-center text-center shrink-0">
                <div className="w-48 h-48 rounded-2xl bg-slate-100 overflow-hidden mb-6 relative border-4 border-white shadow-lg">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{leader.name}</h3>
                <p className="text-[#e29b16] font-bold text-sm tracking-widest uppercase mt-1">
                  {leader.role}
                </p>
              </div>
              
              <div className="w-full md:w-2/3">
                <div className="prose prose-slate max-w-none">
                  {leader.message.map((paragraph, i) => (
                    <p key={i} className="text-slate-600 leading-relaxed text-lg mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
