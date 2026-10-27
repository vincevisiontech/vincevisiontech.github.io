import { techStack } from "@/content/site";
import { Reveal } from "@/components/shared/reveal";

export function TechStack() {
  const items = [...techStack, ...techStack];
  return (
    <section aria-labelledby="tech-stack-heading" className="py-16 lg:py-20">
      <div className="vv-container">
        <Reveal>
          <h2
            id="tech-stack-heading"
            className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-slate-400"
          >
            Platforms and tools we build and operate with
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="vv-marquee vv-marquee-mask mt-8 overflow-hidden">
          <div className="vv-marquee-track items-center gap-10 pr-10">
            {items.map((name, i) => (
              <span
                key={`${name}-${i}`}
                aria-hidden={i >= techStack.length}
                className="whitespace-nowrap font-display text-xl font-medium tracking-tight text-slate-400 transition-colors hover:text-cyan-300"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
