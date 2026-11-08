import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

const ATTRIBUTES = ["Student-led", "Peer-powered", "Curiosity-first"];

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title">
      <Container className="grid gap-10 py-[88px] lg:grid-cols-[minmax(0,586fr)_minmax(0,662fr)] lg:gap-x-0">
        <div className="flex flex-col items-start gap-5">
          <SectionLabel>A campus. A community.</SectionLabel>
          <h2 id="about-title" className="t-h2">
            <Lines lines={["Not just learning tech.", "Finding your people."]} />
          </h2>
          <TextLink href="/#about">More about GDGoC UGM</TextLink>
        </div>

        <div className="flex flex-col gap-6 text-muted">
          <p className="text-[21px] leading-[33px]">
            <Lines
              lines={[
                "Google Developer Groups on Campus, Universitas Gadjah Mada",
                <>
                  brings students together around one simple idea: we can go <strong className="font-bold">further</strong>
                </>,
                <>
                  when we <strong className="font-bold">learn</strong> with each other.
                </>,
              ]}
            />
          </p>
          <p className="text-lg leading-[28px]">
            <Lines
              lines={[
                "From your first line of code to your next product idea, there’s room to ask",
                "questions, share what you know, and try something new.",
              ]}
            />
          </p>
          <ul className="flex flex-wrap gap-3">
            {ATTRIBUTES.map((attribute) => (
              <li key={attribute} className="rounded-full bg-surface px-3.5 py-2 text-[13px] font-bold leading-4 text-muted">
                {attribute}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}