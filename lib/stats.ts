/**
 * Single source of truth for verified school statistics.
 * All numbers here are conservative, honest, and defensible.
 * Update from school admin when new verified data is available.
 */
import { SCHOOL } from "./constants";

export const SCHOOL_STATS = [
  {
    label: "Students Enrolled",
    value: "800+",
    icon: "users",
    note: "Approximate current enrollment",
  },
  {
    label: "Years of Excellence",
    value: `${new Date().getFullYear() - SCHOOL.established}`,
    icon: "award",
    note: `Since ${SCHOOL.established}`,
  },
  {
    label: "Qualified Teachers",
    value: "50+",
    icon: "graduation-cap",
    note: "Confirmed from staff records",
  },
  {
    label: "Classes Offered",
    value: "I – XII",
    icon: "book-open",
    note: "All RBSE grades",
  },
] as const;
