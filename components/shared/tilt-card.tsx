"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { useExperience } from "@/components/providers/experience";
import { cn } from "@/lib/utils";

/**
 * 3D pointer tilt with glare. No-ops in Lite mode / reduced motion.
 */
export function TiltCard({
  children,
  className,
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { isLite } = useExperience();

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (isLite || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
    ref.current.style.setProperty("--glare-x", `${(px + 0.5) * 100}%`);
    ref.current.style.setProperty("--glare-y", `${(py + 0.5) * 100}%`);
  }

  function reset() {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "relative transition-transform duration-300 ease-out [transform-style:preserve-3d]",
        className
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(103,232,249,0.12), transparent 65%)",
        }}
      />
    </div>
  );
}
