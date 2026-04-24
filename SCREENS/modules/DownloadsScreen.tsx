"use client";

import * as React from "react";
import { Plus, Download, FileText, Trash2, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDownloads } from "../hooks/useDownloads";
import { Resource } from "@/lib/api/downloads";

export function DownloadsScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const { data, isLoading, createResource, deleteResource, isMutating } = useDownloads({
    search,
    page: 1,
    limit: 50
  });

  const resources = data?.data || [];

  const columns = [
    { 
      header: "Document Title", 
      accessor: (d: Resource) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{d.title}</p>
            <p className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">{d.type}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Uploaded On", 
      accessor: (d: Resource) => new Date(d.createdAt).toLocaleDateString() 
    },
    { 
      header: "Status", 
      accessor: (d: Resource) => (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
          d.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
        }`}>
          {d.published ? "Published" : "Draft"}
        </span>
      )
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title") as string,
      fileUrl: formData.get("fileUrl") as string,
      type: "OTHER" as any,
      published: true
    };

    try {
      await createResource(payload);
      setIsModalOpen(false);
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
          <h1 className="text-2xl font-bold">Resource Center</h1>
          <p className="text-sm text-gray-500">Upload public documents, forms and newsletters.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border">
        <SearchBar onSearch={setSearch} placeholder="Search resources by title..." />
      </div>

      <DataTable 
        data={resources} 
        columns={columns} 
        actions={[
          { label: "View/Download", icon: <Globe className="h-4 w-4" />, onClick: (d: Resource) => window.open(d.fileUrl, "_blank") }, 
          { label: "Delete", variant: "destructive", onClick: (d: Resource) => confirm("Delete this resource?") && deleteResource(d.id) }
        ]} 
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Public Resource"
        description="Documents added here will be available on the 'Downloads' section of the public website."
        onSubmit={() => {}}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Display Title</Label>
            <Input name="title" placeholder="E.g. Admission Form 2026-27" required />
          </div>
          <div className="space-y-2">
            <Label>Resource URL</Label>
            <Input name="fileUrl" placeholder="HTTPS URL to the file (Google Drive, Cloudinary etc)" required />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isMutating}>
              {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Resource
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}
