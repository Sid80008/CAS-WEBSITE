"use client";

import * as React from "react";
import { Plus, Image as ImageIcon, Trash2, ExternalLink, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Album {
  id: string;
  title: string;
  imageCount: number;
  coverUrl: string;
  date: string;
}

export function GalleryScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const albums: Album[] = [
    { id: "1", title: "Annual Day 2025", imageCount: 24, coverUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400", date: "2025-12-15" },
    { id: "2", title: "Sports Meet", imageCount: 15, coverUrl: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=400", date: "2025-11-10" },
    { id: "3", title: "Science Exhibition", imageCount: 12, coverUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400", date: "2025-10-05" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Photo Gallery</h1>
          <p className="text-sm text-gray-500">Curate albums and moments from school life.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsModalOpen(true)}>
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
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={album.coverUrl} 
                alt={album.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button variant="secondary" size="sm" className="h-9 w-9 p-0 rounded-full">
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" className="h-9 w-9 p-0 rounded-full">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{album.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" /> {album.imageCount} Photos
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  {new Date(album.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={() => setIsModalOpen(true)}
          className="aspect-[4/3] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-all hover:bg-indigo-50/50"
        >
          <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-indigo-100">
             <Plus className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium">Add New Album</span>
        </button>
      </div>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Photo Album"
        description="Bundle your school event photos into a new gallery album."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Album Title</Label>
            <Input placeholder="E.g. Farewell Batch 2026" />
          </div>
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100/50 transition-all cursor-pointer">
              <UploadCloud className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-sm font-medium text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
