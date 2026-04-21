# Frontend ↔ Strapi maintenance map (uniweb)

This document tells **editors and site owners** which **Strapi Content Manager** area to open when changing a visible part of this **React app**. Developers and AI assistants should pair this with **`universal_strapi_guide.md`** (API fields, REST paths, and integration rules).

**Strapi Admin:** Content Manager → filter by **Collection** or **Single** type name below. Always **Save** and **Publish** (draft content is hidden on the public site when `draftAndPublish` is on).

**Frontend env only (Vite React app, not Strapi):** `VITE_MOCK_DATA=Yes` (default) allows bundled demo data in the SPA when Strapi is missing or a section is empty; set **`VITE_MOCK_DATA=No`** so only published Strapi content appears (blank CMS fields stay blank). Strapi’s own `.env` does not define this.

---

## Global layout (every page)

| What the visitor sees | Where in Strapi | API / notes |
|----------------------|-----------------|-------------|
| Logo, site name, tagline, phone, email, address, hours, map embed, social links; **show/hide Blog & News** (`showBlogSection`, `showNewsSection`); **global comments** (`commentsEnabled`); **contact form** — staff inbox (`contactFormToEmail`), confirmation toggle, **SMTP** (host, port, secure, username, password, From) — passwords are **not** returned by the public API | **Single:** Site Config | `GET /api/site-config` |
| Main menu (and nested items if used) | **Collection:** Navigation | `GET /api/navigations` — order via `order`; parent/child for dropdowns |
| Footer “quick” column links | **Collection:** Footer Quick Link | `GET /api/footer-quick-links` |
| Footer “services” column links | **Collection:** Footer Service Link | `GET /api/footer-service-links` |
| Certification / partner logos in footer | **Collection:** Certification (`name`, `logo`, optional `shortDescription`, optional `verificationUrl`) | `GET /api/certifications` |

*Loaded once in **`StrapiLayoutContext`** — not per-page.*

---

## Home page (`/` → `pages/Index.tsx`)

| Section (UI) | React file | Strapi content |
|--------------|------------|----------------|
| Hero carousel / video / CTAs | `components/home/HeroSection.tsx` | **Collection:** Hero — filter by **`page` = `home`** |
| Services grid | `components/home/ServicesSection.tsx` | **Collection:** Service (all published entries, sorted as API defines) |
| Region banner + country pills/cards | `components/home/RegionHighlightsSection.tsx` | **Single:** Region highlights section (`bannerImage`, `bannerTitle`, `bannerDescription`) **and** **Collection:** Country flag (one entry per country, `order`) |
| Stats, packages, certification strip | `components/home/TrustSection.tsx` | **Collections:** Stat, Service Package, Certification |
| Country guideline cards / tabs | `components/home/CountryGuidelinesSection.tsx` | **Collection:** Country Guideline |
| “Get in touch” contact + map + form | `components/home/QuickContactSection.tsx` | **Single:** Site Config (phone, email, address, hours, map). Form → **`POST /api/contact-submissions/submit`** with `formKey` = `home_quick`; rows in **Contact submission** |

---

## Inner pages (route → Strapi)

| Route / page | React file | Primary Strapi types |
|--------------|------------|----------------------|
| Services listing | `pages/Services.tsx` | Hero (`page` = `services`), **Single:** Services Page (comparison table only), **Collection:** Service (each links to a **Service Category**), **Collection:** Service Category (filter tab order), **FAQ** — link each FAQ’s **`sitePage`** to the **published Hero** whose **Page** = `services` (relation picker in Admin); the app uses `filters[sitePage][page][$eq]=services` |
| Service detail | `pages/ServiceDetail.tsx` | **Collection:** Service (match **Slug** in admin to URL segment) |
| About | `pages/About.tsx` | Hero (`about`), **Single:** About Page |
| Blog list | `pages/Blog.tsx` | Hero (`blog`), **Collection:** Article — **Post Category** (`scope: blog`), optional **Author**; **Featured** (`isFeatured`); list **search** is client-side; route hidden if Site Config `showBlogSection` is off |
| Blog post | `pages/BlogPost.tsx` | **Collection:** Article (by **Slug**); optional **Comments** block if Site Config `commentsEnabled` and post `commentsOpen` |
| News list | `pages/News.tsx` | Hero (`news`), **Collection:** News Post — **Post Category** (`scope: news`), optional **Author**; **Featured**; **search**; route hidden if `showNewsSection` is off |
| News post | `pages/NewsPost.tsx` | **Collection:** News Post (by **Slug**); optional **Comments** same rules as blog |
| Post categories (taxonomy) | *(used by blog/news)* | **Collection:** Post Category — set **`scope`** to `blog` or `news` when creating |
| Authors (byline) | *(used by blog/news)* | **Collection:** Author |
| Comment moderation | *(optional)* | **Collection:** Comment — public submits via API; **approve** `isApproved` in admin |
| Contact form messages | *(home + contact pages)* | **Collection:** Contact submission — each row is one send; filter by **`formKey`** (`contact_page` vs `home_quick`). Optional **`isRead`** for triage. Not publicly listable via REST. |
| Book appointment | `pages/BookAppointment.tsx` | Hero (`book`), **Single:** Booking Page (`timeSlotLines`: add one “List item” per slot), **Collection:** Service |
| Report check | `pages/ReportCheck.tsx` | Hero (`reports`), **Single:** Report Page |
| Screening process | `pages/ScreeningProcess.tsx` | Hero (`process`), **Single:** Screening Process Page |
| Contact | `pages/Contact.tsx` | Hero (`contact`), **Collection:** Service (as used on that page), **Contact submission** (via same submit API with `formKey` = `contact_page`) |
| Fitness criteria | `pages/FitnessPage.tsx` | Hero (`fitness`), **Collection:** Fitness Criterion |
| Equipment | `pages/EquipmentPage.tsx` | Hero (`equipment`), **Collection:** Equipment Item |
| Privacy policy | `pages/Privacy.tsx` | **Single:** Privacy Page (`sections` = heading + body blocks) |

---

## Hero entries (`page` field)

The **Hero** collection has one document per logical page. In Strapi, open **Hero** and match **`page`** to:

| `page` value | Used on |
|--------------|---------|
| `home` | Home |
| `services` | Services |
| `about` | About |
| `blog` | Blog |
| `news` | News |
| `book` | Book appointment |
| `reports` | Report check |
| `process` | Screening process |
| `contact` | Contact |
| `fitness` | Fitness |
| `equipment` | Equipment |

Each hero supports **Slides** (`slideItems`: image, title, text per slide), **CTA buttons**, optional **promo video**, and **SEO** component.

---

## Optional types (not used by default SPA sections)

These exist in the **uniadmin** Strapi app for reuse on **new** or **client-specific** frontends. Enable sections that call the REST API (or add wrappers in `api.ts`).

| Strapi type | Typical UI |
|-------------|------------|
| Product | Product grid, spec pages, downloads |
| Team Member | Team / leadership grid |
| Resource Item | Guides, PDFs, case studies |
| Location | Branches, map list |

REST: `/api/products`, `/api/team-members`, `/api/resource-items`, `/api/locations` (see `universal_strapi_guide.md` §21).

---

## Keeping this map accurate

When you add a **new page** or **section component**:

1. Note the **`api.*` calls** (or `fetch` URLs) in the React file.
2. Add a row under the right route table above.
3. If you introduce a **new Strapi content type**, document it in **`universal_strapi_guide.md`** §21 and in the **uniadmin** repo (`public-permissions.ts`) if it should be public.

---

## Related docs

- **`universal_strapi_guide.md`** — Full contract: fields, endpoints, permissions, pitfalls, roadmap §24.
- **`STRAPI_INTEGRATION_MANUAL.md`** — Integration detail and tables for this app.
