"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { createAlbum, addMediaToAlbum, deleteAlbum, deleteMedia } from "@/app/actions/galleryActions";

type Album = {
  id: string; titleEn: string; titleHi: string | null; description: string | null;
  published: boolean; coverImage: string | null; eventDate: Date; media: { id: string; url: string }[];
};

interface Props { albums: Album[]; }

export default function GalleryClient({ albums }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [viewingAlbum, setViewingAlbum] = useState<Album | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    titleEn: "",
    eventDate: "",
    published: false,
    files: [] as File[]
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      const valid = selected.filter(f => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type) && f.size <= 5 * 1024 * 1024);
      if (valid.length !== selected.length) {
        alert("Some files were rejected. Only JPG/PNG/WEBP under 5MB are allowed.");
      }
      setFormData(prev => ({ ...prev, files: [...prev.files, ...valid] }));
    }
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleEn || !formData.eventDate) return alert("Title and date are required");
    
    setIsUploading(true);
    try {
      const data = new FormData();
      data.append('title', formData.titleEn);
      data.append('eventDate', formData.eventDate);
      data.append('isPublished', String(formData.published));
      
      const { id: albumId } = await createAlbum(data);
      
      let uploaded = 0;
      for (const file of formData.files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${albumId}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        
        const { data: uploadData, error } = await supabase.storage
          .from('gallery')
          .upload(fileName, file);
          
        if (error) throw error;
        
        const { data: publicUrlData } = supabase.storage
          .from('gallery')
          .getPublicUrl(uploadData.path);
          
        await addMediaToAlbum(albumId, publicUrlData.publicUrl);
        uploaded++;
        setUploadProgress(Math.round((uploaded / formData.files.length) * 100));
      }
      
      setShowAdd(false);
      setFormData({ titleEn: "", eventDate: "", published: false, files: [] });
      setUploadProgress(0);
    } catch (error) {
      console.error(error);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddMorePhotos = async (e: React.ChangeEvent<HTMLInputElement>, albumId: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    try {
      const selected = Array.from(e.target.files);
      for (const file of selected) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${albumId}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        
        const { data: uploadData, error } = await supabase.storage.from('gallery').upload(fileName, file);
        if (error) throw error;
        
        const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(uploadData.path);
        await addMediaToAlbum(albumId, publicUrlData.publicUrl);
      }
      setViewingAlbum(null); // Close modal to refresh
    } catch (err) {
      console.error(err);
      alert("Failed to upload photos");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (!confirm("Are you sure you want to delete this album and all its photos?")) return;
    try {
      await deleteAlbum(albumId);
      if (viewingAlbum?.id === albumId) setViewingAlbum(null);
    } catch (err) {
      alert("Failed to delete album");
    }
  };

  const handleDeletePhoto = async (mediaId: string, url: string) => {
    if (!confirm("Delete this photo?")) return;
    try {
      // Try to extract path from URL (last 2 segments)
      const pathParts = url.split('/');
      const path = `${pathParts[pathParts.length - 2]}/${pathParts[pathParts.length - 1]}`;
      await supabase.storage.from('gallery').remove([path]);
      await deleteMedia(mediaId);
      setViewingAlbum(null); // Close modal to refresh
    } catch (err) {
      alert("Failed to delete photo");
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Gallery & Media</h1>
          <p className="text-sm text-on-surface-variant">Manage photo albums and media collections.</p>
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
            <div key={a.id} className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => setViewingAlbum(a)}>
              {/* Cover */}
              <div className="h-48 bg-[#f6f3f2] flex items-center justify-center relative overflow-hidden">
                {a.coverImage ? (
                  <Image src={a.coverImage} alt={a.titleEn} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
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
              <div className="p-4" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-bold text-sm text-on-surface mb-1">{a.titleEn}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">{new Date(a.eventDate).toLocaleDateString("en-IN")} · {a.media.length} photos</span>
                  <div className="flex gap-1">
                    <button onClick={() => setViewingAlbum(a)} className="p-1.5 hover:bg-primary-fixed/20 rounded-lg text-on-surface-variant hover:text-primary transition-all">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                    <button onClick={() => handleDeleteAlbum(a.id)} className="p-1.5 hover:bg-error-container rounded-lg text-on-surface-variant hover:text-error transition-all">
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !isUploading && setShowAdd(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-primary">Create New Album</h2>
              <button disabled={isUploading} onClick={() => setShowAdd(false)} className="p-2 hover:bg-[#eae7e7] rounded-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleCreateAlbum}>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Album Title *</label>
                <input value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} required disabled={isUploading} className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Annual Day 2024" />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Event Date *</label>
                <input value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})} type="date" required disabled={isUploading} className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Upload Photos</label>
                <div onClick={() => !isUploading && fileInputRef.current?.click()} className={`border-2 border-dashed border-outline-variant rounded-xl p-8 text-center bg-[#f6f3f2] ${!isUploading ? 'cursor-pointer hover:border-primary' : 'opacity-50'} transition-colors`}>
                  <span className="material-symbols-outlined text-4xl text-outline block mb-2">upload_file</span>
                  <p className="text-sm text-on-surface-variant font-medium">Drag photos here or click to upload</p>
                  <p className="text-xs text-outline mt-1">JPG, PNG, WEBP up to 5MB each</p>
                  <input ref={fileInputRef} onChange={handleFileChange} type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" disabled={isUploading} />
                </div>
                {formData.files.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.files.map((f, i) => (
                      <div key={i} className="text-xs bg-secondary-container text-on-secondary-container px-2 py-1 rounded truncate max-w-[150px]">
                        {f.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} disabled={isUploading} className="w-4 h-4 rounded" />
                <span className="text-sm">Publish album on website</span>
              </label>
              
              {isUploading && (
                <div className="w-full bg-[#eae7e7] h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}

              <button type="submit" disabled={isUploading} className="w-full py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                <span className="material-symbols-outlined">{isUploading ? 'hourglass_empty' : 'save'}</span>
                {isUploading ? `Uploading (${uploadProgress}%)` : 'Create Album'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Album Modal */}
      {viewingAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isUploading && setViewingAlbum(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-6 z-10 h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant shrink-0">
              <div>
                <h2 className="font-bold text-2xl text-primary">{viewingAlbum.titleEn}</h2>
                <p className="text-sm text-on-surface-variant">{new Date(viewingAlbum.eventDate).toLocaleDateString("en-IN")} • {viewingAlbum.media.length} photos</p>
              </div>
              <div className="flex items-center gap-4">
                <button disabled={isUploading} onClick={() => addMoreInputRef.current?.click()} className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 flex items-center gap-2">
                  <span className="material-symbols-outlined">add_photo_alternate</span> Add Photos
                </button>
                <input ref={addMoreInputRef} onChange={(e) => handleAddMorePhotos(e, viewingAlbum.id)} type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" />
                <button onClick={() => setViewingAlbum(null)} className="p-2 hover:bg-[#eae7e7] rounded-lg text-on-surface-variant">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
            
            {isUploading && (
              <div className="mb-4 text-center text-sm font-bold text-primary animate-pulse shrink-0">
                Uploading new photos...
              </div>
            )}

            <div className="flex-1 overflow-y-auto min-h-0">
              {viewingAlbum.media.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-6xl mb-4 text-outline">image</span>
                  <p>No photos in this album yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-1">
                  {viewingAlbum.media.map((m) => (
                    <div key={m.id} className="relative aspect-square rounded-xl overflow-hidden group bg-[#f6f3f2]">
                      <Image src={m.url} alt="Gallery image" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => handleDeletePhoto(m.id, m.url)} className="p-2 bg-error text-white rounded-lg hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
