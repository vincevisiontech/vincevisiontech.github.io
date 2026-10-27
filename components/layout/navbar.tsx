"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { useExperience } from "@/components/providers/experience";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isLite, setLite, soundOn, toggleSound, blip } = useExperience();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <div className="vv-container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <Logo />
          <span className="vv-orbit text-sm font-semibold uppercase text-slate-100">VinceVision</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="vv-mono text-[0.66rem] uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-cyan-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Sound toggle */}
          <button
            type="button"
            onClick={() => {
              toggleSound();
              blip(660);
            }}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute interface sounds" : "Enable interface sounds"}
            title={soundOn ? "Sound on" : "Sound off (default)"}
            className="vv-mono hidden h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-cyan-400/60 hover:text-cyan-300 sm:inline-flex"
          >
            {soundOn ? "♪" : "∅"}
          </button>

          {/* Lite mode toggle */}
          <button
            type="button"
            onClick={() => setLite(!isLite)}
            aria-pressed={isLite}
            aria-label={isLite ? "Switch to full effects mode" : "Switch to lite mode"}
            title="Lite mode: disables WebGL and heavy effects"
            className="vv-mono hidden h-9 items-center rounded-full border border-slate-700 px-3 text-[0.6rem] uppercase tracking-[0.16em] text-slate-300 transition-colors hover:border-cyan-400/60 hover:text-cyan-300 sm:inline-flex"
          >
            {isLite ? "Lite ●" : "Lite ○"}
          </button>

          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#contact">Book a call</a>
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-200 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl xl:hidden"
          >
            <nav className="vv-container flex flex-col gap-1 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="vv-mono rounded-lg px-3 py-3 text-sm uppercase tracking-[0.14em] text-slate-200 hover:bg-slate-800/60 hover:text-cyan-300"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 flex gap-2 px-1">
                <button
                  type="button"
                  onClick={() => setLite(!isLite)}
                  className="vv-mono rounded-full border border-slate-700 px-4 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-slate-300"
                >
                  {isLite ? "Lite mode on" : "Lite mode off"}
                </button>
                <button
                  type="button"
                  onClick={toggleSound}
                  className="vv-mono rounded-full border border-slate-700 px-4 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-slate-300"
                >
                  Sound {soundOn ? "on" : "off"}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
