import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { CaseStudies } from "@/components/sections/case-studies";
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
      <CaseStudies />
      <Industries />
      <TechStack />
      <About />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
