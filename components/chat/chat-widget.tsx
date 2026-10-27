"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExperience } from "@/components/providers/experience";
import { VinceConsole } from "@/components/chat/vince-console";

/**
 * Floating Vince Core terminal. Opens on button click or the "/" key only —
 * never auto-pops. Esc closes. On static hosting the console itself falls
 * back to email/WhatsApp when /api/chat is absent.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { blip } = useExperience();

  const toggle = useCallback(() => {
    setOpen((v) => !v);
    blip(780);
  }, [blip]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="vince-core-panel"
        aria-label={open ? "Close Vince Core console" : "Open Vince Core console"}
        className="vv-mono fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-[0_14px_35px_rgba(2,6,23,0.9),0_0_30px_rgba(34,211,238,0.5)] transition-all hover:brightness-110"
      >
        <span aria-hidden="true">▸_</span>
        Vince Core
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="vince-core-panel"
            role="dialog"
            aria-label="Vince Core terminal"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="vv-glass fixed bottom-24 right-5 z-50 flex h-[min(580px,calc(100vh-8rem))] w-[calc(100vw-2.5rem)] max-w-md flex-col overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close console"
              className="absolute right-3 top-2.5 z-20 text-slate-400 hover:text-slate-100"
            >
              ✕
            </button>
            <VinceConsole variant="panel" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
