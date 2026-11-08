import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="t-label flex items-center gap-2.5">
      <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-gdg-blue" />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
  titleClassName?: string;
}

/** Label + heading (+ description) with the 18px rhythm used across the Figma sections. */
export function SectionHeading({
  label,
  title,
  description,
  id,
  className = "",
  titleClassName = "t-h2 max-w-[800px]",
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-[18px] ${className}`}>
      <SectionLabel>{label}</SectionLabel>
      <h2 id={id} className={titleClassName}>
        {title}
      </h2>
      {description ? <p className="max-w-[800px] text-lg leading-[28px] text-muted">{description}</p> : null}
    </div>
  );
}