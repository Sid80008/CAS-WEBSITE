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
      <section className="bg-white border-b border-slate-100 py-6 px-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="max-w-7xl mx-auto flex gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === cat
                  ? "bg-school-blue text-white shadow-lg"
                  : "text-text-tertiary hover:bg-slate-50 hover:text-school-blue"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-20 px-6 bg-slate-50">
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
                  <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl mb-6 relative">
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
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                    <div className="absolute bottom-6 right-6 bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/40 text-white flex items-center gap-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                      <Layers className="h-5 w-5" />
                      <span className="font-bold text-sm">
                        {album.media?.length ?? 0}{" "}
                        {(album.media?.length ?? 0) === 1 ? "Photo" : "Photos"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-school-amber text-[10px] font-bold uppercase tracking-[0.2em]">
                      <Calendar className="h-3 w-3" />
                      {new Date(album.createdAt).toLocaleDateString(undefined, {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="text-2xl font-bold text-school-blue group-hover:text-school-amber transition-colors">
                      {album.titleEn}
                    </h3>
                    <p className="text-sm text-text-tertiary font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Main Campus, CAS antah
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-40 text-center flex flex-col items-center gap-6">
                <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                  <ImageIcon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-text-tertiary italic">
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
