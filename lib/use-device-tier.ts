"use client";

import { useEffect, useState } from "react";

export type Tier = "full" | "lite";

function detectTier(): Tier {
  if (typeof window === "undefined") return "full";
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency ?? 4;
  // deviceMemory is non-standard; fall back to a capable assumption.
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || coarse || narrow || cores <= 4 || memory <= 4) return "lite";
  return "full";
}

/**
 * Device tier + manual Lite override. The override is persisted so a visitor's
 * choice sticks across pages; reduced-motion users always start in lite.
 */
export function useDeviceTier(storageKey: string) {
  const [tier, setTier] = useState<Tier>("full");
  const [manual, setManual] = useState<Tier | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "lite" || stored === "full") setManual(stored as Tier);
    setTier(detectTier());
  }, [storageKey]);

  const effective: Tier = manual ?? tier;

  function setLite(on: boolean) {
    const next: Tier = on ? "lite" : "full";
    setManual(next);
    window.localStorage.setItem(storageKey, next);
  }

  return { tier: effective, isLite: effective === "lite", setLite };
}
