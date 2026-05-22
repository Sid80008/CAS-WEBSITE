import type { Metadata } from "next";
import { PrincipalContent } from "./PrincipalContent";

export const metadata: Metadata = {
  title: "Principal's Message | Central Academy Anta",
  description:
    "Read the welcome message from our Principal, Mrs. Radha Meena, outlining the school's educational philosophy, commitment to excellence, and vision for our students.",
};

export default function PrincipalMessagePage() {
  return <PrincipalContent />;
}
