"use client";

import { useState } from "react";
import { Calendar, Layers, MapPin, ImageIcon } from "lucide-react";
import { GalleryLightbox } from "@/components/GalleryLightbox";

interface MediaItem {
  url: string;
  caption?: string | null;
}

interface Album {
  id: string;
  titleEn: string;
  categoryEn?: string | null;
  createdAt: Date | string;
  media: MediaItem[];
}

interface GalleryGridProps {
  albums: Album[];
}

const CATEGORIES = ["All Moments", "Academic", "Sports Day", "Cultural", "Celebrations", "Campus"];

export function GalleryGrid({ albums }: GalleryGridProps) {
  const [activeTab, setActiveTab] = useState("All Moments");
  const [lightbox, setLightbox] = useState<{ album: Album; index: number } | null>(null);

  const filtered =
    activeTab === "All Moments"
      ? albums
      : albums.filter((a) => {
          const cat = a.categoryEn ?? "";
          return cat.toLowerCase().includes(activeTab.toLowerCase());
        });

  return (
    <>
      {/* Tab bar */}
      <section className="bg-school-saffron-ghost/50 border-b border-school-saffron/10 py-6 px-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="max-w-7xl mx-auto flex gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === cat
                  ? "bg-gradient-to-r from-school-saffron to-school-saffron-light text-white shadow-md shadow-school-saffron/25"
                  : "text-slate-600 hover:bg-school-saffron-ghost hover:text-school-saffron"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-20 px-6 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.length > 0 ? (
              filtered.map((album) => (
                <div
                  key={album.id}
                  className="group cursor-pointer"
                  onClick={() => setLightbox({ album, index: 0 })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setLightbox({ album, index: 0 });
                  }}
                  aria-label={`Open ${album.titleEn} gallery`}
                >
                  <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl mb-6 relative border border-slate-200/50 bg-white p-2 transition-all duration-500 group-hover:border-school-saffron/30">
                    <div className="w-full h-full rounded-[1.6rem] overflow-hidden relative">
                      {album.media?.[0] ? (
                        <img
                          alt={album.titleEn}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          src={album.media[0].url}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.png";
                            (e.target as HTMLImageElement).onerror = null;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-slate-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-school-saffron/15 transition-colors duration-500" />
                      <div className="absolute bottom-4 right-4 bg-school-ink/80 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/10 text-white flex items-center gap-2 transform translate-y-1 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                        <Layers className="h-4 w-4 text-school-saffron-light" />
                        <span className="font-bold text-xs">
                          {album.media?.length ?? 0}{" "}
                          {(album.media?.length ?? 0) === 1 ? "Photo" : "Photos"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 px-2">
                    <div className="flex items-center gap-2.5 text-school-saffron text-[10px] font-bold uppercase tracking-[0.2em]">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(album.createdAt).toLocaleDateString(undefined, {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-school-navy group-hover:text-school-saffron transition-colors font-display tracking-tight">
                      {album.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> Main Campus, CAS Anta
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-40 text-center flex flex-col items-center gap-6">
                <div className="h-24 w-24 bg-school-saffron-ghost rounded-full flex items-center justify-center text-school-saffron">
                  <ImageIcon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-400 italic">
                  No photos in this category yet.
                </h3>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <GalleryLightbox
          title={lightbox.album.titleEn}
          media={lightbox.album.media}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
