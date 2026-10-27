"use client";

import { useEffect, useState } from "react";

export function TimezoneClock({
  timeZone,
  label,
}: {
  timeZone: string;
  label: string;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone,
      }).format(now)
    : "--:--:--";

  const day = now
    ? new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        timeZone,
      }).format(now)
    : "";

  return (
    <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4">
      <p className="text-[0.66rem] uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-1.5 font-display text-2xl font-semibold tabular-nums text-cyan-200">
        {time}
      </p>
      <p className="mt-0.5 text-[0.72rem] text-slate-400">{day}</p>
    </div>
  );
}
