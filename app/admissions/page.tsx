import { Metadata } from 'next';
import AdmissionsForm from './AdmissionsForm';

export const metadata: Metadata = {
  title: "Admissions",
  description: "Apply for admissions at Central Academy, Anta. View the fee structure, eligibility criteria, and submit an enquiry online.",
};

export default function PublicAdmissionPage() {
  return <AdmissionsForm />;
}
