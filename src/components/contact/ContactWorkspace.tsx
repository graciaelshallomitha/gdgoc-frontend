"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import type { InquiryCategory } from "@/types/gdgoc";
import { CommunityUpdatesCard } from "./CommunityUpdatesCard";
import { ContactForm } from "./ContactForm"; 
import { InquiryCategoryList } from "./InquiryCategoryList";

interface ContactWorkspaceProps {
  categories: InquiryCategory[];
  instagramHandle: string;
  instagramUrl: string;
}

/**
 * Single source of truth for the selected category. The cards and the form's dropdown
 * both read `selectedId` and write through `setSelectedId`.
 */
export function ContactWorkspace({ categories, instagramHandle, instagramUrl }: ContactWorkspaceProps) {
  const [selectedId, setSelectedId] = useState(categories[0]?.id ?? "");

  return (
    <section aria-label="Contact form">
      <Container className="grid items-start gap-10 pb-20 lg:grid-cols-[minmax(0,456fr)_minmax(0,728fr)] lg:gap-x-[min(4.45vw,64px)]">
        <div className="flex flex-col gap-8">
          <InquiryCategoryList categories={categories} selectedId={selectedId} onSelect={setSelectedId} />
          <CommunityUpdatesCard handle={instagramHandle} url={instagramUrl} />
        </div>
        <ContactForm categories={categories} selectedCategoryId={selectedId} onCategoryChange={setSelectedId} />
      </Container>
    </section>
  );
} 