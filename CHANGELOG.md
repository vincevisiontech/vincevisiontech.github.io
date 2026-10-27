# Changelog

All notable changes to the VinceVision Technologies website are documented here.

## 3.0.0 — Cinematic flagship rebuild

### Added
- **Boot sequence**: terminal-style system check with progress ring, skippable, once per session, ignition transition.
- **WebGL hero** (React Three Fiber + custom GLSL): holographic fresnel/grid globe, animated Nairobi↔London arc with traveling data pulse, cursor-reactive particle field, bloom via `@react-three/postprocessing`.
- **Experience system**: device-tier detection, persistent Lite mode, `prefers-reduced-motion` support, WebGL error boundary with CSS hologram fallback.
- **Custom reticle cursor** with canvas particle trail and hover morphing (fine pointers only).
- **Text scramble/decode** headings, magnetic CTAs, glitch reveals, scanline/noise overlays, holographic clipped panels.
- **GSAP + ScrollTrigger** pinned horizontal services module bay and scroll-drawn circuit process path; **Lenis** smooth scroll.
- **Vince Core AI console**: terminal UI, Claude SSE streaming, rate limiting, click or `/` shortcut only, email/WhatsApp fallback; embedded as a Live Demo section and floating widget.
- **`/launch` page**: cinematic countdown, T-0 shockwave/particle ignition, email/WhatsApp notify links, replay mode.
- **`/launch-kit` page**: two 1200×630 share cards, 15-second teaser storyboard, three announcement variants each for LinkedIn/X/WhatsApp, launch-day checklist.
- Tech stack dual-direction marquees and CSS-3D orbiting logo ring; 3D swipeable testimonial carousel; redacted "classified" work cards; contact transmitting states; giant outlined footer wordmark; back-to-top.
- **Easter eggs**: Konami code and `vince` hacker theme; `/` console shortcut.
- WebAudio-generated UI sounds (blips, ambient hum, ignition sweep), muted by default with nav toggle.
- Orbitron and Geist Mono fonts alongside Inter/Space Grotesk, all self-hosted.

### Changed
- All copy, contact details, services, metrics, launch date and kit consolidated into `content/site.ts`.
- Services section converted from bento grid to a pinned horizontal "module bay".
- Chat assistant restyled from chat bubbles to a scoped terminal shell.
- Nav gains Lite and sound toggles.

### Removed
- Company/CEO net-worth figures and their chat prompt references (unverifiable financial claims).
- Unused count-up component after hero metric strip moved into the About section.

### Fixed / preserved
- WhatsApp standardized to **+254 742 850266** / `wa.me/254742850266` everywhere.
- No fake uptime statistics, status badges, or public contact forms.
- Static export (`build:static`) and Node builds both pass; GitHub Pages workflow retained.

## 2.0.0 — Next.js platform rebuild
- Migration from single-file `index.html` to Next.js 15 App Router, TypeScript, Tailwind v4.
- Sectioned architecture, `/api/chat` Claude route, SEO metadata, JSON-LD, sitemap/robots/manifest.

## 1.0.0 — Initial single-file site
- Static HTML landing page with services, industries, testimonial, and contact channels.
