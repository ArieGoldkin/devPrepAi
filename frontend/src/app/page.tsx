import type { ReactElement } from "react";

import { AppLayout } from "@components/layout/AppLayout";
import { CTASection } from "@components/pages/HomePage/CTASection";
import { FeaturesSection } from "@components/pages/HomePage/FeaturesSection";
import { HeroSection } from "@components/pages/HomePage/HeroSection";
import { TechStackSection } from "@components/pages/HomePage/TechStackSection";

export default function Home(): ReactElement {
  return (
    <AppLayout>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <TechStackSection />
    </AppLayout>
  );
}
