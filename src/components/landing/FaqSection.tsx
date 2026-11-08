import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { FAQS } from "@/content/landing";
import { FaqAccordion } from "./FaqAccordion";

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title">
      <Container className="grid gap-10 py-[88px] lg:grid-cols-[minmax(0,400fr)_minmax(0,752fr)] lg:gap-x-[min(6.67vw,96px)]">
        <div className="flex flex-col items-start gap-5">
          <SectionLabel>A few good questions</SectionLabel>
          <h2 id="faq-title" className="t-h2">
            <span className="block">Wondering</span>
            <span className="block">where</span>
            <span className="block">to begin?</span>
          </h2>
          <TextLink href="/contact">Ask us a question</TextLink>
        </div>
        <FaqAccordion items={FAQS} />
      </Container>
    </section>
  );
}