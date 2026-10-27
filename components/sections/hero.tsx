"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { ScrambleHeading } from "@/components/shared/scramble-heading";
import { SceneBoundary } from "@/components/three/scene-boundary";
import { useExperience } from "@/components/providers/experience";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse-soft bg-slate-950/40" />,
});

/** Static holographic fallback for Lite mode / WebGL failure. */
function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="vv-grid-floor absolute inset-0 opacity-50" />
      <div
        className="h-[320px] w-[320px] rounded-full border border-cyan-400/30 sm:h-[440px] sm:w-[440px]"
        style={{ boxShadow: "0 0 90px rgba(34,211,238,0.25), inset 0 0 90px rgba(168,85,247,0.2)" }}
      />
      <div className="absolute h-[220px] w-[220px] rounded-full border border-violet-400/30 sm:h-[300px] sm:w-[300px]" />
      <span className="vv-mono absolute text-[0.62rem] uppercase tracking-[0.3em] text-cyan-400/70">
        Nairobi ↔ London
      </span>
    </div>
  );
}

const ease = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { isLite, blip } = useExperience();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0">
        {isLite ? (
          <HeroFallback />
        ) : (
          <SceneBoundary fallback={<HeroFallback />}>
            <HeroScene bloom={!isLite} />
          </SceneBoundary>
        )}
      </div>
      <div className="vv-grid-floor pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-30" aria-hidden="true" />

      <div className="vv-container relative z-10 pt-28 pb-24">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="vv-mono inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/70 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.26em] text-slate-300 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-soft" />
          {hero.eyebrow}
        </motion.p>

        <ScrambleHeading
          as="h1"
          text="Building the next decade of intelligent infrastructure."
          speed={22}
          className="mt-7 max-w-4xl font-display text-4xl font-semibold leading-[1.06] tracking-tight text-slate-50 sm:text-6xl lg:text-7xl"
        />

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300"
        >
          {hero.subhead}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <Button asChild size="lg" onClick={() => blip(740)}>
              <a href="#contact">{hero.primaryCta.label}</a>
            </Button>
          </MagneticButton>
          <Button asChild size="lg" variant="outline">
            <a href="#services">{hero.secondaryCta.label}</a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="vv-mono absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.58rem] uppercase tracking-[0.3em] text-slate-400 hover:text-cyan-300 sm:flex"
      >
        Scroll
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-slate-600 p-1">
          <motion.span
            animate={reduce ? undefined : { y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease }}
            className="h-1.5 w-1.5 rounded-full bg-cyan-400"
          />
        </span>
      </motion.a>
    </section>
  );
}
