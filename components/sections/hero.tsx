"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { hero, metrics, trustStrip } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { CountUp } from "@/components/shared/count-up";

const ParticleField = dynamic(
  () => import("@/components/hero/particle-field").then((m) => m.ParticleField),
  { ssr: false }
);

const ease = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const reveal = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <ParticleField />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.25) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(circle at 50% 0%, black, transparent 72%)",
          }}
        />
      </div>

      <div className="vv-container relative grid items-center gap-14 lg:grid-cols-[1.15fr,0.85fr]">
        <div>
          <motion.p
            {...reveal(0)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1.5 text-[0.66rem] font-medium uppercase tracking-[0.22em] text-slate-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-soft" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            {...reveal(0.08)}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
          >
            Building the next decade of{" "}
            <span className="vv-text-gradient">{hero.highlightedPhrase}</span>
          </motion.h1>

          <motion.p {...reveal(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">
            {hero.subhead}
          </motion.p>

          <motion.div {...reveal(0.24)} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Button asChild size="lg">
                <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
              </Button>
            </MagneticButton>
            <Button asChild size="lg" variant="outline">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </motion.div>

          <motion.dl
            {...reveal(0.32)}
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          >
            {metrics.map((m) => (
              <div key={m.label} className="relative">
                <dt className="order-2 mt-2 text-[0.66rem] uppercase tracking-[0.16em] text-slate-400">
                  {m.label}
                </dt>
                <dd className="font-display text-3xl font-semibold text-slate-50">
                  <CountUp value={m.value} suffix={m.suffix} />
                </dd>
                {m.isPlaceholder && (
                  <span
                    className="vv-placeholder-flag absolute -top-2 right-0"
                    title="Placeholder metric — edit content/site.ts"
                  >
                    Sample
                  </span>
                )}
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          {...reveal(0.2)}
          className="vv-gradient-border relative hidden lg:block"
        >
          <div className="vv-glass relative overflow-hidden p-7">
            <div className="absolute -right-14 -top-20 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true" />
            <div className="absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-violet-500/25 blur-3xl" aria-hidden="true" />
            <div className="relative space-y-6">
              <p className="text-[0.66rem] uppercase tracking-[0.22em] text-slate-400">
                Cross-continent operating model
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { k: "Regions", v: "Kenya · United Kingdom", n: "Latency-aware delivery between Nairobi & London." },
                  { k: "Practices", v: "AI · Cloud · Cyber · Product", n: "From advisory to full lifecycle delivery." },
                  { k: "Engagement", v: "Email · WhatsApp", n: "Direct line to senior architects, not ticket queues." },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="rounded-xl border border-slate-700/70 bg-slate-950/60 p-4 transition-colors hover:border-cyan-400/40"
                  >
                    <p className="text-[0.64rem] uppercase tracking-[0.18em] text-slate-400">{row.k}</p>
                    <p className="mt-1 font-display text-base font-semibold text-slate-100">{row.v}</p>
                    <p className="mt-1 text-[0.72rem] leading-relaxed text-slate-400">{row.n}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 border-t border-slate-700/60 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 text-xs font-bold tracking-[0.14em] text-slate-950">
                  VO
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-100">Mr. Vincent Omondi</p>
                  <p className="text-[0.7rem] text-slate-400">Founder & CEO · Principal Technology Architect</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust strip */}
      <div className="vv-container relative mt-16 lg:mt-24">
        <div className="vv-marquee vv-marquee-mask overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-950/40 py-4">
          <div className="vv-marquee-track items-center gap-12 pr-12">
            {[...trustStrip, ...trustStrip].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.2em] text-slate-400"
                aria-hidden={i >= trustStrip.length}
              >
                {item}
                <span className="ml-12 text-cyan-500/60">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
