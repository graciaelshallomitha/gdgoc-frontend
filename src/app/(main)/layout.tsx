import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { NavbarView } from "@/components/layout/NavbarView";
import { Navbar } from "@/components/layout/Navbar";
import { FALLBACK_NAV } from "@/lib/constants";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      {/* While nav data streams in, show the static links so the header never jumps. */}
      <Suspense fallback={<NavbarView items={FALLBACK_NAV} />}>
        <Navbar />
      </Suspense>
      <main id="main">{children}</main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
} 