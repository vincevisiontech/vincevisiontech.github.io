import Image from "next/image";
import { about } from "@/content/site";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="vv-container grid gap-12 lg:grid-cols-[1.35fr,1fr] lg:items-start">
        <div className="space-y-8">
          <SectionHeading eyebrow={about.eyebrow} title={about.heading} />

          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{p}</p>
            </Reveal>
          ))}

          <div className="grid gap-4 sm:grid-cols-3">
            {about.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.08 * i}>
                <div className="h-full rounded-2xl border border-slate-700/70 bg-slate-950/50 p-4">
                  <p className="text-[0.66rem] uppercase tracking-[0.18em] text-slate-400">
                    {pillar.title}
                  </p>
                  <p className="mt-1.5 font-display text-sm font-semibold text-slate-100">
                    {pillar.value}
                  </p>
                  <p className="mt-1.5 text-[0.72rem] leading-relaxed text-slate-400">{pillar.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="vv-gradient-border">
            <div className="vv-glass flex h-full flex-col gap-5 p-7">
              <div className="relative mx-auto w-full max-w-[220px]">
                <Image
                  src={about.ceo.portrait}
                  alt={`Portrait placeholder for ${about.ceo.name}`}
                  width={220}
                  height={220}
                  className="aspect-square w-full rounded-2xl border border-slate-700/80 object-cover"
                />
                {about.ceo.portraitPlaceholder && (
                  <span className="vv-placeholder-flag absolute bottom-3 left-3">
                    Portrait placeholder
                  </span>
                )}
              </div>

              <div className="text-center">
                <p className="font-display text-lg font-semibold text-slate-50">{about.ceo.name}</p>
                <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-cyan-300">
                  {about.ceo.role}
                </p>
              </div>

              <blockquote className="relative rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5">
                <span aria-hidden="true" className="absolute -top-3 left-4 font-display text-3xl text-cyan-500/70">
                  “
                </span>
                <p className="text-sm leading-relaxed text-slate-200">{about.ceo.quote}</p>
              </blockquote>
              <p className="text-[0.78rem] leading-relaxed text-slate-400">{about.ceo.postscript}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
