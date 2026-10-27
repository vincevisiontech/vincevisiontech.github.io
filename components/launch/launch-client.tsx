"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { launch, site } from "@/content/site";
import { Countdown } from "@/components/launch/countdown";
import { Ignition } from "@/components/launch/ignition";
import { mailtoLink, whatsappLink } from "@/lib/utils";

export function LaunchClient() {
  const [phase, setPhase] = useState<"pending" | "igniting" | "launched">("pending");

  useEffect(() => {
    const target = new Date(launch.dateUtc).getTime();
    if (Date.now() >= target) {
      const seen = sessionStorage.getItem("vv-ignition-seen");
      if (!seen) {
        sessionStorage.setItem("vv-ignition-seen", "1");
        setPhase("igniting");
      } else {
        setPhase("launched");
      }
    }
  }, []);

  if (phase === "igniting") return <Ignition />;

  const targetPassed = Date.now() >= new Date(launch.dateUtc).getTime();

  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="vv-grid-floor pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="vv-container relative z-10 py-28 text-center">
        <p className="vv-mono text-[0.66rem] uppercase tracking-[0.34em] text-cyan-300">
          {"// Launch sequence armed"}
        </p>

        <h1 className="vv-orbit mx-auto mt-6 max-w-3xl text-4xl font-bold uppercase leading-tight text-slate-50 sm:text-6xl">
          {launch.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {launch.teaser}
        </p>

        {!targetPassed && phase === "pending" ? (
          <div className="mx-auto mt-12 max-w-2xl">
            <Countdown dateUtc={launch.dateUtc} onZero={() => setPhase("igniting")} />
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={mailtoLink({ subject: launch.notifyEmailSubject, body: launch.notifyEmailBody })}
                className="vv-mono rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-950 transition-all hover:brightness-110"
              >
                Notify me by email
              </a>
              <a
                href={whatsappLink(launch.notifyWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="vv-mono rounded-full border border-emerald-400/50 bg-emerald-500/10 px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-200 transition-all hover:bg-emerald-500/20"
              >
                Notify me on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-12 space-y-6">
            <p className="vv-mono text-sm uppercase tracking-[0.28em] text-cyan-300">Status: online</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="vv-mono rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-950"
              >
                Enter the flagship site
              </Link>
              <button
                type="button"
                onClick={() => setPhase("igniting")}
                className="vv-mono rounded-full border border-slate-600 px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-300 hover:border-cyan-400/60 hover:text-cyan-300"
              >
                Replay ignition
              </button>
            </div>
          </div>
        )}

        <p className="vv-mono mt-14 text-[0.6rem] uppercase tracking-[0.26em] text-slate-600">
          {site.name} · Nairobi + London · {site.whatsapp.display}
        </p>
      </div>
    </main>
  );
}
