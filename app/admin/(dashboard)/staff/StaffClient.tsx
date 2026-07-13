"use client";

import { useState, useMemo, useTransition } from "react";
import Image from "next/image";
import { createStaff, updateStaff, deleteStaff, assignStaffSubject, unassignStaffSubject } from "@/app/actions/staffActions";

type StaffMember = {
  id: string;
  name: string;
  designation: string | null;
  empCode: string | null;
  photo: string | null;
  qualification: string | null;
  isActive: boolean;
  isPublic: boolean;
  dateOfJoining: Date | null;
  userId: string;
  user: {
    email: string;
    phone?: string | null;
    role: string;
  };
  assignments: Array<{
    sectionId: string;
    subjectId: string;
    className: string;
    sectionName: string;
    subjectName: string;
  }>;
};

interface Props {
  staff: StaffMember[];
  sections: Array<{ id: string; name: string; class: { name: string } }>;
  subjects: Array<{ id: string; name: string; class: { name: string } | null }>;
}

export default function StaffClient({ staff, sections, subjects }: Props) {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isPending, startTransition] = useTransition();

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [deletingStaff, setDeletingStaff] = useState<StaffMember | null>(null);
  const [assigningStaff, setAssigningStaff] = useState<StaffMember | null>(null);

  const filtered = useMemo(() =>
    staff.filter((s) => !search || s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.designation ?? "").toLowerCase().includes(search.toLowerCase())),
    [staff, search]);

  const currentAssigningStaff = useMemo(() => {
    if (!assigningStaff) return null;
    return staff.find(s => s.id === assigningStaff.id) || assigningStaff;
  }, [staff, assigningStaff]);

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await createStaff(formData);
      setIsAddOpen(false);
    });
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingStaff) return;
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateStaff(editingStaff.id, formData);
      setEditingStaff(null);
    });
  };

  const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!deletingStaff) return;
    startTransition(async () => {
      await deleteStaff(deletingStaff.id);
      setDeletingStaff(null);
    });
  };

  const handleAssignSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!assigningStaff) return;
    const formData = new FormData(e.currentTarget);
    const sectionId = formData.get("sectionId") as string;
    const subjectId = formData.get("subjectId") as string;
    startTransition(async () => {
      await assignStaffSubject(assigningStaff.id, sectionId, subjectId);
    });
  };

  const handleUnassign = async (sectionId: string, subjectId: string) => {
    if (!assigningStaff) return;
    startTransition(async () => {
      await unassignStaffSubject(assigningStaff.id, sectionId, subjectId);
    });
  };

  return (
    <div className="text-[#1c1b1b]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl text-[#00386b] mb-1">Staff Management</h1>
          <p className="text-sm text-[#555555]">Manage teaching and non-teaching staff records.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="p-2.5 bg-white border border-[#E2E0DB] rounded-lg hover:bg-[#f6f3f2] transition-all">
            <span className="material-symbols-outlined">{view === "grid" ? "view_list" : "grid_view"}</span>
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#00386b] text-white font-bold rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all text-sm"
          >
            <span className="material-symbols-outlined">person_add</span>Add Staff
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-[#E2E0DB] p-5 rounded-xl shadow-sm">
          <div className="p-2 bg-[#E6F1FB] rounded-lg w-fit mb-2"><span className="material-symbols-outlined text-[#00386b]">badge</span></div>
          <p className="text-xs font-bold text-[#555555] uppercase tracking-wider">Total Staff</p>
          <p className="text-xl font-bold text-[#1c1b1b] mt-1">{staff.length}</p>
        </div>
        <div className="bg-white border border-[#E2E0DB] p-5 rounded-xl shadow-sm">
          <div className="p-2 bg-[#E1F5EE] rounded-lg w-fit mb-2"><span className="material-symbols-outlined text-[#085041]">person_check</span></div>
          <p className="text-xs font-bold text-[#555555] uppercase tracking-wider">Active</p>
          <p className="text-xl font-bold text-[#1c1b1b] mt-1">{staff.filter(s => s.isActive).length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <span className="absolute inset-y-0 left-3 flex items-center material-symbols-outlined text-[#737781] text-xl">search</span>
        <input className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E0DB] rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#00386b]"
          placeholder="Search staff by name or designation..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E2E0DB] rounded-xl py-16 text-center text-[#555555] text-sm">
          <span className="material-symbols-outlined text-5xl block mb-2 text-[#737781]">badge</span>
          No staff records found.
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((s) => (
            <div key={s.id} className="bg-white border border-[#E2E0DB] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#E6F1FB] flex items-center justify-center mb-3 text-[#00386b] font-bold text-xl group-hover:bg-[#b2d4f5] transition-colors">
                  {s.photo ? <Image src={s.photo} alt={s.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover" /> : s.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <h3 className="font-bold text-sm text-[#1c1b1b]">{s.name}</h3>
                <p className="text-xs text-[#555555] mt-0.5">{s.designation ?? "Staff"}</p>
                {s.empCode && <p className="text-xs text-slate-500 font-mono mt-1">#{s.empCode}</p>}
                
                {/* Active Assignments Summary */}
                <div className="mt-3 text-left w-full">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Taught Classes</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {s.assignments && s.assignments.length > 0 ? (
                      s.assignments.slice(0, 3).map((a, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                          {a.className}-{a.sectionName}: {a.subjectName}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] italic text-slate-400">None assigned</span>
                    )}
                    {s.assignments && s.assignments.length > 3 && (
                      <span className="text-[10px] text-primary font-bold">+{s.assignments.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-[#E2E0DB] pt-3 mt-auto">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.isActive ? "bg-[#E1F5EE] text-[#085041]" : "bg-[#eae7e7] text-slate-500"}`}>
                  {s.isActive ? "Active" : "Inactive"}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setAssigningStaff(s)}
                    className="p-1.5 hover:bg-emerald-50 rounded-lg transition-all text-emerald-600"
                    title="Assign Classes"
                  >
                    <span className="material-symbols-outlined text-lg">school</span>
                  </button>
                  <button
                    onClick={() => setEditingStaff(s)}
                    className="p-1.5 hover:bg-[#E6F1FB] rounded-lg transition-all text-[#00386b]"
                    title="Edit Staff"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button
                    onClick={() => setDeletingStaff(s)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-all text-red-600"
                    title="Delete Staff"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E2E0DB] rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f6f3f2] border-b border-[#E2E0DB]">
                {["Name", "Designation", "Emp Code", "Email", "Status", "Actions"].map(h =>
                  <th key={h} className="px-6 py-4 text-xs font-bold text-[#424750] uppercase tracking-wider">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E0DB]">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-[#fcf9f8] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E6F1FB] flex items-center justify-center text-[#00386b] text-xs font-bold flex-shrink-0">
                        {s.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-[#1c1b1b]">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#424750]">{s.designation ?? "—"}</td>
                  <td className="px-6 py-4 text-sm font-mono text-[#424750]">{s.empCode ?? "—"}</td>
                  <td className="px-6 py-4 text-sm text-[#424750]">{s.user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${s.isActive ? "bg-[#E1F5EE] text-[#085041]" : "bg-[#eae7e7] text-slate-500"}`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAssigningStaff(s)}
                        className="p-2 hover:bg-emerald-50 rounded-lg transition-all text-emerald-600"
                        title="Assign Classes"
                      >
                        <span className="material-symbols-outlined text-xl">school</span>
                      </button>
                      <button
                        onClick={() => setEditingStaff(s)}
                        className="p-2 hover:bg-[#E6F1FB] rounded-lg transition-all text-[#00386b]"
                        title="Edit Staff"
                      >
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingStaff(s)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-all text-red-600"
                        title="Delete Staff"
                      >
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

      {/* Add Staff Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E2E0DB] p-6 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#E2E0DB] pb-3">
              <h3 className="text-lg font-bold text-[#00386b]">Add Staff Member</h3>
              <button onClick={() => setIsAddOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Full Name</label>
                <input required type="text" name="name" className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Email Address</label>
                  <input required type="email" name="email" className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Phone</label>
                  <input type="tel" name="phone" className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Role</label>
                  <select name="role" required className="w-full px-3 py-2 bg-white border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]">
                    <option value="TEACHER">Teacher</option>
                    <option value="OFFICE">Office Staff</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Employee Code</label>
                  <input required type="text" name="empCode" className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Designation</label>
                  <input type="text" name="designation" placeholder="e.g. Mathematics PGT" className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Date of Joining</label>
                  <input type="date" name="dateOfJoining" required className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Display on Public Website?</label>
                <select name="isPublic" className="w-full px-3 py-2 bg-white border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end pt-3 border-t border-[#E2E0DB]">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border border-[#E2E0DB] rounded-lg text-slate-600">Cancel</button>
                <button type="submit" disabled={isPending} className="px-5 py-2 bg-[#00386b] hover:opacity-90 text-white font-bold rounded-lg shadow-sm disabled:opacity-60">
                  {isPending ? "Adding..." : "Save Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {editingStaff && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E2E0DB] p-6 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#E2E0DB] pb-3">
              <h3 className="text-lg font-bold text-[#00386b]">Edit Staff Profile</h3>
              <button onClick={() => setEditingStaff(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Full Name</label>
                <input required defaultValue={editingStaff.name} type="text" name="name" className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Email Address</label>
                  <input required defaultValue={editingStaff.user.email} type="email" name="email" className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Phone</label>
                  <input defaultValue={editingStaff.user.phone || ""} type="tel" name="phone" className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Role</label>
                  <select name="role" defaultValue={editingStaff.user.role} required className="w-full px-3 py-2 bg-white border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]">
                    <option value="TEACHER">Teacher</option>
                    <option value="OFFICE">Office Staff</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Employee Code</label>
                  <input required defaultValue={editingStaff.empCode || ""} type="text" name="empCode" className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Designation</label>
                  <input defaultValue={editingStaff.designation || ""} type="text" name="designation" className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Date of Joining</label>
                  <input
                    type="date"
                    name="dateOfJoining"
                    required
                    defaultValue={editingStaff.dateOfJoining ? new Date(editingStaff.dateOfJoining).toISOString().split('T')[0] : ""}
                    className="w-full px-3 py-2 border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Display on Public Website?</label>
                <select name="isPublic" defaultValue={String(editingStaff.isPublic)} className="w-full px-3 py-2 bg-white border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end pt-3 border-t border-[#E2E0DB]">
                <button type="button" onClick={() => setEditingStaff(null)} className="px-4 py-2 border border-[#E2E0DB] rounded-lg text-slate-600">Cancel</button>
                <button type="submit" disabled={isPending} className="px-5 py-2 bg-[#00386b] hover:opacity-90 text-white font-bold rounded-lg shadow-sm disabled:opacity-60">
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingStaff && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E2E0DB] p-6 max-w-sm w-full shadow-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-red-600 mb-2">Delete Staff Member</h3>
              <p className="text-sm text-slate-600">
                Are you sure you want to delete <strong>{deletingStaff.name}</strong>? This will delete their staff profile and associated login user account. This action cannot be undone.
              </p>
            </div>
            <form onSubmit={handleDeleteSubmit} className="flex gap-3 justify-end pt-3 border-t border-[#E2E0DB]">
              <button type="button" onClick={() => setDeletingStaff(null)} className="px-4 py-2 border border-[#E2E0DB] rounded-lg text-slate-600">Cancel</button>
              <button type="submit" disabled={isPending} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-sm disabled:opacity-60">
                {isPending ? "Deleting..." : "Delete Account"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Class Assignment Modal */}
      {currentAssigningStaff && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E2E0DB] p-6 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E2E0DB] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#00386b]">Assign Classes &amp; Subjects</h3>
                <p className="text-xs text-slate-500">Manage teaching assignments for {currentAssigningStaff.name}</p>
              </div>
              <button onClick={() => setAssigningStaff(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            {/* Current Assignments List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Current Assignments</h4>
              {currentAssigningStaff.assignments && currentAssigningStaff.assignments.length > 0 ? (
                <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
                  {currentAssigningStaff.assignments.map((a, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Class {a.className} - {a.sectionName}</p>
                        <p className="text-xs text-slate-500">Subject: {a.subjectName}</p>
                      </div>
                      <button
                        onClick={() => handleUnassign(a.sectionId, a.subjectId)}
                        disabled={isPending}
                        className="p-1 hover:bg-red-50 text-red-500 rounded transition-all"
                        title="Remove Assignment"
                      >
                        <span className="material-symbols-outlined text-lg">delete_sweep</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-lg text-center border border-dashed border-slate-200">
                  No active class assignments for this staff.
                </p>
              )}
            </div>

            {/* Assign Form */}
            <form onSubmit={handleAssignSubmit} className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Add New Assignment</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Select Section</label>
                  <select name="sectionId" required className="w-full px-3 py-2 bg-white border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]">
                    {sections.map(sec => (
                      <option key={sec.id} value={sec.id}>Class {sec.class.name} - {sec.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Select Subject</label>
                  <select name="subjectId" required className="w-full px-3 py-2 bg-white border border-[#E2E0DB] rounded-lg outline-none focus:ring-1 focus:ring-[#00386b]">
                    {subjects.map(sub => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name} {sub.class ? `(Class ${sub.class.name})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2.5 bg-primary text-white font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                {isPending ? "Assigning..." : "Assign class & subject"}
              </button>
            </form>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button type="button" onClick={() => setAssigningStaff(null)} className="px-5 py-2 border border-[#E2E0DB] rounded-lg text-slate-600">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
