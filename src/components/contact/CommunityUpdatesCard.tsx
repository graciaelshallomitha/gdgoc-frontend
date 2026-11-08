import { SectionLabel } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";

interface CommunityUpdatesCardProps {
  handle: string; // e.g. "@gdgoc.ugm"
  url: string;
}

export function CommunityUpdatesCard({ handle, url }: CommunityUpdatesCardProps) {
  return (
    <aside aria-labelledby="updates-title" className="flex flex-col items-start gap-4 rounded-3xl bg-warm p-[26px]">
      <SectionLabel>Stay curious, stay connected</SectionLabel>
      <h2 id="updates-title" className="text-[26px] font-bold leading-[1.12] tracking-[-0.004em]">
        Looking for community updates?
      </h2>
      <p className="leading-[25px] text-muted">
        Follow <strong className="font-bold">{handle}</strong> for learning opportunities and what’s happening in the
        community.
      </p>
      <TextLink href={url} external>
        Find {handle}
      </TextLink>
    </aside>
  );
} 