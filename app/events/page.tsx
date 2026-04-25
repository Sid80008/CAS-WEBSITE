import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Trophy, 
  Music, 
  BookOpen, 
  Users,
  Search,
  Filter,
  ChevronRight
} from "lucide-react";
import { format } from "date-fns";

async function getEvents() {
  return await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: "asc" }
  });
}

export default async function PublicEvents() {
  const events = await getEvents();

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());
  const pastEvents = events.filter(e => new Date(e.date) < new Date());

  return (
    <PublicLayout>
      <section className="bg-school-blue py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-school-amber opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-4xl mx-auto relative z-10">
           <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-[0.3em] mb-6">School Calendar</span>
           <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">Events & Happenings</h1>
           <p className="text-school-blue-light/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
             Celebrate the vibrant school life through cultural fests, sports meets, and academic seminars.
           </p>
        </div>
      </section>

      {/* Featured/Next Event */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 px-6 bg-slate-50 relative -mt-10 z-20">
           <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                 <div className="lg:col-span-5 bg-school-blue h-[400px] lg:h-auto relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800" 
                      alt="Featured Event" 
                      className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute top-10 left-10 p-6 bg-white rounded-3xl shadow-2xl text-center min-w-[100px]">
                       <span className="block text-4xl font-black text-school-blue">{format(new Date(upcomingEvents[0].date), "dd")}</span>
                       <span className="block text-xs font-bold uppercase tracking-widest text-school-amber">{format(new Date(upcomingEvents[0].date), "MMM yyyy")}</span>
                    </div>
                 </div>
                 <div className="lg:col-span-7 p-12 lg:p-20 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                       <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                       <span className="text-xs font-bold uppercase tracking-[0.3em] text-school-amber">Next Big Event</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-school-blue mb-6 tracking-tight">{upcomingEvents[0].titleEn}</h2>
                    <p className="text-lg text-text-secondary leading-relaxed mb-10">{upcomingEvents[0].descriptionEn}</p>
                    <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-slate-100">
                       <div className="flex items-center gap-3 text-sm font-bold text-school-blue">
                          <MapPin className="h-5 w-5 text-school-amber" />
                          <span>Main Auditorium</span>
                       </div>
                       <div className="flex items-center gap-3 text-sm font-bold text-school-blue">
                          <Clock className="h-5 w-5 text-school-amber" />
                          <span>09:00 AM Onwards</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Grid of Events */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
               <div className="space-y-4">
                  <h3 className="text-4xl font-bold text-school-blue tracking-tight">Upcoming Schedule</h3>
                  <p className="text-text-secondary">Mark your calendars for these exciting opportunities to engage and grow.</p>
               </div>
               <div className="flex gap-4">
                  <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-text-tertiary border border-slate-100"><Filter className="h-5 w-5" /></div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {upcomingEvents.slice(1).map((event, i) => (
                 <EventCard key={i} event={event} />
               ))}
               {upcomingEvents.length <= 1 && pastEvents.slice(0, 3).map((event, i) => (
                 <EventCard key={i} event={event} isPast />
               ))}
            </div>
         </div>
      </section>

      {/* Past Happenings */}
      {pastEvents.length > 3 && (
        <section className="py-24 px-6 bg-slate-50">
           <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-school-blue">Past Highlights</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {pastEvents.slice(3, 7).map((event, i) => (
                   <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all">
                      <div className="flex items-center gap-6">
                         <div className="h-16 w-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-school-blue group-hover:text-white transition-all">
                            <Trophy className="h-8 w-8" />
                         </div>
                         <div>
                            <h4 className="font-bold text-school-blue group-hover:text-school-amber transition-colors">{event.titleEn}</h4>
                            <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mt-1">Concluded {format(new Date(event.date), "MMMM d, yyyy")}</p>
                         </div>
                      </div>
                      <ChevronRight className="h-6 w-6 text-slate-200 group-hover:text-school-blue transform group-hover:translate-x-2 transition-all" />
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}
    </PublicLayout>
  );
}

function EventCard({ event, isPast }: { event: any, isPast?: boolean }) {
  return (
    <div className={`group relative bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden ${isPast ? 'opacity-60 grayscale' : ''}`}>
       <div className="absolute top-0 right-0 w-24 h-24 bg-school-blue-light/30 rounded-bl-[4rem] group-hover:bg-school-amber/20 transition-all"></div>
       <div className="flex flex-col h-full">
          <div className="mb-8">
             <span className="inline-block px-3 py-1 bg-school-blue-light text-school-blue text-[10px] font-bold uppercase tracking-widest rounded-lg mb-4">
               {isPast ? "Past Event" : "Active Registration"}
             </span>
             <h3 className="text-2xl font-bold text-school-blue leading-tight min-h-[64px] group-hover:text-school-amber transition-colors line-clamp-2">
               {event.titleEn}
             </h3>
          </div>
          
          <div className="space-y-4 mb-10 flex-grow">
             <div className="flex items-center gap-3 text-sm font-semibold text-text-primary">
                <Calendar className="h-4 w-4 text-school-blue" />
                {format(new Date(event.date), "EEE, MMM d, yyyy")}
             </div>
             <div className="flex items-center gap-3 text-xs text-text-tertiary">
                <MapPin className="h-4 w-4" />
                School Campus
             </div>
          </div>

          <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
             <button className="text-[10px] font-black text-school-blue uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all group-hover:text-school-amber">
                Event Details <ChevronRight className="h-4 w-4" />
             </button>
          </div>
       </div>
    </div>
  );
}
