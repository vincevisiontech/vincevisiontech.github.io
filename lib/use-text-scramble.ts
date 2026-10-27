"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "01<>/\\{}[]#$%&*+=?@ABCDEFGHJKLMNPQRSTUVWXYZ";

/**
 * Text scramble/decode. Plays once when the element scrolls into view.
 * Honors prefers-reduced-motion by rendering the final text immediately.
 */
export function useTextScramble(text: string, speed = 28) {
  const ref = useRef<HTMLElement | null>(null);
  const [output, setOutput] = useState(text);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOutput(text);
      setPlayed(true);
      return;
    }

    let frame = 0;
    let raf = 0;
    const totalFrames = Math.max(18, Math.round(text.length * 1.2));

    const tick = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * text.length);
      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealed) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setOutput(next);
      if (frame < totalFrames) {
        raf = window.setTimeout(() => requestAnimationFrame(tick), speed);
      } else {
        setOutput(text);
        setPlayed(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          tick();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return { ref, output, played };
}
