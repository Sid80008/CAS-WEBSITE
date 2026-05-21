// app/admin/events/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = { title: "Events | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: { author: { select: { email: true } } },
  });

  return <EventsClient events={events as any} />;
}
