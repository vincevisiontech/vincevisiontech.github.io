"use client";

import { industries } from "@/content/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Industries() {
  return (
    <section id="industries" className="py-20 lg:py-28">
      <div className="vv-container space-y-10">
        <SectionHeading
          eyebrow="Sector mapping // regulated frontiers"
          title="Holographic panels for regulated, high-growth sectors."
          description="Patterns refined across African and UK markets — switch sectors to reconfigure the panel."
        />

        <Tabs defaultValue={industries[0].id}>
          <TabsList aria-label="Industries">
            {industries.map((ind) => (
              <TabsTrigger key={ind.id} value={ind.id}>
                {ind.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {industries.map((ind, i) => (
            <TabsContent key={ind.id} value={ind.id}>
              <div
                className="vv-holo grid gap-8 p-8 md:grid-cols-[1fr,1.1fr] md:p-12"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(160deg, rgba(8,16,34,0.95), rgba(2,6,23,0.9))"
                      : "linear-gradient(200deg, rgba(17,10,34,0.95), rgba(2,6,23,0.9))",
                }}
              >
                <div className="relative z-10">
                  <p className="vv-mono text-[0.6rem] uppercase tracking-[0.28em] text-violet-300">
                    Sector {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-slate-50">{ind.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{ind.summary}</p>
                </div>
                <ul className="relative z-10 space-y-4 text-sm text-slate-200">
                  {ind.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="vv-mono mt-0.5 text-cyan-400">◆</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
