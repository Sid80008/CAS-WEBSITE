import PublicLayout from "@/components/layout/PublicLayout";
import { SCHOOL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service – Central Academy Senior Secondary School",
  description: "Terms of service for the Central Academy Senior Secondary School website.",
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <section className="bg-school-blue py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-white/70">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the {SCHOOL.name} website, you accept and agree to be bound by
            these terms. If you do not agree to these terms, please do not use this website.
          </p>

          <h2>2. Use of Website</h2>
          <p>
            This website is provided for informational purposes about our school, programmes, and
            services. You agree to use the website only for lawful purposes and in a manner that
            does not infringe the rights of others.
          </p>

          <h2>3. Accuracy of Information</h2>
          <p>
            We strive to keep the information on this website current and accurate. However, we make
            no warranties about the completeness, reliability, or accuracy of the content. Academic
            details, fee structures, and schedules are subject to change — please contact the school
            directly for the most up-to-date information.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on this website, including text, images, logos, and graphics, is the
            property of {SCHOOL.name} and is protected by applicable intellectual property laws.
            Reproduction without written permission is prohibited.
          </p>

          <h2>5. Submission of Information</h2>
          <p>
            By submitting an enquiry or contact form, you consent to our school staff contacting you
            via the phone number or email address you provide.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            {SCHOOL.name} shall not be liable for any indirect, incidental, or consequential damages
            arising from the use of, or inability to use, this website.
          </p>

          <h2>7. Contact</h2>
          <p>
            For questions about these terms, contact us at:
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
