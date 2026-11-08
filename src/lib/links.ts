/**
 * The API's navigation points at /about and /overview, but this build only
 * implements Landing (/) and Contact (/contact). Instead of shipping dead
 * links (404), those two routes are mapped to sections on the Landing page.
 */
const ROUTE_OVERRIDES: Record<string, string> = {
  "/about": "/#about",
  "/overview": "/#overview",
};

export function resolveHref(href: string): string {
  const [path] = href.split("?");
  return ROUTE_OVERRIDES[path] ?? href;
}

/** A nav item is "active" when it points at the current route (hash links never are). */
export function isActiveHref(href: string, pathname: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
