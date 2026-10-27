import { processSteps } from "@/content/site";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export function Process() {
  return (
    <section id="process" className="border-y border-slate-800/60 bg-slate-950/40 py-20 lg:py-28">
      <div className="vv-container space-y-14">
        <SectionHeading
          eyebrow="How we work"
          title="A disciplined four-step path from brief to operating system."
        />

        <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent lg:block"
          />
          {processSteps.map((item, i) => (
            <Reveal as="li" key={item.step} delay={i * 0.1} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-slate-950 font-display text-lg font-semibold text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.18)]">
                {item.step}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-slate-50">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.summary}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
