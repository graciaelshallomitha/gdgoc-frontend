import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

const TIPS = [
  {
    title: "For learning questions",
    body: "Tell us which topic interests you and where you are in your learning journey.",
  },
  {
    title: "For collaborations",
    body: "Share the idea, who it’s for, and how you imagine working with the community.",
  },
  {
    title: "Not sure which category fits?",
    body: "Choose General inquiry. A clear question is always a good starting point.",
  },
];

export function ContactGuidanceSection() {
  return (
    <section aria-labelledby="guidance-title" className="border-t border-line">
      <Container className="grid gap-10 py-[72px] lg:grid-cols-[minmax(0,420fr)_minmax(0,748fr)] lg:gap-x-[min(5.56vw,80px)]">
        <div className="flex flex-col items-start gap-5">
          <SectionLabel>A little guidance</SectionLabel>
          <h2 id="guidance-title" className="t-h40">
            <Lines lines={["Help us understand", "your idea."]} />
          </h2>
          <TextLink href="/#overview">Explore the programs first</TextLink>
        </div>
        <ul>
          {TIPS.map((tip) => (
            <li key={tip.title} className="mb-[26px] border-b border-line pb-2.5 last:mb-0">
              <h3 className="text-[21px] font-bold leading-[1.12] tracking-[-0.004em]">{tip.title}</h3>
              <p className="mt-2.5 leading-[25px] text-muted">{tip.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}