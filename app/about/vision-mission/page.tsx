import type { Metadata } from "next";
import { VisionMissionContent } from "./VisionMissionContent";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description:
    "Learn about the vision, mission, and core values of Central Academy Senior Secondary School, Anta. Building character and academic excellence since 2013.",
};

export default function VisionMissionPage() {
  return <VisionMissionContent />;
}
