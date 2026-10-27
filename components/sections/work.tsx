import { caseStudies } from "@/content/site";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { TiltCard } from "@/components/shared/tilt-card";
import { cn } from "@/lib/utils";

export function Work() {
  const [featured, ...classified] = caseStudies;

  return (
    <section id="work" className="border-y border-slate-800/60 bg-slate-950/40 py-20 lg:py-28">
      <div className="vv-container space-y-12">
        <SectionHeading
          eyebrow="Field operations // deployed work"
          title="Systems that shipped. Files still classified."
          description="One public engagement with a live link, plus two operations awaiting client clearance."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="lg:row-span-2">
            <TiltCard className="vv-holo h-full p-8">
              <article className="relative z-10 flex h-full flex-col">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 font-display text-sm font-bold text-slate-950">
                    SN
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-50">{featured.client}</h3>
                    <p className="vv-mono text-[0.66rem] uppercase tracking-[0.18em] text-slate-400">
                      {featured.founder}
                    </p>
                  </div>
                </div>

                <h4 className="mt-7 font-display text-lg font-medium text-cyan-100">{featured.title}</h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{featured.summary}</p>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities deployed">
                  {featured.services.map((s) => (
                    <li
                      key={s}
                      className="vv-mono rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-slate-300"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vv-mono mt-7 inline-flex items-center gap-2 self-start rounded-full border border-cyan-400/50 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-cyan-200 transition-all hover:bg-cyan-500/15"
                >
                  Open live deployment ↗
                </a>
              </article>
            </TiltCard>
          </Reveal>

          {classified.map((cs, i) => (
            <Reveal key={cs.id} delay={0.1 + i * 0.08}>
              <article
                aria-label={`${cs.client} — classified case study placeholder`}
                className={cn(
                  "group relative h-full rounded-[1.25rem] border border-dashed border-slate-700 bg-slate-950/40 p-7 transition-colors hover:border-violet-400/40"
                )}
              >
                <span className="vv-mono vv-placeholder-flag absolute right-5 top-5">Classified</span>
                <p className="vv-mono text-[0.6rem] uppercase tracking-[0.26em] text-slate-500">
                  {`File ${String(i + 1).padStart(2, "0")} // clearance pending`}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-slate-200">{cs.client}</h3>
                <h4 className="mt-2 text-sm font-medium text-slate-300">
                  <span className="vv-redacted">{cs.title}</span>
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  <span className="vv-redacted">{cs.summary}</span>
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cs.services.map((s) => (
                    <li
                      key={s}
                      className="vv-mono rounded-full border border-slate-800 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-slate-500"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
