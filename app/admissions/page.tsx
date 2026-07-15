import { Metadata } from 'next';
import AdmissionsForm from './AdmissionsForm';
import { getGlobalSettings } from '@/app/actions/settingsActions';

export const metadata: Metadata = {
  title: "Admissions",
  description: "Apply for admissions at Central Academy, Anta. View the fee structure, eligibility criteria, and submit an enquiry online.",
};

export default async function PublicAdmissionPage() {
  const settings = await getGlobalSettings();
  return <AdmissionsForm settings={settings} />;
}
