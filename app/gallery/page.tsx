export const dynamic = "force-dynamic";

import PublicLayout from "@/components/layout/PublicLayout";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import { GalleryGrid } from "./GalleryGrid";
import { PageBanner } from "@/components/layout/PageBanner";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Browse photos from school events, annual functions, sports days, and everyday life at Central Academy Senior Secondary School, antah.",
};

async function getAlbums() {
  try {
    const albums = await prisma.gallery.findMany({
      where: { published: true },
      include: { media: true },
      orderBy: { createdAt: "desc" },
    });
    if (albums.length > 0) return albums;
  } catch {
    // DB not available — fall through to static fallback
  }

  // Static fallback when DB is empty or unreachable
  return [
    {
      id: "f1",
      titleEn: "Annual Sports Meet",
      categoryEn: "Sports Day",
      createdAt: new Date("2024-12-15"),
      media: [
        { url: "/gallery/photo-dump/1741166362_slider-17.jpg", caption: null },
        { url: "/gallery/photo-dump/1741166412_slider-20.jpg", caption: null },
        { url: "/gallery/photo-dump/1741166451_slider-21.jpg", caption: null },
      ],
    },
    {
      id: "f2",
      titleEn: "Campus Infrastructure",
      categoryEn: "Campus",
      createdAt: new Date("2025-01-10"),
      media: [
        { url: "/gallery/photo-dump/1746853764_DSC_3837.jpg", caption: null },
        { url: "/gallery/photo-dump/1774511691_slider-52.jpg", caption: null },
      ],
    },
    {
      id: "f3",
      titleEn: "Student Life & Activities",
      categoryEn: "Cultural",
      createdAt: new Date("2025-02-05"),
      media: [
        { url: "/gallery/students/1741166797-7.jpeg", caption: null },
        { url: "/gallery/students/1741166816-9.jpeg", caption: null },
        { url: "/gallery/students/1741166831-10.jpeg", caption: null },
      ],
    },
    {
      id: "f4",
      titleEn: "Celebrations & Events",
      categoryEn: "Celebrations",
      createdAt: new Date("2025-03-01"),
      media: [
        { url: "/gallery/photo-dump/celebration.jpg", caption: null },
        { url: "/gallery/photo-dump/1758788086_WhatsApp Image 2025-09-25 at 1.jpeg", caption: null },
      ],
    },
  ];
}

export default async function PublicGallery() {
  const albums = await getAlbums();

  return (
    <PublicLayout>
      {/* Header Banner */}
      <PageBanner
        titleEn="School Moments"
        titleHi="स्कूल के कुछ पल"
        eyebrowEn="Visual Legacy"
        eyebrowHi="दृश्य विरासत"
        imageSrc="/banner-main.png"
      />

      {/* Client component: tabs + grid + lightbox */}
      <GalleryGrid albums={albums as any} />

      {/* CTA */}
      <section className="bg-school-ink border-t border-white/5 py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <h2 className="text-4xl font-bold font-display tracking-tight mb-6">
            Experience the CAS Life Firsthand
          </h2>
          <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            Interested in seeing our full campus and facilities? Schedule a tour with our admissions team.
          </p>
          <Link href="/contact">
            <Button className="h-14 px-10 bg-gradient-to-r from-school-saffron to-school-saffron-light hover:brightness-110 text-white font-bold rounded-xl uppercase tracking-widest text-[10px] shadow-2xl transition-all duration-300 border-0">
              Schedule Visit
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
