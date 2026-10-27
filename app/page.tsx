import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { LiveDemo } from "@/components/sections/live-demo";
import { Work } from "@/components/sections/work";
import { Industries } from "@/components/sections/industries";
import { TechStack } from "@/components/sections/tech-stack";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <LiveDemo />
      <Work />
      <Industries />
      <TechStack />
      <About />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
