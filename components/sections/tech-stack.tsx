import { techStack } from "@/content/site";
import { Reveal } from "@/components/shared/reveal";

export function TechStack() {
  const row = [...techStack, ...techStack];

  return (
    <section aria-labelledby="tech-stack-heading" className="border-y border-slate-800/60 bg-slate-950/40 py-20">
      <div className="vv-container space-y-10">
        <Reveal>
          <h2
            id="tech-stack-heading"
            className="vv-mono text-center text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-slate-400"
          >
            {"// Platforms and tools we build and operate with"}
          </h2>
        </Reveal>

        {/* Dual-direction infinite marquees */}
        <div className="space-y-4">
          <div className="vv-marquee vv-marquee-mask">
            <div className="vv-marquee-track items-center gap-10 pr-10">
              {row.map((name, i) => (
                <span
                  key={`a-${name}-${i}`}
                  aria-hidden={i >= techStack.length}
                  className="whitespace-nowrap font-display text-xl font-medium tracking-tight text-slate-400 transition-colors hover:text-cyan-300"
                >
                  {name} <span className="ml-10 text-violet-500/60">✦</span>
                </span>
              ))}
            </div>
          </div>
          <div className="vv-marquee vv-marquee-mask">
            <div className="vv-marquee-track-reverse items-center gap-10 pr-10">
              {row
                .slice()
                .reverse()
                .map((name, i) => (
                  <span
                    key={`b-${name}-${i}`}
                    aria-hidden={i >= techStack.length}
                    className="whitespace-nowrap font-display text-xl font-medium tracking-tight text-slate-500 transition-colors hover:text-violet-300"
                  >
                    {name} <span className="ml-10 text-cyan-500/60">✦</span>
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* CSS 3D orbiting ring */}
        <Reveal className="flex justify-center py-6 [perspective:900px]">
          <div className="vv-ring-3d" style={{ ["--n" as string]: techStack.length }}>
            {techStack.slice(0, 12).map((name, i) => (
              <div key={name} className="vv-ring-item" style={{ ["--i" as string]: i }}>
                <span>{name}</span>
              </div>
            ))}
            <div className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.9)]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
