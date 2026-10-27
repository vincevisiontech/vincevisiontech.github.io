"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/content/site";
import { SectionHeading } from "@/components/shared/section-heading";

function Circuit({ vertical = false }: { vertical?: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(SVGGElement | null)[]>([]);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();

    if (reduce) {
      path.style.strokeDashoffset = "0";
      nodesRef.current.forEach((n) => n?.classList.add("vv-node-on"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const st = ScrollTrigger.create({
      trigger: path,
      start: "top 80%",
      end: "bottom 30%",
      scrub: 0.6,
      onUpdate: (self) => {
        path.style.strokeDashoffset = String(length * (1 - self.progress));
        nodesRef.current.forEach((node, i) => {
          node?.classList.toggle("vv-node-on", self.progress > i / processSteps.length);
        });
      },
    });
    return () => st.kill();
  }, [vertical]);

  const common = "fill-none stroke-cyan-400/70" ;
  const node = (x: number, y: number, i: number) => (
    <g
      key={i}
      ref={(el) => {
        nodesRef.current[i] = el;
      }}
      className="vv-node"
    >
      <circle cx={x} cy={y} r="13" fill="#020617" stroke="#475569" strokeWidth="1.5" />
      <circle cx={x} cy={y} r="5" fill="#334155" />
      {vertical && (
        <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fill="#e2e8f0" fontFamily="monospace">
          {processSteps[i].step}
        </text>
      )}
    </g>
  );

  if (vertical) {
    return (
      <svg viewBox="0 0 240 760" className="h-[720px] w-full max-w-[240px]" aria-hidden="true">
        <path
          ref={pathRef}
          className={common}
          strokeWidth="2"
          d="M120 30 V180 H60 V360 H180 V540 H120 V730"
        />
        {[
          [120, 30],
          [60, 360],
          [180, 540],
          [120, 730],
        ].map(([x, y], i) => node(x, y, i))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 220" className="h-[220px] w-full" aria-hidden="true">
      <path
        ref={pathRef}
        className={common}
        strokeWidth="2"
        d="M30 110 H220 V50 H470 V170 H720 V110 H970"
      />
      {[
        [30, 110],
        [470, 50],
        [720, 170],
        [970, 110],
      ].map(([x, y], i) => node(x, y, i))}
    </svg>
  );
}

export function Process() {
  return (
    <section id="process" className="border-y border-slate-800/60 bg-slate-950/40 py-20 lg:py-28">
      <div className="vv-container space-y-14">
        <SectionHeading
          eyebrow="Mission protocol // 4 phases"
          title="From brief to operating system on a glowing circuit."
        />

        {/* Desktop */}
        <div className="relative hidden lg:block">
          <Circuit />
          <ol className="mt-2 grid grid-cols-4 gap-8">
            {processSteps.map((item) => (
              <li key={item.step}>
                <p className="vv-mono text-xs text-cyan-400">{item.step}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.summary}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile */}
        <div className="grid gap-6 md:grid-cols-[240px,1fr] lg:hidden">
          <Circuit vertical />
          <ol className="space-y-10">
            {processSteps.map((item) => (
              <li key={item.step}>
                <p className="vv-mono text-xs text-cyan-400">{item.step}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        .vv-node circle:last-child { transition: fill .4s ease, filter .4s ease; }
        .vv-node.vv-node-on circle:first-of-type { stroke: #22d3ee; filter: drop-shadow(0 0 8px rgba(34,211,238,.8)); }
        .vv-node.vv-node-on circle:last-child { fill: #22d3ee; }
      `}</style>
    </section>
  );
}
