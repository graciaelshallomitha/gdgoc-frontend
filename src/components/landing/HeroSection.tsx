import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Lines } from "@/components/ui/Lines";
import { SectionLabel } from "@/components/ui/SectionHeading";

const PROMISES = [
  { label: "Learn by doing", color: "bg-gdg-blue" },
  { label: "Connect across disciplines", color: "bg-gdg-red" },
  { label: "Build with purpose", color: "bg-gdg-green" },
];

const COMMUNITY_DOTS = ["bg-gdg-red", "bg-gdg-yellow", "bg-gdg-green", "bg-gdg-blue"];

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title">
      {/* Figma: copy column at x=96, artwork ends at x=1376 (64px right margin). */}
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 pb-12 pl-5 pr-5 pt-12 sm:pl-8 sm:pr-8 lg:grid-cols-2 lg:pb-16 lg:pl-12 lg:pr-12 lg:pt-[72px] xl:grid-cols-[minmax(0,620fr)_minmax(0,620fr)] xl:gap-x-10 xl:pl-24 xl:pr-16">
        <div className="flex flex-col gap-7">
          <SectionLabel>GDGoC UGM • 2026/2027</SectionLabel>

          <h1 id="hero-title" className="t-hero">
            <span className="block text-ink">Big ideas.</span>
            <span className="block text-link">Built together.</span>
          </h1>

          <p className="max-w-[620px] text-[21px] leading-[33px] text-muted">
            <Lines
              lines={[
                <>
                  A place for curious minds at <strong className="font-bold">Universitas Gadjah Mada</strong> to learn,
                </>,
                "connect, and build technology that matters.",
              ]}
            />
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#overview" className="w-full sm:w-[262px]">
              Find your learning track
            </ButtonLink>
            <ButtonLink href="/#about" variant="secondary" className="w-full sm:w-[196px]">
              Get to know us
            </ButtonLink>
          </div>

          <div className="flex items-center gap-2.5 text-sm leading-[18px] text-muted">
            <span aria-hidden className="flex -space-x-[3px]"> 
              {COMMUNITY_DOTS.map((color) => (
                <span key={color} className={`size-4 rounded-full border-2 border-white ${color}`} /> 
              ))}
            </span>
            Different backgrounds. A shared curiosity.
          </div>
        </div>

        {/* Exported artwork (node 14:16089). Includes the sticker and the "Built on curiosity" label. */}
        <Image
          src="/images/hero-ilustration.webp"        
          alt="Illustration of a magnifying glass and a code window made of glass tiles, with a note that reads “hello, possibilities_”"
          width={620}
          height={530}
          priority
          className="h-auto w-full max-w-[620px] justify-self-end" 
        />
      </div>

      <div className="border-y border-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-[25px] sm:px-8 lg:px-12 xl:px-24">
          <ul className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-6">
            {PROMISES.map((promise) => (
              <li key={promise.label} className="flex items-center gap-3.5 text-lg font-medium leading-[23px] text-ink">
                <span aria-hidden className={`size-2 shrink-0 ${promise.color}`} />
                {promise.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}