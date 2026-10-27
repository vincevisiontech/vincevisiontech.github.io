"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * One-shot RGB-split glitch reveal when scrolled into view.
 * Reduced motion: renders plain text with no animation.
 */
export function GlitchText({
  children,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const text = typeof children === "string" ? children : undefined;

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      data-text={text}
      className={`vv-glitch ${active ? "vv-glitch-active" : ""} ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
}
