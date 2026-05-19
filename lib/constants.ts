/**
 * Single source of truth for all school contact information, branding, and metadata.
 * Import from this file instead of hardcoding values throughout the codebase.
 */
export const SCHOOL = {
  name: 'Central Academy Senior Secondary School',
  shortName: 'CAS',
  phone1: '+91-7737689684',
  phone2: '07457-294633',
  email: 'centralacademyanta@gmail.com',
  address: 'Near Sahkari Petrol Pump, Kota Road, Anta, Baran, Rajasthan – 325202',
  city: 'Anta, Baran',
  state: 'Rajasthan',
  pincode: '325202',
  website: 'https://centralacademyantah.vercel.app',
  established: 1994,
  get yearsOfExcellence() {
    return new Date().getFullYear() - this.established;
  },
} as const;

/**
 * Returns the current academic session string (e.g., "2026-27").
 * Academic year starts in April; before April the session is previous-current year.
 */
export function getCurrentSession(): string {
  const now = new Date();
  const year = now.getFullYear();
  // If month is January (0), February (1), or March (2) → session started last year
  const sessionStart = now.getMonth() >= 3 ? year : year - 1;
  return `${sessionStart}-${String(sessionStart + 1).slice(-2)}`;
}
