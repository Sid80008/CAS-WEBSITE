"use client";

import React from "react";
import { Calendar, MapPin, Clock, Trophy, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface Event {
  id: string;
  titleEn: string;
  titleHi: string | null;
  descriptionEn: string;
  descriptionHi: string | null;
  date: Date | string;
  slug: string;
  published: boolean;
  createdBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface EventsClientProps {
  initialEvents: Event[];
}

export function EventsClient({ initialEvents }: EventsClientProps) {
  const { language } = useLanguage();

  const upcomingEvents = initialEvents.filter((e) => new Date(e.date) >= new Date());
  const pastEvents = initialEvents.filter((e) => new Date(e.date) < new Date());

  return (
    <>
      {/* Featured/Next Event */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 px-6 bg-[#FAFAF5] relative -mt-10 z-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 bg-school-navy h-[400px] lg:h-auto relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
                  alt="Featured Event"
                  fill
                  className="object-cover opacity-75 brightness-75"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-10 left-10 p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl text-center min-w-[100px] border border-slate-100">
                  <span className="block text-4xl font-black text-school-navy font-display leading-none">
                    {format(new Date(upcomingEvents[0].date), "dd")}
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-school-saffron-dark mt-2 font-sans">
                    {format(new Date(upcomingEvents[0].date), "MMM yyyy")}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-7 p-12 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-school-saffron-dark font-sans">
                    {language === "hi" ? "अगला बड़ा कार्यक्रम" : "Next Big Event"}
                  </span>
                </div>
                <h2
                  className={`text-3xl md:text-4xl font-black text-school-navy font-display mb-6 tracking-tight leading-tight ${
                    language === "hi" && upcomingEvents[0].titleHi ? "font-hindi" : ""
                  }`}
                >
                  {(language === "hi" && upcomingEvents[0].titleHi) ? upcomingEvents[0].titleHi : upcomingEvents[0].titleEn}
                </h2>
                <p
                  className={`text-text-secondary text-sm md:text-base leading-relaxed mb-8 font-sans ${
                    language === "hi" && upcomingEvents[0].descriptionHi ? "font-hindi" : ""
                  }`}
                >
                  {(language === "hi" && upcomingEvents[0].descriptionHi)
                    ? upcomingEvents[0].descriptionHi
                    : upcomingEvents[0].descriptionEn}
                </p>
                <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-slate-100 font-sans">
                  <div className="flex items-center gap-3 text-sm font-bold text-school-navy">
                    <MapPin className="h-5 w-5 text-school-saffron" />
                    <span>{language === "hi" ? "मुख्य सभागार" : "Main Auditorium"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-school-navy">
                    <Clock className="h-5 w-5 text-school-saffron" />
                    <span>{language === "hi" ? "सुबह 09:00 बजे से" : "09:00 AM Onwards"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Events (Cinematic dark background) */}
      <section className="py-24 px-6 bg-school-ink relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(232,98,26,0.04)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] inline-block font-sans">UPCOMING EVENTS</span>
              <h3 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight">
                {language === "hi" ? "आगामी कार्यक्रम" : "Upcoming Schedule"}
              </h3>
              <p className="text-slate-400 font-sans">
                {language === "hi"
                  ? "इन रोमांचक अवसरों में शामिल होने और बढ़ने के लिए अपने कैलेंडर को चिह्नित करें।"
                  : "Mark your calendars for these exciting opportunities to engage and grow."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {upcomingEvents.slice(1).map((event, i) => (
              <EventCard key={i} event={event} language={language} />
            ))}
            {upcomingEvents.length <= 1 &&
              pastEvents.slice(0, 3).map((event, i) => (
                <EventCard key={i} event={event} isPast language={language} />
              ))}
          </div>
        </div>
      </section>

      {/* Past Happenings */}
      {pastEvents.length > 3 && (
        <section className="py-24 px-6 bg-[#FAFAF5]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-school-saffron font-bold text-xs uppercase tracking-[0.2em] mb-3 inline-block font-sans">ARCHIVES</span>
              <h2 className="text-3xl md:text-4xl font-black text-school-navy font-display">
                {language === "hi" ? "पिछली मुख्य बातें" : "Past Highlights"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.slice(3, 7).map((event, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center justify-between group hover:shadow-xl hover:border-school-saffron/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 bg-school-saffron-ghost text-school-saffron-dark rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-school-saffron group-hover:text-white transition-all duration-300">
                      <Trophy className="h-8 w-8" />
                    </div>
                    <div>
                      <h4
                        className={`font-black text-school-navy font-display group-hover:text-school-saffron transition-colors ${
                          language === "hi" && event.titleHi ? "font-hindi" : ""
                        }`}
                      >
                        {(language === "hi" && event.titleHi) ? event.titleHi : event.titleEn}
                      </h4>
                      <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mt-1 font-sans">
                        {language === "hi" ? "सम्पन्न" : "Concluded"}{" "}
                        {format(new Date(event.date), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-slate-350 group-hover:text-school-saffron transform group-hover:translate-x-2 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function EventCard({ event, isPast, language }: { event: any; isPast?: boolean; language: string }) {
  const title = (language === "hi" && event.titleHi) ? event.titleHi : event.titleEn;
  const isHindi = language === "hi" && !!event.titleHi;

  return (
    <div
      className={`group relative bg-school-navy/35 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-md hover:shadow-2xl hover:border-school-saffron/25 transition-all duration-500 overflow-hidden ${
        isPast ? "opacity-60 grayscale" : ""
      }`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[4rem] group-hover:bg-school-saffron/15 transition-all duration-550"></div>
      <div className="flex flex-col h-full relative z-10">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-white/5 text-school-saffron-light text-[10px] font-bold uppercase tracking-widest rounded-lg mb-4 border border-white/10 group-hover:border-school-saffron/20 transition-colors font-sans">
            {isPast
              ? language === "hi"
                ? "बीता हुआ कार्यक्रम"
                : "Past Event"
              : language === "hi"
              ? "पंजीकरण चालू है"
              : "Active Registration"}
          </span>
          <h3
            className={`text-2xl font-black text-white font-display leading-tight min-h-[64px] group-hover:text-school-saffron transition-colors line-clamp-2 ${
              isHindi ? "font-hindi" : ""
            }`}
          >
            {title}
          </h3>
        </div>

        <div className="space-y-4 mb-10 flex-grow font-sans text-slate-300">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Calendar className="h-4 w-4 text-school-saffron" />
            {format(new Date(event.date), "EEE, MMM d, yyyy")}
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <MapPin className="h-4 w-4 text-school-saffron" />
            {language === "hi" ? "स्कूल परिसर" : "School Campus"}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex justify-between items-center font-sans">
          <button className="text-[10px] font-black text-school-saffron-light uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all group-hover:text-school-saffron">
            {language === "hi" ? "विवरण देखें" : "Event Details"} <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
