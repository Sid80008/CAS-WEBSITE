"use client";
// app/admin/tc/TCClient.tsx
import { useState } from "react";

type TCRecord = {
  id: string; certificateNo: string; reason: string; fileUrl: string;
  issuedAt: Date; dateOfLeaving: Date | null; classAtLeaving: string | null;
  conductGrade: string | null;
  student: { firstName: string; lastName: string; admissionNo: string };
};

interface Props { records: TCRecord[]; }

export default function TCClient({ records }: Props) {
  const [showIssue, setShowIssue] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = records.filter(r =>
    !search ||
    `${r.student.firstName} ${r.student.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    r.certificateNo.toLowerCase().includes(search.toLowerCase()) ||
    r.student.admissionNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-primary mb-1">TC & Certificates</h1>
          <p className="text-sm text-on-surface-variant">Issue and manage Transfer Certificates for students.</p>
        </div>
        <button onClick={() => setShowIssue(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all text-sm">
          <span className="material-symbols-outlined">add</span>Issue New TC
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-outline-variant rounded-t-xl p-4">
        <div className="relative max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-outline text-xl">search</span>
          <input className="w-full pl-10 pr-4 py-2 bg-[#f6f3f2] border border-outline-variant/30 rounded-lg text-sm outline-none"
            placeholder="Search by student name or certificate no..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border-x border-b border-outline-variant rounded-b-xl overflow-x-auto shadow-sm">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl block mb-2 text-outline">description</span>
            <p className="text-sm">{search ? "No records match your search." : "No TC records issued yet."}</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f6f3f2] border-b border-outline-variant">
                {["Cert No", "Student", "Class at Leaving", "Date of Leaving", "Conduct", "Reason", "Actions"].map(h =>
                  <th key={h} className="px-6 py-4 text-xs font-bold text-outline uppercase tracking-wider">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-[#f6f3f2] transition-colors">
                  <td className="px-6 py-4 text-sm font-mono font-bold text-primary">{r.certificateNo}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-on-surface">{r.student.firstName} {r.student.lastName}</p>
                    <p className="text-xs text-on-surface-variant">#{r.student.admissionNo}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{r.classAtLeaving ?? "—"}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {r.dateOfLeaving ? new Date(r.dateOfLeaving).toLocaleDateString("en-IN") : "—"}
                  </td>
                  <td className="px-6 py-4">
                    {r.conductGrade && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary-fixed/30 text-primary">{r.conductGrade}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant max-w-[200px] truncate">{r.reason}</td>
                  <td className="px-6 py-4">
                    <a href={r.fileUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 bg-primary-fixed/20 text-primary text-xs font-bold rounded-lg hover:bg-primary-fixed/30 transition-all">
                      <span className="material-symbols-outlined text-base">download</span>Download TC
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Issue TC Modal */}
      {showIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowIssue(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-primary">Issue Transfer Certificate</h2>
              <button onClick={() => setShowIssue(false)} className="p-2 hover:bg-[#eae7e7] rounded-lg">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Search Student *</label>
                <input className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="Type name or admission no..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Certificate No *</label>
                  <input name="certificateNo" required className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. TC/2024/001" />
                </div>
                <div>
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Date of Leaving *</label>
                  <input name="dateOfLeaving" type="date" required className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Class at Leaving</label>
                  <input name="classAtLeaving" className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Class 12-A" />
                </div>
                <div>
                  <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Conduct Grade</label>
                  <select name="conductGrade" className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none">
                    <option value="">Select</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Satisfactory">Satisfactory</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Reason for Leaving *</label>
                <textarea name="reason" required rows={3} className="w-full border border-outline-variant rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Reason for requesting TC..." />
              </div>
              <div>
                <label className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Upload Signed TC (PDF)</label>
                <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center bg-[#f6f3f2] cursor-pointer hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl text-outline block mb-1">upload_file</span>
                  <p className="text-sm text-on-surface-variant">Click to upload signed TC PDF</p>
                  <input type="file" accept=".pdf" className="hidden" />
                </div>
              </div>
              <button type="button" onClick={() => setShowIssue(false)} className="w-full py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">description</span>Issue TC
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
