/**
 * Single source of truth for verified school statistics.
 * All numbers here are conservative, honest, and defensible.
 * Update from school admin when new verified data is available.
 */
export const SCHOOL_STATS = [
  {
    label: "Students Enrolled",
    value: "400+",
    icon: "users",
    note: "Approximate current enrollment",
  },
  {
    label: "Years of Excellence",
    value: `${new Date().getFullYear() - 2013}`,
    icon: "award",
    note: "Since 2013",
  },
  {
    label: "Qualified Teachers",
    value: "37+",
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
