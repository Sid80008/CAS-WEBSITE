"use client";

import { useState, useTransition } from "react";
import { createTopper, deleteTopper } from "@/app/actions/topperActions";

interface TopperType {
  id: string;
  name: string;
  class: string;
  section: string | null;
  year: string;
  percentage: number;
  rank: number | null;
  imageUrl: string | null;
}

export default function ToppersClient({ toppers }: { toppers: TopperType[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      await createTopper(formData);
      setIsAddOpen(false);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this topper?")) {
      startTransition(async () => {
        await deleteTopper(id);
      });
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Toppers Management</h1>
          <p className="text-sm text-on-surface-variant">Showcase your school's top academic achievers.</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md transition-all text-sm"
        >
          <span className="material-symbols-outlined">add</span>
          Add Topper
        </button>
      </div>

      <div className="bg-white border border-outline-variant rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f6f3f2] border-b border-outline-variant">
              {["Name", "Class", "Section", "Year", "%", "Rank", "Actions"].map(h =>
                <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/40">
            {toppers.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-16 text-center text-sm text-on-surface-variant">No toppers found.</td></tr>
            ) : toppers.map((t) => (
              <tr key={t.id} className="hover:bg-[#f6f3f2] transition-colors">
                <td className="px-6 py-4 text-sm font-semibold flex items-center gap-3">
                  {t.imageUrl ? (
                    <img src={t.imageUrl} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-outline-variant" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  {t.name}
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">Class {t.class}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{t.section || "—"}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{t.year}</td>
                <td className="px-6 py-4 text-sm font-bold text-primary">{t.percentage}%</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">
                  {t.rank ? <span className="bg-school-saffron/10 text-school-saffron px-2 py-0.5 rounded font-bold">#{t.rank}</span> : "—"}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-700 transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10 max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-xl text-primary mb-6">Add New Topper</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold block mb-1">Student Name</label>
                <input name="name" required className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1">Class</label>
                  <input name="class" required className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Section</label>
                  <input name="section" className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="Optional" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1">Academic Year</label>
                  <input name="year" required placeholder="e.g. 2025-26" className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Percentage</label>
                  <input name="percentage" type="number" step="0.01" required className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1">Rank</label>
                  <input name="rank" type="number" className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="Optional" />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Image URL</label>
                  <input name="imageUrl" className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="/toppers/image.jpg" />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant mt-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={isPending} className="px-6 py-2 bg-primary text-white font-bold rounded-lg disabled:opacity-50">
                  {isPending ? "Saving..." : "Save Topper"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
