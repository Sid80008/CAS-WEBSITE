
Complete visual design specification for all 27 public website pages of Central Academy Anta
markdown

# Central Academy Anta — Complete Visual Design Specification
## Tier 1 Public Website — All 27 Pages

**Document Purpose:** Comprehensive visual design blueprint for every public-facing page  
**Audience:** Developers implementing the Next.js frontend  
**Scope:** Layout, typography, color usage, component anatomy, responsive behavior  
**Status:** Production-ready specification — no prototyping phase needed

---

## Table of Contents

1. [Design Philosophy & Principles](#1-design-philosophy--principles)
2. [Global Design System](#2-global-design-system)
3. [Shared Components](#3-shared-components)
4. [Page-by-Page Specifications](#4-page-by-page-specifications)
5. [Responsive Behavior Rules](#5-responsive-behavior-rules)
6. [Interaction & Animation Guidelines](#6-interaction--animation-guidelines)

---

# 1. Design Philosophy & Principles

## 1.1 Design Positioning

**Who We're Designing For:**
- **Primary:** Parents of prospective students (age 30-45, mobile-first, limited tech literacy)
- **Secondary:** Current parents checking notices/results (daily usage, functional needs)
- **Tertiary:** School staff, board members, government inspectors (formal evaluation)

**What Impression Must the Site Convey:**
- **Trust & Stability** — 30-year-old institution, RBSE affiliated, reliable education
- **Academic Excellence** — State-level sports wins, consistent toppers, qualified staff
- **Accessibility** — Bilingual (Hindi/English), mobile-friendly, senior-citizen-friendly navigation
- **Modernity** — Not a 2010 website, competitive with private schools in Kota/Baran

**Anti-Patterns to Avoid:**
- ❌ Overly playful/childish aesthetics (cartoon fonts, rainbow colors)
- ❌ Corporate/sterile look (all gray, cold, impersonal)
- ❌ Information overload (wall of text, cluttered cards)
- ❌ Generic template feel (stock photos, Lorem Ipsum energy)

**Design North Star:**
> A parent visiting for the first time should feel: "This school is professional, organized, and cares about details. I can trust them with my child's education."

---

## 1.2 Visual Identity Foundation

### Brand Attributes (Visual Translation)

| Attribute | How It Shows Visually |
|-----------|----------------------|
| **Professional** | Clean typography, structured layouts, ample whitespace, consistent spacing |
| **Trustworthy** | Deep blue primary color (authority), real photos (not stock), verified badges |
| **Warm** | Amber accents, rounded corners (not sharp), friendly micro-copy, staff faces |
| **Academic** | Serif font for formal content, proper citations, data visualization, results showcase |
| **Accessible** | 16px minimum body text, high contrast (5:1+), simple navigation, Hindi first-class citizen |

---

# 2. Global Design System

## 2.1 Color Palette — Complete Specification

### Primary Colors (Brand Identity)

**School Blue** — `#1B4F8A`
- **Usage:** Headers, primary CTAs, navigation active states, links, focus rings
- **Rationale:** Deep enough for WCAG AA on white (5.8:1 contrast), conveys authority without being harsh
- **Do Not Use For:** Large background areas (too dark), small badges (use light variant)

**School Blue Light** — `#E6F1FB`
- **Usage:** Section backgrounds, hover states, info badges, card highlights
- **Rationale:** 10% opacity tint of primary, maintains color harmony
- **Do Not Use For:** Text (fails contrast), active buttons (too weak)

**School Blue Dark** — `#0C447C`
- **Usage:** Text on light backgrounds, header text, button hover states
- **Rationale:** 6.8:1 contrast on white, strong readability

**School Blue Extra Light** — `#F0F6FC`
- **Usage:** Page backgrounds (alternative to pure white), subtle card elevation
- **Rationale:** Barely perceptible tint, reduces screen glare on mobile

### Accent Colors (Functional Hierarchy)

**Amber** — `#BA7517` (Light: `#FAEEDA`, Dark: `#633806`)
- **Usage:** Highlights, featured items, "New" badges, admission CTAs, important notices
- **Rationale:** Warmth, attention-grabbing without alarm
- **Psychology:** "Important but positive" — not an error, but don't miss this

**Teal** — `#0F6E56` (Light: `#E1F5EE`, Dark: `#085041`)
- **Usage:** Success states, approval indicators, positive metrics, environmental initiatives
- **Rationale:** Complementary to blue, professional green family
- **Use Case:** "TC Verified ✓" badge, "Fee Paid" status, results declared indicator

**Coral** — `#993C1D` (Light: `#FAECE7`, Dark: `#712B13`)
- **Usage:** Alerts, deadlines, urgent notices, critical actions
- **Rationale:** Red family but softer (not alarm-red), serious without panic
- **Use Case:** "Admission closing soon", "Fee overdue", "Notice expires today"

**Purple** — `#534AB7` (Light: `#EEEDFE`, Dark: `#3C3489`)
- **Usage:** Portal differentiation, special events, cultural activities
- **Rationale:** Distinct from primary blue, adds variety without clash
- **Use Case:** Parent portal badge, cultural event category, prize distribution tag

**Green** — `#3B6D11` (Light: `#EAF3DE`, Dark: `#27500A`)
- **Usage:** Sports achievements, nature/environment content, growth metrics
- **Rationale:** Traditional "success" color, outdoor association
- **Use Case:** Sports tournament wins, playground section, student growth charts

### Neutral Palette (Structure)

**Text Hierarchy:**
- Primary: `#1a1a1a` — Body copy, headings, critical content
- Secondary: `#555555` — Labels, metadata, less critical info
- Tertiary: `#888888` — Placeholders, disabled states, timestamps

**Backgrounds:**
- Primary: `#FFFFFF` — Page background, card backgrounds
- Secondary: `#F8F7F5` — Alternate section backgrounds, sidebar
- Tertiary: `#F1EFE8` — Subtle dividers, inactive states

**Borders:**
- Default: `#E2E0DB` — Card borders, input borders, dividers
- Hover: `#B4B2A9` — Interactive element hover states
- Focus: School Blue `#1B4F8A` — Input focus, keyboard navigation

---

## 2.2 Typography System

### Font Selection

**Primary Font:** `Noto Sans` (Google Fonts)
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Character Sets:** Latin + Devanagari (Hindi support)
- **Loading Strategy:** Subset font, swap display, preload critical weights

**Why Noto Sans:**
1. **Bilingual Excellence** — Single font family for English + Hindi, no font-switching flash
2. **Professional Neutrality** — Not corporate (like Arial), not playful (like Quicksand)
3. **Readability at Scale** — Clear at 14px (mobile body), strong at 48px (hero headlines)
4. **Google Fonts CDN** — Free, fast, reliable hosting

**Fallback Stack:**
```
font-family: 'Noto Sans', system-ui, -apple-system, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**No Serif Font Needed:**
- Original plan had serif for "formal content" — REJECTED
- **Reason:** Mixing sans + serif creates visual noise, especially with Hindi
- **Alternative:** Use font-weight and size to create hierarchy, not font-family change

### Type Scale

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|--------|
| **Display** | 48px (3rem) | 1.1 | 700 | Hero headlines (homepage only) |
| **H1** | 36px (2.25rem) | 1.2 | 700 | Page titles |
| **H2** | 28px (1.75rem) | 1.3 | 600 | Major section headers |
| **H3** | 22px (1.375rem) | 1.4 | 600 | Subsection headers |
| **H4** | 18px (1.125rem) | 1.4 | 600 | Card titles |
| **Body Large** | 18px (1.125rem) | 1.6 | 400 | Lead paragraphs, feature descriptions |
| **Body** | 16px (1rem) | 1.6 | 400 | Default body text |
| **Body Small** | 14px (0.875rem) | 1.5 | 400 | Supporting text, captions |
| **Label** | 14px (0.875rem) | 1.5 | 500 | Form labels, UI labels |
| **Caption** | 12px (0.75rem) | 1.5 | 400 | Metadata, timestamps, footnotes |
| **Overline** | 11px (0.6875rem) | 1.4 | 600 | Category tags, uppercase labels |

### Hindi Typography Adjustments

**Line Height Increase:**
- English body: `1.6` (standard)
- Hindi body: `1.65` (add 0.05 for Devanagari diacritics)

**Font Size Adjustment:**
- Keep same pixel size — DO NOT increase Hindi font size
- Devanagari already appears slightly larger due to character structure

**Example:**
```
<p className="text-base leading-relaxed">English content here</p>
<p className="text-base leading-[1.65]" lang="hi">हिंदी सामग्री यहाँ</p>
```

### Font Weight Usage Rules

**400 (Regular):**
- Body paragraphs
- List items
- Descriptions
- Long-form content

**500 (Medium):**
- Navigation links
- Button text
- Form labels
- Tab labels
- Subtle emphasis in body text

**600 (Semibold):**
- Card titles (H4)
- Section headers (H2, H3)
- Feature labels
- Stat numbers
- Important metadata

**700 (Bold):**
- Page titles (H1)
- Hero headlines (Display)
- Primary CTAs (sparingly)
- Strong emphasis (used rarely in body)

**Anti-Pattern:** Do NOT use bold (700) for emphasis in body paragraphs — use semibold (600) or color instead.

---

## 2.3 Spacing System

### Base Unit: 4px Grid

**Scale:**
```
1  = 4px    (0.25rem)
2  = 8px    (0.5rem)
3  = 12px   (0.75rem)
4  = 16px   (1rem)
5  = 20px   (1.25rem)
6  = 24px   (1.5rem)
8  = 32px   (2rem)
10 = 40px   (2.5rem)
12 = 48px   (3rem)
16 = 64px   (4rem)
20 = 80px   (5rem)
24 = 96px   (6rem)
```

### Semantic Spacing Tokens

**Component-Level:**
- `spacing-xs`: 4px — Icon-text gap, tight padding
- `spacing-sm`: 8px — Button padding (vertical), input padding
- `spacing-md`: 16px — Card padding, form field spacing
- `spacing-lg`: 24px — Section padding, card spacing
- `spacing-xl`: 32px — Large section gaps

**Layout-Level:**
- `spacing-section`: 48px — Vertical gap between major sections
- `spacing-page`: 64px — Top/bottom page padding (desktop)
- `spacing-page-mobile`: 24px — Top/bottom page padding (mobile)

### Padding Rules

**Cards:**
- Small cards (notices, events): `p-4` (16px)
- Default cards (staff, facilities): `p-6` (24px)
- Feature cards (homepage hero): `p-8` (32px)

**Sections:**
- Desktop: `py-12 px-16` (vertical 48px, horizontal 64px)
- Tablet: `py-10 px-8` (vertical 40px, horizontal 32px)
- Mobile: `py-8 px-6` (vertical 32px, horizontal 24px)

**Buttons:**
- Small: `px-3 py-1.5` (12px × 6px)
- Default: `px-4 py-2` (16px × 8px)
- Large: `px-6 py-3` (24px × 12px)

---

## 2.4 Border & Elevation System

### Border Radius

**Scale:**
```
sm:      6px  — Badges, tags, small buttons
DEFAULT: 8px  — Cards, inputs, buttons
lg:      12px — Large cards, modals
xl:      16px — Images, gallery thumbnails
full:    9999px — Pills, circular avatars
```

**Usage Guidelines:**
- Use `8px` default for 90% of components
- Reserve `12px` for featured/prominent cards only
- Avoid mixing radii on same page — creates visual noise

### Border Widths

**Default:** `1px` — Most borders, card outlines, dividers
**Thick:** `2px` — Focus states, active selection, emphasis borders
**None:** `0px` — Flush layouts, bleeding images

### Shadow System (Elevation)

**None (Flat):**
```
box-shadow: none
```
Use: Inline elements, flush cards, minimalist sections

**Subtle (Lift):**
```
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08)
```
Use: Default cards, inputs at rest

**Medium (Float):**
```
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
```
Use: Hover states, dropdowns, modals

**Strong (Pop):**
```
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15)
```
Use: Navigation (sticky), featured cards, dialogs

**Focus Ring:**
```
box-shadow: 0 0 0 3px rgba(27, 79, 138, 0.2)
```
Use: Keyboard focus states (accessibility critical)

### Elevation Hierarchy Rules

**z-index scale:**
```
Base: 0        — Page content
Dropdown: 10   — Select menus, tooltips
Sticky: 20     — Sticky headers
Modal: 30      — Dialogs, lightboxes
Toast: 40      — Notifications, alerts
```

**Never use arbitrary z-index values** — stick to the scale to avoid stacking conflicts.

---

## 2.5 Iconography

### Icon Library: Lucide React

**Why Lucide:**
- Consistent 24×24px grid
- Stroke-based (matches Noto Sans geometric feel)
- Tree-shakeable (import only icons used)
- Open source, no licensing issues

**Icon Sizing:**
```
xs: 16px — Inline with small text
sm: 20px — Inline with body text
md: 24px — Default size, buttons, labels
lg: 32px — Feature icons, empty states
xl: 48px — Hero sections, large illustrations
```

**Icon Color Usage:**
- **Primary:** School Blue `#1B4F8A` — Navigation, links, CTAs
- **Secondary:** Text Secondary `#555555` — Supporting icons, metadata
- **Muted:** Text Tertiary `#888888` — Decorative, low-priority icons

**Stroke Width:**
- Default: `2px` — Matches Noto Sans medium weight
- Thick: `2.5px` — Emphasis icons (rare use)
- Thin: `1.5px` — Large decorative icons only

**Icon + Text Spacing:**
- Horizontal gap: `8px` (spacing-2)
- Vertical alignment: `items-center` (center-aligned with text baseline)

**Common Icons Needed:**
```
Navigation: Menu, X (close), ChevronDown, ChevronRight
Actions: Download, ExternalLink, Mail, Phone, MapPin
Status: Check, AlertCircle, Info, Clock
Content: Calendar, FileText, Image, Users, Book
Social: Facebook, Twitter (X), Instagram
```

---

# 3. Shared Components

## 3.1 Navigation Bar (Header)

### Desktop Layout (≥1024px)

**Structure:**
```
[School Logo] [Navigation Links ————————————] [Language Toggle] [Search Icon]
```

**Specifications:**

**Container:**
- Height: `72px` (fixed)
- Background: White `#FFFFFF`
- Border Bottom: `1px solid #E2E0DB`
- Shadow: Subtle elevation when scrolled past 80px
- Sticky position: `top: 0, z-index: 20`

**School Logo (Left):**
- Size: `48px × 48px` (square or circular)
- Margin Left: `32px`
- Logo Image + Text Stack:
  - Image: 48px height
  - Text: "Central Academy" (16px, semibold)
  - Subtext: "Anta, Baran" (12px, regular, text-secondary)

**Navigation Links (Center):**
- Font: 14px, medium weight
- Color: Text secondary `#555555`
- Hover: School Blue `#1B4F8A`, underline (`2px thick, 4px from text`)
- Active: School Blue `#1B4F8A`, bold weight, underline
- Spacing: `32px` between links
- Transition: `150ms ease-in-out` (color + underline)

**Dropdown Menus (About, Facilities, Admission):**
- Trigger: Chevron Down icon (16px, inline)
- Dropdown Panel:
  - Background: White
  - Border: `1px solid #E2E0DB`
  - Border Radius: `8px`
  - Shadow: Medium elevation
  - Padding: `8px`
  - Min Width: `220px`
  - Appear: Fade in + slide down `8px` (200ms ease-out)
- Dropdown Items:
  - Padding: `10px 16px`
  - Hover: School Blue Light background `#E6F1FB`
  - Active: School Blue background, white text
  - Font: 14px regular

**Language Toggle (Right Side):**
- Design: Pill toggle (`8px radius`)
- Width: `120px`
- Height: `36px`
- Background: `#F1EFE8` (neutral tertiary)
- Active Segment: School Blue `#1B4F8A`, white text
- Inactive Segment: Transparent, text secondary
- Labels: "English" | "हिंदी" (13px, medium)
- Transition: `200ms ease-in-out` (slide + color)

**Search Icon (Far Right):**
- Icon: Search (Lucide), 24px
- Color: Text secondary, hover school blue
- Click: Expands to search input (slides from right, 300px width)
- Margin Right: `32px`

### Mobile Layout (<1024px)

**Structure:**
```
[☰ Menu] [Logo] [Language]
```

**Container:**
- Height: `64px` (shorter than desktop)
- Background: White
- Border Bottom: `1px solid #E2E0DB`
- Sticky: Yes

**Hamburger Menu (Left):**
- Icon: Menu (Lucide), 28px
- Margin Left: `16px`
- Click: Opens slide-out drawer from left (full height, 80% width, max 320px)

**Logo (Center):**
- Image: 40px height
- Text: "Central Academy" only (14px, semibold)
- Subtext: Hidden on mobile

**Language Toggle (Right):**
- Compact pill: 80px width, 32px height
- Labels: "EN" | "हिं" (abbreviated)
- Margin Right: `16px`

**Mobile Drawer Menu:**
- Background: White
- Width: `80vw` (max `320px`)
- Overlay: `rgba(0, 0, 0, 0.5)` (click to close)
- Animation: Slide from left (300ms ease-out)
- Content:
  - School logo + name at top (`p-6`)
  - Navigation links (full width items, `py-4 px-6`)
  - Dividers between major sections
  - Close button (X icon, top right)

---

## 3.2 Footer

### Desktop Layout

**Structure (3 Columns):**
```
[About Column] [Quick Links Column] [Contact Column]
[Bottom Bar with Copyright + Social Links]
```

**Container:**
- Background: `#0a2847` (dark blue gradient)
- Text Color: `#FFFFFF` (white text on dark)
- Padding: `64px 32px 24px`
- Border Top: None (full bleed)

**Column 1 — About:**
- Logo: White version (or high-contrast), 56px
- Tagline: "Educating minds, Building futures since 1994"
- Font: 15px, regular, opacity 0.9
- Description: 2-3 sentence school overview
- Font: 14px, regular, opacity 0.75, line-height 1.6
- Width: `320px`

**Column 2 — Quick Links:**
- Header: "Quick Links" (14px, semibold, uppercase, letter-spacing 0.08em, opacity 0.6)
- Links List:
  - About Us
  - Admission
  - Academics
  - Facilities
  - Contact Us
  - TC Verification
- Link Styling:
  - Font: 14px, regular
  - Color: White, opacity 0.85
  - Hover: Opacity 1, underline (1px)
  - Spacing: `12px` vertical gap

**Column 3 — Contact Info:**
- Header: "Contact Us" (same styling as column 2)
- Address: Icon + text rows
  - MapPin icon (20px, white, opacity 0.7)
  - "Near Sahkari Petrol Pump, Anta, Baran 325202"
- Phone: Icon + text
  - Phone icon (20px)
  - "+91-7737689684"
- Email: Icon + text
  - Mail icon (20px)
  - "centralacademyanta@gmail.com"
- Hours: Icon + text
  - Clock icon (20px)
  - "Mon–Sat: 8:00 AM – 4:00 PM"
- Icon-text gap: `12px`
- Row gap: `16px`

**Bottom Bar:**
- Border Top: `1px solid rgba(255, 255, 255, 0.1)`
- Padding: `20px 0`
- Flex: Space between
- Left: Copyright text
  - "© 2026 Central Academy Anta. All rights reserved."
  - Font: 13px, opacity 0.7
- Right: Social icons
  - Facebook, Twitter (X) icons (24px)
  - Color: White, opacity 0.7
  - Hover: Opacity 1, school blue background circle
  - Gap: `16px`

### Mobile Footer

**Stacked Layout:**
- Single column, all sections stack vertically
- Padding: `40px 24px 20px`
- Column gap: `32px`
- Social icons: Centered in bottom bar

---

## 3.3 Page Layout Container

**Purpose:** Consistent wrapper for all page content

**Desktop:**
- Max Width: `1280px` (generous for content, avoids ultra-wide line length)
- Padding: `0 64px` (breathing room from edges)
- Margin: `0 auto` (center on screen)

**Tablet:**
- Max Width: `100%` (full width)
- Padding: `0 32px`

**Mobile:**
- Max Width: `100%`
- Padding: `0 20px`

**Vertical Spacing:**
- Top: `32px` (gap between sticky nav and content)
- Bottom: `64px` (gap before footer)

**Example Structure:**
```
<Navbar />
<main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8 lg:py-12">
  {/* Page content */}
</main>
<Footer />
```

---

## 3.4 Breadcrumb Navigation

**When Used:** All pages except homepage

**Layout:**
- Position: Top of page, below navbar
- Background: Transparent (sits on page background)
- Font: 13px, regular
- Color: Text tertiary `#888888`

**Structure:**
```
Home > About > Principal's Message
```

**Styling:**
- Links: Text secondary, hover underline
- Current page: Text primary, no link
- Separator: Chevron Right icon (14px) OR "/" character
- Separator color: Text tertiary
- Gap: `8px` between items

**Mobile Behavior:**
- Truncate middle items on narrow screens
- Show: "Home > ... > Current Page"
- Click "..." expands inline dropdown with full path

---

## 3.5 Section Header Component

**Purpose:** Reusable header for major page sections

**Structure:**
```
[Small Label] ← optional overline
[Large Heading]
[Description Text] ← optional
[Decorative Line] ← subtle accent
```

**Overline (Optional):**
- Font: 11px, semibold, uppercase, letter-spacing 0.1em
- Color: School Blue `#1B4F8A`
- Margin Bottom: `8px`

**Heading:**
- Font: H2 (28px, semibold)
- Color: Text primary
- Margin Bottom: `12px`

**Description (Optional):**
- Font: Body (16px, regular)
- Color: Text secondary
- Max Width: `600px` (readable line length)
- Margin Bottom: `16px`

**Decorative Line:**
- Width: `48px`
- Height: `3px`
- Background: Amber `#BA7517`
- Border Radius: `full` (rounded ends)
- Margin Bottom: `32px`

**Alignment:**
- Default: Left-aligned
- Center variant: Available for hero sections

---

## 3.6 Card Component (Base)

**Purpose:** Standard container for content blocks

**Default Card:**
- Background: White `#FFFFFF`
- Border: `1px solid #E2E0DB`
- Border Radius: `8px`
- Padding: `24px`
- Shadow: Subtle (at rest), medium (on hover)
- Transition: `shadow 200ms ease-in-out`

**Hover State:**
- Border Color: `#B4B2A9` (slightly darker)
- Shadow: Medium elevation
- Transform: `translateY(-2px)` (subtle lift)

**Card with Image:**
- Image: Top, full width, border-radius top only
- Content: Padding `20px`

**Card Variants:**

**Compact:**
- Padding: `16px`
- Use: Notices, small event cards

**Featured:**
- Border: `2px solid` School Blue
- Shadow: Medium (at rest)
- Background: School Blue Light `#E6F1FB` (optional tint)

**Flat:**
- Border: None
- Shadow: None
- Background: Neutral tertiary `#F1EFE8`
- Use: Low-priority content, nested cards

---

## 3.7 Button System

### Primary Button

**Visual:**
- Background: School Blue `#1B4F8A`
- Text: White `#FFFFFF`
- Border: None
- Shadow: Subtle
- Border Radius: `8px`

**Hover:**
- Background: School Blue Dark `#0C447C`
- Shadow: Medium
- Transform: `translateY(-1px)`

**Active/Pressed:**
- Background: `#041d38` (even darker)
- Transform: `translateY(0)`

**Sizes:**
- Small: `px-3 py-1.5` (12px × 6px), text 13px
- Default: `px-4 py-2` (16px × 8px), text 14px
- Large: `px-6 py-3` (24px × 12px), text 16px

**With Icon:**
- Icon: 20px (default size), 16px (small), 24px (large)
- Icon-text gap: `8px`
- Icon position: Left (default), right (rare)

### Secondary Button

**Visual:**
- Background: Transparent
- Text: School Blue `#1B4F8A`
- Border: `2px solid` School Blue
- Shadow: None

**Hover:**
- Background: School Blue Light `#E6F1FB`
- Border: School Blue Dark

**Active:**
- Background: School Blue (inverted to primary)
- Text: White

### Ghost Button

**Visual:**
- Background: Transparent
- Text: Text secondary `#555555`
- Border: None

**Hover:**
- Background: Neutral tertiary `#F1EFE8`
- Text: Text primary

### Destructive Button (Rare Use)

**Visual:**
- Background: Coral `#993C1D`
- Text: White
- Only for delete/remove actions

### Disabled State (All Variants)

**Visual:**
- Opacity: `0.5`
- Cursor: `not-allowed`
- No hover effects

---

## 3.8 Form Input System

### Text Input (Default)

**Visual:**
- Background: White `#FFFFFF`
- Border: `1px solid #E2E0DB`
- Border Radius: `8px`
- Padding: `10px 14px` (vertical 10px, horizontal 14px)
- Font: 15px, regular
- Color: Text primary

**Placeholder:**
- Color: Text tertiary `#888888`
- Font: Same size, italic

**Focus State:**
- Border: `2px solid` School Blue
- Outline: None (use border instead)
- Shadow: Focus ring (school blue, 20% opacity, 3px)

**Error State:**
- Border: `2px solid` Coral `#993C1D`
- Background: Coral light `#FAECE7` (very subtle tint)
- Error text below: 13px, coral dark

**Success State:**
- Border: `2px solid` Teal `#0F6E56`
- Checkmark icon: Right side, inside input

### Label

**Visual:**
- Font: 14px, medium weight
- Color: Text primary
- Margin Bottom: `6px`
- Required indicator: Red asterisk `*` (coral color)

### Helper Text

**Visual:**
- Font: 13px, regular
- Color: Text secondary
- Margin Top: `4px`
- Max Width: Match input width

### Select Dropdown

**Visual:** Same as text input + ChevronDown icon (right side)
- Icon: 20px, text tertiary color
- Icon position: `right 12px center`

**Dropdown Panel:**
- Background: White
- Border: `1px solid #B4B2A9`
- Border Radius: `8px`
- Shadow: Medium
- Max Height: `320px` (scroll if overflow)
- Options padding: `10px 14px`
- Option hover: School blue light background

### Checkbox

**Visual:**
- Size: `20px × 20px`
- Border: `2px solid #E2E0DB`
- Border Radius: `4px` (slightly rounded)
- Background: White

**Checked:**
- Background: School Blue
- Border: School Blue
- Checkmark: White, bold stroke

**Label:**
- Font: 15px, regular
- Color: Text primary
- Margin Left: `10px` (gap from checkbox)
- Clickable: Yes (entire label toggles checkbox)

### Radio Button

**Visual:**
- Size: `20px × 20px`
- Border: `2px solid #E2E0DB`
- Border Radius: `full` (perfect circle)
- Background: White

**Selected:**
- Border: School Blue
- Inner dot: School Blue, `10px` diameter

### Textarea

**Visual:** Same as text input but:
- Min Height: `120px`
- Resize: `vertical` (allow user to drag vertically)
- Padding: `12px 14px`

---

## 3.9 Badge Component

**Purpose:** Labels, tags, status indicators

**Default Badge:**
- Padding: `2px 10px`
- Border Radius: `full` (pill shape)
- Font: 12px, medium weight
- Letter Spacing: `0.02em`

**Color Variants:**

**Primary (School Blue):**
- Background: `#E6F1FB`
- Text: `#0C447C`
- Use: Default tags, categories

**Success (Teal):**
- Background: `#E1F5EE`
- Text: `#085041`
- Use: Verified, approved, paid

**Warning (Amber):**
- Background: `#FAEEDA`
- Text: `#633806`
- Use: New, featured, important

**Danger (Coral):**
- Background: `#FAECE7`
- Text: `#712B13`
- Use: Urgent, deadline, overdue

**Neutral (Gray):**
- Background: `#F1EFE8`
- Text: `#555555`
- Use: Draft, inactive, archived

**Sizes:**
- Small: `2px 8px`, font 11px
- Default: `2px 10px`, font 12px
- Large: `4px 12px`, font 13px

**With Icon:**
- Icon: 14px (small badge), 16px (default)
- Icon-text gap: `6px`
- Icon position: Left

---

## 3.10 Alert/Notification Component

**Purpose:** User feedback, important messages

**Container:**
- Border: `1px solid` (color variant)
- Border Radius: `8px`
- Padding: `14px 16px`
- Border Left: `4px solid` (color variant, thick accent)

**Icon (Left Side):**
- Size: 20px
- Color: Matches variant
- Margin Right: `12px`

**Content:**
- Title: 15px, semibold, text primary
- Message: 14px, regular, text secondary
- Title-message gap: `4px`

**Close Button (Right Side):**
- Icon: X (Lucide), 18px
- Color: Text tertiary
- Hover: Text primary
- Position: Top-right corner

**Variants:**

**Info (Blue):**
- Border: School Blue Light
- Border Left: School Blue
- Background: `#F0F6FC`
- Icon: Info (Lucide)

**Success (Teal):**
- Border: Teal Light
- Border Left: Teal
- Background: `#E1F5EE`
- Icon: Check Circle

**Warning (Amber):**
- Border: Amber Light
- Border Left: Amber
- Background: `#FAEEDA`
- Icon: Alert Triangle

**Error (Coral):**
- Border: Coral Light
- Border Left: Coral
- Background: `#FAECE7`
- Icon: Alert Circle

---

## 3.11 Modal/Dialog Component

**Overlay:**
- Background: `rgba(0, 0, 0, 0.6)` (60% black)
- Backdrop Blur: `4px` (optional, modern touch)
- z-index: `30`
- Click: Close modal

**Modal Container:**
- Background: White
- Border Radius: `12px`
- Shadow: Strong elevation
- Max Width: `600px` (default), `400px` (small), `800px` (large)
- Position: Center of screen (vertical + horizontal)
- Padding: `32px`

**Header:**
- Title: H3 (22px, semibold)
- Color: Text primary
- Close button: Top-right, X icon, 24px
- Padding Bottom: `16px`
- Border Bottom: `1px solid #E2E0DB`

**Body:**
- Padding: `20px 0`
- Max Height: `60vh` (scroll if overflow)

**Footer:**
- Padding Top: `16px`
- Border Top: `1px solid #E2E0DB`
- Flex: Right-aligned buttons
- Button gap: `12px`

**Animation:**
- Enter: Fade in + scale from 95% to 100% (200ms ease-out)
- Exit: Fade out + scale to 95% (150ms ease-in)

---

## 3.12 Pagination Component

**Purpose:** Notice board, gallery, downloads multi-page navigation

**Container:**
- Flex: Centered
- Gap: `8px` between elements
- Padding: `20px 0`

**Page Number Buttons:**
- Size: `40px × 40px` (square)
- Border Radius: `8px`
- Font: 14px, medium
- Border: `1px solid #E2E0DB`
- Background: White

**Current Page:**
- Background: School Blue
- Text: White
- Border: None

**Hover (Inactive Pages):**
- Background: School Blue Light
- Border: School Blue Light

**Ellipsis (...):**
- Color: Text tertiary
- Not clickable
- Appears when: More than 7 pages total

**Previous/Next Buttons:**
- Same size as page numbers
- Icon: ChevronLeft/Right (20px)
- Disabled state: Opacity 0.4, cursor not-allowed

**Example:**
```
[←] [1] [2] [3] ... [8] [9] [10] [→]
     ^current
```

---

## 3.13 Loading States

### Skeleton Loader (Preferred)

**Purpose:** Content placeholder while data loads

**Visual:**
- Background: Neutral tertiary `#F1EFE8`
- Animated: Shimmer effect (gradient sweep left-to-right, 1.5s loop)
- Border Radius: Match real content (`8px` for cards)

**Skeleton Shapes:**
- **Text Line:** Height `16px`, width varies
- **Title:** Height `24px`, width `40%`
- **Card:** Full card dimensions, subtle shimmer
- **Image:** Aspect ratio 16:9 or 1:1, gray background

**Animation:**
```
Gradient: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)
Duration: 1.5s
Timing: ease-in-out
Infinite: Yes
```

### Spinner (Secondary)

**Purpose:** Short waits, button loading states

**Visual:**
- Size: 20px (small), 32px (medium), 48px (large)
- Stroke: School Blue `#1B4F8A`
- Stroke Width: `3px`
- Animation: 360° rotation, 0.8s, linear, infinite

**Placement:**
- **Button:** Replace text with spinner (same size as button height - 8px)
- **Page Center:** Large spinner, centered vertically + horizontally
- **Inline:** Small spinner, inline with text

---

## 3.14 Empty State Component

**Purpose:** No data scenarios (empty notice board, no search results)

**Container:**
- Center-aligned (horizontal + vertical)
- Padding: `80px 20px`
- Background: Optional subtle gray tint

**Icon:**
- Size: 64px
- Color: Text tertiary
- Margin Bottom: `16px`

**Heading:**
- Font: H3 (22px, semibold)
- Color: Text primary
- Text: e.g., "No Notices Yet"

**Description:**
- Font: Body (16px, regular)
- Color: Text secondary
- Max Width: `400px`
- Text: e.g., "Check back soon for updates from the school"

**Action (Optional):**
- Primary button: e.g., "Go to Homepage"
- Margin Top: `24px`

**Example Use Cases:**
- Empty notice board
- Search with no results
- Gallery with no albums
- Downloads with no files

---

# 4. Page-by-Page Specifications

## 4.1 Homepage (`/`)

### Hero Section

**Layout:**
- Full-width slider
- Height: `600px` (desktop), `400px` (mobile)
- Overlay: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))` (dark gradient for text contrast)

**Slide Content (Each Slide):**
- Background: Full-width image (school building, students, sports, events)
- Overlay Gradient: Yes (for text readability)
- Text Container:
  - Position: Center-left, 20% from left edge
  - Max Width: `600px`
  - Padding: `40px`
  - Background: Semi-transparent white `rgba(255,255,255,0.95)`
  - Border Radius: `12px`
  - Shadow: Medium

**Slide Text:**
- Overline: 13px, semibold, school blue, uppercase
- Headline: Display (48px, bold), text primary
  - Example: "Excellence in Education Since 1994"
- Subheadline: Body Large (18px, regular), text secondary
  - Example: "RBSE Affiliated · Nursery to Class XII · English Medium"
- CTA Button: Primary large, "Apply for Admission"
  - Margin Top: `24px`

**Slider Controls:**
- Indicators (Dots):
  - Position: Bottom center, 24px from edge
  - Size: `12px` diameter each
  - Color: White, 50% opacity (inactive), 100% (active)
  - Gap: `12px`
- Navigation Arrows:
  - Position: Left/right edges, 50% vertical
  - Background: White, 40% opacity
  - Hover: 80% opacity
  - Icon: ChevronLeft/Right (32px)
  - Size: `48px × 48px` circle

**Auto-Play:**
- Duration: 5 seconds per slide
- Pause on hover: Yes
- Loop: Infinite

**Mobile Adaptations:**
- Height: `400px`
- Text container: Full width, padding `24px`
- Headline: 32px (smaller)
- CTA: Full width button

---

### Quick Stats Bar

**Purpose:** Key metrics, trust signals

**Layout:**
- Below hero, full-width
- Background: School Blue Light `#E6F1FB`
- Padding: `48px 0`

**Stats Grid:**
- 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gap: `32px`

**Each Stat:**
- Icon: 48px, school blue (top)
- Number: Display (48px, bold), school blue
  - Examples: "30+", "500+", "37", "100%"
- Label: Body (16px, regular), text secondary
  - Examples: "Years of Excellence", "Students", "Qualified Staff", "Result Rate"
- Text Align: Center

---

### Latest Notices Preview

**Purpose:** Homepage preview of notice board

**Section Header:**
- Overline: "What's New"
- Heading: "Latest Notices"
- Description: None
- Alignment: Left

**Notices Grid:**
- 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gap: `16px`
- Shows: 3 most recent notices (fetched via API)

**Notice Card:**
- Background: White
- Border: `1px solid #E2E0DB`
- Border Radius: `8px`
- Padding: `20px`
- Hover: Lift effect

**Card Content:**
- Date Badge (Top):
  - Background: Amber light
  - Text: "2 days ago" (13px, amber dark)
  - Icon: Clock (16px)
  - Padding: `4px 10px`
- Title:
  - Font: 18px, semibold
  - Color: Text primary
  - Margin Top: `12px`
  - Lines: Max 2, ellipsis overflow
- Excerpt:
  - Font: 15px, regular
  - Color: Text secondary
  - Margin Top: `8px`
  - Lines: Max 3, ellipsis overflow
- Footer:
  - Margin Top: `16px`
  - Border Top: `1px solid #E2E0DB`
  - Padding Top: `12px`
  - "Read More" link: School blue, 14px, chevron right icon

**View All Button:**
- Below grid
- Secondary button: "View All Notices"
- Center-aligned
- Margin Top: `32px`

---

### Toppers Highlight Section

**Purpose:** Showcase recent achievers

**Section Header:**
- Overline: "Academic Excellence"
- Heading: "Recent Toppers"
- Description: "Session 2025-2026 Board Results"

**Layout:**
- Horizontal scrollable carousel (desktop)
- Vertical stack (mobile)
- Background: White
- Padding: `64px 0`

**Topper Card:**
- Width: `280px` (fixed)
- Background: White
- Border: `2px solid` School Blue
- Border Radius: `12px`
- Padding: `24px`
- Text Align: Center

**Card Content:**
- Photo:
  - Size: `120px × 120px` circular
  - Border: `4px solid` Amber
  - Margin Bottom: `16px`
- Badge: "Class X Topper" (amber, small)
- Name: 20px, bold, text primary
- Marks: Display (36px, bold), school blue
  - Example: "98.5%"
- Subject Breakdown:
  - Grid: 2 columns
  - Each: Subject name + marks
  - Font: 13px, regular
  - Gap: `8px`
- View Result PDF: Link, school blue, icon Download

**Carousel Controls:**
- Arrow buttons (left/right), same style as hero
- Mobile: Swipe enabled

---

### Gallery Preview

**Purpose:** Visual showcase, link to full gallery

**Section Header:**
- Overline: "Moments"
- Heading: "Recent Events"
- Description: None

**Layout:**
- Masonry grid OR 3-column equal-height grid
- Gap: `16px`
- Shows: 6 most recent images from all albums

**Image Card:**
- Aspect Ratio: Varies (masonry) OR 4:3 (equal grid)
- Border Radius: `12px`
- Hover: Scale `1.05`, brightness `90%` (darken slightly), cursor pointer

**Overlay (On Hover):**
- Background: `rgba(27, 79, 138, 0.8)` (school blue, 80% opacity)
- Fade In: 200ms
- Content:
  - Event Name: 18px, bold, white
  - Date: 14px, regular, white, 80% opacity
  - Position: Center

**View All Button:**
- Below grid
- Secondary button: "Explore Gallery"
- Center-aligned

---

### Facilities Quick Links

**Purpose:** Navigate to facility pages

**Section Header:**
- Overline: "Explore Our Campus"
- Heading: "Facilities"

**Layout:**
- 5 columns (desktop), 3 (tablet), 2 (mobile)
- Gap: `20px`

**Each Facility Card:**
- Background: White
- Border: `1px solid #E2E0DB`
- Border Radius: `12px`
- Padding: `32px 20px`
- Hover: School blue light background, lift

**Card Content:**
- Icon: 56px, school blue
  - Library: Book icon
  - Computer Lab: Monitor icon
  - Sports: Activity icon
  - Art Room: Palette icon
  - Laboratories: Flask icon
- Label: 16px, semibold, text primary, center
  - "Library", "Computer Lab", etc.
- Margin Between Icon-Label: `16px`

**Link:** Entire card clickable, navigates to facility page

---

### School Map & Contact

**Purpose:** Location, quick contact

**Layout:**
- 2 columns (desktop), 1 column stacked (mobile)
- Background: School blue light `#E6F1FB`
- Padding: `64px 0`

**Column 1 — Map:**
- Embedded Google Maps iframe
- Height: `400px`
- Border Radius: `12px`
- Marker: School location (25.153025°N, 76.284592°E)

**Column 2 — Contact Info:**
- Heading: H2, "Visit Us"
- Address: Body large, text primary
  - Icon: MapPin (24px, school blue)
  - Text: "Near Sahkari Petrol Pump, Anta, Baran 325202"
- Phone: Body, school blue link
  - Icon: Phone (24px)
  - Text: "+91-7737689684"
- Email: Body, school blue link
  - Icon: Mail (24px)
  - Text: "centralacademyanta@gmail.com"
- Hours: Body, text secondary
  - Icon: Clock (24px)
  - Text: "Mon–Sat: 8:00 AM – 4:00 PM"
- Gap Between Rows: `20px`
- Button: Primary, "Get Directions" (opens Google Maps in new tab)

---

## 4.2 About Pages

### 4.2.1 Director's Message (`/about/director`)

**Page Layout:**
- Container: Max-width `900px`, centered
- Padding: Standard page padding
- Background: White

**Hero Section (Top):**
- Background: School blue light `#E6F1FB`
- Padding: `48px 32px`
- Border Radius: `12px` (top of page, full width within container)

**Content:**
- Breadcrumb: Top
- Page Title: H1, "Director's Message"
- Subtitle: Body large, text secondary
  - "A Message from the School Director"

**Director Profile (Below Hero):**
- Layout: 2 columns (desktop), 1 stacked (mobile)
- Gap: `48px`
- Margin Top: `48px`

**Column 1 — Photo:**
- Image: `320px × 400px` (portrait orientation)
- Border Radius: `12px`
- Border: `4px solid` School blue
- Object Fit: Cover

**Column 2 — Message:**
- Quote Icon: 48px, school blue light, top-left
- Message Text:
  - Font: Body large (18px), line-height 1.7
  - Color: Text primary
  - Paragraphs: Margin bottom `20px`
  - Key Highlights: Semibold inline (not full bold)
  - Length: ~300-400 words (from school profile data)
- Signature:
  - Margin Top: `32px`
  - Border Top: `2px solid` Amber
  - Padding Top: `16px`
  - Name: 18px, bold, text primary
  - Title: 15px, regular, text secondary
    - "Director, Central Academy Anta"

**Key Themes Section (Below Message):**
- Heading: H3, "Key Priorities"
- List: 4-5 theme cards
- Layout: Grid 2 columns (desktop), 1 column (mobile)
- Gap: `16px`

**Theme Card:**
- Background: School blue light
- Border Left: `4px solid` School blue
- Padding: `16px 20px`
- Icon: 32px, school blue (left side)
- Title: 16px, semibold, text primary
- Description: 14px, regular, text secondary

**Example Themes (from school profile):**
- "Growth Beyond Grades" — Icon: TrendingUp
- "Hard Work & Perseverance" — Icon: Award
- "Setting High Goals" — Icon: Target
- "Community Support" — Icon: Users

---

### 4.2.2 Principal's Message (`/about/principal`)

**Layout:** Same as Director's Message with these differences:

**Principal Info:**
- Name: "Radha Meena"
- Title: "Principal, Central Academy Anta"

**Content Focus:**
- Longer message (~500 words from profile)
- Educational philosophy emphasis
- Constructivist teaching approach
- COVID-19 adaptation mention

**Highlight Boxes:**
- 3 boxes below message
- Background: Teal light `#E1F5EE`
- Border Left: `4px solid` Teal
- Padding: `20px`
- Title: 16px, semibold, teal dark
- Text: 14px, regular, text primary

**Box Topics:**
1. "Holistic Development" — Physical, social, emotional, spiritual
2. "Learning by Doing" — Constructivist approach, inquiry-based
3. "Adapting to Change" — Technology integration, virtual learning

---

### 4.2.3 Vision & Mission (`/about/vision-mission`)

**Page Layout:**
- Background: Gradient (school blue light to white, top to bottom)
- Container: Max-width `1000px`

**Hero Section:**
- Centered text
- Logo: 80px (top)
- School Name: Display (48px, bold)
- Tagline: Body large, text secondary
  - "Education is the most powerful weapon..."

**Vision Card:**
- Background: White
- Border: `2px solid` School blue
- Border Radius: `12px`
- Padding: `48px`
- Shadow: Medium
- Margin Top: `48px`

**Content:**
- Icon: Target (64px, school blue)
- Label: Overline, "Our Vision"
- Heading: H2, "Building Confident Individuals"
- Vision Statement:
  - Font: Body large (18px), line-height 1.8
  - Color: Text primary
  - Italic: Yes
  - Quote marks: Large, school blue
  - Text: (from profile)
    "To develop well-rounded, confident and responsible individuals who aspire to achieve their full potential..."

**Mission Section (Below Vision):**
- Layout: 3 columns (desktop), 1 column (mobile)
- Gap: `24px`
- Margin Top: `48px`

**Each Mission Pillar:**
- Background: School blue light
- Border Radius: `12px`
- Padding: `32px 24px`
- Icon: 48px, school blue (top)
- Title: H4, text primary
- Description: Body, text secondary

**Pillars:**
1. "Welcoming Environment" — Icon: Heart
2. "Equal Opportunities" — Icon: Scale
3. "Celebrating Achievements" — Icon: Trophy

**Motto Section (Bottom):**
- Background: School blue
- Text: White
- Padding: `32px`
- Border Radius: `12px`
- Centered text
- Quote: Display (36px), white
  - "Education is the most powerful weapon which you can use to change the world."
- Attribution: 16px, white, 80% opacity
  - "— School Motto"

---

## 4.3 Academics Page (`/academics`)

**Page Layout:**
- Standard container
- Background: White

**Hero Section:**
- Background: School blue light
- Padding: `48px 32px`
- Breadcrumb + Page Title: H1, "Academics"
- Subtitle: "Academic Calendar, Rules & Discipline"

**Content Sections (Stacked Vertically):**

### Section 1 — Academic Calendar

**Header:** H2, "Academic Calendar"

**Info Boxes:**
- Layout: 2 columns (desktop), 1 column (mobile)
- Gap: `16px`

**Box Style:**
- Background: White
- Border: `1px solid #E2E0DB`
- Border Left: `4px solid` School blue
- Padding: `20px`
- Icon: 32px (left), school blue

**Boxes:**
1. "Scholastic Year" — Icon: Calendar
   - "1st April to 31st March"
2. "National Days" — Icon: Flag
   - "Aug 15 (Independence), Jan 26 (Republic)"
3. "School Timing" — Icon: Clock
   - "Arrival: 5 minutes before first bell"

---

### Section 2 — School Rules

**Header:** H2, "General Rules & Regulations"

**Rules List:**
- Style: Numbered list
- Font: Body (16px), line-height 1.8
- Number Style: School blue circle with white text
- Gap: `16px` between items

**Sample Rules (from profile):**
1. "Full school uniform is strictly compulsory at all times..."
2. "Students must not bring valuables (gold chains, electronics)..."
3. "Running, playing or shouting inside the building is not allowed..."
4. (Continue for all 12+ rules from profile)

**Highlight Box (After Rules):**
- Background: Amber light
- Border: `2px solid` Amber
- Padding: `24px`
- Icon: AlertCircle (32px, amber)
- Title: H4, "Important Note"
- Text: "School authorities are not responsible for theft or loss of student property..."

---

### Section 3 — Leave & Absence Policy

**Header:** H2, "Leave & Absence Policy"

**Policy Cards:**
- Layout: Stack
- Gap: `12px`

**Card Style:**
- Background: School blue light
- Border Radius: `8px`
- Padding: `16px 20px`
- Icon: Small (20px), school blue (left inline)

**Cards:**
1. "Leave Notes Required" — "No student may be late or absent without prior leave note..."
2. "Medical Certificate" — "Required after infectious/contagious disease..."
3. "Dismissal Policy" — "Repeated absence without leave for more than 10 consecutive days..."

---

### Section 4 — Discipline

**Header:** H2, "Discipline"

**Quote Block:**
- Background: White
- Border: `4px solid` School blue (left only)
- Padding: `24px 32px`
- Shadow: Subtle
- Quote: Body large (18px), italic
  - "Discipline is the backbone of character. The school trains students from early years..."
- Attribution: 14px, text secondary

---

## 4.4 Admission Pages

### 4.4.1 Admission Process (`/admission/process`)

**Page Layout:**
- Hero: Same style as Academics
- Title: "Admission Process"
- Subtitle: "Join Central Academy in 3 Simple Steps"

**3-Step Timeline:**
- Layout: Vertical timeline (left side line connecting steps)
- Line: `4px wide`, school blue, dotted

**Each Step:**
- Number Badge (Left):
  - Size: `64px × 64px` circle
  - Background: School blue
  - Text: Display (32px), white
  - Number: 1, 2, 3
- Content (Right):
  - Title: H3, school blue
    - "Step 1: Registration & Application"
  - Description: Body, text primary
    - Bullet list of sub-steps
  - Icon Grid: 3-4 icons representing sub-actions
    - Example: Document, Form, Rupee (for fee)
  - Gap Between Steps: `48px`

**Steps Content:**

**Step 1 — Registration:**
- "Visit school office or apply online"
- "Submit registration form"
- "Pay registration fee"

**Step 2 — Assessment:**
- "Entrance test/assessment (grade-dependent)"
- "Interview with child and/or parents"
- "Selection based on merit and availability"

**Step 3 — Enrollment:**
- "Receive admission offer"
- "Pay admission and tuition fees"
- "Submit required documents"
- "Attend orientation program"

**CTA Section (Bottom):**
- Background: School blue light
- Padding: `48px`
- Centered
- Heading: H3, "Ready to Apply?"
- Button: Primary large, "Start Online Application"
  - Links to `/admission/apply`

---

### 4.4.2 Admission Rules (`/admission/rules`)

**Layout:** Similar to Academics page structure

**Sections:**

### Documents Required

**Header:** H2, "Documents Required for Admission"

**Document Cards:**
- Grid: 2 columns (desktop), 1 (mobile)
- Gap: `16px`

**Card:**
- Background: White
- Border: `1px solid #E2E0DB`
- Padding: `20px`
- Checkbox Icon: 24px, teal (left)
- Title: 16px, semibold, text primary
- Description: 14px, text secondary

**Documents (from profile):**
1. "Birth Certificate" — Original + photocopy
2. "Proof of Residence" — Original + photocopy
3. "Transfer Certificate" — From previous school (if applicable)
4. "Report Card" — Final term of previous class
5. "Aadhar Card" — Photocopy
6. "Photographs" — 2 passport-size

---

### Registration Information

**Header:** H2, "Registration Information"

**Info Grid:**
- 3 columns (desktop), 1 column (mobile)

**Info Card:**
- Background: School blue light
- Border Radius: `8px`
- Padding: `24px`
- Icon: 40px, school blue
- Title: H4, text primary
- Text: Body, text secondary

**Cards:**
1. "Forms Available" — Icon: Calendar
   - "From 1st January onwards"
2. "Pre-School Age" — Icon: User
   - "Child must be 3 years old by 31st March"
3. "Pre-Primary Age" — Icon: Users
   - "Child must be 4 years old by 31st March"

---

### Fee Rules

**Header:** H2, "Fee Payment Rules"

**Rules List:**
- Numbered, same style as Academics rules
- Highlight critical rules (payment deadline, non-refundable) in amber card

---

### 4.4.3 Online Admission Form (`/admission/apply`)

**Multi-Step Form:**
- Steps: 4 total
- Progress Indicator: Top of form

**Progress Bar:**
- Background: Neutral tertiary
- Height: `6px`
- Border Radius: `full`
- Active Fill: School blue (progresses left-to-right)
- Labels: Below bar
  - "Basic Info", "Documents", "Payment", "Confirmation"

---

**Step 1 — Student Details:**

**Fields:**
- Student Name (Full): Text input
- Date of Birth: Date picker
- Gender: Radio buttons (Male, Female, Other)
- Class Applying For: Dropdown (Nursery to XII)
- Previous School: Text input (optional, show if class > Nursery)
- Aadhar Number: Text input (12 digits, validation)

**Parent/Guardian Details:**
- Father Name, Mother Name: Text inputs
- Guardian (if different): Text input (optional)
- Contact Number: Text input (10 digits, validation)
- Email: Email input (validation)
- Address: Textarea
- Pin Code: Text input (6 digits)

**Action Buttons:**
- Primary: "Continue to Documents"
- Secondary: "Save as Draft"

---

**Step 2 — Documents Upload:**

**Upload Areas:**
- Style: Dotted border box, school blue border (dashed)
- Height: `200px`
- Icon: Upload cloud (48px, center)
- Text: "Click to upload or drag and drop"
- Sub-text: "PDF, JPG, PNG (max 5MB)"

**Documents to Upload:**
1. Birth Certificate
2. Proof of Residence
3. Transfer Certificate (if applicable)
4. Previous Year Report Card
5. Aadhar Card (student)
6. Passport Photo

**Uploaded File Display:**
- Thumbnail or PDF icon
- File name (truncated)
- File size
- Remove button (X icon, red)

**Buttons:**
- Back: "Back to Student Details" (secondary)
- Next: "Continue to Payment" (primary, disabled until required docs uploaded)

---

**Step 3 — Payment:**

**Fee Breakdown Table:**
- Border: `1px solid #E2E0DB`
- Rows: Alternating background (white/neutral tertiary)
- Columns: Fee Type, Amount

**Example Rows:**
- Registration Fee: ₹500
- Admission Fee: ₹2,000
- First Term Fee: ₹5,000
- Total: ₹7,500 (bold, school blue)

**Payment Options:**
- Radio buttons:
  - "Pay at School Office" — Instructions displayed
  - "Pay Online (Razorpay)" — Opens Razorpay modal

**Razorpay Integration:**
- Button: Primary large, "Pay ₹7,500 Online"
- On Click: Razorpay checkout modal
- On Success: Auto-proceed to confirmation

**Buttons:**
- Back: "Back to Documents"
- Submit: "Submit Application" (if pay at office selected)

---

**Step 4 — Confirmation:**

**Success State:**
- Icon: Large checkmark (80px, teal)
- Heading: H2, "Application Submitted Successfully"
- Application ID: Display (32px, school blue)
  - "APP-2026-001234"
- Message: Body, text secondary
  - "We have received your admission application. Our office will contact you within 2-3 working days..."

**Next Steps Card:**
- Background: School blue light
- Padding: `24px`
- Numbered list:
  1. "Check your email for application receipt"
  2. "Expect a call from our office within 3 days"
  3. "Bring original documents on interview day"

**Buttons:**
- "Download Application PDF" (secondary)
- "Return to Homepage" (primary)

---

## 4.5 Facilities Pages (10 Pages)

**Template Structure:** All 10 facility pages share this layout

**Common Layout:**

### Hero Section
- Background: Facility-specific image (full-width)
- Overlay: Dark gradient for text contrast
- Text Container:
  - Breadcrumb
  - Facility Name: H1, white
  - Tagline: Body large, white, 80% opacity
- Height: `400px` (desktop), `300px` (mobile)

### Content Section
- Container: Max-width `900px`
- Background: White
- Padding: `48px 32px`

**Layout:**
- Introduction paragraph: Body large, text primary
- Feature Grid: 2-3 columns, icons + descriptions
- Gallery: Small image grid (4-6 photos)
- Rules/Timing (if applicable): Card format

---

### 4.5.1 Library (`/facilities/library`)

**Hero:**
- Image: Library shelves, students reading
- Title: "Library"
- Tagline: "A World of Knowledge at Your Fingertips"

**Introduction:**
- "The school library has a large collection of books on all subjects, encyclopedias, magazines, newspapers, and digital media. Students are encouraged to develop reading habits..."

**Features Grid:**
- 3 columns

**Cards:**
1. "Vast Collection" — Icon: BookOpen
   - "Books on all subjects, encyclopedias, reference materials"
2. "Digital Media" — Icon: Monitor
   - "Computer access for research and digital resources"
3. "Magazines & News" — Icon: Newspaper
   - "Current affairs, educational magazines, daily newspapers"

**Library Rules Section:**
- Header: H3, "Library Rules"
- Rules: Numbered list (all 10 from profile)
- Style: Same as Academics rules list

**Sample Rules:**
1. "Library card issued at start of scholastic year"
2. "Strict silence maintained at all times"
3. "Only 1 book borrowed for max 7 days"
4. "Lost or damaged books must be replaced"
5. (Continue for all 10)

---

### 4.5.2 Computer Lab (`/facilities/computer-lab`)

**Hero:**
- Image: Students at computers
- Title: "Computer Lab"
- Tagline: "Preparing Students for the Digital Age"

**Introduction:**
- "CAS has a latest-technology-equipped computer lab to provide students with quality education in the computer era..."

**Features Grid:**
- 3 cards

**Cards:**
1. "Latest Technology" — Icon: Cpu
   - "Modern computers with updated software"
2. "Internet Access" — Icon: Wifi
   - "High-speed internet for research"
3. "Practical Learning" — Icon: Code
   - "Hands-on computer science education"

**Image Gallery:**
- 4 photos: Lab overview, students coding, teacher instructing
- Grid: 2×2

---

### 4.5.3 Classrooms (`/facilities/classrooms`)

**Hero:**
- Image: Well-furnished classroom
- Title: "Classrooms"
- Tagline: "Spacious, Modern Learning Spaces"

**Introduction:**
- "The school building is surrounded by lush green lawns and trees. Classrooms are well-furnished, airy, and spacious..."

**Features:**
1. "Airy & Spacious" — Icon: Maximize
2. "Audio-Visual Aids" — Icon: Video
3. "Modern Software" — Icon: Monitor
4. "Green Surroundings" — Icon: Trees (custom or closest match)

**Image Gallery:**
- Classroom setup, students at desks, AV equipment

---

### 4.5.4 Art Room (`/facilities/art-room`)

**Hero:**
- Image: Student artwork, painting supplies
- Title: "Art Room"
- Tagline: "Nurturing Creative Expression"

**Introduction:**
- "The Art Room trains students in drawing, painting, clay modeling, and craft work. Focus on art appreciation, observation, problem-solving..."

**Features:**
1. "Drawing & Painting" — Icon: Palette
2. "Clay Modeling" — Icon: Shapes (or hand icon)
3. "Craft Work" — Icon: Scissors
4. "Career Foundation" — Icon: Award

**Student Work Gallery:**
- 6 photos: Paintings, sculptures, crafts
- Grid: 3×2

---

### 4.5.5 Sports Playground (`/facilities/sports`)

**Hero:**
- Image: Students playing cricket/football
- Title: "Sports & Playground"
- Tagline: "Building Champions Since Day One"

**Introduction:**
- "Sports Club plays a pivotal role in organizing events. Students learn discipline, responsibility, team spirit..."

**Sports Offered:**
- Grid: 5 cards (1 per sport)
- Icon + Sport Name

**Cards:**
1. Cricket — Icon: Medal (or closest)
2. Football — Icon: Activity
3. Badminton — Icon: Award
4. Kho-Kho — Icon: Users
5. Kabaddi — Icon: Users

**Achievements Banner:**
- Background: Teal light
- Border: `4px solid` Teal (left)
- Padding: `24px`
- Icon: Trophy (48px, teal)
- Text: "State-Level Tournament Winners"
- Description: "Our students have won state-level competitions in multiple sports..."

---

### 4.5.6 Seminar Hall (`/facilities/seminar-hall`)

**Note:** New content page (not in old PHP site)

**Hero:**
- Image: Empty seminar hall or event photo
- Title: "Seminar Hall"
- Tagline: "Where Ideas Meet Innovation"

**Introduction:**
- "The school's seminar hall is equipped with modern audio-visual facilities, providing a professional setting for academic seminars, guest lectures, and student presentations..." (AI-generated, review with school)

**Features:**
1. "Seating Capacity" — Icon: Users
   - "Accommodates 150 students"
2. "AV Equipment" — Icon: Projector
   - "Projector, sound system, microphones"
3. "Air Conditioned" — Icon: Wind
   - "Comfortable environment for events"

**Upcoming Events:**
- Small list: Recent/upcoming seminars
- Each: Date, title, speaker (if applicable)

---

### 4.5.7 Auditorium (`/facilities/auditorium`)

**Note:** New content page

**Hero:**
- Image: Auditorium stage, annual function
- Title: "Auditorium"
- Tagline: "Stage for Talent and Celebration"

**Introduction:**
- "Our auditorium serves as the heart of cultural activities, hosting annual functions, prize distributions, and student performances..." (AI-generated)

**Features:**
1. "Large Stage" — Icon: Award
   - "Professional stage with lighting"
2. "Seating" — Icon: Armchair
   - "400+ capacity with tiered seating"
3. "Events" — Icon: Calendar
   - "Annual day, cultural programs, award ceremonies"

---

### 4.5.8 Canteen (`/facilities/canteen`)

**Note:** New content page

**Hero:**
- Image: Canteen area, students eating
- Title: "School Canteen"
- Tagline: "Nutritious Meals in a Clean Environment"

**Introduction:**
- "The school canteen provides hygienic, nutritious meals and snacks for students during break time..." (AI-generated)

**Features:**
1. "Hygienic Kitchen" — Icon: ChefHat
   - "Regularly inspected, clean facilities"
2. "Nutritious Menu" — Icon: Apple
   - "Balanced meals, fresh ingredients"
3. "Timings" — Icon: Clock
   - "Open during all breaks"

**Menu Sample:**
- Small card with 5-6 popular items
- Pricing (if available)

---

### 4.5.9 Laboratories (`/facilities/laboratories`)

**Note:** New content page

**Hero:**
- Image: Science lab, students with equipment
- Title: "Science Laboratories"
- Tagline: "Hands-On Learning in Action"

**Introduction:**
- "Our science labs are equipped with modern apparatus for Physics, Chemistry, and Biology practical sessions..." (AI-generated)

**Labs Grid:**
- 3 cards (one per lab)

**Cards:**
1. "Physics Lab" — Icon: Zap
   - Equipment: Oscilloscopes, mechanics kits, etc.
2. "Chemistry Lab" — Icon: Flask
   - Equipment: Glassware, reagents, fume hoods
3. "Biology Lab" — Icon: Microscope
   - Equipment: Microscopes, specimens, models

**Safety Section:**
- Header: "Safety First"
- Icon: Shield
- Text: "All students wear safety equipment and follow lab protocols..."

---

### 4.5.10 Traditions (`/traditions`)

**Note:** Currently "No Record Found" on old site — new content needed

**Hero:**
- Image: School assembly, flag hoisting, cultural event
- Title: "Our Traditions"
- Tagline: "30 Years of Legacy and Values"

**Introduction:**
- "Central Academy's traditions shape our students' character. From daily assemblies to annual celebrations, we honor practices that instill discipline, respect, and community spirit..." (AI-generated, review with school)

**Traditions List:**
- Style: Timeline or card grid

**Sample Traditions (to confirm with school):**
1. "Morning Assembly" — Icon: Sun
   - Daily prayer, national anthem, thought of the day
2. "National Days" — Icon: Flag
   - Independence Day, Republic Day celebrations
3. "Annual Sports Day" — Icon: Medal
   - Inter-house competitions, march past
4. "Annual Function" — Icon: Award
   - Cultural programs, prize distribution
5. "Founder's Day" — Icon: Calendar
   - Celebrating school establishment (if applicable)

---

## 4.6 Dynamic Public Pages

### 4.6.1 Notice Board (`/notices`)

**Page Layout:**
- Hero: Minimal (just breadcrumb + title, no image)
- Title: H1, "Notice Board"
- Subtitle: "Stay Updated with Latest School News"

**Filter Bar (Top):**
- Background: Neutral tertiary
- Padding: `16px 20px`
- Border Radius: `8px`
- Layout: Horizontal flex

**Filters:**
- Language Toggle: Pill toggle (English | हिंदी)
- Category Dropdown: "All", "Academic", "Events", "Examinations", "General"
- Search Box: Text input with search icon
  - Placeholder: "Search notices..."
  - Width: `300px` (desktop), full (mobile)

**Notice Grid:**
- Layout: Single column (full width)
- Gap: `16px`
- Shows: 10 notices per page

**Notice Card:**
- Background: White
- Border: `1px solid #E2E0DB`
- Border Left: `4px solid` (color varies by category)
  - Academic: School Blue
  - Events: Purple
  - Examinations: Coral
  - General: Neutral
- Border Radius: `8px`
- Padding: `20px 24px`
- Hover: Subtle lift

**Card Header (Top):**
- Flex: Space between
- Left: Date badge
  - Background: Amber light
  - Text: "3 days ago" (13px, amber dark)
  - Icon: Clock (16px)
  - Padding: `4px 12px`
  - Border Radius: `full`
- Right: Category badge
  - Small badge (refer to badge component)
  - Color varies by category

**Card Body:**
- Title:
  - Font: 20px, semibold
  - Color: Text primary
  - Margin: `12px 0`
  - Clickable: Yes (expands notice or navigates to detail page)
- Content Preview:
  - Font: 15px, regular
  - Color: Text secondary
  - Lines: Max 3, ellipsis overflow
  - Language: Based on toggle selection

**Card Footer:**
- Margin Top: `16px`
- Border Top: `1px solid #E2E0DB`
- Padding Top: `12px`
- "Read Full Notice" link: School blue, 14px, chevron right icon

**Pinned Notices:**
- Show at very top (above regular notices)
- Visual difference:
  - Background: School blue light `#E6F1FB`
  - Border Left: `4px solid` School blue
  - Pin icon (top-right corner): 20px, school blue

**Empty State:**
- No notices in selected category
- Icon: Bell (64px, text tertiary)
- Message: "No notices in this category yet"

**Pagination:**
- Bottom of grid
- Standard pagination component (refer to component section)

---

### 4.6.2 Gallery — Album List (`/gallery`)

**Page Layout:**
- Hero: Full-width, minimal
- Title: H1, "School Gallery"
- Subtitle: "Moments from Campus Life"

**Filter Bar:**
- Category Tabs:
  - All, Sports, Cultural Events, Academics, Facilities
  - Style: Underline tabs
    - Font: 15px, medium
    - Active: School blue text, `3px` thick underline
    - Inactive: Text secondary, hover underline

**Album Grid:**
- Layout: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Gap: `20px`

**Album Card:**
- Aspect Ratio: 4:3 (cover image)
- Border Radius: `12px`
- Overflow: Hidden
- Hover: Scale `1.03`, cursor pointer

**Card Image:**
- Cover photo from album
- Overlay Gradient: `linear-gradient(transparent 50%, rgba(0,0,0,0.6))`
  - Darker at bottom for text readability

**Card Content (Overlaid on Image, Bottom):**
- Padding: `20px`
- Album Name: 18px, semibold, white
- Photo Count: 14px, white, 80% opacity
  - "24 Photos" with image icon
- Date: 14px, white, 60% opacity
  - "Dec 2025"

**Click Behavior:**
- Entire card clickable
- Navigates to `/gallery/[albumId]`

---

### 4.6.3 Gallery — Album Detail (`/gallery/[albumId]`)

**Page Layout:**
- Breadcrumb: Home > Gallery > [Album Name]
- Hero: Album name + date (no image)

**Album Info Bar:**
- Background: School blue light
- Padding: `20px 24px`
- Border Radius: `8px`
- Layout: Flex, space between

**Left:**
- Album Name: H2, text primary
- Date: Body, text secondary
- Photo Count: Body, text secondary

**Right:**
- Download All button: Secondary, icon Download

**Photo Grid:**
- Layout: Masonry OR 4 columns equal-height
- Gap: `12px`
- All images clickable (open lightbox)

**Photo Card:**
- Border Radius: `8px`
- Hover: Brightness `95%`, scale `1.02`

**Lightbox (On Image Click):**
- Overlay: `rgba(0, 0, 0, 0.95)` (very dark)
- Image: Center, max 90% viewport width/height
- Controls:
  - Close (X): Top-right, white, 32px
  - Previous/Next: Left/right arrows, white, 40px
  - Counter: Bottom center, white, 14px
    - "5 / 24"
- Keyboard: Arrow keys navigate, ESC closes

**Caption (If Available):**
- Below image in lightbox
- Font: 15px, white, 80% opacity
- Max width: `600px`, center-aligned

---

### 4.6.4 Toppers Page (`/toppers`)

**Page Layout:**
- Hero: Celebratory design
  - Background: Gradient (school blue to teal)
  - Title: H1, white, "Our Toppers"
  - Subtitle: "Celebrating Academic Excellence"
  - Icon: Trophy (80px, white, 40% opacity, decorative background)

**Filter Bar:**
- Session Dropdown: "2025-2026", "2024-2025", etc.
- Class Dropdown: "Class X", "Class XII"
- Apply Button: Primary, "Show Results"

**Toppers Grid:**
- Layout: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Gap: `24px`

**Topper Card:**
- Background: White
- Border: `2px solid` Amber
- Border Radius: `12px`
- Padding: `28px`
- Text Align: Center
- Shadow: Medium

**Card Content:**
- Badge (Top):
  - "Class X Topper" OR "Class XII Topper"
  - Background: Amber light, text amber dark
  - Margin Bottom: `16px`
- Photo:
  - Size: `140px × 140px` circular
  - Border: `5px solid` School blue
  - Margin Bottom: `16px`
- Name: 20px, bold, text primary
- Percentage: Display (48px, bold), school blue
  - "98.5%"
- Subject Breakdown:
  - Margin Top: `20px`
  - Border Top: `1px solid #E2E0DB`
  - Padding Top: `16px`
  - Grid: 2 columns
  - Each Subject:
    - Subject name: 13px, medium, text secondary
    - Marks: 15px, semibold, text primary
    - Gap: `8px`
- View Result PDF:
  - Link: School blue, 14px
  - Icon: Download
  - Margin Top: `16px`

**Empty State:**
- If no toppers for selected session/class
- Icon: Award (64px)
- Message: "No toppers data available for this session"

---

### 4.6.5 CAS Team / Staff Page (`/team`)

**Page Layout:**
- Hero:
  - Background: School blue light
  - Title: H1, "CAS Team"
  - Subtitle: "37 Dedicated Educators"
  - Icon: Users (64px, decorative)

**Staff Grid:**
- Layout: 4 columns (desktop), 3 (tablet), 2 (mobile)
- Gap: `20px`

**Staff Card:**
- Background: White
- Border: `1px solid #E2E0DB`
- Border Radius: `12px`
- Padding: `20px`
- Hover: Lift effect
- Text Align: Center

**Card Content:**
- Photo:
  - Size: `120px × 120px` circular
  - Border: `4px solid` School blue light
  - Object Fit: Cover
  - Margin Bottom: `16px`
- Name: 16px, semibold, text primary
- Designation: 14px, medium, school blue
  - "Teacher" OR "TGT" (as per data)
- Subject (If Available):
  - 13px, regular, text secondary
  - Margin Top: `4px`

**Special Cards (Principal, Director — If Displayed Here):**
- Border: `2px solid` School blue
- Badge: "Principal" or "Director" (amber badge, top-left corner)

**Sort/Filter (Optional):**
- Dropdown: "All", "Teaching Staff", "Admin Staff"
- Search: By name

---

### 4.6.6 Events Page (`/events`)

**Page Layout:**
- Hero: Standard
- Title: "School Events"
- Subtitle: "Upcoming and Recent School Activities"

**Tab Navigation:**
- Tabs: "Upcoming", "Past Events"
- Style: Underline tabs (refer to gallery category tabs)

**Event Grid (Both Tabs):**
- Layout: 2 columns (desktop), 1 column (mobile)
- Gap: `20px`

**Event Card:**
- Background: White
- Border: `1px solid #E2E0DB`
- Border Left: `4px solid` (color varies by event type)
  - Academic: School blue
  - Sports: Green
  - Cultural: Purple
  - General: Neutral
- Border Radius: `8px`
- Padding: `20px 24px`

**Card Content:**
- Date Badge (Top):
  - Large date display
    - Day: Display (36px, bold), school blue
    - Month: 14px, uppercase, text secondary
    - Year: 13px, text tertiary
  - Background: School blue light
  - Padding: `12px`
  - Border Radius: `8px`
  - Float: Left (text wraps around)
- Title: 20px, semibold, text primary
- Time: 14px, text secondary, icon Clock
- Location: 14px, text secondary, icon MapPin
- Description:
  - Font: 15px, regular, text secondary
  - Lines: Max 3, ellipsis
- Photo (If Available):
  - Margin Top: `16px`
  - Height: `200px`
  - Border Radius: `8px`
  - Object Fit: Cover

**Upcoming Events:**
- Sort: Chronological (soonest first)
- Badge: "Tomorrow", "In 3 days", "Next week"

**Past Events:**
- Sort: Reverse chronological (most recent first)
- Faded style: Opacity `0.8`

---

### 4.6.7 School Calendar (`/calendar`)

**Page Layout:**
- Hero: Minimal
- Title: "School Calendar"
- Subtitle: "Academic Year 2025-2026"

**Calendar View:**
- Library: FullCalendar React
- Default View: Month view
- Switch: Week view, Day view (buttons top-right)

**Event Types (Color-Coded):**
- Exams: Coral
- Holidays: Green
- Sports: Teal
- Cultural: Purple
- Meetings: School blue
- Other: Neutral

**Legend:**
- Top-right of calendar
- Small color boxes + labels
- Font: 13px

**Event Popup (On Date Click):**
- Modal (small)
- Event title, time, description
- Close button

**Download Options:**
- iCal Export: Button, "Add to Calendar"
- PDF Download: Button, "Download Calendar PDF"

**Mobile View:**
- Default: List view (easier than month grid on small screens)
- Group by month
- Each event: Card format (minimal)

---

### 4.6.8 Downloads Page (`/downloads`)

**Page Layout:**
- Hero: Standard
- Title: "Downloads"
- Subtitle: "Forms, Results, Brochures & More"

**Category Tabs:**
- All, Results, Forms, Brochures, Circulars
- Style: Underline tabs

**Downloads List:**
- Layout: Single column (full width)
- Gap: `12px`

**Download Card:**
- Background: White
- Border: `1px solid #E2E0DB`
- Border Radius: `8px`
- Padding: `16px 20px`
- Hover: School blue light background

**Card Layout:**
- Flex: Space between

**Left:**
- Icon: File type icon (48px)
  - PDF: FileText icon, coral
  - Excel: FileSpreadsheet, green
  - Word: FileDocument, school blue
  - ZIP: Archive, purple
- Content:
  - Title: 16px, semibold, text primary
  - Description: 14px, text secondary
  - File Size: 13px, text tertiary
    - "2.4 MB"
  - Upload Date: 13px, text tertiary
    - "Uploaded 5 days ago"

**Right:**
- Download Button: Secondary, icon Download
- View Count (Optional): 13px, text tertiary
  - "124 downloads"

**Featured Downloads (Top Section):**
- 3 featured cards (horizontal)
- Same style as list but:
  - Background: School blue light
  - Border: `2px solid` School blue
  - "Featured" badge (amber)

---

### 4.6.9 TC Verification (`/tc-verify`)

**CRITICAL PAGE — Already in Active Use**

**Page Layout:**
- Hero: Professional, trustworthy design
  - Background: School blue light
  - Title: H1, "TC Verification"
  - Subtitle: "Verify Transfer Certificate Authenticity"
  - Icon: ShieldCheck (64px, teal)

**Info Banner (Top):**
- Background: Teal light
- Border Left: `4px solid` Teal
- Padding: `20px 24px`
- Icon: Info (24px, teal)
- Text: "This portal allows parents and schools to verify the authenticity of Transfer Certificates issued by Central Academy Anta."

**Search Form:**
- Container: White card, centered, max-width `600px`
- Padding: `32px`
- Border: `1px solid #E2E0DB`
- Border Radius: `12px`
- Shadow: Medium

**Form Fields:**
- Student Name: Text input (required)
- Roll Number: Text input (required)
- Year of Passing: Dropdown (2020-2026) (required)
- Captcha: Simple math captcha OR Google reCAPTCHA
  - Example: "What is 7 + 5?" (prevents spam)

**Submit Button:**
- Primary large, full width
- "Verify Transfer Certificate"
- Loading state: Spinner replaces text

**Result Display (On Submit):**

**If Found:**
- Container: Teal light background
- Border: `2px solid` Teal
- Border Radius: `12px`
- Padding: `28px`
- Icon: CheckCircle (64px, teal, center)

**Result Data (Table):**
- Rows:
  - Student Name
  - Father's Name
  - Mother's Name
  - Roll Number
  - Class
  - Year of Passing
  - TC Number
  - Date of Issue
- Style: Clean table, alternating row backgrounds

**Verification Badge:**
- Background: Teal
- Text: White
- Padding: `8px 16px`
- Border Radius: `full`
- Font: 14px, bold
- Text: "✓ Verified TC Record"

**If NOT Found:**
- Container: Coral light background
- Border: `2px solid` Coral
- Icon: AlertCircle (64px, coral, center)
- Message: "No TC record found matching the provided details. Please verify the information and try again. If the issue persists, contact the school office."

**Contact Info (Below Form):**
- Text: "For assistance, contact: +91-7737689684"
- Link: Clickable phone number
- Email: "centralacademyanta@gmail.com"

**Security Note:**
- Small text (bottom of page)
- "TC verification data is updated regularly. For immediate verification, please contact the school office during working hours."

---

### 4.6.10 Contact Page (`/contact`)

**Page Layout:**
- Hero: None (direct to content)
- Title: H1, "Contact Us"
- Subtitle: "We're Here to Help"

**Layout:**
- 2 columns (desktop), stacked (mobile)
- Gap: `48px`

---

**Column 1 — Contact Information:**

**Contact Cards:**
- Style: Stack of cards
- Gap: `16px`

**Card:**
- Background: White
- Border: `1px solid #E2E0DB`
- Border Left: `4px solid` School blue
- Padding: `20px 24px`
- Icon: 32px, school blue (left)
- Content (right):
  - Title: 16px, semibold, text primary
  - Text: 15px, regular, text secondary

**Cards:**
1. Address:
   - Icon: MapPin
   - Title: "Visit Us"
   - Text: "Near Sahkari Petrol Pump, Kota Road, Anta, Baran, Rajasthan — 325202"
2. Phone:
   - Icon: Phone
   - Title: "Call Us"
   - Text: "+91-7737689684" (clickable tel: link)
   - Sub-text: "Mon–Sat: 8:00 AM – 4:00 PM"
3. Email:
   - Icon: Mail
   - Title: "Email Us"
   - Text: "centralacademyanta@gmail.com" (clickable mailto: link)
4. Office Hours:
   - Icon: Clock
   - Title: "Office Hours"
   - Text: "Monday to Saturday, 8:00 AM to 4:00 PM"
   - Sub-text: "Closed on Sundays and Public Holidays"

**Map:**
- Below contact cards
- Embedded Google Maps iframe
- Height: `400px`
- Border Radius: `12px`
- Marker: School pin (25.153025°N, 76.284592°E)

---

**Column 2 — Contact Form:**

**Form Container:**
- Background: School blue light
- Padding: `32px`
- Border Radius: `12px`
- Shadow: Subtle

**Form Title:**
- H3, "Send Us a Message"
- Margin Bottom: `24px`

**Form Fields:**
- Your Name: Text input (required)
- Email: Email input (required, validation)
- Phone: Text input (optional, 10 digits)
- Subject: Dropdown
  - Options: "General Inquiry", "Admission", "Feedback", "Complaint", "Other"
- Message: Textarea (required, min 20 chars)
  - Placeholder: "Write your message here..."
  - Height: `150px`

**Submit Button:**
- Primary, full width
- "Send Message"
- Loading state: Spinner

**Success/Error Alerts:**
- Alert component (refer to shared components)
- Success: "Your message has been sent. We'll respond within 24-48 hours."
- Error: "Failed to send message. Please try again or call us directly."

**Privacy Note:**
- Small text (below form)
- "We respect your privacy. Your information will only be used to respond to your inquiry."

---

# 5. Responsive Behavior Rules

## 5.1 Breakpoints

**Tailwind Default Breakpoints (Used Consistently):**
```
sm:  640px   — Small tablets, large phones
md:  768px   — Tablets
lg:  1024px  — Small laptops, landscape tablets
xl:  1280px  — Laptops, desktops
2xl: 1536px  — Large desktops
```

**Mobile-First Approach:**
- Base styles apply to mobile (`< 640px`)
- Use `md:`, `lg:` prefixes to enhance for larger screens
- Never assume desktop as default

---

## 5.2 Layout Shifts

**Grid Columns:**
- 4 columns (desktop) → 3 (tablet) → 2 (large mobile) → 1 (small mobile)
- Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` pattern

**Container Padding:**
- Mobile: `px-4` (16px)
- Tablet: `px-8` (32px)
- Desktop: `px-16` (64px)

**Section Spacing:**
- Mobile: `py-8` (32px)
- Tablet: `py-10` (40px)
- Desktop: `py-12` (48px)

---

## 5.3 Typography Scaling

**Headings:**
- Display: 48px → 36px (tablet) → 28px (mobile)
- H1: 36px → 28px → 24px
- H2: 28px → 24px → 20px
- Body: 16px (same across all breakpoints, never smaller)

**Line Height:**
- Desktop headings: `1.2`
- Mobile headings: `1.3` (slightly more breathing room)
- Body: `1.6` (same across all)

---

## 5.4 Navigation Behavior

**Desktop:**
- Horizontal nav links
- Dropdowns appear on hover
- Sticky header with shadow on scroll

**Mobile:**
- Hamburger menu icon
- Slide-out drawer (full-height, 80% width)
- No dropdowns — all links visible in drawer

---

## 5.5 Image Handling

**Hero Images:**
- Desktop: High-res (1920×1080), `object-fit: cover`
- Mobile: Lower-res (800×600), cropped to focus on subject

**Gallery:**
- Desktop: 4 columns
- Tablet: 3 columns
- Mobile: 2 columns (never 1 — feels empty)

**Staff Photos:**
- Desktop: 4 per row
- Tablet: 3 per row
- Mobile: 2 per row

---

## 5.6 Touch Targets

**Minimum Size:** `44px × 44px` (Apple/WCAG guideline)

**Buttons:**
- Small buttons on desktop: `36px` height
- All buttons on mobile: `44px` minimum height
- Increase padding on mobile if needed

**Links:**
- Desktop: Hover underline
- Mobile: Increase tap area with padding
  - `py-2` (8px vertical padding for comfortable tap)

**Form Inputs:**
- Desktop: `40px` height
- Mobile: `44px` height

---

## 5.7 Tables

**Desktop:**
- Full table display, scrollable if wide

**Mobile:**
- Convert to card layout (stack rows vertically)
- Each row becomes a card
- Labels inline with values

**Example (Topper subject breakdown):**
- Desktop: 2-column grid
- Mobile: Full-width list, each subject on its own row

---

## 5.8 Modals

**Desktop:**
- Centered, max-width `600px`
- Overlay backdrop

**Mobile:**
- Full-screen OR bottom sheet (slide up from bottom)
- No side padding (uses full width)
- Close button: Top-right or top-left (consistent)

---

## 5.9 Forms

**Desktop:**
- Multi-column layouts where logical (e.g., First Name | Last Name)

**Mobile:**
- All inputs full-width
- Stack vertically
- Large tap targets for checkboxes/radios

---

## 5.10 Cards

**Desktop:**
- Hover effects (lift, shadow, border color change)

**Mobile:**
- No hover (touch devices)
- Active state on tap (quick visual feedback)
- Entire card tappable area clearly indicated

---

# 6. Interaction & Animation Guidelines

## 6.1 Animation Philosophy

**Principles:**
- **Subtle, not distracting** — Animations enhance UX, not showcased for their own sake
- **Fast, not slow** — 150-300ms typical, never > 500ms
- **Purposeful** — Every animation communicates state change or guides attention

**Do NOT Animate:**
- On initial page load (hero sections fade-in = amateur)
- Continuously (looping animations = distracting)
- When user prefers reduced motion (`prefers-reduced-motion: reduce`)

---

## 6.2 Transition Timings

**Standard Durations:**
```
Fast:     150ms  — Color changes, opacity
Default:  200ms  — Most transitions, hover states
Medium:   300ms  — Slide-ins, dropdowns
Slow:     400ms  — Modals, large movements
```

**Easing Functions:**
- `ease-in-out` — Default (smooth start and end)
- `ease-out` — Entrances (quick start, slow end)
- `ease-in` — Exits (slow start, quick end)
- `linear` — Progress indicators, loaders only

---

## 6.3 Hover States

**Buttons:**
- Background color change (200ms)
- Shadow increase (subtle lift, 200ms)
- Optional: `translateY(-1px)` (very subtle)

**Links:**
- Underline slide-in (150ms)
- Color change (150ms)

**Cards:**
- Border color change (200ms)
- Shadow lift (200ms)
- Scale `1.02` OR `translateY(-4px)` (NOT both)

**Images:**
- Brightness `95%` (darken slightly, 300ms)
- Scale `1.05` (zoom, 300ms)

---

## 6.4 Active/Pressed States

**Buttons:**
- Scale `0.98` (shrink slightly)
- Shadow reduce (flatten)
- Background darken
- Duration: `100ms` (instant feedback)

**Links:**
- Opacity `0.8`
- Duration: `100ms`

**Cards:**
- Remove hover effects
- Brief opacity pulse

---

## 6.5 Focus States (Keyboard Navigation)

**Critical for Accessibility:**

**All Interactive Elements:**
- Outline: None (remove default browser outline)
- Custom Focus Ring:
  - `box-shadow: 0 0 0 3px rgba(27, 79, 138, 0.2)` (school blue, 20% opacity)
  - Border Radius: Match element
- Visible indicator: ALWAYS
- Duration: Instant (0ms)

**Tab Order:**
- Logical flow (top-to-bottom, left-to-right)
- Skip links: "Skip to main content" (hidden visually, visible on focus)

---

## 6.6 Loading States

**Skeleton Loaders:**
- Shimmer animation: `1.5s linear infinite`
- Gradient sweep: Left to right
- Smooth loop (no jarring restart)

**Spinners:**
- Rotation: `0.8s linear infinite`
- No pause between loops

**Button Loading:**
- Text fades out: `200ms`
- Spinner fades in: `200ms`
- Button width: Maintain (no layout shift)

---

## 6.7 Page Transitions

**Navigation:**
- No full-page transitions (slow, annoying)
- Instant content swap
- Scroll to top: `smooth` behavior

**Modal Enter:**
- Backdrop: Fade in `200ms`
- Modal: Fade + scale from `95%` to `100%`, `200ms ease-out`

**Modal Exit:**
- Backdrop: Fade out `150ms`
- Modal: Fade + scale to `95%`, `150ms ease-in`

---

## 6.8 Scroll Animations

**Sticky Header:**
- Shadow appears: When scrolled > 80px from top
- Shadow fade-in: `200ms ease-out`

**Scroll to Top Button:**
- Appears: When scrolled > 400px from top
- Fade + slide-in from bottom-right: `300ms ease-out`

**Lazy Load Images:**
- Fade in when entering viewport: `400ms ease-out`
- No skeleton (just empty space, then fade-in)

**Infinite Scroll (If Used):**
- Auto-load next page when 200px from bottom
- Loading spinner at bottom
- No "jump" — smooth append

---

## 6.9 Form Interactions

**Input Focus:**
- Border color change: `200ms`
- Focus ring appear: Instant
- Placeholder fade out: `150ms`

**Input Validation:**
- Error state: `200ms` transition to red border
- Error message: Slide down `200ms ease-out`
- Success checkmark: Fade + scale in `300ms ease-out`

**Dropdown Open:**
- Fade + slide down `8px`, `200ms ease-out`
- Max height expand (NOT height — causes reflow)

---

## 6.10 Micro-Interactions

**Checkbox Check:**
- Checkmark draw-in animation: `200ms ease-out`
- Background fill: `150ms`

**Radio Select:**
- Inner dot scale-in: `200ms ease-out`
- Border color change: `150ms`

**Toggle Switch:**
- Slider slide: `200ms ease-in-out`
- Background color change: `200ms`

**Badge Appear:**
- Scale from `0.9` to `1`, `150ms ease-out`
- Fade in: `150ms`

---

## 6.11 Accessibility — Reduced Motion

**Respect User Preference:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Alternative to Animations:**
- Instead of slide-in: Instant appear
- Instead of fade: Instant show/hide
- Instead of scale: No scale

**Always Provide:**
- Some visual change (color, opacity)
- Never rely solely on animation to convey state

---

## 6.12 Performance Considerations

**Use `transform` and `opacity` Only:**
- GPU-accelerated properties
- No layout recalculation
- Smooth 60fps

**Avoid Animating:**
- `width`, `height` — causes reflow
- `top`, `left` — use `transform: translate()` instead
- `margin`, `padding` — causes reflow

**Example (Correct):**
```css
/* Slide card up on hover */
.card:hover {
  transform: translateY(-4px); /* Good — GPU accelerated */
  /* NOT margin-top: -4px; — causes reflow */
}
```
