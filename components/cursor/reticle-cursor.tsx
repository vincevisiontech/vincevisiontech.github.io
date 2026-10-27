"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/components/providers/experience";

type Particle = { x: number; y: number; vx: number; vy: number; life: number };

/**
 * Custom glowing reticle + canvas particle trail.
 * Fine pointers only; disabled in Lite mode; never traps focus or pointer events.
 */
export function ReticleCursor() {
  const { isLite } = useExperience();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isLite) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.classList.add("vv-cursor-active");
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mx,
          y: my,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
          life: 1,
        });
      }
      if (particles.length > 140) particles.splice(0, particles.length - 140);

      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a, button, input, textarea, [data-cursor='hover'], [role='tab'], [role='button']");
      ring.classList.toggle("vv-hover", interactive);
    };

    const render = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.life * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.life * 0.5})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      document.body.classList.remove("vv-cursor-active");
    };
  }, [isLite]);

  if (isLite) return null;

  return (
    <>
      <canvas ref={canvasRef} id="vv-cursor-trail" aria-hidden="true" />
      <div ref={ringRef} className="vv-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="vv-cursor-dot" aria-hidden="true" />
    </>
  );
}
