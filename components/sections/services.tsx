"use client";

import { services } from "@/content/site";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ServiceIcon } from "@/components/shared/service-icon";
import { mailtoLink, whatsappLink, cn } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="vv-container space-y-12">
        <SectionHeading
          eyebrow="End-to-end technology services"
          title="Everything a modern tech organisation expects from one partner."
          description="VinceVision operates as your long-term engineering and innovation partner, covering strategy, architecture, implementation, and operations. All enquiries are handled directly via email or WhatsApp for speed and accountability."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              as="article"
              key={service.id}
              delay={(i % 3) * 0.08}
              className={cn("h-full", service.wide && "lg:col-span-2")}
            >
              <div className="vv-gradient-border h-full">
                <div className="group flex h-full flex-col gap-4 rounded-[1.25rem] bg-slate-950/60 p-6 transition-colors duration-300 hover:bg-slate-900/60">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                      <ServiceIcon id={service.id} />
                    </span>
                    <span className="rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-slate-300">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-slate-50">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">{service.summary}</p>

                  <ul className="mt-1 space-y-2 text-[0.8rem] text-slate-300">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2 pt-3">
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={mailtoLink({
                          subject: `Enquiry about ${service.title} at VinceVision`,
                          body: `Hello VinceVision team,\n\nI would like to enquire about your ${service.title} services.\n\nHere is some context about my organisation and needs:\n- Region (Kenya / wider Africa / UK / Europe):\n- Type of organisation:\n- Timelines and constraints:\n\nBest regards,`,
                        })}
                      >
                        Email about this
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="whatsapp">
                      <a
                        href={whatsappLink(
                          `Hello VinceVision, I would like to enquire about your "${service.title}" services. Here is a quick overview of my context (region, organisation, timelines)...`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
