import { Metadata } from 'next';
import { AdmissionForm } from './AdmissionForm';
import PublicLayout from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: "Admissions",
  description: "Apply for admissions at Central Academy antah. View the fee structure, eligibility criteria, and submit an inquiry online.",
};

export default function PublicAdmissionPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">Admission Enquiry 2026-27</h2>
          <AdmissionForm />
        </div>
      </div>
    </PublicLayout>
  );
}
