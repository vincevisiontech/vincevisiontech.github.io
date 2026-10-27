# VinceVision Technologies — Cinematic Flagship

An Awwwards-style flagship experience for **VinceVision Technologies** (Nairobi 🇰🇪 × London 🇬🇧):
AI/automation/data, cloud/DevOps, cybersecurity, software engineering, digital commerce, and advisory.

Design language: **"Sentient infrastructure"** — holographic HUD panels, scanlines, grid floors,
a WebGL globe linking Nairobi ↔ London, GLSL shaders, custom reticle cursor, and a boot sequence.
Cyan `#22d3ee` / violet `#a855f7` on near-black `#020617`.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript), static-export capable
- **Tailwind CSS v4** CSS-first theme tokens
- **React Three Fiber + Three.js** with custom GLSL, `@react-three/postprocessing` bloom — lazy-loaded
- **GSAP + ScrollTrigger** (pinned services bay, scroll-drawn circuit), **Lenis** smooth scroll
- **Framer Motion** (reveals, carousel, ignition), Radix primitives in shadcn-style wrappers
- Orbitron / Space Grotesk (display), Geist Mono (data), Inter (body), self-hosted via Fontsource
- WebAudio synth UI sounds (no audio assets; muted by default)
- `/api/chat` Claude route (Node/Vercel deployments), graceful email/WhatsApp fallback on static hosting

## Project structure

```
app/
  layout.tsx              Metadata, OG/Twitter, JSON-LD, fonts, analytics slots, SiteShell
  page.tsx                One continuous scroll-driven story (all sections)
  launch/                 /launch countdown + T-0 ignition
  launch-kit/             Share assets, storyboard, announcement copy, checklist
  api/chat/route.ts       Claude SSE streaming, rate limiting, scoped system prompt
  sitemap.ts robots.ts manifest.ts icon.svg not-found.tsx privacy/ terms/
components/
  boot/                   First-visit boot sequence (once per session, skippable)
  three/                  R3F holographic globe scene + WebGL error boundary
  cursor/                 Glowing reticle + particle trail
  providers/              Experience state (lite/hacker/sound), Lenis, site shell
  sections/               Hero, Services, Process, LiveDemo, Work, Industries,
                          TechStack, About, Testimonials, Faq, Contact
  chat/                   Vince Core terminal console + floating widget
  layout/ shared/ ui/ seo/ contact/ launch/
content/site.ts           ← SINGLE SOURCE OF TRUTH for all copy and config
lib/                      Device tier, text scramble, WebAudio sound engine, link builders
public/launch/            Launch OG share cards (SVG)
scripts/build-static.mjs  Static export helper (parks the API route during build)
```

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values (only required for live AI chat)
npm run dev
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | For AI chat | Enables `/api/chat`; without it the terminal falls back to email/WhatsApp. |
| `ANTHROPIC_MODEL` | Optional | Default `claude-sonnet-4-5`. |
| `ANTHROPIC_SYSTEM_SUFFIX` | Optional | Extra system-prompt guidance. |
| `NEXT_PUBLIC_SITE_URL` | SEO | Canonical URL for metadata, sitemap, JSON-LD. |
| `NEXT_PUBLIC_BASE_PATH` | Optional | GitHub **project** pages only; leave empty for the root user site. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` / `NEXT_PUBLIC_GA_ID` | Optional | Analytics slots — render nothing until set. |

### Scripts

```bash
npm run dev            # dev server
npm run build          # Node/Vercel build (includes /api/chat)
npm run start          # serve production build
npm run build:static   # static export → /out for GitHub Pages
npm run lint           # ESLint
npm run typecheck      # tsc --noEmit
```

## The experience

1. **Boot sequence** — terminal system check with progress ring (~4.2s), skippable, once per session, ignites into the hero.
2. **Hero** — R3F holographic globe (custom fresnel/grid GLSL), glowing Nairobi↔London arc with traveling data pulse, cursor-reactive particle field, bloom; letter-by-letter decoded headline.
3. **Services** — GSAP-pinned horizontal module bay (desktop), snap-scroll on touch, 3D-tilt holo cards with per-service email/WhatsApp CTAs.
4. **Process** — Discover → Architect → Build → Operate as a circuit path that draws itself on scroll.
5. **Live demo** — Vince Core terminal: describe a problem, receive a streamed scoped recommendation.
6. **Work** — Sharon Thriftwear featured card with live link + two redacted "classified" placeholders.
7. **Industries** — tabbed holographic panels.
8. **Tech stack** — dual-direction infinite marquees + CSS-3D orbiting logo ring.
9. **About / CEO** — glitch-reveal, portrait, quote, live Nairobi/London clocks.
10. **Testimonials** — swipeable 3D carousel (drag / arrows / keyboard).
11. **FAQ** — terminal-style accordion.
12. **Contact** — "open a secure channel", email + WhatsApp only, transmitting button state.
13. **Footer** — giant outlined wordmark, sitemap, socials, legal, back-to-top.

**Easter eggs:** Konami code (`↑↑↓↓←→←→ B A`) or typing `vince` toggles a hacker theme; `/` opens Vince Core; Esc closes it.

## Performance, accessibility, graceful degradation

- **Device-tier detection** auto-enables Lite mode on mobile/low-core/low-memory/reduced-motion; a manual Lite toggle persists in `localStorage` and removes WebGL, cursor, and heavy effects.
- All Three.js code is dynamically imported (~700 KB of 3D stays out of the initial 234 KB First Load JS); the canvas pauses off-screen; a CSS hologram renders if WebGL fails.
- `prefers-reduced-motion` disables Lenis, marquees, ring, glitch, scramble, boot, and 3D animations.
- Semantic landmarks, skip link, keyboard-operable tabs/accordion/carousel/console, ARIA labels, AA contrast.
- SEO: metadata, OG/Twitter, JSON-LD (Organization + LocalBusiness), sitemap, robots, manifest, SVG icon.

## Deployment

### GitHub Pages (static — current setup)

`npm run build:static` emits `/out`; `.github/workflows/deploy-pages.yml` builds and deploys on every
push to `main`. Under **Settings → Pages → Source**, choose **GitHub Actions** (one-time setting).
Static hosting cannot run `/api/chat`, so Vince Core falls back to email/WhatsApp automatically.

### Vercel (full AI chat)

Import the repo, add `ANTHROPIC_API_KEY` (+ `NEXT_PUBLIC_SITE_URL`), deploy. No code changes;
the Route Handler streams Claude with per-IP rate limiting (5 requests / 10 minutes, in-memory).

---

## Placeholders to replace

All editable in **`content/site.ts`** unless noted.

1. **Launch date** — `launch.dateUtc` (currently `2026-12-01T09:00:00Z`); drives `/launch`.
2. **CEO photo** — currently hotlinked from LinkedIn (`about.ceo.portrait`); self-host a
   high-resolution file as `public/ceo-portrait.jpg` and point the config at it.
3. **Metrics** — four `metrics` entries are flagged "Sample" in the UI; replace with verified values.
4. **Case studies** — two "classified" cards; replace with cleared engagements or delete.
5. **Testimonials** — two placeholder entries alongside the verified Sharon Nyambura quote.
6. **Social links** — `site.socials` point to `#`.
7. **Business addresses** — Nairobi/London entries carry "Address placeholder" flags.
8. **Launch OG cards** — SVG starters in `public/launch/`; export 1200×630 PNGs for crawlers.
9. **Legal pages** — starter `/privacy` and `/terms`; obtain KE/UK legal review.
10. **Founding year** — verify `site.foundingYear` (used in JSON-LD).

## Content rules enforced

- No net-worth figures, no fabricated uptime statistics, no fake status/"Live" badges.
- WhatsApp is always **+254 742 850266** / `wa.me/254742850266`; email **vincevisiontech@proton.me**.
- No public contact form — email/WhatsApp channels only.
