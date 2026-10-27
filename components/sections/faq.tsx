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
    <section id="faq" className="py-20 lg:py-28">
      <div className="vv-container grid gap-10 lg:grid-cols-[0.9fr,1.4fr] lg:items-start">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions leaders ask before engaging us."
          description="Can't find your answer? Email or WhatsApp VinceVision directly — a decision-maker replies, not a support queue."
        />

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q} className="rounded-2xl">
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
