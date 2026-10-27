import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { VinceConsole } from "@/components/chat/vince-console";

export function LiveDemo() {
  return (
    <section id="demo" className="py-20 lg:py-28">
      <div className="vv-container grid items-center gap-12 lg:grid-cols-[0.9fr,1.1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Live demo // Vince Core"
            title="Describe the problem. Watch the architecture answer."
            description="A scoped assistant trained on VinceVision's actual services, process, and regions. It recommends the right module — AI, cloud, security, or platform — and how an engagement would start. On static hosting it gracefully hands off to email or WhatsApp."
          />
          <ul className="vv-mono mt-8 space-y-3 text-xs text-slate-400">
            <li>▸ Scoped strictly to VinceVision company questions</li>
            <li>▸ Streamed responses, rate-limited, no public data forms</li>
            <li>▸ Press “/” anywhere to summon the console</li>
          </ul>
        </Reveal>
        <Reveal delay={0.12}>
          <VinceConsole variant="section" />
        </Reveal>
      </div>
    </section>
  );
}
