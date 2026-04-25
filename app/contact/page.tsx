import React from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  Globe,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactUs() {
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
                    <p className="text-text-secondary leading-relaxed">Located in the heart of Anta, our campus is a sanctuary for learning and growth.</p>
                 </div>

                 <div className="space-y-8">
                    <ContactDetail 
                      icon={<MapPin />} 
                      title="Correspondence Address" 
                      line1="Station Road, Anta" 
                      line2="District Baran, Rajasthan, 325202" 
                    />
                    <ContactDetail 
                      icon={<Phone />} 
                      title="Direct Helpline" 
                      line1="+91 7457 244555" 
                      line2="+91 7457 244666" 
                    />
                    <ContactDetail 
                      icon={<Mail />} 
                      title="Official Email" 
                      line1="info@casanta.edu.in" 
                      line2="admissions@casanta.edu.in" 
                    />
                    <ContactDetail 
                      icon={<Clock />} 
                      title="Operational Hours" 
                      line1="Mon - Sat: 08:00 AM - 04:00 PM" 
                      line2="Sundays: Closed (By Appointment Only)" 
                    />
                 </div>

                 <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-6">
                       <h4 className="font-bold text-school-blue uppercase tracking-widest text-xs">Follow Our Legacy</h4>
                       <Share2 className="h-4 w-4 text-school-amber" />
                    </div>
                    <div className="flex gap-4">
                       {["FB", "IG", "LI", "YT"].map(soc => (
                         <div key={soc} className="h-10 w-10 cursor-pointer rounded-xl bg-slate-50 text-school-blue flex items-center justify-center font-black text-[10px] hover:bg-school-blue hover:text-white transition-all">
                            {soc}
                         </div>
                       ))}
                    </div>
                 </div>
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
                          <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mt-1">Expected response within 2 working hours</p>
                       </div>
                    </div>

                    <form className="space-y-8">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Your Name</Label>
                             <Input className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-school-blue/10 transition-all font-medium" placeholder="Ex: John Doe" />
                          </div>
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Email Address</Label>
                             <Input type="email" className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-school-blue/10 transition-all font-medium" placeholder="Ex: contact@domain.com" />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Subject of Enquiry</Label>
                          <Input className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-school-blue/10 transition-all font-medium" placeholder="Ex: Admission Enquiry for Grade V" />
                       </div>

                       <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">Detailed Message</Label>
                          <Textarea className="min-h-[180px] rounded-[1.5rem] border-slate-100 bg-slate-50 focus:bg-white focus:ring-school-blue/10 transition-all font-medium p-6" placeholder="How can we help you today?" />
                       </div>

                       <Button className="w-full h-16 bg-school-blue hover:bg-school-blue-dark rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-2xl shadow-school-blue/20 flex items-center justify-center gap-3">
                          <Send className="h-4 w-4" />
                          Submit Message
                       </Button>
                    </form>
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
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.34440537233!2d76.5164101!3d24.8715893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ff5e78ec89307%3A0xcf9570f7d5668e1a!2sCentral%20Academy%20School%2C%20Anta!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin" 
           allowFullScreen 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
         ></iframe>
         <div className="absolute top-10 right-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-xs backdrop-blur-md bg-white/90">
            <div className="flex items-center gap-3 mb-2">
               <Globe className="h-5 w-5 text-school-blue" />
               <h4 className="font-bold text-school-blue">Global Connectivity</h4>
            </div>
            <p className="text-[10px] font-bold text-text-tertiary uppercase leading-relaxed">Integrated GPS navigation available. Search for "Central Academy Anta" on Google Maps.</p>
         </div>
      </section>
    </PublicLayout>
  );
}

function ContactDetail({ icon, title, line1, line2 }: any) {
  return (
    <div className="flex gap-6 group">
       <div className="h-12 w-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-school-blue group-hover:bg-school-blue group-hover:text-white transition-all transform group-hover:scale-110 shadow-slate-200">
          {React.cloneElement(icon, { className: "h-5 w-5" })}
       </div>
       <div className="space-y-1">
          <h4 className="text-[10px] font-black text-school-amber uppercase tracking-[0.2em]">{title}</h4>
          <p className="text-slate-900 font-bold leading-none">{line1}</p>
          <p className="text-text-tertiary text-sm font-medium">{line2}</p>
       </div>
    </div>
  );
}
