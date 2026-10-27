"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { soundEngine } from "@/lib/sound-engine";

/**
 * T-0 ignition: shockwave, particle burst, headline slam, then redirect.
 */
export function Ignition() {
  const router = useRouter();

  useEffect(() => {
    soundEngine.ignition();
    const id = setTimeout(() => router.push("/"), 2800);
    return () => clearTimeout(id);
  }, [router]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-[#020617]" role="status" aria-label="Launch ignition">
      {/* Shockwave rings */}
      {[0, 0.25, 0.5].map((delay, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0.9 }}
          animate={{ scale: 6, opacity: 0 }}
          transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute h-64 w-64 rounded-full border-2 border-cyan-400"
        />
      ))}

      {/* Particle burst */}
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((i / 28) * Math.PI * 2) * 420,
            y: Math.sin((i / 28) * Math.PI * 2) * 420,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
        />
      ))}

      <motion.h1
        initial={{ scale: 0.6, opacity: 0, letterSpacing: "0.5em" }}
        animate={{ scale: 1, opacity: 1, letterSpacing: "0.12em" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="vv-orbit relative z-10 text-center text-3xl font-bold uppercase text-slate-50 sm:text-6xl"
      >
        VinceVision
        <span className="vv-text-gradient block">Core Online</span>
      </motion.h1>
    </div>
  );
}
