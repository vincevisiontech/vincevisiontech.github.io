"use client";

import { useState } from "react";
import { locations, site } from "@/content/site";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TimezoneClock } from "@/components/contact/timezone-clock";
import { mailtoLink, whatsappLink } from "@/lib/utils";

function ChannelButton({
  href,
  external,
  label,
  tone,
}: {
  href: string;
  external?: boolean;
  label: string;
  tone: "cyan" | "emerald";
}) {
  const [state, setState] = useState<"idle" | "transmitting" | "open">("idle");

  const toneClasses =
    tone === "cyan"
      ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20"
      : "border-emerald-400/50 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => {
        setState("transmitting");
        window.setTimeout(() => setState("open"), 1100);
      }}
      className={`vv-mono inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-all ${toneClasses}`}
    >
      {state === "transmitting" ? (
        <>
          <span className="h-2 w-2 animate-ping rounded-full bg-current" />
          Transmitting…
        </>
      ) : state === "open" ? (
        <>Channel opened ✓</>
      ) : (
        label
      )}
    </a>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-20 lg:py-28">
      <div className="vv-grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="vv-container relative grid gap-12 lg:grid-cols-[1.25fr,1fr] lg:items-start">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Secure channel // contact"
            title="Open a secure channel with VinceVision."
            description="Enquiries run over two direct channels only — email and WhatsApp. No public forms, no ticket queues, no data harvesting. Sensitive briefs stay in your control."
          />

          <Reveal className="vv-holo space-y-7 p-8">
            <div className="relative z-10">
              <p className="vv-mono text-[0.64rem] uppercase tracking-[0.24em] text-slate-400">
                Channel 01 // email
              </p>
              <a
                href={mailtoLink({ subject: "Enquiry — VinceVision Technologies" })}
                className="mt-2 inline-flex items-center gap-2 font-display text-lg font-medium text-cyan-200 hover:text-cyan-100"
              >
                {site.email} ↗
              </a>
              <p className="mt-1.5 text-[0.78rem] text-slate-400">
                Detailed briefs, RFPs, and compliance information.
              </p>
            </div>

            <div className="h-px bg-slate-700/70" />

            <div className="relative z-10">
              <p className="vv-mono text-[0.64rem] uppercase tracking-[0.24em] text-slate-400">
                Channel 02 // WhatsApp — enquiries only
              </p>
              <a
                href={whatsappLink("Hello VinceVision, I'd like to introduce my organisation and ask about working together.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-display text-lg font-medium text-emerald-200 hover:text-emerald-100"
              >
                {site.whatsapp.display} ↗
              </a>
              <p className="mt-1.5 text-[0.78rem] text-slate-400">
                Quick introductions and time-sensitive questions.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3 pt-1">
              <ChannelButton
                href={mailtoLink({ subject: "Enquiry — VinceVision Technologies", body: "Hello VinceVision team,\n\n" })}
                label="Email the team"
                tone="cyan"
              />
              <ChannelButton
                href={whatsappLink("Hello VinceVision, I'd like to make an enquiry.")}
                external
                label="Chat on WhatsApp"
                tone="emerald"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {locations.map((loc) => (
              <div key={loc.timeZone} className="space-y-3">
                <TimezoneClock timeZone={loc.timeZone} label={`${loc.city}, ${loc.country}`} />
                <p className="px-1 text-xs text-slate-400">
                  {loc.address}
                  {loc.addressPlaceholder && <span className="vv-placeholder-flag ml-2">Address placeholder</span>}
                </p>
              </div>
            ))}
          </div>

          <div className="vv-holo p-6">
            <p className="vv-mono relative z-10 text-[0.64rem] uppercase tracking-[0.22em] text-cyan-300">
              {"// Transmission checklist"}
            </p>
            <ul className="relative z-10 mt-4 list-disc space-y-2 pl-5 text-[0.8rem] text-slate-300">
              <li>Who you are and the organisation you represent.</li>
              <li>Kenya, wider region, or UK-based.</li>
              <li>The challenge: product, migration, AI use case, or security issue.</li>
              <li>Timelines, constraints, or regulatory requirements.</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
