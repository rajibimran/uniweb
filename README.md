# um_web — Unicare Medical Services (Vite + React)

Strapi-backed marketing site. Pair with **`um_admin`** (Strapi on port **1337** locally). Environment variables:

- `VITE_STRAPI_URL` — Strapi base URL (no trailing slash required if your helpers normalize it)
- `VITE_STRAPI_API_KEY` — read-only API token for public content

Copy `.env.example` to `.env` and fill in values (never commit real secrets).

## Documentation

| Document | Purpose |
|----------|---------|
| [**LOVABLE_BUILD_GUIDELINE.md**](./LOVABLE_BUILD_GUIDELINE.md) | **Start here** — step-by-step: GitHub → Lovable → new company repos → Cursor → `.env` / API testing; plus multi-brand rules and PR checklist |
| [**STRAPI_INTEGRATION_MANUAL.md**](./STRAPI_INTEGRATION_MANUAL.md) | Content types, REST endpoints, populate patterns, troubleshooting |
| [**massmodel.md**](./massmodel.md) | Short architecture summary (one repo per company, one Strapi per company) |
| [**CHANGELOG.md**](./CHANGELOG.md) | Template version notes when you update the golden template or cherry-pick fixes across repos |
| **universal_strapi_guide.md** | Strapi project setup (if present in repo) |

## Lovable first prompt (summary)

Keep `src/lib/api.ts` and data flow; only change layout, components, and theme per brief. Use `RichText` for Strapi rich/multiline fields. See the full guideline above.
