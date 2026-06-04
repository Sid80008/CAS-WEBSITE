export const dynamic = "force-dynamic";

import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
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
      {/* ── Page Banner (3-layer depth) ── */}
      <PageBanner
        titleEn="Events & Happenings"
        titleHi="कार्यक्रम और गतिविधियाँ"
        eyebrowEn="School Calendar"
        eyebrowHi="स्कूल कैलेंडर"
        imageSrc="/gallery/slider/1741166412_slider-20.jpg"
      />

      <EventsClient initialEvents={events} />
    </PublicLayout>
  );
}
