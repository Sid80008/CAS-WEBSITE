import type { Metadata } from "next";
import { FacilitiesContent } from "./FacilitiesContent";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Explore world-class facilities at CAS antah including digital library, science labs, computer lab, sports complex, and smart classrooms.",
};

export default function FacilitiesPage() {
  return <FacilitiesContent />;
}
