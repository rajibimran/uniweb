# Strapi Integration Manual — Unicare Medical Frontend

This guide explains how to connect this React frontend with a **Strapi v4/v5** backend so that every piece of content (text, images, menus, sections) is managed from the Strapi admin panel.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Strapi Project Setup](#3-strapi-project-setup)
4. [Content Types to Create](#4-content-types-to-create)
5. [Field Mapping Reference](#5-field-mapping-reference)
6. [Connecting Frontend to Strapi](#6-connecting-frontend-to-strapi)
7. [How the API Layer Works](#7-how-the-api-layer-works)
8. [Image Handling](#8-image-handling)
9. [API Permissions Setup](#9-api-permissions-setup)
10. [Deployment Guide](#10-deployment-guide)
11. [Content Types — Detailed Schema](#11-content-types--detailed-schema)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Architecture Overview

```
┌──────────────────┐        REST API         ┌──────────────────┐
│                  │  ◄───────────────────►  │                  │
│   React Frontend │     /api/services       │  Strapi Backend  │
│   (Vite + React) │     /api/news-posts     │  (Node.js)       │
│                  │     /api/site-config     │                  │
└──────────────────┘                         └──────────────────┘
        │                                            │
        │  Falls back to mock data                   │  PostgreSQL / SQLite
        │  when Strapi is unavailable                │  + Media uploads
        └────────────────────────────────────────────┘
```

**Key design principle:** Every component accepts data via props with mock defaults. The API layer (`src/lib/api.ts`) fetches from Strapi and falls back to mock data if Strapi is unavailable. This means:
- The site works standalone with mock data (no Strapi needed)
- Once you connect Strapi, content is served from the CMS
- Zero frontend code changes needed — just set the environment variable

---

## 2. Prerequisites

- **Node.js** ≥ 18
- **Strapi** v4.x or v5.x (`npx create-strapi-app@latest`)
- **PostgreSQL** (recommended for production) or SQLite (for development)
- A server/VPS to host Strapi (DigitalOcean, Railway, Render, etc.)

---

## 3. Strapi Project Setup

### 3.1 Create Strapi Project

```bash
npx create-strapi-app@latest unicare-cms --quickstart
# or for PostgreSQL:
npx create-strapi-app@latest unicare-cms --dbclient=postgres
```

### 3.2 Start Strapi

```bash
cd unicare-cms
npm run develop
```

Strapi admin will be at `http://localhost:1337/admin`. Create your admin account on first visit.

### 3.3 Install Required Plugins (Optional)

```bash
# For SEO fields
npm install @strapi/plugin-seo

# For better image handling
npm install @strapi/plugin-upload
```

---

## 4. Content Types to Create

Create each of these in **Strapi Admin → Content-Type Builder**. The frontend API layer (`src/lib/api.ts`) maps to these exact API identifiers.

| # | Content Type | API ID (singular) | Type | Frontend API |
|---|---|---|---|---|
| 1 | Site Config | `site-config` | Single Type | `api.siteConfig.get()` |
| 2 | Navigation Item | `navigation` | Collection | `api.navigation.getAll()` |
| 3 | Service | `service` | Collection | `api.services.getAll()` |
| 4 | News Post | `news-post` | Collection | `api.news.getAll()` |
| 5 | Blog Article | `article` | Collection | `api.blog.getAll()` |
| 6 | Country Guideline | `country-guideline` | Collection | `api.countryGuidelines.getAll()` |
| 7 | GCC Country | `gcc-country` | Collection | `api.gccCountries.getAll()` |
| 8 | Equipment Item | `equipment-item` | Collection | `api.equipment.getAll()` |
| 9 | Fitness Criteria | `fitness-criteria` | Collection | `api.fitnessCriteria.getAll()` |
| 10 | Stat | `stat` | Collection | `api.stats.getAll()` |
| 11 | Testimonial | `testimonial` | Collection | `api.testimonials.getAll()` |
| 12 | Service Package | `service-package` | Collection | `api.servicePackages.getAll()` |
| 13 | FAQ | `faq` | Collection | `api.faqs.getAll()` |
| 14 | Certification | `certification` | Collection | `api.certifications.getAll()` |
| 15 | Footer Quick Link | `footer-quick-link` | Collection | `api.footer.getQuickLinks()` |
| 16 | Footer Service Link | `footer-service-link` | Collection | `api.footer.getServiceLinks()` |
| 17 | Gallery Image | `gallery-image` | Collection | `api.gallery.getAll()` |
| 18 | Hero Section | `hero` | Collection | `api.hero.getByPage()` |
| 19 | About Page | `about-page` | Single Type | `api.about.get()` |

---

## 5. Field Mapping Reference

### What can be changed from Strapi

| Content Area | What You Can Change | Strapi Content Type |
|---|---|---|
| **Header** | Logo, menu items, menu order, dropdown items | Site Config + Navigation |
| **Hero Sections** | Title (H1), subtitle, slider images, CTA buttons | Hero |
| **Services Section** | Service titles, descriptions, icons, images, detail pages | Service |
| **GCC Countries** | Country names, flags, display order | GCC Country |
| **Country Guidelines** | All tab content: tests, criteria, tips, visa categories | Country Guideline |
| **Stats** | Numbers, labels, suffixes | Stat |
| **Service Packages** | Package names, features, pricing | Service Package |
| **Certifications** | Certification body names/logos | Certification |
| **News & Blog** | All posts, categories, dates, images, content | News Post / Article |
| **Equipment** | Equipment names, models, quantities, images | Equipment Item |
| **Fitness Criteria** | Category names, descriptions, item lists | Fitness Criteria |
| **FAQs** | Questions and answers | FAQ |
| **Footer** | Quick links, service links, contact info | Footer Links + Site Config |
| **About Page** | Mission text, center description, values, gallery | About Page |
| **Contact Info** | Phone, email, address, working hours, map URL | Site Config |
| **Social Links** | Facebook, Instagram, LinkedIn URLs | Site Config |

---

## 6. Connecting Frontend to Strapi

### 6.1 Set Environment Variable

Create a `.env` file in the frontend project root:

```env
VITE_STRAPI_URL=http://localhost:1337
```

For production:
```env
VITE_STRAPI_URL=https://your-strapi-domain.com
```

### 6.2 That's It!

The frontend automatically detects the `VITE_STRAPI_URL` variable. When set:
- All API calls go to Strapi first
- Falls back to mock data if Strapi returns an error
- No code changes needed

### 6.3 Verify Connection

Open browser console. You should see API calls to your Strapi instance. If Strapi is down, you'll see:
```
[api] Strapi unavailable, using mock data for services
```

---

## 7. How the API Layer Works

### File: `src/lib/api.ts`

The core function is `strapiGet<T>(endpoint, fallback)`:

```typescript
async function strapiGet<T>(endpoint: string, fallback: T): Promise<T> {
  if (!STRAPI_BASE_URL) return fallback;  // No Strapi URL = use mock data

  try {
    const res = await fetch(`${STRAPI_BASE_URL}/api/${endpoint}`);
    if (!res.ok) throw new Error(`Strapi ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn(`[api] Strapi unavailable, using mock data`);
    return fallback;  // Graceful fallback
  }
}
```

### Data Flow

```
Component renders
  → Calls api.services.getAll()
    → strapiGet("services?populate=*", mockServices)
      → If VITE_STRAPI_URL is set → fetch from Strapi
      → If not set or Strapi is down → return mock data
```

### Adapting Strapi Response Format

Strapi v4 wraps data in `{ data: { id, attributes: {...} } }`. You may need a transform layer. Add this to `api.ts` if your Strapi response structure differs:

```typescript
function transformStrapiData<T>(data: any): T {
  if (Array.isArray(data)) {
    return data.map(item => ({
      id: item.id,
      ...item.attributes,
      // Handle nested media
      image: item.attributes?.image?.data?.attributes?.url
        ? `${STRAPI_BASE_URL}${item.attributes.image.data.attributes.url}`
        : item.attributes?.image,
    })) as T;
  }
  return { id: data.id, ...data.attributes } as T;
}
```

---

## 8. Image Handling

### Strapi Media Library

Strapi stores uploaded images and returns relative URLs like `/uploads/image_abc123.jpg`.

### Frontend Image URL Resolution

When using Strapi images, prepend the Strapi base URL:

```typescript
// In your transform function or component
const imageUrl = image.startsWith('http')
  ? image  // Already absolute URL
  : `${STRAPI_BASE_URL}${image}`;  // Strapi relative URL
```

### Recommended Image Sizes

| Usage | Recommended Size | Format |
|---|---|---|
| Hero Slider | 1600 × 900 px | JPG (optimized) |
| Service Cards | 500 × 300 px | JPG |
| News Thumbnails | 600 × 400 px | JPG |
| Country Flags | 160 × 107 px | PNG |
| Gallery Images | 600 × 400 px | JPG |
| Logo | SVG or 200 × auto | SVG/PNG |

---

## 9. API Permissions Setup

In Strapi Admin → **Settings → Roles → Public**:

Enable `find` and `findOne` for ALL content types listed in Section 4.

| Content Type | find | findOne |
|---|---|---|
| Site Config | ✅ | ✅ |
| Service | ✅ | ✅ |
| News Post | ✅ | ✅ |
| Article | ✅ | ✅ |
| Country Guideline | ✅ | — |
| GCC Country | ✅ | — |
| Equipment Item | ✅ | — |
| Fitness Criteria | ✅ | — |
| Stat | ✅ | — |
| Testimonial | ✅ | — |
| Service Package | ✅ | — |
| FAQ | ✅ | — |
| Certification | ✅ | — |
| Footer Quick Link | ✅ | — |
| Footer Service Link | ✅ | — |
| Gallery Image | ✅ | — |
| Hero | ✅ | ✅ |
| About Page | ✅ | — |
| Navigation | ✅ | — |

**Important:** Only enable `find` and `findOne` for the Public role. Never enable `create`, `update`, or `delete` for Public.

---

## 10. Deployment Guide

### 10.1 Frontend (Lovable / Vercel / Netlify)

Set the environment variable in your hosting platform:

```
VITE_STRAPI_URL=https://your-strapi-api.com
```

### 10.2 Strapi Backend

**Option A: Railway** (Easiest)
```bash
# Push Strapi to GitHub, connect to Railway
# Set DATABASE_URL and other env vars
```

**Option B: DigitalOcean App Platform**
```bash
# Deploy via GitHub integration
# Use managed PostgreSQL
```

**Option C: VPS (Ubuntu)**
```bash
# Install Node.js, PostgreSQL, Nginx
# Use PM2 for process management
pm2 start npm --name "strapi" -- run start
```

### 10.3 CORS Configuration

In Strapi's `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://your-frontend-domain.com',
        'http://localhost:5173',  // Vite dev
      ],
    },
  },
  // ... other middlewares
];
```

---

## 11. Content Types — Detailed Schema

### 11.1 Site Config (Single Type)

| Field | Type | Notes |
|---|---|---|
| siteName | Short Text | e.g., "Unicare Medical Services" |
| tagline | Short Text | e.g., "GCC Approved Medical Center" |
| logo | Media (Single) | Site logo image |
| phone | Short Text | e.g., "+88 02 48316027" |
| email | Email | e.g., "unicaremedicalbd@gmail.com" |
| address | Long Text | Full address |
| workingHours | Short Text | e.g., "Sat–Thu: 8:00 AM – 8:00 PM" |
| googleMapsEmbed | Long Text | Google Maps iframe embed URL |
| facebookUrl | Short Text | Social media URL |
| instagramUrl | Short Text | Social media URL |
| linkedinUrl | Short Text | Social media URL |

### 11.2 Navigation Item

| Field | Type | Notes |
|---|---|---|
| label | Short Text | Display text, e.g., "Services" |
| href | Short Text | URL path, e.g., "/services" |
| order | Number (Integer) | Sort order |
| parent | Relation (Self) | For dropdown children |

### 11.3 Service

| Field | Type | Notes |
|---|---|---|
| title | Short Text | e.g., "Physical Examination" |
| slug | UID (from title) | e.g., "physical-examination" |
| icon | Short Text | Lucide icon name: "Stethoscope", "ScanLine", etc. |
| description | Long Text | Short description for cards |
| category | Enumeration | Examination, Imaging, Laboratory, Preventive |
| heroImage | Media (Single) | Full-width hero for detail page |
| cardImage | Media (Single) | Thumbnail for service cards |
| fullDescription | Rich Text | Detailed description for detail page |
| benefits | JSON / Component (Repeatable) | Array of benefit strings |
| tests | JSON / Component (Repeatable) | Array of test names |
| pricing | Component (Repeatable) | { item, price, duration } |
| timeline | Component (Repeatable) | { step, title, description } |
| documents | Component (Repeatable) | { name, required } |
| relatedServices | Relation (Service, many) | Related service slugs |

### 11.4 News Post

| Field | Type | Notes |
|---|---|---|
| title | Short Text | Post title |
| slug | UID (from title) | URL-friendly slug |
| excerpt | Long Text | Short summary |
| content | Rich Text | Full article body |
| image | Media (Single) | Featured image |
| date | Date | Publication date |
| category | Enumeration | Announcement, Equipment, Regulation, Notice, Guide |

### 11.5 Blog Article

Same structure as News Post with different categories:
- Guide, Tips, Education, Technology

### 11.6 Country Guideline

| Field | Type | Notes |
|---|---|---|
| name | Short Text | e.g., "Saudi Arabia" |
| countryId | Short Text | e.g., "ksa" (used for tab switching) |
| flag | Short Text or Media | Flag image URL |
| processingTime | Short Text | e.g., "2 to 4 working days" |
| approvalNote | Short Text | e.g., "100% WAFID Approved" |
| expertTip | Long Text | Expert advice paragraph |
| mandatoryTests | Long Text | Mandatory tests description |
| rejectionCriteria | Long Text | Rejection reasons |
| specialRules | Long Text | Special rules text |
| visaCategories | Long Text | Visa types |

### 11.7 Equipment Item

| Field | Type | Notes |
|---|---|---|
| slNo | Short Text | Serial number |
| name | Short Text | Equipment name |
| model | Short Text | Model number |
| qty | Short Text | Quantity |
| origin | Short Text | Country of origin (optional) |
| status | Short Text | e.g., "OPERATIONAL" (optional) |
| image | Media (Single) | Equipment photo (optional) |

### 11.8 Fitness Criteria

| Field | Type | Notes |
|---|---|---|
| category | Short Text | e.g., "Infectious Diseases — Must Be Negative" |
| description | Long Text | Category description |
| items | JSON | Array of criteria strings |

### 11.9 Stat

| Field | Type | Notes |
|---|---|---|
| label | Short Text | e.g., "Accuracy Rate" |
| value | Number | e.g., 100 |
| suffix | Short Text | e.g., "%" |

### 11.10 Testimonial

| Field | Type | Notes |
|---|---|---|
| name | Short Text | Person's name |
| photo | Media (Single) | Profile photo |
| rating | Number (Integer) | 1-5 |
| quote | Long Text | Testimonial text |

### 11.11 Service Package

| Field | Type | Notes |
|---|---|---|
| title | Short Text | Package name |
| description | Long Text | Package description |
| features | JSON | Array of feature strings |
| pricing | Short Text | e.g., "Call for Pricing" |

### 11.12 FAQ

| Field | Type | Notes |
|---|---|---|
| question | Short Text | The question |
| answer | Long Text | The answer |
| order | Number | Display order |

### 11.13 Hero Section

| Field | Type | Notes |
|---|---|---|
| page | Short Text | Page identifier: "home", "services", "about", etc. |
| title | Short Text | H1 text |
| subtitle | Long Text | Subtitle text |
| slides | Media (Multiple) | Slider images |
| ctaButtons | Component (Repeatable) | { label, href, variant } |

### 11.14 About Page (Single Type)

| Field | Type | Notes |
|---|---|---|
| missionTitle | Short Text | e.g., "Our Mission" |
| missionText | Rich Text | Mission paragraph |
| missionImage | Media (Single) | Image for mission section |
| centerTitle | Short Text | e.g., "Our Center" |
| centerText | Rich Text | Center description |
| centerImage | Media (Single) | Image for center section |
| values | Component (Repeatable) | { img, alt, title, desc } |

---

## 12. Troubleshooting

### Common Issues

| Problem | Solution |
|---|---|
| CORS errors | Add frontend URL to Strapi's CORS config (Section 10.3) |
| Images not loading | Prepend `STRAPI_BASE_URL` to relative image paths |
| Data structure mismatch | Add transform function (Section 7) to map Strapi attributes |
| 403 Forbidden | Enable `find`/`findOne` permissions for Public role (Section 9) |
| Empty data returned | Check if content is published (not draft) in Strapi admin |
| Nested data not populated | Use `?populate=deep` or `?populate=*` in API queries |

### Testing Your Setup

1. Start Strapi: `npm run develop`
2. Add some test content via admin panel
3. Test API directly: `http://localhost:1337/api/services?populate=*`
4. Set `VITE_STRAPI_URL=http://localhost:1337` in frontend `.env`
5. Start frontend: `npm run dev`
6. Check browser console for API calls

### Strapi v5 Notes

If using Strapi v5, the response format changed slightly:
- Data is no longer nested under `attributes`
- Response: `{ data: [{ id, title, slug, ... }] }`
- No transform function needed — works directly with the frontend

---

## Quick Start Checklist

- [ ] Install and start Strapi
- [ ] Create all content types from Section 11
- [ ] Set Public API permissions (Section 9)
- [ ] Add content via Strapi admin panel
- [ ] Set `VITE_STRAPI_URL` environment variable
- [ ] Configure CORS for your frontend domain
- [ ] Test all pages to verify data loads
- [ ] Deploy Strapi to production server
- [ ] Update `VITE_STRAPI_URL` to production Strapi URL

---

## Support

For Strapi documentation: https://docs.strapi.io
For frontend code structure, see `src/lib/api.ts` and `src/data/mockData.ts`.
