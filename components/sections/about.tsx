import Image from "next/image";
import { about, locations, metrics } from "@/content/site";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { GlitchText } from "@/components/shared/glitch-text";
import { TimezoneClock } from "@/components/contact/timezone-clock";

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

          {/* Editable placeholder metrics — replace values in content/site.ts */}
          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.label} className="vv-holo relative p-4">
                  {m.isPlaceholder && <span className="vv-placeholder-flag absolute right-3 top-3">Sample</span>}
                  <p className="vv-orbit relative z-10 text-2xl font-bold text-slate-50">
                    {m.value}
                    {m.suffix}
                  </p>
                  <p className="vv-mono relative z-10 mt-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-slate-400">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {about.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.08 * i}>
                <div className="vv-holo h-full p-4">
                  <p className="vv-mono relative z-10 text-[0.62rem] uppercase tracking-[0.2em] text-slate-400">
                    {pillar.title}
                  </p>
                  <p className="relative z-10 mt-1.5 font-display text-sm font-semibold text-slate-100">
                    {pillar.value}
                  </p>
                  <p className="relative z-10 mt-1.5 text-[0.72rem] leading-relaxed text-slate-400">{pillar.note}</p>
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
                  alt={`Portrait of ${about.ceo.name}, Founder and CEO of VinceVision Technologies`}
                  width={220}
                  height={220}
                  className="aspect-square w-full rounded-2xl border border-cyan-400/30 object-cover"
                />
                <span className="vv-mono absolute bottom-3 left-3 rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-cyan-300">
                  CEO // founder
                </span>
              </div>

              <div className="text-center">
                <GlitchText as="h3" className="font-display text-lg font-semibold text-slate-50">
                  {about.ceo.name}
                </GlitchText>
                <p className="vv-mono mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-cyan-300">
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

      {/* World-map strip with live dual clocks */}
      <Reveal className="vv-container mt-16">
        <div className="vv-holo p-7 sm:p-10">
          <p className="vv-mono relative z-10 text-[0.62rem] uppercase tracking-[0.28em] text-slate-400">
            {"// Live nodes — two time zones, one operating rhythm"}
          </p>
          <div className="relative z-10 mt-7 grid gap-6 sm:grid-cols-2">
            {locations.map((loc) => (
              <div key={loc.timeZone} className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5">
                <p className="vv-mono text-[0.64rem] uppercase tracking-[0.22em] text-cyan-300">
                  {loc.city} · {loc.country}
                </p>
                <TimezoneClock timeZone={loc.timeZone} label={loc.timeZone.replace("_", " ")} />
                <p className="mt-2 text-xs text-slate-400">
                  {loc.address}
                  {loc.addressPlaceholder && <span className="vv-placeholder-flag ml-2">Address placeholder</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
