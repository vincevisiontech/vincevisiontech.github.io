import { caseStudies, site } from "@/content/site";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CaseStudies() {
  const [featured, ...others] = caseStudies;

  return (
    <section id="work" className="py-20 lg:py-28">
      <div className="vv-container space-y-12">
        <SectionHeading
          eyebrow="Selected work"
          title="Systems that shipped, brands that trust us."
          description="A featured engagement plus upcoming case studies. Placeholder cards are clearly marked and will be replaced with verified outcomes."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured */}
          <Reveal className="lg:row-span-2">
            <article className="vv-gradient-border h-full">
              <div className="flex h-full flex-col rounded-[1.25rem] bg-slate-950/60 p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-violet-500 text-sm font-bold tracking-[0.12em] text-slate-950">
                    SN
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-50">
                      {featured.client}
                    </h3>
                    <p className="text-xs text-slate-400">{featured.founder}</p>
                  </div>
                </div>

                <h4 className="mt-6 font-display text-lg font-medium text-cyan-100">
                  {featured.title}
                </h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                  {featured.summary}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Services delivered">
                  {featured.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-slate-300"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-slate-800 pt-5">
                  <Button asChild variant="outline" size="sm">
                    <a href={featured.link} target="_blank" rel="noopener noreferrer">
                      Visit {featured.linkLabel}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Placeholders */}
          {others.map((cs, i) => (
            <Reveal key={cs.id} delay={0.1 + i * 0.08}>
              <article
                aria-label={`${cs.client} — placeholder case study`}
                className={cn(
                  "relative h-full rounded-[1.25rem] border border-dashed border-slate-700 bg-slate-950/40 p-6"
                )}
              >
                <span className="vv-placeholder-flag absolute right-4 top-4">Placeholder</span>
                <h3 className="font-display text-lg font-semibold text-slate-200">{cs.client}</h3>
                <h4 className="mt-2 text-sm font-medium text-slate-300">{cs.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{cs.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Capability tags">
                  {cs.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-slate-800 px-2.5 py-0.5 text-[0.66rem] uppercase tracking-[0.14em] text-slate-500"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="text-xs text-slate-500">
          {site.shortName} publishes case studies only with client permission.
        </p>
      </div>
    </section>
  );
}
