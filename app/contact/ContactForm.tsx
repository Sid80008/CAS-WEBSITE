"use client";

import React, { useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import { SCHOOL } from "@/lib/constants";
import { submitContact } from "@/app/actions/contact";
import { PageBanner } from "@/components/layout/PageBanner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Globe,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-16 bg-gradient-to-r from-school-saffron to-school-saffron-light hover:brightness-110 text-white font-bold rounded-2xl uppercase tracking-[0.2em] text-xs shadow-2xl shadow-school-saffron/25 flex items-center justify-center gap-3 transition-all duration-300 border-0 disabled:opacity-60"
    >
      {pending ? (
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
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, { success: false, error: "", message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  return (
    <PublicLayout>
      {/* Page Banner */}
      <PageBanner
        titleEn="Get In Touch"
        titleHi="संपर्क करें"
        eyebrowEn="Reach Out"
        eyebrowHi="हमसे जुड़ें"
        imageSrc="/banner-main.png"
      />

      <section className="py-24 px-6 bg-[#FAFAF5] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Contact Info Column */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-school-navy font-display tracking-tight">Visit Our Campus</h2>
                <p className="text-slate-650 leading-relaxed">Located in antah, Baran, our campus is a sanctuary for learning and growth.</p>
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
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-slate-200/50">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-12 w-12 rounded-2xl bg-school-saffron-ghost text-school-saffron flex items-center justify-center">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-school-navy font-display">Send a Message</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">We typically respond within 1–2 working days. For urgent matters, please call us directly.</p>
                  </div>
                </div>

                {state.success ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                    <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-school-navy font-display mb-3">Message Sent!</h4>
                    <p className="text-slate-655 max-w-sm">
                      {state.message}
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} action={formAction} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          className="h-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-school-saffron/20 focus-visible:ring-school-saffron/20 focus-visible:border-school-saffron transition-all font-medium shadow-none outline-none"
                          placeholder="Ex: Ramesh Sharma"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          className="h-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-school-saffron/20 focus-visible:ring-school-saffron/20 focus-visible:border-school-saffron transition-all font-medium shadow-none outline-none"
                          placeholder="Ex: ramesh@domain.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Subject of Enquiry</Label>
                      <Input
                        id="subject"
                        name="subject"
                        className="h-14 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-school-saffron/20 focus-visible:ring-school-saffron/20 focus-visible:border-school-saffron transition-all font-medium shadow-none outline-none"
                        placeholder="Ex: Admission Enquiry for Grade V"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Detailed Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        className="min-h-[180px] rounded-[1.5rem] border-slate-200 bg-slate-50 focus:bg-white focus:ring-school-saffron/20 focus-visible:ring-school-saffron/20 focus-visible:border-school-saffron transition-all font-medium p-6 shadow-none outline-none"
                        placeholder="How can we help you today?"
                      />
                    </div>

                    {state.error && (
                      <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                        {state.error}
                      </div>
                    )}

                    <SubmitButton />
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-slate-200 relative grayscale hover:grayscale-0 transition-all duration-700">
        <div className="absolute inset-0 bg-school-saffron/5 pointer-events-none"></div>
        <iframe
          title="School Location"
          className="w-full h-full border-none"
          src="https://maps.google.com/maps?q=25.153292,76.287167&hl=en&z=14&output=embed"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute top-10 right-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-250/50 max-w-xs backdrop-blur-md bg-white/90">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-5 w-5 text-school-saffron" />
            <h4 className="font-bold text-school-navy font-display">Find Us on Maps</h4>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed">
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
      <div className="h-12 w-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-school-saffron border border-slate-100 group-hover:bg-school-saffron group-hover:text-white transition-all transform group-hover:scale-110 shadow-slate-200/50">
        {React.cloneElement(icon, { className: "h-5 w-5" } as any)}
      </div>
      <div className="space-y-1">
        <h4 className="text-[10px] font-black text-school-saffron uppercase tracking-[0.2em]">{title}</h4>
        <p className="text-slate-900 font-bold leading-snug">{line1}</p>
        <p className="text-slate-550 text-sm font-medium">{line2}</p>
      </div>
    </div>
  );
}
