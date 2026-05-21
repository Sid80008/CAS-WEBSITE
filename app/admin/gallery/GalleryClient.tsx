"use client";
// app/admin/gallery/GalleryClient.tsx
import { useState } from "react";

type Album = {
  id: string; titleEn: string; titleHi: string | null; description: string | null;
  published: boolean; coverImage: string | null; eventDate: Date; media: { id: string; url: string }[];
};

interface Props { albums: Album[]; }

export default function GalleryClient({ albums }: Props) {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Gallery & Media</h1>
          <p className="text-sm text-on-surface-variant">Manage photo albums and media collections for the school website.</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm">
          <span className="material-symbols-outlined">add_photo_alternate</span>New Album
        </button>
      </div>

      {albums.length === 0 ? (
        <div className="bg-white border border-outline-variant rounded-xl py-24 text-center">
          <span className="material-symbols-outlined text-6xl block mb-3 text-outline">photo_library</span>
          <h3 className="font-bold text-lg text-on-surface mb-2">No albums yet</h3>
          <p className="text-sm text-on-surface-variant mb-6">Create your first photo album to showcase school events.</p>
          <button onClick={() => setShowAdd(true)} className="px-6 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:opacity-90 transition-all text-sm">
            Create First Album
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((a) => (
            <div key={a.id} className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              {/* Cover */}
              <div className="h-48 bg-[#f6f3f2] flex items-center justify-center relative overflow-hidden">
                {a.coverImage ? (
                  <img src={a.coverImage} alt={a.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="material-symbols-outlined text-5xl text-outline">photo_library</span>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${a.published ? "bg-tertiary-fixed/30 text-tertiary-container" : "bg-white/90 text-outline"}`}>
                    {a.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-sm text-on-surface mb-1">{a.titleEn}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">{new Date(a.eventDate).toLocaleDateString("en-IN")} · {a.media.length} photos</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-primary-fixed/20 rounded-lg text-on-surface-variant hover:text-primary transition-all">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="p-1.5 hover:bg-error-container rounded-lg text-on-surface-variant hover:text-error transition-all">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Album Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-primary">Create New Album</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-[#eae7e7] rounded-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Album Title *</label>
                <input name="titleEn" required className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Annual Day 2024" />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Event Date *</label>
                <input name="eventDate" type="date" required className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Upload Photos</label>
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 text-center bg-[#f6f3f2] cursor-pointer hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-4xl text-outline block mb-2">upload_file</span>
                  <p className="text-sm text-on-surface-variant font-medium">Drag photos here or click to upload</p>
                  <p className="text-xs text-outline mt-1">JPG, PNG up to 5MB each</p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="published" className="w-4 h-4 rounded" />
                <span className="text-sm">Publish album on website</span>
              </label>
              <button type="button" onClick={() => setShowAdd(false)} className="w-full py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">save</span>Create Album
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
