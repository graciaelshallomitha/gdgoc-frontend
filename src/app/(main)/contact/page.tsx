import type { Metadata } from "next";
import { ContactGuidanceSection } from "@/components/contact/ContactGuidanceSection";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactWorkspace } from "@/components/contact/ContactWorkspace";
import { Container } from "@/components/ui/Container";
import { EmptyState, ErrorState } from "@/components/ui/StateMessage";
import { FALLBACK_INSTAGRAM } from "@/lib/constants";
import { stripAt } from "@/lib/format";
import { getInquiryCategories, getStats } from "@/services/gdgoc-api";

export const metadata: Metadata = {
  title: "Contact – GDGoC UGM",
  description: "A question, a collaboration, or an idea for the community? Tell GDGoC UGM what's on your mind.",
};

export default async function ContactPage() {
  // Independent requests run in parallel.
  const [categoriesResult, statsResult] = await Promise.all([getInquiryCategories(), getStats()]);

  const instagram = statsResult.ok ? statsResult.data.social.instagram : FALLBACK_INSTAGRAM;
  const instagramUrl = `https://instagram.com/${stripAt(instagram)}`;

  return (
    <>
      <ContactHero />
      {!categoriesResult.ok ? (
        <Container className="pb-20">
          <ErrorState title="We couldn't load the contact form." description={categoriesResult.error} />
        </Container>
      ) : categoriesResult.data.length === 0 ? (
        <Container className="pb-20">
          <EmptyState title="Contact topics aren't available yet." description="Please check back soon." />
        </Container>
      ) : (
        <ContactWorkspace categories={categoriesResult.data} instagramHandle={instagram} instagramUrl={instagramUrl} />
      )}
      <ContactGuidanceSection />
    </>
  );
}