"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { engagementSteps, testimonials } from "@/content/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const total = testimonials.length + 1; // +1 engagement-process slide

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex((next + total) % total);
    },
    [index, total]
  );

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, 9000);
    return () => clearInterval(id);
  }, [reduce, total]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  return (
    <section aria-label="Testimonials" className="border-y border-slate-800/60 bg-slate-950/40 py-20 lg:py-28">
      <div className="vv-container space-y-10">
        <SectionHeading
          eyebrow="Testimonials"
          title="Brands that trust VinceVision."
          description="VinceVision works closely with entrepreneurs and organisations building new digital frontiers. We publish testimonials only with explicit permission."
        />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials and engagement process"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="vv-glass relative overflow-hidden p-7 sm:p-10"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: direction * 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, x: direction * -36 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {index === 0 ? (
                <article aria-roledescription="slide" aria-label={`1 of ${total}`}>
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 text-sm font-bold text-slate-950">
                      {testimonials[0].initials}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-slate-50">{testimonials[0].name}</p>
                      <p className="text-xs text-slate-400">{testimonials[0].role}</p>
                    </div>
                  </div>
                  <blockquote className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">
                    “{testimonials[0].quote}”
                  </blockquote>
                  <p className="mt-5 text-xs text-slate-400">
                    Explore the experience VinceVision helped bring to life:{" "}
                    <a
                      href={testimonials[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 underline decoration-cyan-500/50 underline-offset-4 hover:text-cyan-200"
                    >
                      {testimonials[0].linkLabel}
                    </a>
                  </p>
                  <p className="mt-4 text-[0.68rem] text-slate-500">Testimonial shared with permission.</p>
                </article>
              ) : (
                <article aria-roledescription="slide" aria-label={`2 of ${total}`}>
                  <h3 className="font-display text-lg font-semibold text-slate-50">
                    How collaborations typically start
                  </h3>
                  <ol className="mt-6 space-y-4">
                    {engagementSteps.map((step, i) => (
                      <li key={i} className="flex gap-4 text-sm leading-relaxed text-slate-300">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 text-xs font-semibold text-cyan-300">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6">
                    <Button asChild size="sm">
                      <a href="#contact">Start a conversation</a>
                    </Button>
                  </div>
                </article>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Choose slide">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-cyan-400" : "w-2 bg-slate-600 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" aria-label="Previous slide" onClick={() => go(index - 1)}>
                ←
              </Button>
              <Button variant="ghost" size="icon" aria-label="Next slide" onClick={() => go(index + 1)}>
                →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
