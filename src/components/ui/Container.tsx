import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Matches the Figma grid: 1440px frame with 96px side margins. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-24 ${className}`}>
      {children}
    </div>
  );
}