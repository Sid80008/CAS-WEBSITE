"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface MediaItem {
  url: string;
  caption?: string | null;
}

interface GalleryLightboxProps {
  title: string;
  media: MediaItem[];
  startIndex?: number;
  onClose: () => void;
}

export function GalleryLightbox({
  title,
  media,
  startIndex = 0,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const prev = useCallback(() => setCurrentIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setCurrentIndex((i) => Math.min(media.length - 1, i + 1)),
    [media.length]
  );

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const photo = media[currentIndex];

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/92 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo gallery: ${title}`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
        aria-label="Close gallery"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Header */}
      <div className="absolute top-4 left-4 text-white z-10">
        <p className="font-bold text-sm">{title}</p>
        <p className="text-white/50 text-xs">
          {currentIndex + 1} / {media.length}
        </p>
      </div>

      {/* Prev arrow */}
      {currentIndex > 0 && (
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all z-10"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
      )}

      {/* Main photo */}
      <div className="max-w-4xl max-h-[80vh] relative flex items-center justify-center">
        <img
          key={photo.url}
          src={photo.url}
          alt={photo.caption || title}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.png";
            (e.target as HTMLImageElement).onerror = null;
          }}
        />
        {photo.caption && (
          <p className="absolute -bottom-8 left-0 right-0 text-white/60 text-xs text-center">
            {photo.caption}
          </p>
        )}
      </div>

      {/* Next arrow */}
      {currentIndex < media.length - 1 && (
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all z-10"
          aria-label="Next photo"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      )}

      {/* Thumbnail strip */}
      {media.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto scrollbar-hide">
          {media.map((p, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200
                ${i === currentIndex
                  ? "border-white scale-105 shadow-lg"
                  : "border-transparent opacity-50 hover:opacity-80"
                }`}
              aria-label={`Go to photo ${i + 1}`}
            >
              <img
                src={p.url}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.png";
                  (e.target as HTMLImageElement).onerror = null;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
