import Link from "next/link";
import { InstagramIcon, YoutubeIcon } from "@/components/icons";
import { BrandBar, Logo } from "@/components/ui/Logo";
import { FALLBACK_INSTAGRAM, FALLBACK_NAV, FALLBACK_TAGLINE, YOUTUBE_URL } from "@/lib/constants";
import { stripAt } from "@/lib/format";
import { resolveHref } from "@/lib/links";
import { getNavigation, getStats } from "@/services/gdgoc-api";

export async function Footer() {
  const [navResult, statsResult] = await Promise.all([getNavigation(), getStats()]);

  const items = navResult.ok && navResult.data.length > 0 ? navResult.data : FALLBACK_NAV;
  const stats = statsResult.ok ? statsResult.data : null;

  const instagram = stats?.social.instagram ?? FALLBACK_INSTAGRAM;
  const instagramUrl = `https://instagram.com/${stripAt(instagram)}`;
  const tagline = stats?.tagline ?? FALLBACK_TAGLINE;
  const university = stats?.university ?? "Universitas Gadjah Mada";

  const iconStyles = "text-muted transition-colors hover:text-ink";

  return (
    <footer className="bg-surface">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-7 pt-14 sm:px-8 lg:px-12 xl:px-24">
        {/* Columns sit at x=96 / 755 / 1084 in the 1440 frame: 480 + 150 + 260 with space-between. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,480px)_150px_minmax(0,260px)] lg:justify-between">
          <div className="flex flex-col gap-6">
            <Logo size="lg" />
            <p className="max-w-[480px] text-base leading-[25px] text-muted min-[1440px]:whitespace-nowrap">
              A student community for curious minds, shared learning, and
              <br className="hidden min-[1440px]:block" /> technology with purpose.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3.5">
            <h2 className="text-base font-bold leading-5 text-black">Explore</h2>
            <ul className="flex flex-col gap-3.5 leading-[19px]">
              {items.map((item) => (
                <li key={item.label}>
                  <Link href={resolveHref(item.href)} className="text-[15px] leading-[19px] text-muted hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold leading-5 text-black">Keep in the loop</h2>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-lg leading-[23px] text-link hover:underline">
              {instagram}
            </a>
            <ul className="flex gap-4">
              <li>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={iconStyles}>
                  <InstagramIcon />
                </a>
              </li>
              <li>
                {YOUTUBE_URL ? (
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={iconStyles}>
                    <YoutubeIcon />
                  </a>
                ) : (
                  <span aria-hidden className="text-muted">
                    <YoutubeIcon />
                  </span>
                )}
              </li>
            </ul>
            <p className="text-sm leading-[22px] text-muted">{tagline}</p>
          </div>
        </div>

        <hr className="mt-10 border-line" />
        <div className="mt-10 flex flex-col gap-2 text-xs leading-[15px] text-muted sm:flex-row sm:justify-between">
          <p>© GDGoC {university} • 2026/2027</p>
          <p>Made for the campus. Open to possibilities.</p>
        </div>
        <div className="mt-10">
          <BrandBar />
        </div>
      </div>
    </footer>
  );
}