import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

type Variant = "primary" | "secondary";

/** Figma "Action": 52px tall, 8px radius, 24px side padding, 16px label/arrow gap. */
export function buttonStyles(variant: Variant = "primary", className = "") {
  const base =
    "inline-flex h-[52px] items-center justify-between gap-4 whitespace-nowrap rounded-lg px-6 text-base font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";
  const variants: Record<Variant, string> = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary: "border border-line bg-white text-link hover:bg-tint",
  };
  return `${base} ${variants[variant]} ${className}`;
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonStyles(variant, className)}>
      {children}
      <ArrowRightIcon className="shrink-0" />
    </Link>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonStyles(variant, className)} {...props}>
      {children}
    </button>
  );
}