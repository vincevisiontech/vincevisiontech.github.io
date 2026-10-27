"use client";

import { useEffect, useRef, useState } from "react";
import { bootLines, experience } from "@/content/site";
import { soundEngine } from "@/lib/sound-engine";

const BOOT_MS = 4200;

/**
 * First-visit boot sequence. Shows once per session (sessionStorage), is
 * skippable, and ignites into the site. Reduced-motion users skip instantly.
 */
export function BootSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [igniting, setIgniting] = useState(false);
  const finished = useRef(false);

  const finish = (ignite: boolean) => {
    if (finished.current) return;
    finished.current = true;
    if (ignite) {
      setIgniting(true);
      soundEngine.ignition();
      window.setTimeout(onDone, 750);
    } else {
      onDone();
    }
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem(experience.storageKeys.boot)) {
      onDone();
      return;
    }
    sessionStorage.setItem(experience.storageKeys.boot, "1");
    setVisible(true);

    const lineTimer = window.setInterval(() => {
      setLineCount((c) => {
        const next = Math.min(c + 1, bootLines.length);
        if (next <= bootLines.length) soundEngine.blip(620 + next * 60, 0.05, "square", 0.025);
        return next;
      });
    }, BOOT_MS / (bootLines.length + 2));

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / BOOT_MS);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish(true);
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") finish(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearInterval(lineTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] transition-opacity duration-700 ${
        igniting ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="VinceVision system boot sequence"
    >
      {/* Ignition flash */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-500/40 via-violet-500/30 to-cyan-400/40 transition-transform duration-700 ${
          igniting ? "scale-[3] opacity-0" : "scale-0 opacity-0"
        }`}
        aria-hidden="true"
      />
      <div className="vv-grid-floor pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative w-[min(560px,calc(100vw-2.5rem))]">
        <p className="vv-mono text-[0.62rem] uppercase tracking-[0.3em] text-cyan-400/80">
          VinceVision OS // core boot
        </p>

        <div className="vv-mono mt-5 min-h-[168px] space-y-2 text-xs sm:text-sm" aria-live="polite">
          {bootLines.slice(0, lineCount).map((line, i) => (
            <p key={line} className="flex items-center gap-2 text-slate-300">
              <span className="text-cyan-400">{i === lineCount - 1 ? "▸" : "✓"}</span>
              <span className={i === lineCount - 1 ? "animate-pulse-soft" : ""}>{line}</span>
            </p>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <svg width="46" height="46" viewBox="0 0 46 46" className="shrink-0" aria-hidden="true">
            <circle cx="23" cy="23" r="19" fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="3" />
            <circle
              cx="23"
              cy="23"
              r="19"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 19}
              strokeDashoffset={2 * Math.PI * 19 * (1 - progress)}
              transform="rotate(-90 23 23)"
              style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.8))" }}
            />
          </svg>
          <div className="flex-1">
            <div className="h-1 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <p className="vv-mono mt-2 text-[0.62rem] uppercase tracking-[0.24em] text-slate-500">
              {Math.round(progress * 100)}% — establishing link
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => finish(false)}
          className="vv-mono mt-8 rounded-full border border-slate-700 px-4 py-2 text-[0.62rem] uppercase tracking-[0.24em] text-slate-400 transition-colors hover:border-cyan-400/60 hover:text-cyan-300"
        >
          Skip intro ⏎
        </button>
      </div>
    </div>
  );
}
