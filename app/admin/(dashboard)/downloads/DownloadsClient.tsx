"use client";
// app/admin/downloads/DownloadsClient.tsx
import { useState, useTransition } from "react";
import type { Resource } from "@prisma/client";
import { uploadResource, deleteResource } from "@/app/actions/resourceActions";

interface Props { resources: Resource[]; }

const TYPE_ICONS: Record<string, string> = {
  pdf: "picture_as_pdf", form: "assignment", circular: "campaign", syllabus: "menu_book",
};

export default function DownloadsClient({ resources }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("published", formData.get("published") === "on" ? "true" : "false");

    startTransition(async () => {
      try {
        await uploadResource(formData);
        setShowAdd(false);
      } catch (err: any) {
        alert("Upload failed: " + err.message);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    startTransition(async () => {
      try {
        await deleteResource(id);
      } catch (err: any) {
        alert("Delete failed: " + err.message);
      }
    });
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Downloads</h1>
          <p className="text-sm text-on-surface-variant">Manage downloadable resources, forms and documents for the school.</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm">
          <span className="material-symbols-outlined">upload_file</span>Upload Document
        </button>
      </div>

      {resources.length === 0 ? (
        <div className="bg-white border border-outline-variant rounded-xl py-24 text-center">
          <span className="material-symbols-outlined text-6xl block mb-3 text-outline">folder_open</span>
          <h3 className="font-bold text-lg text-on-surface mb-2">No documents uploaded</h3>
          <p className="text-sm text-on-surface-variant mb-6">Upload forms, circulars and other resources for parents and students.</p>
          <button onClick={() => setShowAdd(true)} className="px-6 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:opacity-90 transition-all text-sm">
            Upload First Document
          </button>
        </div>
      ) : (
        <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f6f3f2] border-b border-outline-variant">
                {["Title", "Type", "Slug", "Published", "Date", "Actions"].map(h =>
                  <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {resources.map(r => (
                <tr key={r.id} className="hover:bg-[#f6f3f2] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-error-container rounded-lg">
                        <span className="material-symbols-outlined text-error text-xl">{TYPE_ICONS[r.type ?? ""] ?? "description"}</span>
                      </div>
                      <span className="text-sm font-semibold text-on-surface">{r.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant capitalize">{r.type ?? "—"}</td>
                  <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">{r.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${r.published ? "bg-tertiary-fixed/30 text-tertiary-container" : "bg-[#eae7e7] text-outline"}`}>
                      {r.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{new Date(r.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <a href={r.fileUrl} target="_blank" rel="noopener noreferrer"
                        className="p-2 hover:bg-primary-fixed/20 rounded-lg text-on-surface-variant hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-xl">download</span>
                      </a>
                      <button disabled={isPending} onClick={() => handleDelete(r.id)} className="p-2 hover:bg-error-container rounded-lg text-on-surface-variant hover:text-error transition-all disabled:opacity-50">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-primary">Upload Document</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-[#eae7e7] rounded-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleUpload}>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Title *</label>
                <input name="title" required className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Admission Form 2024-25" />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Document Type</label>
                <select name="type" className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none">
                  <option value="form">Form</option>
                  <option value="circular">Circular</option>
                  <option value="syllabus">Syllabus</option>
                  <option value="pdf">General PDF</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">File *</label>
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center bg-[#f6f3f2] hover:border-primary transition-colors relative">
                  <span className="material-symbols-outlined text-3xl text-outline block mb-1">upload_file</span>
                  <p className="text-sm text-on-surface-variant">Click to select PDF or DOCX file</p>
                  <input type="file" name="file" required accept=".pdf,.doc,.docx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="published" className="w-4 h-4 rounded" defaultChecked />
                <span className="text-sm">Publish on website</span>
              </label>
              <button type="submit" disabled={isPending} className="w-full py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                <span className="material-symbols-outlined">upload</span>{isPending ? "Uploading..." : "Upload Document"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
