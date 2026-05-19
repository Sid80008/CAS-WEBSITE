import type { Metadata } from "next";
import AdmissionsForm from "./AdmissionsForm";

export const metadata: Metadata = {
  title: "Admissions 2025-26",
  description:
    "Apply for admission to Central Academy Senior Secondary School, Anta for the current session. Classes I to XII. Contact us at +91-7737689684.",
};

export default function AdmissionsPage() {
  return <AdmissionsForm />;
}
