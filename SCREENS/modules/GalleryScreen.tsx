"use client";

import * as React from "react";
import { Plus, Image as ImageIcon, Trash2, ExternalLink, UploadCloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGallery } from "../hooks/useGallery";
import { Gallery } from "@/lib/api/gallery";

export function GalleryScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingAlbum, setEditingAlbum] = React.useState<Gallery | null>(null);
  
  const { data, isLoading, createAlbum, updateAlbum, deleteAlbum, isMutating } = useGallery({
    page: 1,
    limit: 100
  });

  const albums = data?.data || [];

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAlbum(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imageUrl = formData.get("imageUrl") as string;
    
    const payload = {
      titleEn: formData.get("title") as string,
      images: [imageUrl],
      published: true,
    };

    try {
      if (editingAlbum) {
        await updateAlbum({ id: editingAlbum.id, data: payload });
      } else {
        await createAlbum(payload);
      }
      handleModalClose();
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Photo Gallery</h1>
          <p className="text-sm text-gray-500">Curate albums and moments from school life.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => { setEditingAlbum(null); setIsModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Create Album
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div 
            key={album.id} 
            className="group relative bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              {album.images?.[0] && (
                <img 
                  src={album.images[0]} 
                  alt={album.titleEn} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="h-9 w-9 p-0 rounded-full"
                  onClick={() => { setEditingAlbum(album); setIsModalOpen(true); }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="h-9 w-9 p-0 rounded-full"
                  onClick={() => confirm("Delete this album?") && deleteAlbum(album.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                {album.titleEn}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" /> {album.images?.length || 0} Photos
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  {new Date(album.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={() => { setEditingAlbum(null); setIsModalOpen(true); }}
          className="aspect-[4/3] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-all hover:bg-indigo-50/50"
        >
          <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
             <Plus className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium">Add New Album</span>
        </button>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingAlbum ? "Edit Album" : "Create Photo Album"}
        description="Bundle your school event photos into a new gallery album."
        onSubmit={() => {}}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Album Title</Label>
            <Input name="title" placeholder="E.g. Farewell Batch 2026" defaultValue={editingAlbum?.titleEn} required />
          </div>
          <div className="space-y-2">
            <Label>Cover Image URL</Label>
            <Input name="imageUrl" placeholder="HTTPS URL to cover photo" defaultValue={editingAlbum?.images?.[0]} required />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={handleModalClose}>Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isMutating}>
              {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingAlbum ? "Update Album" : "Save Album"}
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}
