import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { prisma } from "@/lib/prisma";
import { ImageIcon, Calendar, Layers, MapPin } from "lucide-react";

async function getAlbums() {
  const albums = await prisma.gallery.findMany({
    where: { published: true },
    include: { media: true },
    orderBy: { createdAt: "desc" }
  });

  if (albums.length > 0) return albums;

  // Static fallback if database is empty
  return [
    {
      id: "f1",
      titleEn: "Annual Sports Meet 2024",
      createdAt: new Date("2024-12-15"),
      media: [{ url: "/gallery/photo-dump/1741166362_slider-17.jpg" }, { url: "/gallery/photo-dump/1741166412_slider-20.jpg" }]
    },
    {
      id: "f2",
      titleEn: "Campus Infrastructure",
      createdAt: new Date("2025-01-10"),
      media: [{ url: "/gallery/photo-dump/1746853764_DSC_3837.jpg" }]
    },
    {
      id: "f3",
      titleEn: "Student Life & Activities",
      createdAt: new Date("2025-02-05"),
      media: [{ url: "/gallery/students/1741166797-7.jpeg" }, { url: "/gallery/students/1741166816-9.jpeg" }]
    }
  ];
}

export default async function PublicGallery() {
  const albums = await getAlbums();

  return (
    <PublicLayout>
      {/* Header */}
      <section className="bg-school-blue py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-[0.3em] mb-6">Visual Legacy</span>
           <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">School Moments</h1>
           <p className="text-school-blue-light/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
             Capturing the joy of learning, the spirit of competition, and the warmth of our school community.
           </p>
        </div>
      </section>

      {/* Categories/Filters placeholders */}
      <section className="bg-white border-b border-slate-100 py-6 px-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
         <div className="max-w-7xl mx-auto flex gap-4">
            {["All Moments", "Academic", "Sports Day", "Cultural", "Celebrations", "Campus"].map((cat, i) => (
              <button key={i} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${i === 0 ? "bg-school-blue text-white shadow-lg" : "text-text-tertiary hover:bg-slate-50 hover:text-school-blue"}`}>
                {cat}
              </button>
            ))}
         </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {albums.length > 0 ? (
              albums.map((album) => (
                <div key={album.id} className="group cursor-pointer">
                   <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl mb-6 relative">
                      {album.media?.[0] && (
                        <img 
                          alt={album.titleEn} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          src={album.media[0].url} 
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                      <div className="absolute bottom-6 right-6 bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/40 text-white flex items-center gap-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                         <Layers className="h-5 w-5" />
                         <span className="font-bold text-sm">{album.media?.length || 0}+ Photos</span>
                      </div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-school-amber text-[10px] font-bold uppercase tracking-[0.2em]">
                         <Calendar className="h-3 w-3" />
                         {new Date(album.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                      </div>
                      <h3 className="text-2xl font-bold text-school-blue group-hover:text-school-amber transition-colors">
                        {album.titleEn}
                      </h3>
                      <p className="text-sm text-text-tertiary font-medium flex items-center gap-2">
                         <MapPin className="h-4 w-4" /> Main Campus, CAS Anta
                      </p>
                   </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-40 text-center flex flex-col items-center gap-6">
                 <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                    <ImageIcon className="h-10 w-10" />
                 </div>
                 <h3 className="text-xl font-bold text-text-tertiary italic">Memories are being curated. Check back soon.</h3>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-school-blue py-24 px-6 relative overflow-hidden">
         <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
            <h2 className="text-4xl font-bold mb-6">Experience the CAS Life Firsthand</h2>
            <p className="text-school-blue-light/70 mb-10 text-lg">Interested in seeing our full campus and facilities? Schedule a tour with our admissions team.</p>
            <Link href="/contact">
              <Button className="h-14 px-10 bg-school-amber hover:bg-amber-600 text-white font-bold rounded-xl uppercase tracking-widest text-[10px] shadow-2xl">
                 Schedule Visit
              </Button>
            </Link>
         </div>
      </section>
    </PublicLayout>
  );
}

import Link from 'next/link';
