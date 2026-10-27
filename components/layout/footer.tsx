import Link from "next/link";
import { navLinks, services, site } from "@/content/site";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90">
      <div className="vv-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr,1fr,1fr,1.2fr]">
        <div className="space-y-4">
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-xs font-semibold uppercase text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  {social.label.slice(0, 2)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer — sections">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Sections
          </p>
          <ul className="mt-4 space-y-2.5">
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
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Services
          </p>
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  className="text-xs text-slate-400 transition-colors hover:text-cyan-300"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-cyan-300">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300"
              >
                WhatsApp {site.whatsapp.display}
              </a>
            </li>
            <li>Nairobi, Kenya · London, United Kingdom</li>
          </ul>
          <ul className="mt-5 flex gap-4 text-xs">
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

      <div className="border-t border-slate-800/80">
        <div className="vv-container flex flex-col gap-2 py-5 text-[0.7rem] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Operating from Kenya &amp; the United Kingdom</p>
        </div>
      </div>
    </footer>
  );
}
