"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1_000) % 60),
    done: ms === 0,
  };
}

export function Countdown({ dateUtc, onZero }: { dateUtc: string; onZero?: () => void }) {
  const target = new Date(dateUtc).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => {
      const next = diff(target);
      setT(next);
      if (next.done) {
        clearInterval(id);
        onZero?.();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [target, onZero]);

  const cells = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5" role="timer" aria-label="Time until launch">
      {cells.map((cell) => (
        <div key={cell.label} className="vv-holo p-4 text-center sm:p-6">
          <p className="vv-orbit relative z-10 text-3xl font-bold tabular-nums text-slate-50 sm:text-5xl">
            {String(cell.value).padStart(2, "0")}
          </p>
          <p className="vv-mono relative z-10 mt-2 text-[0.58rem] uppercase tracking-[0.26em] text-cyan-300 sm:text-[0.66rem]">
            {cell.label}
          </p>
        </div>
      ))}
    </div>
  );
}
