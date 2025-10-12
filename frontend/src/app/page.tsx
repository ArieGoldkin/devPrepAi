import type { ReactElement } from "react";

import { CTASection } from "@modules/home/components/CTASection";
import { FeaturesSection } from "@modules/home/components/FeaturesSection";
import { HeroSection } from "@modules/home/components/HeroSection";
import { HowItWorksSection } from "@modules/home/components/HowItWorksSection";
import { TechStackSection } from "@modules/home/components/TechStackSection";
import { AppLayout } from "@shared/components/layout/AppLayout";

export default function Home(): ReactElement {
  return (
    <AppLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TechStackSection />
      <CTASection />
    </AppLayout>
  );
}
