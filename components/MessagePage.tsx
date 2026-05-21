"use client";

import Image from "next/image";
import Link from "next/link";

interface MessagePageProps {
  role: string;
  name: string;
  qualifications: string;
  experience: string;
  photo: string;
  message: string;
  additionalInfo?: string;
}

export default function MessagePage({
  role,
  name,
  qualifications,
  experience,
  photo,
  message,
  additionalInfo,
}: MessagePageProps) {
  const paragraphs = message.trim().split("\n\n").filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      {/* Banner */}
      <section className="bg-gradient-to-r from-school-blue-light to-white py-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-school-amber font-bold uppercase tracking-[0.3em] text-xs mb-3">
            From the Desk of
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-school-blue tracking-tight">
            The {role}
          </h1>
          <div className="w-16 h-1 bg-school-amber rounded mx-auto mt-4" />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Profile card */}
          <div className="flex-shrink-0 w-full md:w-56 text-center">
            <div className="w-44 h-52 rounded-2xl overflow-hidden border-4 border-school-blue-light shadow-xl mx-auto bg-slate-100">
              <img
                src={photo}
                alt={`${name}, ${role}`}
                className="object-cover w-full h-full"
                onError={(e: any) => {
                  e.currentTarget.src = "/placeholder.png";
                  e.currentTarget.onerror = null;
                }}
              />
            </div>

            {/* Name plate */}
            <div className="mt-4 bg-school-blue-light rounded-xl px-4 py-4 text-left">
              <p className="font-black text-school-blue text-base">{name}</p>
              <p className="text-school-amber text-sm font-bold">{role}</p>
              <div className="border-t border-school-blue/10 mt-3 pt-3 space-y-1.5">
                <p className="text-text-tertiary text-xs leading-relaxed">{qualifications}</p>
                <p className="text-text-tertiary text-xs">{experience}</p>
              </div>
            </div>
          </div>

          {/* Message body */}
          <div className="flex-1 min-w-0">
            <div className="text-6xl text-school-blue/15 font-serif leading-none -mb-3 select-none">
              "
            </div>
            <div className="space-y-4 text-text-secondary leading-relaxed text-[15px]">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {additionalInfo && (
              <div className="mt-6 p-4 bg-school-blue-light rounded-xl border-l-4 border-school-blue text-sm text-text-secondary">
                {additionalInfo}
              </div>
            )}

            {/* Signature block */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="font-black text-school-blue text-xl tracking-tight">{name}</p>
              <p className="text-school-amber font-bold text-sm">{role}</p>
              <p className="text-text-tertiary text-sm mt-1">
                Central Academy Senior Secondary School, antah
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <section className="bg-slate-50 border-t border-slate-100 py-8 px-4">
        <div className="max-w-4xl mx-auto flex gap-4 justify-center flex-wrap">
          <Link
            href="/about/vision-mission"
            className="px-5 py-2 border border-school-blue text-school-blue rounded-full text-sm font-semibold hover:bg-school-blue hover:text-white transition-all"
          >
            Vision &amp; Mission
          </Link>
          <Link
            href="/admissions"
            className="px-5 py-2 bg-school-amber text-white rounded-full text-sm font-semibold hover:bg-amber-600 transition-all shadow-md"
          >
            Admissions 2026–27
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2 border border-slate-300 text-text-secondary rounded-full text-sm font-semibold hover:bg-slate-100 transition-all"
          >
            Contact School
          </Link>
        </div>
      </section>
    </main>
  );
}
