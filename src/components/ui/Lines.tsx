import type { ReactNode } from "react";

/**
 * Renders text as explicit lines on desktop (so line breaks match Figma exactly)
 * while letting it wrap naturally on smaller screens.
 */
export function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <span key={index} className="min-[1440px]:block min-[1440px]:whitespace-nowrap">
          {line}
          {index < lines.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}