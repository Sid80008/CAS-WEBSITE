"use client";

import React, { useState, useRef } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { SCHOOL } from "@/lib/constants";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Globe,
  Share2,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement)?.value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Submission failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg(`Network error. Please call us at ${SCHOOL.phone1}.`);
    }
  }

  return (
    <PublicLayout>
      <section className="bg-school-blue py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-school-blue-dark via-school-blue to-indigo-900 opacity-60"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-[0.3em] mb-6">Reach Out</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Get In Touch</h1>
          <p className="text-school-blue-light/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have a question about admissions, academics, or school life? Our dedicated team is here to assist you.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Contact Info Column */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-school-blue tracking-tight">Visit Our Campus</h2>
                <p className="text-text-secondary leading-relaxed">Located in antah, Baran, our campus is a sanctuary for learning and growth.</p>
              </div>

              <div className="space-y-8">
                <ContactDetail
                  icon={<MapPin />}
                  title="Correspondence Address"
                  line1={SCHOOL.address}
                  line2={`${SCHOOL.city}, ${SCHOOL.state}`}
                />
                <ContactDetail
                  icon={<Phone />}
                  title="Direct Helpline"
                  line1={SCHOOL.phone1}
                  line2={SCHOOL.phone2}
                />
                <ContactDetail
                  icon={<Mail />}
                  title="Official Email"
                  line1={SCHOOL.email}
                  line2="admissions queries welcome"
                />
                <ContactDetail
                  icon={<Clock />}
                  title="Operational Hours"
                  line1="Mon – Sat: 08:00 AM – 04:00 PM"
                  line2="Sundays: Closed (By Appointment Only)"
                />
              </div>

              {/* Social media links will be added once official pages are set up */}
              <p className="text-xs text-slate-500 mt-2">Connect with us via phone or email for the fastest response.</p>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-slate-100">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-12 w-12 rounded-2xl bg-school-blue-light text-school-blue flex items-center justify-center">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-school-blue">Send a Message</h3>
                    <p className="text-xs font-medium text-text-tertiary mt-1">We typically respond within 1–2 working days. For urgent matters, please call us directly.</p>
                  </div>
                </div>

                {/* Success State */}
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-school-blue mb-3">Message Sent!</h4>
                    <p className="text-text-secondary max-w-sm">
                      Thank you for reaching out. We will get back to you soon.
                      For urgent matters, call <strong>{SCHOOL.phone1}</strong>.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm font-semibold text-school-blue hover:text-school-amber transition-colors underline underline-offset-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Your Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-school-blue/10 transition-all font-medium"
                          placeholder="Ex: Ramesh Sharma"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-school-blue/10 transition-all font-medium"
                          placeholder="Ex: ramesh@domain.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Subject of Enquiry</Label>
                      <Input
                        id="subject"
                        name="subject"
                        className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-school-blue/10 transition-all font-medium"
                        placeholder="Ex: Admission Enquiry for Grade V"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Detailed Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        className="min-h-[180px] rounded-[1.5rem] border-slate-100 bg-slate-50 focus:bg-white focus:ring-school-blue/10 transition-all font-medium p-6"
                        placeholder="How can we help you today?"
                      />
                    </div>

                    {status === "error" && (
                      <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                        {errorMsg}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-16 bg-school-blue hover:bg-school-blue-dark rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-2xl shadow-school-blue/20 flex items-center justify-center gap-3 disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-slate-200 relative grayscale hover:grayscale-0 transition-all duration-700">
        <div className="absolute inset-0 bg-school-blue/10 pointer-events-none"></div>
        <iframe
          title="School Location"
          className="w-full h-full border-none"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.34440537233!2d76.5164101!3d24.8715893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ff5e78ec89307%3A0xcf9570f7d5668e1a!2sCentral%20Academy%20School%2C%20antah!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute top-10 right-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-xs backdrop-blur-md bg-white/90">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-5 w-5 text-school-blue" />
            <h4 className="font-bold text-school-blue">Find Us on Maps</h4>
          </div>
          <p className="text-[10px] font-bold text-text-tertiary uppercase leading-relaxed">
            Search &quot;Central Academy School antah&quot; on Google Maps for directions.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

function ContactDetail({ icon, title, line1, line2 }: { icon: React.ReactElement; title: string; line1: string; line2: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="h-12 w-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-school-blue group-hover:bg-school-blue group-hover:text-white transition-all transform group-hover:scale-110 shadow-slate-200">
        {React.cloneElement(icon, { className: "h-5 w-5" } as any)}
      </div>
      <div className="space-y-1">
        <h4 className="text-[10px] font-black text-school-amber uppercase tracking-[0.2em]">{title}</h4>
        <p className="text-slate-900 font-bold leading-snug">{line1}</p>
        <p className="text-text-tertiary text-sm font-medium">{line2}</p>
      </div>
    </div>
  );
}
