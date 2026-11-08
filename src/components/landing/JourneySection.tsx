import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { JOURNEY } from "@/content/landing";

export function JourneySection() {
  return (
    <section id="journey" aria-labelledby="journey-title">
      <Container className="flex flex-col gap-10 pb-[88px] pt-2">
        <div className="flex flex-col gap-5">
          <SectionLabel>Make your first move</SectionLabel>
          <h2 id="journey-title" className="t-h2">
            <Lines lines={["You don’t need to have it all", "figured out."]} />
          </h2>
        </div>

        {/* A real sequence, so an ordered list is the right semantics. */}
        <ol className="grid gap-10 md:grid-cols-3">
          {JOURNEY.map((step) => (
            <li key={step.id} className="flex flex-col gap-5">
              <p aria-hidden className="font-inter text-[44px] font-bold leading-[1.21] text-link">
                {step.number}
              </p>
              <div aria-hidden className="h-px bg-line" />
              <h3 className="text-[25px] font-bold leading-[1.12] tracking-[-0.004em]">{step.title}</h3>
              <p className="leading-[25px] text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}