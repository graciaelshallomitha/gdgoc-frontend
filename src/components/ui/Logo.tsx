import Image from "next/image";
import Link from "next/link";

/**
 * The logo is ONE exported asset (mark + "Google Developer Groups / On Campus • Universitas
 * Gadjah Mada" text), exactly as in Figma. Replace /public/images/logo.svg with the export
 * of node 14:16049 (see ASSETS.md).
 */
export function Logo({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  const width = size === "lg" ? 382 : 346;
  const height = size === "lg" ? 43 : 39;
  return (
    <Link href="/" className={`inline-block ${className}`} aria-label="GDGoC UGM home">
      <Image
        src="/images/gdgoc-logo.webp"
        alt="Google Developer Groups On Campus, Universitas Gadjah Mada"
        width={width}
        height={height}
        priority
        className={size === "lg" ? "h-auto w-[300px] sm:w-[382px]" : "h-auto w-[230px] sm:w-[346px]"}
      />
    </Link>
  );
}

export function BrandBar() {
  return (
    <div aria-hidden className="flex h-1 w-[160px]">
      <span className="flex-1 bg-gdg-blue" />
      <span className="flex-1 bg-gdg-red" />
      <span className="flex-1 bg-gdg-yellow" />
      <span className="flex-1 bg-gdg-green" />
    </div>
  );
}