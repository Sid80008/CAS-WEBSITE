"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SCHOOL, getCurrentSession } from "@/lib/constants";
import PublicLayout from "@/components/layout/PublicLayout";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronDown,
  Loader2,
  BadgeCheck,
  FileText,
  Download,
  Send,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  studentName: string;
  dob: string;
  gender: string;
  grade: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  message: string;
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-school-blue/20 focus:border-school-blue outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400";

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is the minimum age for Nursery admission?",
    a: "A child must be at least 3 years old by March 31st of the academic year for which admission is sought in the Nursery class.",
  },
  {
    q: "When does the academic session begin?",
    a: "Our academic session typically begins in the first week of April each year. The enquiry and registration process usually starts in December/January for the upcoming session.",
  },
  {
    q: "Is there an entrance test for admission?",
    a: "Admissions to Primary and Secondary classes are subject to a written proficiency test and an interaction with the Principal. Nursery and K.G. admissions are based on an informal interaction with the parents and child.",
  },
  {
    q: "What documents are required at the time of admission?",
    a: "You will need: Birth Certificate, Transfer Certificate (TC) from previous school, 4 passport-size photographs, Aadhaar Card copy of student and parents, and last year's report card.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden group">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-semibold text-slate-800 group-hover:text-school-blue transition-colors text-sm md:text-base">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-slate-500 flex-shrink-0 ml-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-40" : "max-h-0"}`}
      >
        <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed bg-slate-50">{a}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdmissionsForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    studentName: "",
    dob: "",
    gender: "",
    grade: "",
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admission-enquiry", {
        method: "POST",
        body: JSON.stringify({
          studentName: form.studentName,
          parentName: `Father: ${form.fatherName} / Mother: ${form.motherName}`,
          phone: form.phone,
          email: form.email,
          grade: form.grade,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setForm({ studentName: "", dob: "", gender: "", grade: "", fatherName: "", motherName: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Submission failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg(`Network error. Please call us directly at ${SCHOOL.phone1}.`);
    }
  }

  const grades = ["Nursery", "LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

  return (
    <PublicLayout>
      {/* ── Hero ── */}
      <section className="relative bg-school-blue-light py-20 px-6 md:px-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-school-blue rounded-full blur-3xl -mr-48 -mt-48 opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-school-amber rounded-full blur-3xl -ml-32 -mb-32 opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-school-amber text-xs font-bold uppercase tracking-widest mb-5 border border-yellow-200 shadow-sm">
            <BadgeCheck className="h-3.5 w-3.5" />
            Admissions Open — {getCurrentSession()}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-school-blue mb-4 tracking-tight">
            Contact Admissions
          </h1>
          <p className="text-slate-600 max-w-2xl text-lg leading-relaxed">
            Begin your child's journey toward academic excellence. Our admissions team is here to guide you through every step of the process.
          </p>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left — Form (60%) */}
          <div className="lg:w-3/5 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-school-blue rounded-full" />
              <h2 className="text-2xl font-bold text-school-blue">Admission Enquiry Form</h2>
            </div>

            {/* Success banner */}
            {status === "success" && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700 text-sm font-semibold">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                Enquiry submitted! Our team will call you within 24–48 hours.
              </div>
            )}

            {/* Error banner */}
            {status === "error" && errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Student Name + DOB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Student Name" required>
                  <input name="studentName" value={form.studentName} onChange={handleChange} required className={inputClass} placeholder="Full Name" type="text" />
                </Field>
                <Field label="Date of Birth" required>
                  <input name="dob" value={form.dob} onChange={handleChange} required className={inputClass} type="date" />
                </Field>
              </div>

              {/* Row 2: Gender + Grade */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Gender" required>
                  <select name="gender" value={form.gender} onChange={handleChange} required className={inputClass}>
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field label="Class Seeking Admission" required>
                  <select name="grade" value={form.grade} onChange={handleChange} required className={inputClass}>
                    <option value="" disabled>Select Grade</option>
                    {grades.map((g) => (
                      <option key={g} value={g}>Class {g}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Row 3: Father + Mother */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Father's Name" required>
                  <input name="fatherName" value={form.fatherName} onChange={handleChange} required className={inputClass} placeholder="Father's Full Name" type="text" />
                </Field>
                <Field label="Mother's Name" required>
                  <input name="motherName" value={form.motherName} onChange={handleChange} required className={inputClass} placeholder="Mother's Full Name" type="text" />
                </Field>
              </div>

              {/* Row 4: Phone + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Contact Number" required>
                  <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="+91 00000 00000" type="tel" />
                </Field>
                <Field label="Email Address" required>
                  <input name="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="example@email.com" type="email" />
                </Field>
              </div>

              {/* Message */}
              <Field label="Message / Query">
                <textarea name="message" value={form.message} onChange={handleChange} className={inputClass} placeholder="How can we help you?" rows={4} />
              </Field>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 bg-school-blue text-white px-10 py-4 rounded-xl font-bold text-sm shadow-lg hover:bg-school-blue-dark active:scale-95 transition-all disabled:opacity-60"
              >
                {status === "loading" ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="h-4 w-4" /> Submit Enquiry</>
                )}
              </button>
            </form>
          </div>

          {/* Right — Sidebar (40%) */}
          <div className="lg:w-2/5 space-y-6">

            {/* Quick Contact */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-school-blue mb-5 flex items-center gap-2">
                <Phone className="h-5 w-5" /> Quick Contact
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-school-blue/10 rounded-full flex items-center justify-center text-school-blue flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm text-slate-700 font-semibold">{SCHOOL.phone1}</p>
                    {SCHOOL.phone2 && <p className="text-sm text-slate-500">{SCHOOL.phone2}</p>}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-school-blue/10 rounded-full flex items-center justify-center text-school-blue flex-shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Email</p>
                    <a href={`mailto:${SCHOOL.email}`} className="text-sm text-school-blue font-semibold hover:underline">{SCHOOL.email}</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-school-blue/10 rounded-full flex items-center justify-center text-school-blue flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Address</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{SCHOOL.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-school-blue mb-5 flex items-center gap-2">
                <Clock className="h-5 w-5" /> Office Hours
              </h3>
              <ul className="space-y-3">
                {[
                  { day: "Monday – Friday", time: "8:00 AM – 3:00 PM", closed: false },
                  { day: "Saturday", time: "8:00 AM – 1:00 PM", closed: false },
                  { day: "Sunday", time: "Closed", closed: true },
                ].map(({ day, time, closed }) => (
                  <li key={day} className="flex justify-between text-sm">
                    <span className="text-slate-500">{day}</span>
                    <span className={closed ? "text-red-500 font-bold" : "text-slate-800 font-semibold"}>{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Document Checklist */}
            <div className="bg-school-blue p-6 rounded-2xl shadow-lg text-white">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                <FileText className="h-5 w-5" /> Document Checklist
              </h3>
              <ul className="space-y-3">
                {[
                  "Birth Certificate (Original & Photocopy)",
                  "Transfer Certificate (TC) from previous school",
                  "4 Recent Passport Size Photographs",
                  "Copy of Aadhaar Card (Student & Parents)",
                  "Previous Year's Report Card",
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-school-amber flex-shrink-0 mt-0.5" />
                    {doc}
                  </li>
                ))}
              </ul>
              <a
                href="/downloads"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-school-amber text-white py-3 rounded-xl font-bold text-sm hover:bg-yellow-600 active:scale-95 transition-all"
              >
                <Download className="h-4 w-4" /> Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <div className="text-center mb-10">
            <span className="text-school-amber text-xs font-bold uppercase tracking-widest">Help Center</span>
            <h2 className="text-3xl font-bold text-school-blue mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
