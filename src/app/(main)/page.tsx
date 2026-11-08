import { AboutSection } from "@/components/landing/AboutSection";
import { BelongingSection } from "@/components/landing/BelongingSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FormatsSection } from "@/components/landing/FormatsSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { JourneySection } from "@/components/landing/JourneySection";
import { ProjectSection } from "@/components/landing/ProjectSection";
import { TracksSection } from "@/components/landing/TracksSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TracksSection />
      <FormatsSection />
      <ProjectSection />
      <JourneySection />
      <BelongingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}  