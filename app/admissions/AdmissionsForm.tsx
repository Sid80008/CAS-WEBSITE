"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SCHOOL, getCurrentSession } from "@/lib/constants";
import PublicLayout from "@/components/layout/PublicLayout";
import { PageBanner } from "@/components/layout/PageBanner";
import { useLanguage } from "@/context/LanguageContext";
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
  "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-school-saffron/20 focus:border-school-saffron outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400";

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
    <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden group hover:border-school-saffron/20 transition-all duration-300">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-semibold text-slate-850 group-hover:text-school-saffron transition-colors text-sm md:text-base">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 flex-shrink-0 ml-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-350 ease-in-out ${open ? "max-h-40" : "max-h-0"}`}
      >
        <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed bg-school-saffron-ghost/10">{a}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdmissionsForm({ settings }: { settings?: any }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { language } = useLanguage();
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

  let eyebrowEn = `Admissions Open — ${getCurrentSession()}`;
  let eyebrowHi = `प्रवेश प्रारंभ — ${getCurrentSession()}`;
  if (settings?.admissionStartDate && settings?.admissionEndDate) {
    const start = new Date(settings.admissionStartDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const end = new Date(settings.admissionEndDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    eyebrowEn = `Admissions Open: ${start} to ${end}`;
    eyebrowHi = `प्रवेश प्रारंभ: ${start} से ${end}`;
  }

  return (
    <PublicLayout>
      {/* ── Page Banner ── */}
      <PageBanner
        titleEn="Admissions Portal"
        titleHi="प्रवेश पोर्टल"
        eyebrowEn={eyebrowEn}
        eyebrowHi={eyebrowHi}
        imageSrc="/banner-main.png"
      />

      {/* ── Admission Process ── */}
      <section className="bg-[#FAFAF5] border-b border-slate-200/30 py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-school-saffron text-xs font-bold uppercase tracking-[0.2em] bg-school-saffron-ghost px-4 py-1.5 rounded-full border border-school-saffron/20">
              {language === "hi" ? "प्रवेश प्रक्रिया" : "Admission Procedure"}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-school-navy font-display mt-5 tracking-tight">
              {language === "hi" ? "3-चरणीय प्रवेश प्रक्रिया" : "3-Step Admission Process"}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-3 text-sm md:text-base leading-relaxed">
              We aim to make our admission process as simple, transparent, and welcoming as possible. Here is how it works:
            </p>
            <div className="mt-8">
              <a 
                href="/downloads/CAS_Anta_Admissions_Brochure.pdf" 
                download 
                className="inline-flex items-center gap-2 bg-school-saffron text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-orange-600 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <Download className="w-5 h-5" />
                Download Admission Brochure
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:border-school-saffron/25">
              <div className="absolute top-0 right-0 w-24 h-24 bg-school-saffron/5 rounded-bl-full flex items-center justify-center font-extrabold text-4xl text-school-saffron/10 group-hover:scale-110 transition-transform">
                01
              </div>
              <div className="w-12 h-12 bg-school-saffron-ghost text-school-saffron rounded-2xl flex items-center justify-center mb-6">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-school-navy mb-4 font-display">1. Registration & Application</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Enquiry & Information</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Parents can contact the school to inquire about the admission process, curriculum, and campus environment to gather all needed information.
                  </p>
                </div>
                <div className="h-px bg-slate-100" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Registration</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Parents register their child for admission, which involves completing a registration entry and paying the required registration fee.
                  </p>
                </div>
                <div className="h-px bg-slate-100" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Application Form</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    After registration, parents obtain, complete, and submit the school's official admission application form with the required details.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:border-school-saffron/25">
              <div className="absolute top-0 right-0 w-24 h-24 bg-school-saffron/5 rounded-bl-full flex items-center justify-center font-extrabold text-4xl text-school-saffron/10 group-hover:scale-110 transition-transform">
                02
              </div>
              <div className="w-12 h-12 bg-school-saffron-ghost text-school-saffron rounded-2xl flex items-center justify-center mb-6">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-school-navy mb-4 font-display">2. Assessment & Selection</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Entrance Test / Assessment</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Depending on the grade level, candidates undergo a proficiency test or developmental assessment to evaluate basic skills and academic readiness.
                  </p>
                </div>
                <div className="h-px bg-slate-100" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Parent & Student Interview</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    We conduct interactive sessions with the child and parents to discuss interests, mutual expectations, and fit for the school environment.
                  </p>
                </div>
                <div className="h-px bg-slate-100" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Selection & Results</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Applications and assessment results are reviewed. Final selections are made based on merit, assessment performance, and seat availability.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:border-school-saffron/25">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full flex items-center justify-center font-extrabold text-4xl text-emerald-500/10 group-hover:scale-110 transition-transform">
                03
              </div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-school-navy mb-4 font-display">3. Admission & Enrollment</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Offer of Admission</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Successful candidates will receive an official Offer of Admission along with fee payment details and joining instructions.
                  </p>
                </div>
                <div className="h-px bg-slate-100" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Acceptance & Fee Payment</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    To secure the seat, parents accept the offer by paying the admission fees, security deposit, first-quarter tuition fees, and other charges.
                  </p>
                </div>
                <div className="h-px bg-slate-100" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">Documents & Orientation</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Submit essential documents (TC, Birth Certificate, Aadhaar, Report Card) and attend the orientation program to welcome students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="bg-school-saffron-ghost/20 py-20 px-6 md:px-16 border-b border-slate-200/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start">

          {/* Left — Form (60%) */}
          <div className="lg:w-3/5 bg-white p-8 md:p-10 rounded-3xl border border-slate-200/60 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-school-saffron rounded-full" />
              <h2 className="text-2xl font-bold text-school-navy font-display">Admission Enquiry Form</h2>
            </div>

            {/* Success banner */}
            {status === "success" && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-250 rounded-xl flex items-center gap-3 text-emerald-700 text-sm font-semibold">
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
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-school-saffron to-school-saffron-light hover:brightness-110 text-white px-10 py-4 rounded-xl font-bold text-sm shadow-lg shadow-school-saffron/20 active:scale-95 transition-all duration-300 border-0 disabled:opacity-60"
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
          <div className="lg:w-2/5 w-full space-y-8">

            {/* Quick Contact */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-md">
              <h3 className="text-lg font-bold text-school-navy font-display mb-6 flex items-center gap-2">
                <Phone className="h-5 w-5 text-school-saffron" /> Quick Contact
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-full flex items-center justify-center text-school-saffron flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm text-slate-700 font-semibold">{SCHOOL.phone1}</p>
                    {SCHOOL.phone2 && <p className="text-sm text-slate-500">{SCHOOL.phone2}</p>}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-full flex items-center justify-center text-school-saffron flex-shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                    <a href={`mailto:${SCHOOL.email}`} className="text-sm text-school-saffron font-semibold hover:text-school-saffron-dark transition-colors">{SCHOOL.email}</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-school-saffron-ghost rounded-full flex items-center justify-center text-school-saffron flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Address</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{SCHOOL.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-md">
              <h3 className="text-lg font-bold text-school-navy font-display mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-school-saffron" /> Office Hours
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
            <div className="bg-school-ink p-8 rounded-3xl border border-white/5 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-school-saffron/10 rounded-bl-full pointer-events-none" />
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-display">
                <FileText className="h-5 w-5 text-school-saffron-light" /> Document Checklist
              </h3>
              <ul className="space-y-4">
                {[
                  "Birth Certificate (Original & Photocopy)",
                  "Transfer Certificate (TC) from previous school",
                  "4 Recent Passport Size Photographs",
                  "Copy of Aadhaar Card (Student & Parents)",
                  "Previous Year's Report Card",
                ].map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-school-saffron-light flex-shrink-0 mt-0.5" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#FAFAF5] py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <div className="text-center mb-12">
            <span className="text-school-saffron text-xs font-bold uppercase tracking-[0.2em]">Help Center</span>
            <h2 className="text-3xl font-bold text-school-navy font-display mt-3">Frequently Asked Questions</h2>
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
