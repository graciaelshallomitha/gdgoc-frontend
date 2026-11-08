import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons"; 

interface TextLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

/** Figma text link: 16px Medium, link blue, 20px arrow 12px away. */
export function TextLink({ href, children, external = false, className = "" }: TextLinkProps) {
  const styles = `inline-flex items-center gap-3 text-base font-medium leading-5 text-link underline-offset-4 hover:underline ${className}`;
  const content = (
    <>
      {children}
      <ArrowRightIcon className="shrink-0" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={styles}>
      {content}
    </Link>
  );
}