"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/content/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { TiltCard } from "@/components/shared/tilt-card";
import { ServiceIcon } from "@/components/shared/service-icon";
import { mailtoLink, whatsappLink } from "@/lib/utils";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const track = trackRef.current!;
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:h-screen lg:overflow-hidden lg:py-0">
      <div className="vv-container pt-20 lg:pt-24">
        <SectionHeading
          eyebrow="Module bay // 06 systems"
          title="End-to-end technology services, engineered as one stack."
          description="Strategy, architecture, implementation, and operations — every module connects. Scroll through the bay, or swipe on touch devices."
        />
      </div>

      <div
        ref={trackRef}
        className="vv-container mt-10 flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory lg:overflow-visible lg:pb-0 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {services.map((service, i) => (
          <article
            key={service.id}
            className="group w-[85vw] shrink-0 snap-center sm:w-[420px] lg:w-[400px]"
          >
            <TiltCard className="vv-holo h-full p-7">
              <div className="relative z-10 flex h-full flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-cyan-300">
                    <ServiceIcon id={service.id} />
                  </span>
                  <span className="vv-mono text-[0.58rem] uppercase tracking-[0.24em] text-violet-300/90">
                    MOD-{String(i + 1).padStart(2, "0")} · {service.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-slate-50">{service.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{service.summary}</p>

                <ul className="space-y-2 text-[0.8rem] text-slate-300">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <span aria-hidden="true" className="vv-mono mt-0.5 text-cyan-400">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  <a
                    href={mailtoLink({
                      subject: `Enquiry about ${service.title} at VinceVision`,
                      body: `Hello VinceVision team,\n\nI would like to enquire about your ${service.title} services.\n\nContext (region, organisation, timelines):\n\n`,
                    })}
                    className="rounded-full border border-cyan-400/50 bg-cyan-500/10 px-3.5 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-cyan-200 transition-all hover:bg-cyan-500/20"
                  >
                    Email about this
                  </a>
                  <a
                    href={whatsappLink(
                      `Hello VinceVision, I would like to enquire about your "${service.title}" services.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3.5 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-emerald-200 transition-all hover:bg-emerald-500/20"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </TiltCard>
          </article>
        ))}
      </div>

      <p className="vv-mono vv-container mt-6 hidden text-[0.62rem] uppercase tracking-[0.28em] text-slate-500 lg:block">
        Continue scrolling to traverse the module bay →
      </p>
    </section>
  );
}
