

## Unicare Medical, Dhaka — Homepage Build

### 1. Design System Setup
- Define CSS custom properties for brand colors (#1a73e8, #4285f4, #34a853, #f8f9fa, #1e293b)
- Import Poppins + Open Sans from Google Fonts
- Configure Tailwind with 8px spacing scale, custom colors, and 4px border-radius buttons

### 2. Global Layout
- **Sticky Header**: Blue cross logo placeholder, desktop nav links (Home, Services, About, Contact), mobile hamburger menu with slide-out drawer, WhatsApp floating icon (bottom-right)
- **Footer**: 4-column layout — clinic info, quick links, services, contact. Map placeholder (iframe-ready div). GCC certification logo placeholders. Copyright bar.

### 3. Homepage Sections (top to bottom)

**Hero Section**
- Full-width Unsplash medical image with dark overlay
- Headline: "GCC Approved Medical Center"
- Subtext with clinic description
- Two CTAs: Green "Book Appointment" + Blue "Check Report" (44px+ touch targets, hover darken)

**Services Overview**
- 6 service cards in a responsive CSS grid (3-col desktop, 2-col tablet, 1-col mobile, 32px gap)
- Each card: Lucide icon, title, description, "Learn More" link
- Box-shadow hover effect (0 4px 8px rgba(0,0,0,0.1))
- All data from mock JSON props

**Trust & Social Proof**
- Light #f8f9fa background
- 3 animated circular progress indicators (Experience, Patients, Success Rate)
- Horizontally scrolling certification logo banner
- Patient testimonial carousel (photo, name, 5-star rating, quote) — responsive, auto-scrolling

### 4. Data Architecture
- All components accept typed props from mock JSON data files
- Easy to swap with Strapi API fetches later (clear data interfaces)

### 5. Accessibility & Responsiveness
- WCAG 2.1 AA contrast on all text
- 44x44px minimum touch targets
- Fully responsive across mobile, tablet, desktop

