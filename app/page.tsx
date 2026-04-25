import React from "react";
import Link from "next/link";

import { 
  Megaphone,
  Award,
  Users as UsersIcon,
  BookOpen,
  Beaker,
  Trophy,
  Laptop
} from "lucide-react";
import { format } from "date-fns";
import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";

// Server Action for dynamic data
async function getHomeData() {
  const [notices, toppers, studentCount] = await Promise.all([
    prisma.notice.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3
    }),
    prisma.topper.findMany({
      take: 2,
      orderBy: { percentage: "desc" }
    }),
    prisma.student.count()
  ]);

  return {
    notices,
    toppers,
    studentCount
  };
}

export default async function Home() {
  const data = await getHomeData();

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          alt="Students on campus" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          src="/gallery/slider/1741166362_slider-17.jpg" 
        />
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs font-semibold text-school-blue-light mb-4 uppercase tracking-[0.2em] bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm">Empowering Minds</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight">Excellence in Education Since 1994</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">Nurturing holistic development and academic brilliance in a secure, modern environment.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/admissions">
              <button className="bg-school-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-school-blue-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Apply for Admission
              </button>
            </Link>
            <Link href="/facilities">
              <button className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-school-blue transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Explore Campus
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-6 max-w-7xl mx-auto -mt-12 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
            <div className="h-16 w-16 rounded-full bg-school-blue-light flex items-center justify-center text-school-blue">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-school-blue">30+ Years</h3>
              <p className="text-sm text-text-secondary">Of Academic Excellence</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 flex items-center gap-6 transform hover:-translate-y-1 transition-transform border-t-4 border-t-school-amber">
            <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center text-school-amber">
              <UsersIcon className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-school-blue">{data.studentCount || 500}+</h3>
              <p className="text-sm text-text-secondary">Active Students Enrolled</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
            <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Trophy className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-school-blue">100%</h3>
              <p className="text-sm text-text-secondary">Board Results Record</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Grid */}
      <section className="py-16 bg-background-alt px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Latest Notices */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-school-blue flex items-center gap-2">
                <Megaphone className="h-6 w-6 text-school-amber" />
                Latest Notices
              </h2>
              <Link href="/events" className="text-sm font-semibold text-school-blue hover:underline">View All</Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 flex flex-col gap-2">
              {data.notices.length > 0 ? data.notices.map((notice, idx) => (
                <div key={notice.id} className={`p-4 rounded-lg hover:bg-school-blue-light transition-colors cursor-pointer border-l-4 ${idx === 0 ? "border-school-amber bg-slate-50" : "border-transparent"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {idx === 0 && <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase">New</span>}
                    {notice.isPinned && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase">Important</span>}
                    <span className="text-[11px] text-text-tertiary">{format(new Date(notice.createdAt), "MMM d, yyyy")}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary line-clamp-2">{notice.titleEn}</h4>
                </div>
              )) : (
                <p className="p-4 text-sm text-text-tertiary italic text-center">No recent notices</p>
              )}
            </div>
          </div>

          {/* Academic Achievers */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-school-blue flex items-center gap-2 mb-2">
              <Award className="h-6 w-6 text-school-amber" />
              Academic Achievers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.toppers.length > 0 ? data.toppers.map((topper) => (
                <div key={topper.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group">
                  <div className="h-32 bg-school-blue relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <span className="absolute top-4 right-4 bg-school-amber text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      ★ {topper.percentage}%
                    </span>
                  </div>
                  <div className="px-6 pb-6 relative">
                    <img 
                      alt={topper.name} 
                      className="w-20 h-20 rounded-full border-4 border-white shadow-md absolute -top-10 left-6 object-cover bg-slate-200" 
                      src={topper.imageUrl || (data.toppers.indexOf(topper) === 0 ? "/gallery/students/1741166797-7.jpeg" : "/gallery/students/1741166816-9.jpeg")} 
                    />
                    <div className="pt-12">
                      <h4 className="text-xl font-bold text-text-primary">{topper.name}</h4>
                      <p className="text-sm text-text-secondary mb-3">Class {topper.class} - {topper.year}</p>
                      <p className="text-xs text-text-tertiary italic line-clamp-2">"Excellence is not an act, but a habit. Grateful for the support from CAS faculty."</p>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="col-span-2 text-center py-12 text-text-tertiary italic border border-dashed rounded-xl">Awards records will be updated soon.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Quick View */}
      <section className="py-20 px-6 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-school-blue-light rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-school-blue tracking-[0.2em] uppercase mb-3 block">Infrastructure</span>
            <h2 className="text-4xl font-bold text-text-primary">World-Class Facilities</h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">Providing a conducive environment for both academic rigor and extracurricular excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FacilityCard 
              title="Digital Library" 
              desc="10,000+ volumes and digital resources." 
              icon={<BookOpen />} 
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuC0JrXs97OWyKJeLXUWkUV6AimFeediC7GWtiOfOF-q3PyF26PpAac-9ayPEsHwgsToc8QGs53XOVsVrc0lgW_pjVcLD6mDK81os9q-GgHo_vXF6mo_JkzvSYEwLUn2yFjUwKOrG_U4-RCFtYfv4C5mcMFHdF0oXfPJYiCZZsBbhZmqyK-hT38uQoJhERc-c26D1laev8QdYiNQCtVRGo5y8DqA8uG7cihNBhZE7Ev2NpKyonauapoHo1q2w-awG8lVdRCFuqrBO0vO" 
            />
            <FacilityCard 
              title="Advanced Labs" 
              desc="Fully equipped Physics, Chemistry & Bio labs." 
              icon={<Beaker />} 
              img="/gallery/photo-dump/1741166776-5.jpeg" 
            />
            <FacilityCard 
              title="Sports Complex" 
              desc="Indoor courts and outdoor tracks." 
              icon={<Trophy />} 
              img="/gallery/photo-dump/1741166412_slider-20.jpg" 
            />
            <FacilityCard 
              title="Smart Classes" 
              desc="Interactive panels and digital tools." 
              icon={<Laptop />} 
              img="/gallery/photo-dump/1741166362_slider-17.jpg" 
            />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function FacilityCard({ title, desc, icon, img }: { title: string, desc: string, icon: React.ReactNode, img: string }) {
  return (
    <div className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
      <img alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={img} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
        <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 border border-white/30">
          {icon}
        </div>
        <h4 className="text-xl font-bold text-white mb-1 tracking-tight">{title}</h4>
        <p className="text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{desc}</p>
      </div>
    </div>
  );
}
