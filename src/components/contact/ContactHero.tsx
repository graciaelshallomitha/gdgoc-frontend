import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { SectionLabel } from "@/components/ui/SectionHeading";

export function ContactHero() {
  return (
    <section aria-labelledby="contact-title">
      <Container className="flex flex-col gap-6 pb-14 pt-12 lg:pt-[72px]">
        <SectionLabel>Contact • Let’s connect</SectionLabel>
        <h1 id="contact-title" className="t-title">
          Good things start with <span className="text-link">hello.</span>
        </h1>
        <p className="max-w-[770px] text-[22px] leading-[34px] text-muted">
          <Lines lines={["A question, a collaboration, or an idea for the community? Tell us what’s on", "your mind."]} />
        </p>
      </Container>
    </section>
  );
}