"use client";
// app/admin/notices/NoticesClient.tsx
import { useState, useMemo } from "react";
import { createNotice, toggleNoticePublished, toggleNoticePinned } from "@/app/actions/noticeActions";
import { useTransition } from "react";

type Notice = {
  id: string; titleEn: string; titleHi: string | null; contentEn: string;
  slug: string; published: boolean; isPinned: boolean; targetRole: string;
  createdAt: Date; author: { email: string };
};

interface Props { notices: Notice[]; }

const ROLE_COLORS: Record<string, string> = {
  ALL: "bg-primary-fixed/20 text-primary",
  STUDENT: "bg-tertiary-fixed/30 text-tertiary-container",
  PARENT: "bg-secondary-fixed/30 text-secondary",
  TEACHER: "bg-[#eae7e7] text-outline",
};

export default function NoticesClient({ notices }: Props) {
  const [showCompose, setShowCompose] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    notices.filter((n) => !search || n.titleEn.toLowerCase().includes(search.toLowerCase())),
    [notices, search]);

  async function handleCreate(fd: FormData) {
    startTransition(async () => {
      await createNotice(fd);
      setShowCompose(false);
    });
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">Notices & Communication</h1>
          <p className="text-sm text-on-surface-variant">Post and manage notices for students, parents and staff.</p>
        </div>
        <button onClick={() => setShowCompose(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm">
          <span className="material-symbols-outlined">add</span>Post Notice
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-outline-variant rounded-t-xl p-4">
        <div className="relative max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-outline text-xl">search</span>
          <input className="w-full pl-10 pr-4 py-2 bg-[#f6f3f2] border border-outline-variant/30 rounded-lg text-sm outline-none"
            placeholder="Search notices..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Notices List */}
      <div className="bg-white border-x border-b border-outline-variant rounded-b-xl shadow-sm divide-y divide-outline-variant/40">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-4xl block mb-2 text-outline">campaign</span>
            No notices found. Post your first notice.
          </div>
        ) : filtered.map((n) => (
          <div key={n.id} className="px-6 py-4 flex items-start gap-4 hover:bg-[#f6f3f2] transition-colors">
            <div className="p-2 bg-primary-fixed/20 rounded-lg mt-0.5 flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-xl">{n.isPinned ? "push_pin" : "article"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {n.isPinned && <span className="text-xs font-bold text-secondary bg-secondary-fixed/30 px-2 py-0.5 rounded-full">📌 Pinned</span>}
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ROLE_COLORS[n.targetRole] ?? ROLE_COLORS.ALL}`}>{n.targetRole}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${n.published ? "bg-tertiary-fixed/30 text-tertiary-container" : "bg-[#eae7e7] text-outline"}`}>
                  {n.published ? "Published" : "Draft"}
                </span>
              </div>
              <p className="text-sm font-semibold text-on-surface">{n.titleEn}</p>
              <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">{n.contentEn}</p>
              <p className="text-xs text-on-surface-variant mt-1">{new Date(n.createdAt).toLocaleDateString("en-IN")} · {n.author.email}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <form action={toggleNoticePinned.bind(null, n.id, !n.isPinned)}>
                <button type="submit" className="p-2 rounded-lg hover:bg-[#eae7e7] text-on-surface-variant transition-all" title="Toggle Pin">
                  <span className="material-symbols-outlined text-xl">push_pin</span>
                </button>
              </form>
              <form action={toggleNoticePublished.bind(null, n.id, !n.published)}>
                <button type="submit" className={`p-2 rounded-lg transition-all text-sm font-bold px-3 ${n.published ? "bg-[#eae7e7] text-outline hover:bg-error-container hover:text-error" : "bg-tertiary-fixed/30 text-tertiary-container hover:bg-tertiary-fixed/50"}`}>
                  {n.published ? "Unpublish" : "Publish"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCompose(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-primary">Post a Notice</h2>
              <button onClick={() => setShowCompose(false)} className="p-2 hover:bg-[#eae7e7] rounded-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form action={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Title (English) *</label>
                <input name="titleEn" required className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. School Holiday Notice" />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Title (Hindi)</label>
                <input name="titleHi" className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="हिंदी में शीर्षक" />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Content *</label>
                <textarea name="contentEn" required rows={4} className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Notice content..." />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Target Audience</label>
                <select name="targetRole" className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none">
                  <option value="ALL">Everyone</option>
                  <option value="STUDENT">Students</option>
                  <option value="PARENT">Parents</option>
                  <option value="TEACHER">Teachers</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Image/Attachment URL (Optional)</label>
                <input name="imageUrl" type="url" className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="https://example.com/image.jpg" />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="published" className="w-4 h-4 rounded" /> <span className="text-sm">Publish immediately</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isPinned" className="w-4 h-4 rounded" /> <span className="text-sm">Pin notice</span>
                </label>
              </div>
              <button type="submit" disabled={isPending} className="w-full py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {isPending ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <span className="material-symbols-outlined">send</span>}
                {isPending ? "Posting..." : "Post Notice"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
