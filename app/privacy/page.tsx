import PublicLayout from "@/components/layout/PublicLayout";
import { SCHOOL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – Central Academy Senior Secondary School",
  description: "Privacy policy for the Central Academy Senior Secondary School website.",
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <section className="bg-school-blue py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-white/70">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
          <h2>1. Information We Collect</h2>
          <p>
            When you submit an enquiry or contact form on our website, we collect your name, phone
            number, email address, and any message you provide. This information is used solely to
            respond to your enquiry.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            Information collected through our admission enquiry and contact forms is used only to
            respond to your specific request. We do not sell, share, or rent your personal data to
            third parties.
          </p>

          <h2>3. Cookies</h2>
          <p>
            Our website may use essential cookies required for the site to function correctly. We do
            not use advertising or tracking cookies.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We take reasonable precautions to protect your data. Information submitted through our
            forms is stored securely and accessible only to authorised school staff.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You may contact us at any time to request deletion of your information or to ask what
            data we hold about you.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            For any privacy-related queries, please contact us at:
            <br />
            <strong>{SCHOOL.name}</strong>
            <br />
            {SCHOOL.address}
            <br />
            Email: <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a>
            <br />
            Phone: {SCHOOL.phone1}
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
