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

