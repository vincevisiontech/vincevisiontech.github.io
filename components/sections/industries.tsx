"use client";

import { industries } from "@/content/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Industries() {
  return (
    <section id="industries" className="border-y border-slate-800/60 bg-slate-950/40 py-20 lg:py-28">
      <div className="vv-container space-y-10">
        <SectionHeading
          eyebrow="Industry focus"
          title="Designed for regulated, high-growth and impact-driven sectors."
          description="From early-stage scaleups to established enterprises, VinceVision brings patterns from both African and UK markets to every engagement."
        />

        <Tabs defaultValue={industries[0].id} className="space-y-2">
          <TabsList aria-label="Industries">
            {industries.map((ind) => (
              <TabsTrigger key={ind.id} value={ind.id}>
                {ind.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {industries.map((ind) => (
            <TabsContent key={ind.id} value={ind.id}>
              <div className="vv-glass grid gap-8 p-7 md:grid-cols-[1fr,1.1fr] md:p-10">
                <div>
                  <h3 className="font-display text-xl font-semibold text-slate-50">{ind.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{ind.summary}</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-200">
                  {ind.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                      />
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
