---
name: School Management Admin Design System
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd8e5'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#f0ecf9'
  surface-container-high: '#eae6f4'
  surface-container-highest: '#e4e1ee'
  on-surface: '#1b1b24'
  on-surface-variant: '#464555'
  inverse-surface: '#302f39'
  inverse-on-surface: '#f3effc'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#575e70'
  on-secondary: '#ffffff'
  secondary-container: '#d9dff5'
  on-secondary-container: '#5c6274'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#fcf8ff'
  on-background: '#1b1b24'
  surface-variant: '#e4e1ee'
  background-main: '#F9FAFB'
  surface-card: '#FFFFFF'
  sidebar-bg: '#111827'
  sidebar-active: '#1F2937'
  text-primary: '#111827'
  text-secondary: '#6B7280'
  border-subtle: '#E5E7EB'
  status-success: '#22C55E'
  status-danger: '#EF4444'
  status-warning: '#F59E0B'
typography:
  heading:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.75rem
  subheading:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
  body:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.025em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  page-padding: 1.5rem
  card-padding: 1rem
  section-gap: 1rem
  grid-gap: 1.5rem
  sidebar-width: 260px
  topbar-height: 64px
  container-max: 80rem
---

## `design.md` — Full UI Specification (Admin Dashboard)

```md
# School Management Admin Dashboard — UI System (Production Spec)

## 0. Objective
Design a complete, production-ready admin dashboard UI for a school management platform.  
This spec is final-use: no placeholders, no missing states, fully responsive, scalable, and component-driven.

---

## 1. Design System

### 1.1 Visual Style
- Style: Minimal, clean, professional (Linear + Stripe hybrid)
- Density: Medium (not cramped, not spacious)
- Radius: `rounded-xl` (cards), `rounded-lg` (inputs)
- Shadows: soft (shadow-sm / shadow-md only)
- Borders: subtle (`border-gray-200`)

---

### 1.2 Colors (Tailwind tokens)
- Background: `bg-gray-50`
- Surface: `bg-white`
- Primary: `bg-indigo-600`
- Primary hover: `bg-indigo-700`
- Text primary: `text-gray-900`
- Text secondary: `text-gray-500`
- Border: `border-gray-200`
- Danger: `bg-red-500`
- Success: `bg-green-500`
- Warning: `bg-yellow-500`

---

### 1.3 Typography
- Font: Inter / system-ui
- Heading: `text-lg font-semibold`
- Subheading: `text-sm font-medium`
- Body: `text-sm`
- Labels: `text-xs text-gray-500`

---

### 1.4 Spacing System
- Page padding: `p-6`
- Card padding: `p-4`
- Section gap: `gap-4`
- Grid gap: `gap-6`

---

## 2. Layout Architecture

### 2.1 Root Layout
```

[ Sidebar ] [ Main Content Area ]

```

---

### 2.2 Sidebar (Fixed)
- Width: 260px
- Background: dark (`bg-gray-900`)
- Sections:
  - Logo (top)
  - Navigation
  - Footer (user profile)

#### Navigation Items
- Dashboard
- Students
- Staff
- Notices
- Gallery
- Events
- Downloads
- Admissions

Active state:
- bg-gray-800
- left border accent (indigo)

---

### 2.3 Topbar
- Height: 64px
- Elements:
  - Search input (center-left)
  - Notifications icon
  - Profile dropdown (right)

---

### 2.4 Main Content
- Container max width: `max-w-7xl mx-auto`
- Layout:
```

Page Title
Action Bar
Content Card

```

---

## 3. Core Components

### 3.1 Data Table

#### Structure
- Header row (sticky)
- Rows (hover effect)
- Pagination footer

#### Features
- Sorting (click column)
- Search (global)
- Filters (dropdown)
- Bulk select (checkbox)
- Actions column (right aligned)

#### Columns Example (Students)
- Name
- Admission No
- Class
- Status
- Actions

---

### 3.2 Search Bar
- Full width input
- Left icon (search)
- Debounced input (UI only)

---

### 3.3 Filter Bar
- Dropdown filters
- Chips for active filters
- Reset button

---

### 3.4 Buttons
- Primary: solid indigo
- Secondary: outline
- Danger: red
- Sizes: sm / md

---

### 3.5 Modal (Form)
- Centered
- Max width: `max-w-lg`
- Overlay: dark blur

Sections:
- Title
- Form body
- Footer (Cancel / Submit)

---

### 3.6 Form Inputs
- Input
- Select
- Date picker
- File upload
- Textarea

Validation states:
- Error text
- Red border
- Disabled state

---

### 3.7 Cards
- Used for:
  - stats
  - content grouping

---

## 4. Module Screens

---

## 4.1 Students Module

### Table View
Columns:
- Name
- Admission No
- Class
- Parent
- Status
- Actions

Actions:
- View
- Edit
- Delete

Top Actions:
- Add Student button

Filters:
- Class
- Status

---

### Create/Edit Form
Fields:
- First Name
- Last Name
- Admission No
- DOB
- Gender
- Class (select)
- Parent (select)
- Status

---

---

## 4.2 Staff Module

### Table
Columns:
- Name
- Role
- Subject
- Phone
- Status

Filters:
- Role
- Subject

---

### Form
- Name
- Role
- Subject
- Phone
- Email

---

---

## 4.3 Notices Module

### Table
- Title
- Published
- Date

Toggle:
- Publish switch

---

### Form
- Title
- Content (rich textarea)
- Slug
- Publish toggle

---

---

## 4.4 Gallery Module

### View
- Grid layout (cards)
- Image preview
- Hover actions

Actions:
- Upload
- Delete

---

### Upload Form
- Title
- Image file

---

---

## 4.5 Events Module

### Table
- Title
- Date
- Status

---

### Form
- Title
- Description
- Date
- Status

---

---

## 4.6 Downloads Module

### Table
- Title
- File
- Date

---

### Form
- Title
- File upload

---

---

## 4.7 Admissions Module

### Table
- Name
- Phone
- Class
- Status

---

### Form
- Name
- Phone
- Class
- Status

---

## 5. Responsive Behavior

### Mobile (<768px)
- Sidebar → collapsible drawer
- Table → horizontal scroll
- Actions → dropdown menu
- Forms → full width

---

### Tablet
- Reduced spacing
- Sidebar icons only

---

## 6. States

### Loading
- Skeleton rows
- Spinner in buttons

### Empty
- Center message
- CTA button

### Error
- Inline alert (top of card)

---

## 7. Interactions

- Hover → row highlight
- Click row → open detail (optional)
- Modals close on:
  - ESC
  - outside click

---

## 8. Accessibility

- All inputs labeled
- Buttons keyboard accessible
- Focus rings enabled
- Contrast compliant

---

## 9. Performance

- Lazy load modules
- Paginated tables
- Avoid full re-render

---

## 10. Final Constraints

- No inline styles
- No hardcoded data
- Reusable components only
- Clean separation:
  - UI
  - state
  - logic

---

## 11. Output Expectation (for AI tools)

Generate:
- Full dashboard UI
- All modules
- Reusable components
- Mobile responsive layouts
- Production-ready JSX structure

NO placeholders. NO missing states.
```

