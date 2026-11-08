import type { ApiEnvelope, CommunityStats, InquiryCategory, NavItem } from "@/types/gdgoc";

const API_BASE_URL = process.env.API_BASE_URL ?? "https://gdgoc-ugm-api.vercel.app/api";

/** Content changes rarely, so cache for five minutes. */
const REVALIDATE_SECONDS = 300;

/**
 * Every service returns a Result instead of throwing, so each caller decides how to
 * render a failure (fallback links, error state) without taking the whole page down.
 */
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function request<T>(path: string): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return { ok: false, error: `The server responded with status ${response.status}.` };
    }

    const body = (await response.json()) as ApiEnvelope<T>;
    if (!body.success) {
      return { ok: false, error: "The API reported an unsuccessful response." };
    }
    return { ok: true, data: body.data };
  } catch {
    return { ok: false, error: "We couldn't reach the server." };
  }
}

/*
 * Only endpoints whose data matches the Figma pages being built are used:
 *  - /navigation          -> Navbar + Footer links (Home, About, Overview, Contact)
 *  - /stats               -> Footer (Instagram handle, tagline)
 *  - /inquiry-categories  -> Contact page (cards + dropdown)
 * /tracks, /formats, /journey, /values and /faqs carry the Overview/About copy, which is
 * different from the Landing design, so the Landing page uses Figma content instead.
 */
export const getNavigation = () => request<NavItem[]>("/navigation");
export const getStats = () => request<CommunityStats>("/stats");
export const getInquiryCategories = () => request<InquiryCategory[]>("/inquiry-categories");