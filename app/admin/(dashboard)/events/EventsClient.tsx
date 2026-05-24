"use client";

import { useState, useMemo, useTransition } from "react";
import { createEvent, updateEvent, deleteEvent } from "@/app/actions/eventActions";

type Event = {
  id: string;
  titleEn: string;
  descriptionEn: string;
  date: Date;
  eventType: string;
  published: boolean;
  targetClass: string | null;
  photo: string | null;
};

interface Props {
  events: Event[];
}

const TYPE_COLORS: Record<string, string> = {
  EXAM: "bg-error-container text-error",
  HOLIDAY: "bg-tertiary-fixed/30 text-tertiary-container",
  SPORTS: "bg-secondary-fixed/30 text-secondary",
  CULTURAL: "bg-primary-fixed/30 text-primary",
  MEETING: "bg-[#eae7e7] text-outline",
  OTHER: "bg-[#eae7e7] text-outline",
};

export default function EventsClient({ events }: Props) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() =>
    events.filter((e) => {
      const matchSearch = !search || e.titleEn.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All" || e.eventType === typeFilter;
      return matchSearch && matchType;
    }), [events, search, typeFilter]);

  const upcoming = filtered.filter(e => new Date(e.date) >= new Date());
  const past = filtered.filter(e => new Date(e.date) < new Date());

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await createEvent(formData);
      setShowAdd(false);
    });
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingEvent) return;
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateEvent(editingEvent.id, formData);
      setEditingEvent(null);
    });
  };

  const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!deletingEvent) return;
    startTransition(async () => {
      await deleteEvent(deletingEvent.id);
      setDeletingEvent(null);
    });
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-[#1c1b1b]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Events & Calendar</h1>
          <p className="text-sm text-on-surface-variant">Manage school events, exams, holidays and activities.</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm">
          <span className="material-symbols-outlined">add</span>Add Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-outline text-xl">search</span>
          <input className="pl-10 pr-4 py-2 bg-white border border-outline-variant rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {["All", "EXAM", "HOLIDAY", "SPORTS", "CULTURAL", "MEETING", "OTHER"].map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${typeFilter === t ? "bg-primary text-white" : "bg-white border border-outline-variant text-on-surface-variant hover:bg-[#f6f3f2]"}`}>
            {t}
          </button>
        ))}
      </div>

      {upcoming.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">upcoming</span> Upcoming
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map(e => (
              <div key={e.id} className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${TYPE_COLORS[e.eventType] ?? TYPE_COLORS.OTHER}`}>{e.eventType}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${e.published ? "bg-tertiary-fixed/30 text-tertiary-container" : "bg-[#eae7e7] text-outline"}`}>
                    {e.published ? "Published" : "Draft"}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-on-surface mb-1">{e.titleEn}</h3>
                <p className="text-xs text-on-surface-variant line-clamp-2 mb-3">{e.descriptionEn}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">{new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingEvent(e)}
                      className="p-1.5 hover:bg-primary-fixed/20 rounded-lg text-on-surface-variant hover:text-primary transition-all"
                      title="Edit Event"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button
                      onClick={() => setDeletingEvent(e)}
                      className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-all"
                      title="Delete Event"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="font-bold text-lg text-on-surface-variant mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">history</span> Past Events
          </h2>
          <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f6f3f2] border-b border-outline-variant">
                  {["Event", "Type", "Date", "Status", "Actions"].map(h =>
                    <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {past.map(e => (
                  <tr key={e.id} className="hover:bg-[#f6f3f2] transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-on-surface">{e.titleEn}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${TYPE_COLORS[e.eventType] ?? TYPE_COLORS.OTHER}`}>{e.eventType}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{new Date(e.date).toLocaleDateString("en-IN")}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${e.published ? "bg-tertiary-fixed/30 text-tertiary-container" : "bg-[#eae7e7] text-outline"}`}>
                        {e.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingEvent(e)}
                          className="p-1.5 hover:bg-primary-fixed/20 rounded-lg text-on-surface-variant hover:text-primary transition-all"
                          title="Edit Event"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => setDeletingEvent(e)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-all"
                          title="Delete Event"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="bg-white border border-outline-variant rounded-xl py-16 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl block mb-2 text-outline">event</span>
          <p className="text-sm">No events found. Add the first event!</p>
        </div>
      )}

      {/* Add Event Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-primary">Add New Event</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-[#eae7e7] rounded-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Event Title *</label>
                <input name="titleEn" required className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Annual Sports Day" />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Description *</label>
                <textarea name="descriptionEn" required rows={3} className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Event description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Date *</label>
                  <input name="date" type="date" required className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Event Type</label>
                  <select name="eventType" className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none bg-white">
                    {["EXAM", "HOLIDAY", "SPORTS", "CULTURAL", "MEETING", "OTHER"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="published" className="w-4 h-4 rounded" />
                <span className="text-sm">Publish immediately</span>
              </label>
              <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border border-outline rounded-lg text-slate-600">Cancel</button>
                <button type="submit" disabled={isPending} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 shadow-sm disabled:opacity-60">
                  {isPending ? "Saving..." : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditingEvent(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-primary">Edit Event</h2>
              <button onClick={() => setEditingEvent(null)} className="p-2 hover:bg-[#eae7e7] rounded-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Event Title *</label>
                <input name="titleEn" required defaultValue={editingEvent.titleEn} className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Annual Sports Day" />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Description *</label>
                <textarea name="descriptionEn" required defaultValue={editingEvent.descriptionEn} rows={3} className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Event description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Date *</label>
                  <input name="date" type="date" required defaultValue={new Date(editingEvent.date).toISOString().split('T')[0]} className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Event Type</label>
                  <select name="eventType" defaultValue={editingEvent.eventType} className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none bg-white">
                    {["EXAM", "HOLIDAY", "SPORTS", "CULTURAL", "MEETING", "OTHER"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="published" defaultChecked={editingEvent.published} className="w-4 h-4 rounded" />
                <span className="text-sm">Publish immediately</span>
              </label>
              <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant">
                <button type="button" onClick={() => setEditingEvent(null)} className="px-4 py-2 border border-outline rounded-lg text-slate-600">Cancel</button>
                <button type="submit" disabled={isPending} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 shadow-sm disabled:opacity-60">
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E2E0DB] p-6 max-w-sm w-full shadow-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-red-600 mb-2">Delete Event</h3>
              <p className="text-sm text-slate-600">
                Are you sure you want to delete the event <strong>{deletingEvent.titleEn}</strong>? This action cannot be undone.
              </p>
            </div>
            <form onSubmit={handleDeleteSubmit} className="flex gap-3 justify-end pt-3 border-t border-[#E2E0DB]">
              <button type="button" onClick={() => setDeletingEvent(null)} className="px-4 py-2 border border-[#E2E0DB] rounded-lg text-slate-600">Cancel</button>
              <button type="submit" disabled={isPending} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm disabled:opacity-60">
                {isPending ? "Deleting..." : "Delete Event"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
