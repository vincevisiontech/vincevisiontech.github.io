# VinceVision Technologies — Company Website

Production-grade marketing site for **VinceVision Technologies** (Kenya 🇰🇪 + United Kingdom 🇬🇧):
AI, cloud, cybersecurity, software engineering, digital commerce, and advisory.

Built with a dark "mission control" identity — cyan `#22d3ee` / violet `#a855f7` on near-black `#020617`.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router, React 19, TypeScript) |
| Styling | **Tailwind CSS v4** (CSS-first `@theme` tokens) |
| Motion | **Framer Motion** (scroll reveals, magnetic CTAs, count-up, carousel), canvas particle network |
| UI primitives | **shadcn/ui**-pattern components on Radix (accordion, tabs, slot) |
| Fonts | Inter Variable (UI) + Space Grotesk Variable (headings), self-hosted via Fontsource |
| AI assistant | `/api/chat` Route Handler → Anthropic Claude (SSE streaming, in-memory rate limit) |
| Deploy | Vercel/Node (full) or static export for GitHub Pages |

## Project structure

```
app/
  layout.tsx            Metadata, OG/Twitter, fonts, JSON-LD, analytics slots
  page.tsx              Section composition
  globals.css           Tailwind v4 tokens + design system
  api/chat/route.ts     Claude streaming endpoint, rate limiting, site-scoped prompt
  sitemap.ts robots.ts manifest.ts icon.svg
  privacy/ terms/ not-found.tsx
components/
  layout/ sections/ shared/ ui/ chat/ seo/ contact/ hero/
content/
  site.ts               ← SINGLE SOURCE OF TRUTH: all copy, contact, services, metrics
lib/utils.ts            cn(), mailto/WhatsApp link builders
scripts/build-static.mjs  Static-export helper (parks the API route during build)
public/                 og-image.svg, ceo-portrait.svg
```

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | For AI chat | Enables `/api/chat`. If unset, the widget stays visible and answers with an email/WhatsApp fallback. |
| `ANTHROPIC_MODEL` | Optional | Defaults to `claude-sonnet-4-5`. |
| `ANTHROPIC_SYSTEM_SUFFIX` | Optional | Extra guidance appended to the generated system prompt. |
| `NEXT_PUBLIC_SITE_URL` | Yes for SEO | Canonical URL; feeds metadata, sitemap, JSON-LD. Defaults to `https://vincevisiontech.github.io`. |
| `NEXT_PUBLIC_BASE_PATH` | Optional | Only for GitHub **project** pages (`/<repo>`). Leave empty for the root user site. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Enables Plausible analytics. |
| `NEXT_PUBLIC_GA_ID` | Optional | Enables Google Analytics 4 (`G-…`). |

### Scripts

```bash
npm run dev            # dev server
npm run build          # production build (Node/Vercel; includes /api/chat)
npm run start          # serve the production build
npm run build:static   # static export → /out (GitHub Pages; chat falls back to email/WhatsApp)
npm run lint           # ESLint (next/core-web-vitals)
npm run typecheck      # tsc --noEmit
```

## Deployment

### Vercel (recommended — full AI chat)

1. Import the repository, framework preset **Next.js** is detected automatically.
2. Add the env vars above (at minimum `ANTHROPIC_API_KEY` and `NEXT_PUBLIC_SITE_URL`).
3. Deploy. The Route Handler runs on Vercel's Node runtime with no extra configuration.

### GitHub Pages (static)

The repo is the **user site** `vincevisiontech.github.io`, so it serves from the root — no `basePath` needed.

```bash
npm run build:static   # emits /out
```

Publish `/out` (e.g. via the official `actions/upload-pages-artifact` workflow). Because static
hosting cannot run Route Handlers, the script temporarily parks `app/api` during export and the
chat widget automatically falls back to email/WhatsApp when the endpoint is absent.

> For a project page instead, set `NEXT_PUBLIC_BASE_PATH=/<repo>` before `build:static`.

A ready-made workflow is included at `.github/workflows/deploy-pages.yml`. Enable it once under
**Settings → Pages → Build and deployment → Source: GitHub Actions**; every push to `main` then
builds `/out` and deploys automatically.

## AI assistant design

- **Click-to-open only** — no auto-popup, no notification dot. Closes on `Esc`.
- POSTs the last 12 messages to `/api/chat`, which streams Claude tokens back over SSE.
- The system prompt is **generated from `content/site.ts`**, scoped strictly to company questions;
  off-topic questions are declined and redirected to contact channels.
- **Rate limiting:** 5 requests / 10 minutes per IP (in-memory; swap for Upstash/Redis at scale)
  plus a client-side minimum send interval and 500-char input cap.
- Any failure (missing key, 429, network, static hosting) renders an in-widget email/WhatsApp fallback.

## Quality, accessibility & performance

- Semantic landmarks, skip link, keyboard-operable tabs/accordion/carousel/widget, `aria` labels,
  visible focus rings, AA-checked color pairs.
- `prefers-reduced-motion` disables canvas animation, marquee, and Framer transitions.
- Self-hosted fonts, `next/image`, client components lazy below the fold, no layout shift.
- Homepage First Load JS ≈ **189 kB**; target Lighthouse 95+ on all four categories.
- SEO: canonical URL, Open Graph + Twitter cards, JSON-LD (`Organization` + two `LocalBusiness`
  nodes), `sitemap.xml`, `robots.txt`, web manifest, SVG icon set.

---

## ⚠️ Placeholders to replace before launch

Everything is editable in **`content/site.ts`** unless noted.

1. **Metrics** (`metrics`) — projects delivered, countries, years are marked `isPlaceholder: true`
   and render with a "Sample" flag. Replace with verified numbers and remove the flag.
2. **Case studies** — two dashed placeholder cards (`case-placeholder-1/2`); replace with real,
   client-approved engagements or delete them.
3. **CEO portrait** — `public/ceo-portrait.svg` is a labelled placeholder; replace with a real
   photo (update `about.ceo.portrait` and clear `portraitPlaceholder`).
4. **Business addresses** — Nairobi/London entries show an "Address placeholder" flag; add
   registered addresses (also flows into JSON-LD).
5. **Social links** — `site.socials` currently point to `#`; add real URLs or remove entries.
6. **OG image** — `public/og-image.svg` is a branded placeholder; most crawlers prefer a
   **1200×630 PNG** (swap the file and update the `openGraph.images` reference in `app/layout.tsx`).
7. **Favicon set** — SVG icon is included; add `.ico`/PNG variants if broader legacy support is needed.
8. **Legal pages** — `/privacy` and `/terms` are starter copy flagged for legal review in KE & UK.
9. **Founding year** — review `site.foundingYear` (used in JSON-LD).

## Content fixes carried over from the legacy single-file site

- WhatsApp number standardised everywhere to **+254 742 850266** / `wa.me/254742850266`
  (the previous broken `+257…` variant is gone).
- Removed the unverifiable **company/CEO net-worth** blocks and their chatbot answers.
- Removed the fabricated **99.98% uptime** stat, the "Live" badge, and "Site AI status" filler.
- No public contact form — email/WhatsApp policy preserved.
