import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lines } from "@/components/ui/Lines";
import { TextLink } from "@/components/ui/TextLink";
import { TRACKS, type TrackContent } from "@/content/landing";

function TrackCard({ track }: { track: TrackContent }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
      <div className={`relative h-[232px] ${track.tint}`}>
        {/* Exported "Glass track artwork" (see ASSETS.md). */}
        <Image
          src={track.artwork.src}
          alt=""
          width={track.artwork.size}
          height={track.artwork.size}
          className="absolute left-1/2 top-[-4px] -translate-x-1/2"
        />
      </div>
      <div className="flex flex-col gap-[18px] p-7">
        <p className="text-[11px] font-medium uppercase leading-[14px] tracking-[0.01em] text-link">{track.theme}</p>
        <h3 className="text-[28px] font-bold leading-[1.12] tracking-[-0.004em]">{track.name}</h3>
        <p className="leading-[25px] text-muted">{track.description}</p>
        <div aria-hidden className="h-px bg-line" />
        <p className="text-[13px] leading-[1.5] text-muted">{track.topics.join(" · ")}</p>
        <TextLink href="/#overview" className="self-start">
          Explore this track
        </TextLink>
      </div>
    </li>
  );
}

export function TracksSection() {
  return (
    <section id="overview" aria-labelledby="tracks-title">
      <Container className="pb-[88px] pt-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="tracks-title"
            label="Find your starting point"
            title={<Lines lines={["Many interests. One shared", "journey."]} />}
            description="Follow what excites you. Explore a track, then connect the dots with others."
          />
          <TextLink href="/#overview" className="shrink-0">
            See the overview
          </TextLink>
        </div>

        <ul className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TRACKS.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </ul>
      </Container>
    </section>
  );
}