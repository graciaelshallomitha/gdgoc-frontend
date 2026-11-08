import { CodeGlyphIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

const TILES = [
  { label: "Discover", style: "bg-tint" },
  { label: "Connect", style: "bg-mint" },
  { label: "Share", style: "bg-blush" },
];

export function ProjectSection() {
  return (
    <section id="projects" aria-labelledby="projects-title">
      <Container className="grid items-center gap-12 py-[88px] lg:grid-cols-2 lg:gap-16">
        <div
          role="img"
          aria-label="Example project brief: A little less friction. A better campus day. Discover, Connect, Share."
          className="flex flex-col gap-6 rounded-[32px] bg-warm p-8 sm:p-10"
        >
          <div aria-hidden className="flex h-[30px] items-center justify-between">
            <span className="text-xs tracking-[0.01em] text-muted">IDEA → PROTOTYPE</span>
            <CodeGlyphIcon className="text-link" />
          </div>

          <div aria-hidden className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-[26px]">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-gdg-red" />
              <span className="size-2 rounded-full bg-gdg-yellow" />
              <span className="size-2 rounded-full bg-gdg-green" />
            </div>
            <p className="text-[28px] font-bold leading-[1.12] tracking-[-0.004em] sm:text-[32px]">
              A little less friction.
              <br />A better campus day.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {TILES.map((tile) => (
                <span key={tile.label} className={`rounded-xl p-4 text-[13px] font-bold leading-4 text-black ${tile.style}`}>
                  {tile.label}
                </span>
              ))}
            </div>
            <p className="text-[13px] leading-[20px] text-muted">Start with a student need. Build a small, useful solution.</p>
          </div>

          <p aria-hidden className="text-[11px] leading-[14px] text-muted">
            EXAMPLE PROJECT BRIEF • NOT A LAUNCHED PRODUCT
          </p>
        </div>

        <div className="flex flex-col items-start gap-6">
          <SectionLabel>Build something that matters</SectionLabel>
          <h2 id="projects-title" className="t-h2">
            <Lines lines={["Your next project could", "start on campus."]} />
          </h2>
          <p className="text-lg leading-[28px] text-muted">
            What if finding a study partner, sharing resources, or navigating campus felt easier? Small, familiar
            problems can be the beginning of meaningful work.
          </p>
          <p className="leading-[25px] text-muted">
            Bring research, design, and development together. Try an idea, get feedback, and make the next version
            better.
          </p>
          <TextLink href="/#projects">Explore project-based learning</TextLink>
        </div>
      </Container>
    </section>
  );
}