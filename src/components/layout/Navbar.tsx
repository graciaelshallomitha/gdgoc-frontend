import { FALLBACK_NAV } from "@/lib/constants";
import { getNavigation } from "@/services/gdgoc-api";
import { NavbarView } from "./NavbarView";

/** Server component: fetches nav items, falls back to static links on failure. */
export async function Navbar() {
  const result = await getNavigation();
  const items = result.ok && result.data.length > 0 ? result.data : FALLBACK_NAV;
  return <NavbarView items={items} />;
}