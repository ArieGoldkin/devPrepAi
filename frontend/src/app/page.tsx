import type { ReactElement } from 'react';

import { CTASection } from '@/components/home/CTASection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HeroSection } from '@/components/home/HeroSection';
import { NavigationHeader } from '@/components/home/NavigationHeader';
import { TechStackSection } from '@/components/home/TechStackSection';

export default function Home(): ReactElement {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <TechStackSection />
    </div>
  );
}