import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service and conditions for using Central Academy Senior Secondary School website.",
};

export default function TermsOfServicePage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-sm text-school-amber font-bold tracking-widest uppercase mb-4">Legal</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B4F8A] mb-8">Terms of Service</h1>
            
            <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-headings:text-slate-800">
              <p><em>Last updated: {new Date().getFullYear()} (Subject to final legal review)</em></p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2>2. Use of Portals</h2>
              <p>
                The Student, Parent, Teacher, and Office portals are for authorized users only. Unauthorized access, sharing of login credentials, or misuse of the portal systems is strictly prohibited and may result in suspension of access and disciplinary action.
              </p>

              <h2>3. Online Payments</h2>
              <p>
                Fee payments made through this website are processed securely. However, the school is not responsible for any failures or delays in payment processing caused by third-party payment gateways or banking networks. Refunds, if applicable, will be processed according to the school's fee policy.
              </p>

              <h2>4. Intellectual Property</h2>
              <p>
                All content included on this site, such as text, graphics, logos, images, and software, is the property of Central Academy Anta or its content suppliers and protected by copyright laws.
              </p>

              <h2>5. Disclaimer of Warranties</h2>
              <p>
                The materials on Central Academy Anta's website are provided "as is". The school makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h2>6. Governing Law</h2>
              <p>
                Any claim relating to Central Academy Anta's website shall be governed by the laws of the State of Rajasthan without regard to its conflict of law provisions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
