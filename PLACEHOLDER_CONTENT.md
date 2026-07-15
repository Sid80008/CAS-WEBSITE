# CAS Website — Placeholder Content Tracker

> **Instructions:** Every item listed here is currently using fake/placeholder text on the live website.
> Replace each one with the real information and remove the item from this list once done.
> File paths and component names are provided so the developer knows exactly where to update.

---

## 🔴 CRITICAL — Visible on Homepage

### 1. Hero Subtitle
- **File:** `app/HomeClient.tsx` (line ~79)
- **Current fake text:** *"Nurturing holistic development and academic brilliance in a secure, modern environment."*
- **What's needed:** A real 1–2 sentence school tagline/mission in English. Can also provide Hindi version.

### 2. Topper Quotes
- **Status:** ✅ Fake quote removed from `app/HomeClient.tsx`. Real quotes can be added when available.

### 3. Hero Image (Slider)
- **File:** `app/HomeClient.tsx` — uses `/gallery/slider/1741166362_slider-17.jpg`
- **Status:** ✅ Real photo exists. No action needed unless a better hero shot is available.

---

## 🟠 HIGH PRIORITY — About Pages

### 4. Principal's Full Message Body
- **File:** `app/about/principal/PrincipalContent.tsx`
- **What's needed:** Full message/letter from Mrs. Radha Meena (Principal). 3–5 paragraphs.
  Can be in English and/or Hindi.

### 5. Principal's Portrait Photo
- **File:** `app/about/principal/PrincipalContent.tsx`
- **What's needed:** Professional photo of Mrs. Radha Meena. Minimum 600×800px. Clear background.
  Current state: uses a placeholder or generic image.

### 6. Director 1 — Hariprakash Meena — Full Message
- **File:** `app/about/director/DirectorContent.tsx`
- **What's needed:** 3–5 paragraph message from Mr. Hariprakash Meena (Director).

### 7. Director 2 — Rekhraj Meena — Full Message
- **File:** `app/about/director/DirectorContent.tsx`
- **What's needed:** 3–5 paragraph message from Mr. Rekhraj Meena (Director).

### 8. Director Portraits ×2
- **File:** `app/about/director/DirectorContent.tsx`
- **What's needed:** Photos of both directors. Same consistent background preferred. Min 600×800px.

### 9. Vision & Mission Statement
- **File:** `app/about/vision-mission/page.tsx` (or similar)
- **What's needed:** Official Vision and Mission statements of the school. If they exist in school documents, provide them.

### 10. School History / About Us Paragraphs
- **File:** `app/about/page.tsx` or layout
- **What's needed:** Paragraph describing school history, founding, growth, and philosophy. 
  *Known facts (from constants.ts):* Established 2013, Anta Baran, RBSE affiliated, Classes I–XII.

---

## 🟡 MEDIUM PRIORITY — Facility Pages

### 11. Library Description & Stats
- **File:** `app/facilities/library/page.tsx`
- **What's needed:** 
  - Total number of books (currently shows "10,000+" — **verify this number**)
  - Library timings
  - Special features (digital section? reading room?)

### 12. Science Lab Description
- **File:** `app/facilities/labs/page.tsx`
- **What's needed:** What labs exist? Physics, Chemistry, Biology? Computer lab? Any certifications?

### 13. Sports Facilities Detail
- **File:** `app/facilities/sports/page.tsx`
- **What's needed:** What sports facilities are available? Ground size? Any championships won?

### 14. Smart Classroom Count
- **File:** `app/facilities/smart-classrooms/page.tsx`
- **What's needed:** How many smart classrooms? What technology (brand, software)?

### 15. Transport Routes & Details
- **File:** `app/facilities/transport/page.tsx`
- **What's needed:** Which areas/villages are covered? Approximate timings? Bus count?

---

## 🟡 MEDIUM PRIORITY — Academics / Toppers

### 16. Topper Portrait Photos
- **File:** Topper records in DB (`prisma/seed-school-structure.ts`)
- **What's needed:** Actual photos of the top 3 toppers:
  1. Dwitika Sharma (Class X, 96%)
  2. Bhakti Nagar (Class X, 95.33%)
  3. Nipurn Malav (Class X, 95%)
  Upload to `/public/gallery/students/` and update the `imageUrl` in the database.

### 17. Syllabus Documents
- **File:** `app/academics/syllabus/page.tsx`
- **What's needed:** PDF links or content for RBSE Class X and XII syllabus. 
  Can link to official RBSE website if school doesn't host its own.

---

## 🟢 LOW PRIORITY — Footer & Contact

### 18. Footer Tagline
- **File:** `components/layout/Footer.tsx` (line ~25)
- **Current fake text:** *"Dedicated to excellence in education, fostering a community of learners who are prepared to lead with integrity and innovation."*
- **What's needed:** A real school tagline, or confirm if this is acceptable to keep.

### 19. Google Maps Embed
- **File:** `app/contact/page.tsx`
- **What's needed:** Verify the Google Maps embed link for:
  *Near Sahkari Petrol Pump, Kota Road, Anta, Baran, Rajasthan – 325202*

---

## 🔵 IMAGES NEEDED (For New Cinematic Design)

These images don't exist yet and are needed to make the new design work properly.
Placeholders will be used until real photos are provided.

| # | Image | Dimensions | Where Used | Priority |
|---|-------|-----------|------------|----------|
| A | Campus exterior (golden hour) | 1920×1080px | Homepage hero | 🔴 Critical |
| B | Campus wide-angle (full building) | 2400×1080px | About page, footer bg | 🔴 Critical |
| C | Students on first day / admission | 1920×640px | Admissions page hero | 🔴 Critical |
| D | Toppers celebrating / receiving awards | 1920×840px | Toppers page hero | 🟠 High |
| F | Science Lab (students at benches) | 1920×1080px | Facility page | 🟠 High |
| I | Faculty headshots (all teachers) | 400×400px each | Faculty page | 🟠 High |
| J | Annual Day / Prize Distribution | 1600×1200px min 20 photos | Gallery | 🟡 Medium |
| K | Sports Day action shots | 1600×1200px min 15 photos | Gallery | 🟡 Medium |

---

## ✅ CONFIRMED REAL INFORMATION (Do Not Change)

These items are verified from `lib/constants.ts`, `lib/stats.ts`, and the database:

- **School Name:** Central Academy Senior Secondary School
- **Short Name:** CAS
- **Phone 1:** +91-7737689684
- **Phone 2:** 07457-294633
- **Email:** centralacademyantah@gmail.com
- **Address:** Near Sahkari Petrol Pump, Kota Road, Anta, Baran, Rajasthan – 325202
- **Established:** 2013
- **Affiliation:** RBSE
- **Classes:** I – XII
- **Students:** 800+ enrolled
- **Teachers:** 50+ qualified
- **Navbar tagline:** "Education for Excellence"
- **Facebook:** https://www.facebook.com/profile.php?id=100084479980362
- **Instagram:** https://www.instagram.com/central_academy_school_anta/
- **YouTube:** https://www.youtube.com/@centralacademysecondarysch4542

### Confirmed Toppers (from DB seed):
- Dwitika Sharma — Class X — 96%
- Bhakti Nagar — Class X — 95.33%
- Nipurn Malav — Class X — 95%

---

*Last updated: June 2026. Update this file as real content is received.*
