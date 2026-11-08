import Image from "next/image";
import Link from "next/link";

/**
 * Logo adalah SATU aset (mark + teks "Google Developer Groups On Campus •
 * Universitas Gadjah Mada"), persis seperti di Figma.
 */
export function Logo({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  // Ukuran tampil di desain: navbar 346×39, footer 382×43.
  const width = size === "lg" ? 382 : 346;
  const height = size === "lg" ? 43 : 39;

  return (
    <Link href="/" className={`inline-block ${className}`} aria-label="GDGoC UGM home">
      <Image
        src="/images/gdgoc-logo.webp"
        alt="Google Developer Groups On Campus, Universitas Gadjah Mada"
        width={width}
        height={height}
        quality={90}
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