"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { experience } from "@/content/site";
import { useDeviceTier } from "@/lib/use-device-tier";
import { soundEngine } from "@/lib/sound-engine";

type ExperienceState = {
  isLite: boolean;
  setLite: (on: boolean) => void;
  hacker: boolean;
  triggerHacker: () => void;
  soundOn: boolean;
  toggleSound: () => void;
  blip: (freq?: number) => void;
};

const Ctx = createContext<ExperienceState | null>(null);

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const { isLite, setLite } = useDeviceTier(experience.storageKeys.lite);
  const [hacker, setHacker] = useState(false);
  const [soundOn, setSoundOn] = useState<boolean>(experience.soundDefaultOn);

  // Apply hacker theme class + persist sound preference.
  useEffect(() => {
    document.documentElement.classList.toggle(experience.hackerThemeClass, hacker);
  }, [hacker]);

  useEffect(() => {
    soundEngine.setEnabled(soundOn);
    window.localStorage.setItem(experience.storageKeys.sound, soundOn ? "1" : "0");
  }, [soundOn]);

  useEffect(() => {
    const stored = window.localStorage.getItem(experience.storageKeys.sound);
    if (stored === "1") setSoundOn(true);
  }, []);

  const triggerHacker = useCallback(() => setHacker((v) => !v), []);
  const toggleSound = useCallback(() => setSoundOn((v) => !v), []);
  const blip = useCallback((freq = 880) => soundEngine.blip(freq), []);

  // Easter eggs: Konami code or typing "vince" (outside form fields).
  useEffect(() => {
    const buffer: string[] = [];
    const word: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      buffer.push(e.key);
      if (buffer.length > KONAMI.length) buffer.shift();
      if (buffer.length === KONAMI.length && buffer.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        triggerHacker();
        buffer.length = 0;
      }

      if (e.key.length === 1) {
        word.push(e.key.toLowerCase());
        if (word.length > 5) word.shift();
        if (word.join("") === "vince") {
          triggerHacker();
          word.length = 0;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [triggerHacker]);

  const value = useMemo<ExperienceState>(
    () => ({ isLite, setLite, hacker, triggerHacker, soundOn, toggleSound, blip }),
    [isLite, setLite, hacker, triggerHacker, soundOn, toggleSound, blip]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useExperience() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useExperience must be used inside ExperienceProvider");
  return ctx;
}
