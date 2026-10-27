import type { Metadata } from "next";
import { launchKit, site } from "@/content/site";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "Launch Kit",
  description: "Share assets, teaser storyboard, announcement copy, and launch checklist for VinceVision Technologies.",
  robots: { index: false, follow: true },
};

export default function LaunchKitPage() {
  return (
    <main className="vv-container max-w-5xl py-28">
      <SectionHeading
        eyebrow="// Internal // launch kit"
        title="Everything needed to make the launch an event."
        description="Assets and copy for the VinceVision Core launch. Replace placeholder visuals and verify dates before distribution."
      />

      {/* Share images */}
      <section className="mt-14 space-y-5">
        <h2 className="vv-mono text-xs uppercase tracking-[0.28em] text-cyan-300">01 · Share images (1200×630)</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {launchKit.shareImages.map((img) => (
            <figure key={img.file} className="vv-holo p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.file}
                alt={img.label}
                width={1200}
                height={630}
                className="relative z-10 w-full rounded-lg border border-slate-800"
              />
              <figcaption className="relative z-10 mt-3">
                <p className="text-sm font-medium text-slate-200">{img.label}</p>
                <p className="mt-1 text-xs text-slate-400">{img.note}</p>
                <p className="vv-mono mt-2 text-[0.62rem] text-slate-500">{img.file}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Storyboard */}
      <section className="mt-14 space-y-5">
        <h2 className="vv-mono text-xs uppercase tracking-[0.28em] text-cyan-300">02 · 15-second teaser storyboard</h2>
        <ol className="space-y-3">
          {launchKit.storyboard.map((shot) => (
            <li key={shot.t} className="vv-holo grid gap-2 p-5 sm:grid-cols-[110px,1fr,1fr] sm:gap-5">
              <span className="vv-mono relative z-10 text-[0.66rem] text-violet-300">{shot.t}</span>
              <p className="relative z-10 text-sm text-slate-300">{shot.shot}</p>
              <p className="vv-mono relative z-10 text-xs text-cyan-200">{shot.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Announcement copy */}
      <section className="mt-14 space-y-6">
        <h2 className="vv-mono text-xs uppercase tracking-[0.28em] text-cyan-300">03 · Announcement copy</h2>
        {(
          [
            ["LinkedIn", launchKit.announcements.linkedin],
            ["X", launchKit.announcements.x],
            ["WhatsApp", launchKit.announcements.whatsapp],
          ] as const
        ).map(([channel, variants]) => (
          <div key={channel} className="space-y-3">
            <h3 className="vv-mono text-[0.7rem] uppercase tracking-[0.24em] text-slate-400">{channel}</h3>
            {variants.map((copy, i) => (
              <div key={i} className="vv-holo p-5">
                <p className="relative z-10 text-sm leading-relaxed text-slate-300">{copy}</p>
                <p className="vv-mono relative z-10 mt-3 text-[0.6rem] uppercase tracking-[0.2em] text-slate-600">
                  Variant {i + 1} of {variants.length}
                </p>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Checklist */}
      <section className="mt-14 space-y-5">
        <h2 className="vv-mono text-xs uppercase tracking-[0.28em] text-cyan-300">04 · Launch-day checklist</h2>
        <ul className="vv-holo relative z-10 space-y-3 p-7">
          {launchKit.checklist.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-slate-300">
              <span aria-hidden="true" className="vv-mono mt-0.5 text-cyan-400">☐</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="vv-mono mt-12 text-center text-[0.62rem] uppercase tracking-[0.26em] text-slate-600">
        {site.name} · internal asset · {site.email}
      </p>
    </main>
  );
}
