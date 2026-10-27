import { locations, site } from "@/content/site";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { TimezoneClock } from "@/components/contact/timezone-clock";
import { mailtoLink, whatsappLink } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" className="border-t border-slate-800/70 bg-slate-950/60 py-20 lg:py-28">
      <div className="vv-container grid gap-12 lg:grid-cols-[1.25fr,1fr] lg:items-start">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Contact VinceVision"
            title="Two channels. Direct access to the team."
            description="VinceVision keeps communication disciplined and secure. Enquiries are only accepted via email or WhatsApp — no public forms. This protects sensitive details while giving you a direct line to decision-makers."
          />

          <Reveal className="vv-glass space-y-6 p-7">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-slate-400">Email</p>
              <a
                href={mailtoLink({
                  subject: "Enquiry — VinceVision Technologies",
                  body: "Hello VinceVision team,\n\nHere is a short overview of my context, region, challenge and timelines:\n\n",
                })}
                className="mt-2 inline-flex items-center gap-2 font-display text-lg font-medium text-cyan-200 hover:text-cyan-100"
              >
                {site.email}
                <span aria-hidden="true">↗</span>
              </a>
              <p className="mt-1.5 text-[0.78rem] text-slate-400">
                Ideal for detailed briefs, RFPs, and compliance-related information.
              </p>
            </div>

            <div className="h-px bg-slate-700/70" />

            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-slate-400">
                WhatsApp — enquiries only
              </p>
              <a
                href={whatsappLink(
                  "Hello VinceVision, I'd like to introduce my organisation and ask about working together."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-display text-lg font-medium text-emerald-200 hover:text-emerald-100"
              >
                {site.whatsapp.display}
                <span aria-hidden="true">↗</span>
              </a>
              <p className="mt-1.5 text-[0.78rem] text-slate-400">
                Quick introductions, clarifications, and time-sensitive questions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button asChild size="sm">
                <a
                  href={mailtoLink({
                    subject: "Enquiry — VinceVision Technologies",
                    body: "Hello VinceVision team,\n\n",
                  })}
                >
                  Email the team
                </a>
              </Button>
              <Button asChild size="sm" variant="whatsapp">
                <a
                  href={whatsappLink("Hello VinceVision, I'd like to make an enquiry.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {locations.map((loc) => (
              <div key={loc.timeZone} className="space-y-3">
                <TimezoneClock timeZone={loc.timeZone} label={`${loc.city}, ${loc.country}`} />
                <p className="px-1 text-xs text-slate-400">
                  {loc.address}
                  {loc.addressPlaceholder && (
                    <span className="vv-placeholder-flag ml-2" title="Replace with the registered business address in content/site.ts">
                      Address placeholder
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-cyan-300">
              What to include in your first message
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.8rem] text-slate-300">
              <li>Who you are and the organisation or initiative you represent.</li>
              <li>Whether you are primarily based in Kenya, the wider region, or the UK.</li>
              <li>Your current challenge — product, migration, AI use case, or security issue.</li>
              <li>Timelines, constraints, or regulatory requirements.</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
