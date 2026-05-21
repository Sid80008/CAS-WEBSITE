import React from "react";
import { SCHOOL } from "@/lib/constants";
import { LucideIcon } from "lucide-react";

export default function Page() {
  return (
    <main>
      

<nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm docked full-width top-0 sticky z-50 flex justify-between items-center px-6 h-16 w-full font-['Plus_Jakarta_Sans'] font-semibold text-sm">
<div className="flex items-center gap-8">
<span className="text-lg font-bold text-[#1B4F8A] dark:text-white uppercase tracking-tight">Central Academy Anta</span>
<div className="hidden md:flex gap-6 items-center">
<a className="text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#1B4F8A] transition-colors duration-200" href="#">Dashboard</a>
<a className="text-[#1B4F8A] border-b-2 border-[#1B4F8A] pb-1" href="#">Notices</a>
<a className="text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#1B4F8A] transition-colors duration-200" href="#">Reports</a>
</div>
</div>
<div className="flex items-center gap-4">
<div className="relative hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
<input className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-xs w-64 focus:ring-2 focus:ring-primary-container outline-none transition-all" placeholder="Search notices..." type="text"/>
</div>
<button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-coral rounded-full"></span>
</button>
<div className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary-container">
<img alt="Administrator Profile" data-alt="A professional headshot of a school administrator in formal attire, featuring a warm and welcoming expression. The image is captured with a shallow depth of field against a clean, modern institutional office background. Soft, natural light illuminates the subject, aligning with a professional and trustworthy academic atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaJ7ZRgOmSGaY6bP99A3AUwU3KvpwW1l-sbVLnSEWvDHJXV11cEw-_mklC1e8C7KNV7f_WbAqthdGJth9-18U4x2M8KLe_gbSTaKe67lLR4JNCO54YcfMoGP8Q_C4aCYA2NyFX9dY31IuPSZytyY6m_z4q0EsSP89GVHx5bcqk7M_wY4rsLeJwDNXRmWMPJzcStSGHFlQf_q2szIUF3TFr9d1C9K2nqY0S2EkgELeivgg3oTikymwijVcQ9ITeeGwG_B3nmsFnYC2F"/>
</div>
</div>
</nav>
<main className="max-w-container-max mx-auto px-6 lg:px-page-desktop py-section">

<header className="mb-xl">
<div className="relative rounded-xl overflow-hidden h-[300px] mb-lg group">
<div className="absolute inset-0 bg-gradient-to-r from-[#1B4F8A] via-[#1B4F8A]/80 to-transparent z-10"></div>
<img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A grand view of a modern school library interior with high ceilings and sunlight streaming through large windows. The scene captures the peaceful academic excellence and institutional legacy of a prestigious school, using a professional architectural photography style with high-key lighting and a palette of warm woods and deep blues." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxQeDCPi7xWspweseyZTcX2gUHqsaQfM9a_Ic5_ceHQGbggHbiMQTh_1mD1HlcJQA11Hx6n2c7ZUa1HPRkJh8ITalIaO9Lvo-xb4puUtcNrC5diZu-hb0lGtS3WUrnht7tJwcMMtwWS4agV-KWQ4wlRTPF1Yt_n98VRLCoWFtVoVbTG_wuUW0HWwx9ycWJrcTqKFkCfXHa7ciPfogXYeXBs-_U3Ibb6DvySyfe1oL-TGiLRPV_4ERNMBJ26PU5xW8gJytIYUAupRwu"/>
<div className="relative z-20 h-full flex flex-col justify-center px-12 text-white">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-light text-amber-dark text-overline mb-4 w-fit">Academic Session 2024-25</span>
<h1 className="font-display text-h1 mb-4">Circulars &amp; Notices</h1>
<p className="font-body text-body-large max-w-2xl opacity-90">Stay informed about the latest academic schedules, holiday announcements, and school events. Official communications for students and parents of Central Academy Anta.</p>
</div>
</div>
</header>
<div className="flex flex-col lg:flex-row gap-lg">

<div className="flex-1">

<div className="flex flex-wrap items-center gap-3 mb-lg border-b border-border-default pb-4">
<button className="px-6 py-2 rounded-full bg-[#1B4F8A] text-white font-label text-sm shadow-md transition-all">All</button>
<button className="px-6 py-2 rounded-full bg-white text-text-secondary border border-border-default hover:border-primary font-label text-sm transition-all">Academic</button>
<button className="px-6 py-2 rounded-full bg-white text-text-secondary border border-border-default hover:border-primary font-label text-sm transition-all">Holiday</button>
<button className="px-6 py-2 rounded-full bg-white text-text-secondary border border-border-default hover:border-primary font-label text-sm transition-all">General</button>
<button className="px-6 py-2 rounded-full bg-white text-text-secondary border border-border-default hover:border-primary font-label text-sm transition-all">Events</button>
</div>

<div className="grid grid-cols-1 gap-6">

<div className="bg-white border border-border-default rounded-lg p-6 hover:shadow-lg transition-all duration-300 group relative">
<div className="flex flex-col md:flex-row md:items-start gap-6">
<div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-school-blue-extra-light rounded-lg border border-school-blue-light">
<span className="font-display font-bold text-h2 text-[#1B4F8A]">15</span>
<span className="font-overline text-[#1B4F8A]">OCT</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-2 mb-2">
<span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-school-blue-light text-[#1B4F8A]">Academic</span>
<span className="w-1.5 h-1.5 rounded-full bg-coral"></span>
<span className="text-caption text-text-tertiary">Urgent Notice</span>
</div>
<h3 className="font-display text-h3 text-on-surface mb-2 group-hover:text-[#1B4F8A] transition-colors">Revised Schedule for Half-Yearly Examinations</h3>
<p className="font-body text-body-small text-text-secondary mb-6">Due to recent administrative adjustments, the schedule for the upcoming Half-Yearly Examinations has been revised for Grades 6-12. Please download the detailed timetable below.</p>
<div className="flex items-center gap-4">
<button className="flex items-center gap-2 bg-[#1B4F8A] text-white px-6 py-2.5 rounded-lg font-label text-sm hover:bg-school-blue-dark transition-all transform hover:-translate-y-0.5">
                                        View Details
                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
</button>
<button className="flex items-center gap-2 text-[#1B4F8A] border-2 border-[#1B4F8A] px-6 py-2.5 rounded-lg font-label text-sm hover:bg-school-blue-extra-light transition-all">
<span className="material-symbols-outlined text-sm">download</span>
                                        Download PDF
                                    </button>
</div>
</div>
</div>
</div>

<div className="bg-white border border-border-default rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
<div className="flex flex-col md:flex-row md:items-start gap-6">
<div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-amber-light rounded-lg border border-amber-light/50">
<span className="font-display font-bold text-h2 text-amber-dark">28</span>
<span className="font-overline text-amber-dark">OCT</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-2 mb-2">
<span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-light text-amber-dark">Holiday</span>
<span className="text-caption text-text-tertiary">3 Days Remaining</span>
</div>
<h3 className="font-display text-h3 text-on-surface mb-2 group-hover:text-[#1B4F8A] transition-colors">Diwali Vacation and School Reopening</h3>
<p className="font-body text-body-small text-text-secondary mb-6">Central Academy Anta will remain closed from October 30th to November 4th for the festive occasion of Diwali. Wishing all students a safe and prosperous celebration.</p>
<div className="flex items-center gap-4">
<button className="flex items-center gap-2 bg-[#1B4F8A] text-white px-6 py-2.5 rounded-lg font-label text-sm hover:bg-school-blue-dark transition-all">
                                        View Details
                                    </button>
<button className="flex items-center gap-2 text-text-secondary hover:text-[#1B4F8A] transition-all">
<span className="material-symbols-outlined text-lg">share</span>
</button>
</div>
</div>
</div>
</div>

<div className="bg-white border border-border-default rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
<div className="flex flex-col md:flex-row md:items-start gap-6">
<div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-teal-light rounded-lg border border-teal-light/50">
<span className="font-display font-bold text-h2 text-teal-dark">02</span>
<span className="font-overline text-teal-dark">NOV</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-2 mb-2">
<span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-light text-teal-dark">Events</span>
</div>
<h3 className="font-display text-h3 text-on-surface mb-2 group-hover:text-[#1B4F8A] transition-colors">Annual Sports Meet 2024: Enrollment Open</h3>
<p className="font-body text-body-small text-text-secondary mb-6">Registration for the Annual Inter-House Sports Meet is now open. Students interested in participating in Athletics, Football, and Basketball events must submit their forms by the end of the week.</p>
<div className="flex items-center gap-4">
<button className="flex items-center gap-2 bg-[#1B4F8A] text-white px-6 py-2.5 rounded-lg font-label text-sm hover:bg-school-blue-dark transition-all">
                                        Register Now
                                    </button>
<button className="flex items-center gap-2 text-[#1B4F8A] border-2 border-[#1B4F8A] px-6 py-2.5 rounded-lg font-label text-sm hover:bg-school-blue-extra-light transition-all">
                                        Download Form
                                    </button>
</div>
</div>
</div>
</div>
</div>
<div className="mt-xl flex justify-center">
<button className="px-8 py-3 bg-white border border-border-default text-text-secondary rounded-lg font-label hover:border-[#1B4F8A] hover:text-[#1B4F8A] transition-all flex items-center gap-2">
                        Load Previous Notices
                        <span className="material-symbols-outlined">expand_more</span>
</button>
</div>
</div>

<aside className="w-full lg:w-80 space-y-lg">

<div className="bg-white border border-border-default rounded-lg overflow-hidden">
<div className="bg-[#1B4F8A] p-4 text-white">
<h4 className="font-display font-bold text-h4 flex items-center gap-2">
<span className="material-symbols-outlined">bolt</span>
                            Quick Access
                        </h4>
</div>
<div className="p-4 space-y-1">
<a className="flex items-center justify-between p-3 rounded-lg hover:bg-school-blue-extra-light group transition-all" href="#">
<span className="font-label text-sm text-text-secondary group-hover:text-[#1B4F8A]">Academic Calendar</span>
<span className="material-symbols-outlined text-slate-300 group-hover:text-[#1B4F8A] group-hover:translate-x-1 transition-all">chevron_right</span>
</a>
<a className="flex items-center justify-between p-3 rounded-lg hover:bg-school-blue-extra-light group transition-all" href="#">
<span className="font-label text-sm text-text-secondary group-hover:text-[#1B4F8A]">Fee Structure 2024-25</span>
<span className="material-symbols-outlined text-slate-300 group-hover:text-[#1B4F8A] group-hover:translate-x-1 transition-all">chevron_right</span>
</a>
<a className="flex items-center justify-between p-3 rounded-lg hover:bg-school-blue-extra-light group transition-all" href="#">
<span className="font-label text-sm text-text-secondary group-hover:text-[#1B4F8A]">School Uniform Policy</span>
<span className="material-symbols-outlined text-slate-300 group-hover:text-[#1B4F8A] group-hover:translate-x-1 transition-all">chevron_right</span>
</a>
<a className="flex items-center justify-between p-3 rounded-lg hover:bg-school-blue-extra-light group transition-all" href="#">
<span className="font-label text-sm text-text-secondary group-hover:text-[#1B4F8A]">Transport Routes</span>
<span className="material-symbols-outlined text-slate-300 group-hover:text-[#1B4F8A] group-hover:translate-x-1 transition-all">chevron_right</span>
</a>
</div>
</div>

<div className="bg-amber-light/30 border border-amber-light rounded-lg p-6 relative overflow-hidden group">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-light/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
<h4 className="font-display font-bold text-amber-dark text-h4 mb-2">School Motto</h4>
<p className="font-body text-body-small italic text-amber-dark/80 mb-4">"Education is the most powerful weapon which you can use to change the world."</p>
<div className="w-12 h-1 bg-[#BA7517] rounded-full"></div>
</div>

<div className="bg-[#F8F7F5] border border-border-default rounded-lg p-6">
<h4 className="font-display font-bold text-on-surface text-h4 mb-4">Need Help?</h4>
<p className="font-body text-body-small text-text-secondary mb-4">If you are unable to find a specific circular or need clarification, please contact the administration office.</p>
<a className="flex items-center gap-3 text-[#1B4F8A] font-semibold text-sm hover:underline" href="mailto:admin@centralacademyanta.edu">
<span className="material-symbols-outlined text-lg">mail</span>
                        admin@centralacademyanta.edu
                    </a>
</div>
</aside>
</div>
</main>

<footer className="bg-slate-900 dark:bg-black border-t-4 border-[#BA7517] text-white py-12 px-8">
<div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
<div className="space-y-4">
<span className="text-white font-bold text-xl block">Central Academy Anta</span>
<p className="font-['Plus_Jakarta_Sans'] text-xs text-slate-400 max-w-sm">Dedicated to nurturing young minds with a foundation of values, excellence, and global perspective for over {SCHOOL.yearsOfExcellence} years.</p>
</div>
<div className="flex flex-wrap gap-8 text-xs font-['Plus_Jakarta_Sans']">
<a className="text-slate-400 hover:text-white transition-all" href="#">Privacy Policy</a>
<a className="text-slate-400 hover:text-white transition-all" href="#">Terms of Service</a>
<a className="text-slate-400 hover:text-white transition-all" href="#">Alumni</a>
<a className="text-slate-400 hover:text-white transition-all" href="#">Sitemap</a>
</div>
<div className="flex gap-4">
<a className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1B4F8A] transition-all" href="#">
<span className="material-symbols-outlined text-sm">social_leaderboard</span>
</a>
<a className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1B4F8A] transition-all" href="#">
<span className="material-symbols-outlined text-sm">alternate_email</span>
</a>
</div>
</div>
<div className="max-w-container-max mx-auto mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500">© {new Date().getFullYear()} {SCHOOL.name}. All Rights Reserved. {SCHOOL.yearsOfExcellence} Years of Excellence.</p>
</div>
</footer>


    </main>
  );
}
