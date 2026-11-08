import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-title">
      <Container className="py-16">
        <div className="flex flex-col gap-8 rounded-[32px] bg-tint p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-4">
            <SectionLabel>Your next chapter</SectionLabel>
            <h2 id="cta-title" className="t-h2-44">
              <Lines lines={["Bring your curiosity.", "We’ll build from there."]} />
            </h2>
            <p className="text-lg leading-[28px] text-muted">
              Find a learning track, meet a collaborator, or start a conversation.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-4">
            <ButtonLink href="/#overview" className="w-full sm:w-[241px]">
              Explore the overview
            </ButtonLink>
            <TextLink href="/contact">Talk to the community</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}