import { faqs } from "@/content/site";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="faq" className="border-y border-slate-800/60 bg-slate-950/40 py-20 lg:py-28">
      <div className="vv-container grid gap-10 lg:grid-cols-[0.9fr,1.4fr] lg:items-start">
        <SectionHeading
          eyebrow="Query terminal // FAQ"
          title="Questions leaders ask before opening a channel."
          description="No answer here? Email or WhatsApp directly — a decision-maker responds, not a ticket queue."
        />

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={faq.q}
              className="vv-holo rounded-none border-0 px-5"
            >
              <AccordionTrigger className="vv-mono text-left text-[0.82rem] normal-case tracking-normal">
                <span className="text-cyan-400">{String(i + 1).padStart(2, "0")} ~$</span>{" "}
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="relative z-10 text-slate-300">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
