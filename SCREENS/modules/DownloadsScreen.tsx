"use client";

import * as React from "react";
import { Plus, Download, FileText, Trash2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import { SearchBar } from "../components/SearchBar";
import { FormModal } from "../components/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DownloadItem {
  id: string;
  title: string;
  filename: string;
  size: string;
  count: number;
  date: string;
}

export function DownloadsScreen() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const data: DownloadItem[] = [
    { id: "1", title: "School Prospectus 2026", filename: "prospectus_final.pdf", size: "4.2 MB", count: 125, date: "2026-03-01" },
    { id: "2", title: "Monthly Newsletter - April", filename: "nl_april_26.pdf", size: "1.8 MB", count: 86, date: "2026-04-01" },
  ];

  const columns = [
    { header: "Document Title", accessor: (d: DownloadItem) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{d.title}</p>
          <p className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">{d.filename}</p>
        </div>
      </div>
    )},
    { header: "Size", accessor: "size" as keyof DownloadItem },
    { header: "Downloads", accessor: (d: DownloadItem) => (
      <div className="flex items-center gap-1 text-gray-600 font-medium">
        <Download className="h-3 w-3 text-gray-400" /> {d.count}
      </div>
    )},
    { header: "Uploaded On", accessor: "date" as keyof DownloadItem },
  ];

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

      <div className="bg-white p-4 rounded-xl border flex items-center justify-between">
        <SearchBar onSearch={() => {}} placeholder="Search resources..." />
      </div>

      <DataTable data={data} columns={columns} actions={[{ label: "Download", icon: <Globe className="h-4 w-4" />, onClick: () => {} }, { label: "Delete", variant: "destructive", onClick: () => {} }]} />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Public Resource"
        description="Documents uploaded here will be available on the 'Downloads' section of the public website."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Display Title</Label>
            <Input placeholder="E.g. Admission Form 2026-27" />
          </div>
          <div className="space-y-2">
            <Label>File Selection</Label>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
              <Input type="file" className="bg-white border-dashed h-20 flex items-center justify-center p-4" />
            </div>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
