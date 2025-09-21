import type { ReactElement } from "react";

import { CTASection } from "@components/home/CTASection";
import { FeaturesSection } from "@components/home/FeaturesSection";
import { HeroSection } from "@components/home/HeroSection";
import { TechStackSection } from "@components/home/TechStackSection";
import { AppLayout } from "@components/layout/AppLayout";

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
