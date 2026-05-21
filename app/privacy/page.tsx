import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Central Academy Senior Secondary School, antah",
  description: "Privacy Policy for Central Academy Senior Secondary School, antah.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-sm text-school-amber font-bold tracking-widest uppercase mb-4">Legal</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B4F8A] mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-headings:text-slate-800">
            <p><em>Last updated: {new Date().getFullYear()} (Subject to final legal review)</em></p>
            
            <h2>1. Information We Collect</h2>
            <p>
              Central Academy antah collects information to provide better services to our students, parents, and staff. We may collect personal information such as names, addresses, phone numbers, email addresses, and educational records during the admission and enrollment process.
            </p>

            <h2>2. How We Use Information</h2>
            <p>
              The information we collect is used to:
            </p>
            <ul>
              <li>Process admissions and maintain student records.</li>
              <li>Communicate with parents regarding academic progress and school events.</li>
              <li>Provide access to our online portals (Student and Parent portals).</li>
              <li>Improve our educational programs and website functionality.</li>
            </ul>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except where required by law or to trusted third parties who assist us in operating our website and conducting our school business, so long as those parties agree to keep this information confidential.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Our website and portals are secured with standard encryption protocols to protect data during transmission.
            </p>

            <h2>5. Changes to our Privacy Policy</h2>
            <p>
              If we decide to change our privacy policy, we will post those changes on this page. Policy changes will apply only to information collected after the date of the change.
            </p>

            <h2>Contacting Us</h2>
            <p>
              If there are any questions regarding this privacy policy, you may contact us using the information on our Contact page.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
