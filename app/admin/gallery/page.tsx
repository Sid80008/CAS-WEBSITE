// app/admin/gallery/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = { title: "Gallery | CAS Admin" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const albums = await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
    include: { media: true },
  });

  return <GalleryClient albums={albums as any} />;
}
