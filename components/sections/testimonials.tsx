"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/content/site";
import { SectionHeading } from "@/components/shared/section-heading";

export function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();
  const total = testimonials.length;

  const go = useCallback(
    (next: number) => {
      const normalized = ((next % total) + total) % total;
      setState([normalized, normalized > index ? 1 : -1]);
    },
    [index, total]
  );

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setState(([i]) => [(i + 1) % total, 1]), 9000);
    return () => clearInterval(id);
  }, [reduce, total]);

  const current = testimonials[index];
  const isPlaceholder = "placeholder" in current && current.placeholder;

  return (
    <section aria-label="Testimonials" className="py-20 lg:py-28">
      <div className="vv-container space-y-12">
        <SectionHeading
          eyebrow="Signal log // verified voices"
          title="What partners transmit after deployment."
          description="Published only with explicit permission. Classified entries represent engagements awaiting clearance."
        />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(index + 1);
            if (e.key === "ArrowLeft") go(index - 1);
          }}
          className="[perspective:1200px]"
        >
          <div className="relative min-h-[340px] sm:min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={index}
                custom={direction}
                initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: direction * 35, x: direction * 60, scale: 0.92 }}
                animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, rotateY: direction * -35, x: direction * -60, scale: 0.92 }}
                transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(index + 1);
                  if (info.offset.x > 60) go(index - 1);
                }}
                className="vv-holo absolute inset-0 flex cursor-grab flex-col justify-between p-8 active:cursor-grabbing sm:p-12"
              >
                <div className="relative z-10 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 font-display text-sm font-bold text-slate-950">
                    {current.initials}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-slate-50">
                      {isPlaceholder ? <span className="vv-redacted">{current.name}</span> : current.name}
                    </p>
                    <p className="vv-mono text-[0.66rem] uppercase tracking-[0.18em] text-slate-400">
                      {isPlaceholder ? <span className="vv-redacted">{current.role}</span> : current.role}
                    </p>
                  </div>
                  {isPlaceholder && <span className="vv-placeholder-flag ml-auto">Classified</span>}
                </div>

                <blockquote className="relative z-10 mt-7 text-base leading-relaxed text-slate-200 sm:text-lg">
                  “{isPlaceholder ? <span className="vv-redacted">{current.quote}</span> : current.quote}”
                </blockquote>

                {!isPlaceholder && current.link && (
                  <p className="relative z-10 mt-6 text-xs text-slate-400">
                    Live deployment:{" "}
                    <a
                      href={current.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 underline decoration-cyan-500/50 underline-offset-4 hover:text-cyan-200"
                    >
                      {current.linkLabel}
                    </a>
                  </p>
                )}
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-cyan-400" : "w-2 bg-slate-600 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Previous testimonial"
                onClick={() => go(index - 1)}
                className="vv-mono flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300"
              >
                ←
              </button>
              <button
                aria-label="Next testimonial"
                onClick={() => go(index + 1)}
                className="vv-mono flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
