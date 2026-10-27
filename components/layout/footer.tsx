"use client";

import Link from "next/link";
import { navLinks, services, site } from "@/content/site";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  const year = new Date().getFullYear();

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as Window & { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-slate-800/80 bg-slate-950/90">
      <div className="vv-container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr,1fr,1.2fr]">
          <div className="space-y-5">
            <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
              <Logo />
              <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-slate-100">
                VinceVision
              </span>
            </a>
            <p className="max-w-xs text-xs leading-relaxed text-slate-400">{site.description}</p>
            <ul className="flex gap-3" aria-label="Social profiles">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={`${site.shortName} on ${social.label}`}
                    className="vv-mono inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-[0.62rem] uppercase text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                  >
                    {social.label.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer — sections">
            <p className="vv-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {"// Sections"}
            </p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-xs text-slate-400 transition-colors hover:text-cyan-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — services">
            <p className="vv-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {"// Modules"}
            </p>
            <ul className="mt-5 space-y-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="text-xs text-slate-400 transition-colors hover:text-cyan-300">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="vv-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {"// Contact"}
            </p>
            <ul className="mt-5 space-y-2.5 text-xs text-slate-400">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-cyan-300">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.whatsapp.waLink} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">
                  WhatsApp {site.whatsapp.display}
                </a>
              </li>
              <li>Nairobi, Kenya · London, United Kingdom</li>
            </ul>
            <ul className="mt-6 flex gap-5 text-xs">
              <li>
                <Link href="/privacy" className="text-slate-500 hover:text-slate-300">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-500 hover:text-slate-300">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant outlined wordmark */}
        <div className="pointer-events-none mt-16 select-none">
          <p className="vv-wordmark text-[16vw] leading-none lg:text-[12rem]">VINCEVISION</p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800/80 pt-6 text-[0.7rem] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="vv-mono uppercase tracking-[0.2em]">Kenya · United Kingdom</p>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="vv-mono group inline-flex items-center gap-2 self-start rounded-full border border-slate-700 px-4 py-2 uppercase tracking-[0.2em] text-slate-300 transition-all hover:border-cyan-400/60 hover:text-cyan-300 sm:self-auto"
          >
            <span className="transition-transform group-hover:-translate-y-0.5">▲</span>
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
