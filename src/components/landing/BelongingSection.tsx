import { SparkIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";

/** Static banner from Figma. (The API's "values" belong to the About/Overview design.) */
export function BelongingSection() {
  return (
    <section aria-labelledby="belonging-title" className="bg-mint">
      <Container className="flex items-center gap-6 py-16 lg:gap-16">
        <SparkIcon className="size-14 shrink-0 text-gdg-green sm:size-[100px]" />
        <div className="flex flex-col gap-4">
          <h2 id="belonging-title" className="t-h40">
            <Lines lines={["Different majors. Different starting points.", "A place for all of them."]} />
          </h2>
          <p className="text-lg leading-[28px] text-muted min-[1440px]:whitespace-nowrap">
            You don’t have to be the most experienced person in the room. Curiosity, kindness, and a willingness to
            learn are a good place to start.
          </p>
        </div>
      </Container>
    </section>
  );
}