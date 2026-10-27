"use client";

import { useState, type ReactNode } from "react";
import { ExperienceProvider } from "@/components/providers/experience";
import { LenisProvider } from "@/components/providers/lenis";
import { BootSequence } from "@/components/boot/boot-sequence";
import { ReticleCursor } from "@/components/cursor/reticle-cursor";

/**
 * Client shell: experience state (lite/hacker/sound), smooth scroll,
 * first-visit boot sequence, and the custom reticle cursor.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <ExperienceProvider>
      <LenisProvider>
        <div className="vv-scanlines vv-noise min-h-screen">
          {!booted && <BootSequence onDone={() => setBooted(true)} />}
          <ReticleCursor />
          {children}
        </div>
      </LenisProvider>
    </ExperienceProvider>
  );
}
