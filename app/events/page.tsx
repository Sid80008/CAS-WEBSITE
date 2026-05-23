export const dynamic = "force-dynamic";

import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import prisma from "@/lib/prisma";
import { EventsClient } from "./EventsClient";

export const metadata = {
  title: "Events & Happenings",
  description: "Celebrate the vibrant school life through cultural fests, sports meets, and academic seminars.",
};

async function getEvents() {
  return await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: "asc" }
  });
}

export default async function PublicEvents() {
  const events = await getEvents();

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

      <EventsClient initialEvents={events} />
    </PublicLayout>
  );
}
