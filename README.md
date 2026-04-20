# RunSimpler Next.js Gold Standard Template

The starting scaffold for every RunSimpler client website. Ships every SEO,
GEO/AEO, security, accessibility, performance, and architecture pattern from
the Website Infrastructure Checklist on day one.

Built from battle-tested reference implementations across MTL, SPW, and appeX.

---

## What this template is

Every RunSimpler client website was rebuilding the same infrastructure from
scratch: robots.ts with tiered AI crawler policy, dynamic sitemap, llms.txt
for AI citation coverage, JSON-LD schema helpers, security headers, analytics
slot, skip links, error boundaries. An LSSMBB waste walk identified this as
the top rework source. This template eliminates that waste permanently.

Start every new client site by copying this template. The only files that
need editing are `src/lib/site-config.ts` and the brand tokens in
`src/app/globals.css`. Everything else wires to those two files automatically.

---

## Quick start

### 1. Copy the template

```bash
cp -r templates/nextjs-gold-standard brand-assets/{client-name}/website
cd brand-assets/{client-name}/website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Edit `src/lib/site-config.ts`

This is the single customization point. Replace every `REPLACE_ME` value:

- `BASE_URL` — production domain (e.g., `"https://www.clientdomain.com"`)
- `BUSINESS_NAME` — legal business name
- `PHONE`, `PHONE_HREF`, `EMAIL` — primary contact information
- `ADDRESS` — primary physical address
- `SOCIAL_LINKS` — leave empty string for unused platforms
- `DEFAULT_DESCRIPTION` — 140-160 character site-level SEO description
- `THEME_COLOR` — hex value matching the DESIGN.md primary color
- `GEO` — lat/lng for LocalBusiness schema (set to 0,0 if not needed)

Every other file in the project imports from this file. Once `site-config.ts`
is complete, the robots.ts, sitemap, llms.txt, schema helpers, og.ts, and
layout metadata all resolve correctly.

### 4. Replace brand tokens in `src/app/globals.css`

Find the block marked `BRAND TOKENS: REPLACE START`. Replace every hex value
with the client's actual brand colors from DESIGN.md. These CSS variables are
referenced throughout the project via `var(--color-*)`.

### 5. Set up analytics

Create `.env.local` (not committed):

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

The analytics slot in `layout.tsx` conditionally renders the GA script only
when this variable is set. It uses `strategy="afterInteractive"` to protect
Core Web Vitals scores.

### 6. Replace fonts

In `src/app/layout.tsx`, replace the `Inter` import with the fonts specified
in DESIGN.md. Each font must have:

- `subsets: ["latin"]`
- `variable: "--font-NAME"`
- `display: "swap"`

Reference the CSS variables in `globals.css` via `var(--font-NAME)`.

### 7. Verify the build

```bash
npm run build
```

Zero errors before any client work begins.

---

## File reference

### `src/lib/site-config.ts`

The single source of truth for all client-specific constants. Every other file
imports from here. Grep for `REPLACE_ME` to find every field requiring input.

### `src/lib/og.ts`

Exports `OG_IMAGE` — the centralized OG image constant at 1200x630. Import in
every page metadata export. Override the `url` field per-page for page-specific
images. Never hardcode OG dimensions in individual page files.

### `src/lib/schema.ts`

Parameterized JSON-LD schema helpers. All import from `site-config.ts`. Use
the `JsonLd` component to inject schemas in Server Component pages.

Available helpers:

| Helper | Use for |
|--------|---------|
| `organizationSchema()` | Root layout (every page) |
| `localBusinessSchema(location)` | Physical location pages |
| `serviceSchema(service)` | Service detail pages |
| `faqSchema(faqs)` | Pages with FAQ sections |
| `breadcrumbSchema(items)` | All pages below home |
| `articleSchema(article)` | Guide / long-form pages |
| `blogPostingSchema(post)` | Blog detail pages |

### `src/app/robots.ts`

Three-tier AI crawler policy. Tier 1 (GPTBot, Google-Extended, ChatGPT-User)
and Tier 2 (ClaudeBot, PerplexityBot, Amazonbot) are allowed for AI citation
surface. Tier 3 (CCBot, Bytespider) blocked as training harvesters with no
referral value. `sitemap` field uses `BASE_URL` from site-config.

### `src/app/sitemap.ts`

Dynamic sitemap from typed data registries. Add pages by adding entries to
`src/data/pages.ts` (or the relevant data file). The sitemap rebuilds on
deploy. Blog posts use their actual publish dates, not build time.

### `src/app/llms.txt/route.ts`

AI site index served at `/llms.txt`. Structured markdown that gives LLM
crawlers a machine-readable overview of all content. Customize the business
description and add service/page entries. All URLs must be absolute.

### `src/app/layout.tsx`

Root layout with font loading, skip link, viewport export, Organization
JSON-LD, analytics slot, Header, and Footer. The `viewport` export is
separate from `metadata` (Next.js 15+ requirement).

### `src/app/error.tsx`

Error boundary with `"use client"` directive (required by Next.js). Uses
`unstable_retry` (Next.js 16 API) for recovery. Replace placeholder styles
with brand design from DESIGN.md.

### `src/app/not-found.tsx`

404 Server Component with metadata. Replace placeholder styles with brand design.

### `src/components/seo/JsonLd.tsx`

Thin Server Component wrapper for injecting JSON-LD. Use instead of
`dangerouslySetInnerHTML` directly in page files.

### `src/components/layout/Header.tsx` and `Footer.tsx`

Structural skeletons. Replace with brand-showcase port or DESIGN.md-driven
components. If navigation needs client-side state (mobile menu), extract only
the interactive part into a Client Component.

### `src/data/`

Content registries — typed TypeScript objects consumed by the sitemap and
page components. Add entries here rather than hardcoding strings in components.

| File | Contents |
|------|----------|
| `pages.ts` | Core static pages with priority hierarchy |
| `services.ts` | Service name, slug, urlPath, description |
| `blog-posts.ts` | Slug, title, date, description, tags |
| `faqs.ts` | Question and answer pairs |

### `next.config.ts`

Security headers (X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy,
Permissions-Policy), image optimization (AVIF first, then WebP), and caching
headers (fonts: 1-year immutable, images: 1-day with stale-while-revalidate).

---

## How to add pages

1. Create `src/app/[page]/page.tsx` as a Server Component
2. Export a `metadata` object with unique `title`, `description`, and `openGraph`
3. Add the page to `src/data/pages.ts` for automatic sitemap inclusion
4. Add a `loading.tsx` and `error.tsx` in the route segment if needed
5. Inject page-specific JSON-LD schema via `<JsonLd data={schemaHelper()} />`

## How to add structured data

```tsx
// In any Server Component page:
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { faqs } from "@/data/faqs";

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
      ])} />
      {/* page content */}
    </>
  );
}
```

---

## Checklist reference

Full acceptance criteria for every infrastructure item:

`wiki/standards/website-infrastructure-checklist.md`

Run the Quality Checklist section before marking any client site launch-ready.

---

## Tech stack

- Next.js 16 (App Router, React Server Components)
- React 19
- TypeScript 5 (strict mode)
- Tailwind CSS 4
- sharp (image optimization)
