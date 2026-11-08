"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ArrowRightIcon } from "@/components/icons";
import { buttonStyles } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { isActiveHref, resolveHref } from "@/lib/links";
import type { NavItem } from "@/types/gdgoc";

/** Client component: needs the current pathname (active link) and the mobile menu state. */
export function NavbarView({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = items.map((item) => {
    const href = resolveHref(item.href);
    return { label: item.label, href, active: isActiveHref(href, pathname) };
  });

  // Figma "Navigation item": 16px, 14/20 padding, pill. Active = Bold + blue on tint.
  const linkStyles = (active: boolean) =>
    `flex h-12 items-center rounded-full px-5 text-base transition-colors ${
      active ? "bg-tint font-bold text-link" : "text-muted hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[103px] lg:px-12 xl:px-16">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} aria-current={link.active ? "page" : undefined} className={linkStyles(link.active)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/#overview" className={`${buttonStyles("primary", "w-[197px]")} hidden lg:inline-flex`}>
          Find your track
          <ArrowRightIcon className="shrink-0" />
        </Link>

        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-line lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </div>

      {menuOpen ? (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-white px-5 pb-6 pt-3 sm:px-8 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={linkStyles(link.active)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#overview" onClick={() => setMenuOpen(false)} className={buttonStyles("primary", "mt-4 w-full")}>
            Find your track
            <ArrowRightIcon className="shrink-0" />
          </Link>
        </nav>
      ) : null}
    </header>
  );
}