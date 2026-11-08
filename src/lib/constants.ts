import type { NavItem } from "@/types/gdgoc";

/** Used when /navigation cannot be reached, so the site chrome never disappears. */
export const FALLBACK_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Overview", href: "/overview" },
  { label: "Contact", href: "/contact" },
];

export const FALLBACK_TAGLINE = "Learn together. Build together.";
export const FALLBACK_INSTAGRAM = "@gdgoc.ugm";

/** Optional: the Figma footer shows a YouTube icon, but the API has no YouTube handle. */
export const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "";