"use client";

import React, { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { 
  User, 
  Users, 
  MapPin, 
  Phone, 
  BookOpen, 
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function AdmissionForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      studentName: formData.get("studentName"),
      parentName: formData.get("parentName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      grade: formData.get("grade"),
      gender: formData.get("gender"),
      address: formData.get("address"),
    };

    try {
      const res = await fetch("/api/public/admission", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) throw new Error("Submission failed. Please try again.");

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <PublicLayout>
        <section className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6">
          <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-2xl text-center border-t-8 border-school-amber animate-in zoom-in duration-500">
             <div className="h-24 w-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-emerald-50/50">
                <CheckCircle2 className="h-12 w-12" />
             </div>
             <h2 className="text-3xl font-black text-school-blue mb-4">Application Received!</h2>
             <p className="text-text-secondary mb-8 leading-relaxed">
               Thank you for choosing Central Academy School. Our admission counselor will contact you within 24-48 hours.
             </p>
             <Link href="/">
               <Button className="w-full h-14 bg-school-blue hover:bg-school-blue-dark rounded-xl font-bold uppercase tracking-widest text-[10px]">
                 Back to Homepage
               </Button>
             </Link>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="bg-school-blue py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:30px_30px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-[0.3em] mb-4">Phase 1: Enquiry</span>
           <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Registration for Admission</h1>
           <p className="text-school-blue-light/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
             Begin your journey towards academic brilliance. Secure a seat for the 2024-25 session today.
           </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
         <div className="max-w-4xl mx-auto group">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
               <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  <div className="md:col-span-4 bg-school-blue p-10 text-white flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-school-amber opacity-20 filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                     <div className="space-y-8 relative z-10">
                        <div className="space-y-2">
                           <h3 className="text-2xl font-bold">Why CAS Anta?</h3>
                           <div className="h-1 w-12 bg-school-amber rounded-full"></div>
                        </div>
                        <ul className="space-y-6">
                           <li className="flex gap-4">
                              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center shrink-0"><CheckCircle2 className="h-3 w-3 text-school-amber" /></div>
                              <span className="text-xs font-bold uppercase tracking-widest leading-loose">Individual Attention</span>
                           </li>
                           <li className="flex gap-4">
                              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center shrink-0"><CheckCircle2 className="h-3 w-3 text-school-amber" /></div>
                              <span className="text-xs font-bold uppercase tracking-widest leading-loose">Modern Labs</span>
                           </li>
                           <li className="flex gap-4">
                              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center shrink-0"><CheckCircle2 className="h-3 w-3 text-school-amber" /></div>
                              <span className="text-xs font-bold uppercase tracking-widest leading-loose">Verified Results</span>
                           </li>
                        </ul>
                     </div>

                     <div className="pt-10 border-t border-white/10 relative z-10">
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Need Assistance?</p>
                        <p className="text-sm font-bold flex items-center gap-2"><Phone className="h-4 w-4 text-school-amber" /> +91 7457 244555</p>
                     </div>
                  </div>

                  <div className="md:col-span-8 p-10 lg:p-14">
                     <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {error && (
                          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-1">
                             <AlertCircle className="h-5 w-5" />
                             {error}
                          </div>
                        )}

                        <div className="space-y-6">
                           <div className="flex items-center gap-3 mb-2">
                              <div className="h-8 w-8 rounded-lg bg-school-blue-light text-school-blue flex items-center justify-center"><User className="h-4 w-4" /></div>
                              <h4 className="text-sm font-bold text-school-blue uppercase tracking-widest">Student Information</h4>
                           </div>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Student Full Name</Label>
                                 <Input name="studentName" required className="h-12 rounded-xl border-slate-200 focus:ring-school-blue/10 bg-slate-50 transition-all focus:bg-white" placeholder="Ex: Aarav Sharma" />
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Select Grade (Class)</Label>
                                 <Select name="grade" required>
                                    <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50">
                                       <SelectValue placeholder="Seeking admission for..." />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                       {["Nursery", "LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "XI"].map(grade => (
                                          <SelectItem key={grade} value={grade}>Class {grade}</SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="flex items-center gap-3 mb-2">
                              <div className="h-8 w-8 rounded-lg bg-amber-50 text-school-amber flex items-center justify-center"><Users className="h-4 w-4" /></div>
                              <h4 className="text-sm font-bold text-school-blue uppercase tracking-widest">Parent Details</h4>
                           </div>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Parent Name</Label>
                                 <Input name="parentName" required className="h-12 rounded-xl border-slate-200 focus:ring-school-blue/10 bg-slate-50 transition-all focus:bg-white" placeholder="Father or Mother's name" />
                              </div>
                              <div className="space-y-2">
                                 <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Mobile Number</Label>
                                 <Input name="phone" type="tel" required className="h-12 rounded-xl border-slate-200 focus:ring-school-blue/10 bg-slate-50 transition-all focus:bg-white" placeholder="+91 XXXX XXXX XX" />
                              </div>
                           </div>
                        </div>

                        <div className="pt-6">
                           <Button 
                             disabled={loading}
                             type="submit" 
                             className="w-full h-14 bg-school-blue hover:bg-school-blue-dark rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-2xl shadow-school-blue/30 transform active:scale-95 transition-all"
                           >
                              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-3" /> : <Send className="h-4 w-4 mr-3" />}
                              Submit Application Enquiry
                           </Button>
                           <p className="text-center text-[10px] text-text-tertiary mt-4 font-bold uppercase tracking-tighter">* Registration does not guarantee admission. Subject to availability and assessment.</p>
                        </div>

                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </PublicLayout>
  );
}

// Client components need to be imported in the root if they use Link
import Link from 'next/link';
