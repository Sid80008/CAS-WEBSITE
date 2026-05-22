"use client";

import React, { useState } from "react";
import { updateStudentProfile } from "@/app/actions/profileActions";
import Image from "next/image";

interface StudentProfileFormProps {
  student: {
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    admissionNo: string;
    photo?: string | null;
    parentName?: string | null;
    parentPhone?: string | null;
    address?: string | null;
  };
  classLabel: string;
  email: string;
}

export default function StudentProfileForm({ student, classLabel, email }: StudentProfileFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; isError: boolean }>({
    show: false,
    message: "",
    isError: false,
  });

  const showToast = (message: string, isError = false) => {
    setToast({ show: true, message, isError });
    setTimeout(() => {
      setToast({ show: false, message: "", isError: false });
    }, 4000);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    
    // Validate passwords
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword && newPassword !== confirmPassword) {
      showToast("New passwords do not match", true);
      setIsPending(false);
      return;
    }

    const result = await updateStudentProfile(formData);
    setIsPending(false);

    if (result.success) {
      showToast("Profile changes saved successfully!");
      // Reset password fields
      const form = event.currentTarget;
      (form.querySelector('input[name="currentPassword"]') as HTMLInputElement).value = "";
      (form.querySelector('input[name="newPassword"]') as HTMLInputElement).value = "";
      (form.querySelector('input[name="confirmPassword"]') as HTMLInputElement).value = "";
    } else {
      showToast(result.error || "Failed to update profile", true);
    }
  }

  // Format date to YYYY-MM-DD
  const formattedDob = student.dob ? new Date(student.dob).toISOString().split("T")[0] : "";

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Page Title */}
      <div className="mb-8">
        <h2 className="font-h1 text-3xl font-extrabold text-primary">Edit Profile</h2>
        <p className="font-body text-sm text-on-surface-variant mt-1">
          Update student information and academic contact records.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-[#1c1b1b]">
        {/* Profile Header Card */}
        <div className="bg-white border border-[#E2E0DB] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            {student.photo ? (
              <Image
                alt={`${student.firstName} Avatar`}
                className="w-24 h-24 rounded-full object-cover border-4 border-school-blue-light"
                src={student.photo}
                width={96}
                height={96}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-3xl border-4 border-school-blue-light">
                {student.firstName[0]}
                {student.lastName[0]}
              </div>
            )}
            <input type="hidden" name="photo" value={student.photo || ""} />
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h3 className="font-h2 text-2xl font-bold text-on-surface">
              {student.firstName} {student.lastName}
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
              <span className="px-3 py-1 bg-school-blue-light text-primary font-label text-xs rounded-full border border-primary/10">
                Student
              </span>
              <span className="px-3 py-1 bg-teal-light text-teal-dark font-label text-xs rounded-full border border-teal-dark/10">
                {classLabel}
              </span>
              <span className="px-3 py-1 bg-amber-light text-amber-dark font-label text-xs rounded-full border border-amber-dark/10">
                Adm No: {student.admissionNo}
              </span>
            </div>
          </div>
        </div>

        {/* Bento Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Personal Information */}
          <section className="bg-white border border-[#E2E0DB] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E2E0DB] pb-3 mb-2">
              <span className="material-symbols-outlined text-primary">person</span>
              <h4 className="font-h3 text-lg font-bold text-on-surface">Personal Information</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label text-xs font-semibold text-on-surface-variant">First Name</label>
                <input
                  name="firstName"
                  defaultValue={student.firstName}
                  required
                  className="w-full p-2.5 border border-[#E2E0DB] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="font-label text-xs font-semibold text-on-surface-variant">Last Name</label>
                <input
                  name="lastName"
                  defaultValue={student.lastName}
                  required
                  className="w-full p-2.5 border border-[#E2E0DB] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                  type="text"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label text-xs font-semibold text-on-surface-variant">Date of Birth</label>
                <input
                  name="dob"
                  defaultValue={formattedDob}
                  required
                  className="w-full p-2.5 border border-[#E2E0DB] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                  type="date"
                />
              </div>
              <div className="space-y-1">
                <label className="font-label text-xs font-semibold text-on-surface-variant">Gender</label>
                <select
                  name="gender"
                  defaultValue={student.gender}
                  className="w-full p-2.5 border border-[#E2E0DB] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Parent/Guardian Information */}
          <section className="bg-white border border-[#E2E0DB] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E2E0DB] pb-3 mb-2">
              <span className="material-symbols-outlined text-primary">family_restroom</span>
              <h4 className="font-h3 text-lg font-bold text-on-surface">Parent/Guardian Details</h4>
            </div>

            <div className="space-y-1">
              <label className="font-label text-xs font-semibold text-on-surface-variant">Primary Parent/Guardian Name</label>
              <input
                name="parentName"
                defaultValue={student.parentName || ""}
                required
                className="w-full p-2.5 border border-[#E2E0DB] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                type="text"
              />
            </div>

            <div className="space-y-1">
              <label className="font-label text-xs font-semibold text-on-surface-variant">Parent Contact Phone</label>
              <input
                name="parentPhone"
                defaultValue={student.parentPhone || ""}
                required
                className="w-full p-2.5 border border-[#E2E0DB] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                type="tel"
              />
            </div>
          </section>

          {/* Contact Details */}
          <section className="bg-white border border-[#E2E0DB] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E2E0DB] pb-3 mb-2">
              <span className="material-symbols-outlined text-primary">contact_phone</span>
              <h4 className="font-h3 text-lg font-bold text-on-surface">Contact & Location</h4>
            </div>

            <div className="space-y-1">
              <label className="font-label text-xs font-semibold text-on-surface-variant">Email Address (Read-only)</label>
              <input
                value={email}
                disabled
                className="w-full p-2.5 bg-slate-50 border border-[#E2E0DB] rounded-lg text-slate-500 text-sm outline-none cursor-not-allowed"
                type="email"
              />
            </div>

            <div className="space-y-1">
              <label className="font-label text-xs font-semibold text-on-surface-variant">Residential Address</label>
              <textarea
                name="address"
                defaultValue={student.address || ""}
                rows={3}
                className="w-full p-2.5 border border-[#E2E0DB] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all resize-none"
              />
            </div>
          </section>

          {/* Security & Password */}
          <section className="bg-white border border-[#E2E0DB] rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-[#E2E0DB] pb-3 mb-2">
              <span className="material-symbols-outlined text-primary">security</span>
              <h4 className="font-h3 text-lg font-bold text-on-surface">Security Settings</h4>
            </div>

            <div className="space-y-1">
              <label className="font-label text-xs font-semibold text-on-surface-variant">Current Password</label>
              <input
                name="currentPassword"
                placeholder="Required only if changing password"
                className="w-full p-2.5 border border-[#E2E0DB] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                type="password"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label text-xs font-semibold text-on-surface-variant">New Password</label>
                <input
                  name="newPassword"
                  placeholder="New password"
                  className="w-full p-2.5 border border-[#E2E0DB] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                  type="password"
                />
              </div>
              <div className="space-y-1">
                <label className="font-label text-xs font-semibold text-on-surface-variant">Confirm New Password</label>
                <input
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className="w-full p-2.5 border border-[#E2E0DB] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                  type="password"
                />
              </div>
            </div>
          </section>

        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E2E0DB] mt-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2.5 border border-primary text-primary font-bold rounded-xl hover:bg-school-blue-extra-light transition-all active:scale-98 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 bg-primary hover:bg-[#002547] text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-98 text-sm disabled:opacity-50 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Notification Toast */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 z-50 text-white ${
            toast.isError ? "bg-error" : "bg-teal-dark"
          }`}
        >
          <span className="material-symbols-outlined">
            {toast.isError ? "error" : "check_circle"}
          </span>
          <p className="font-label text-sm font-semibold">{toast.message}</p>
        </div>
      )}
    </div>
  );
}
