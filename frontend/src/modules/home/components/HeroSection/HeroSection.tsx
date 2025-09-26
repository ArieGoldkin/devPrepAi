import type { ReactElement } from "react";

import { HeroContent } from "./components/HeroContent";
import { HeroStats } from "./components/HeroStats";

export function HeroSection(): ReactElement {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />

      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
          <HeroStats />
        </div>
      </div>
    </section>
  );
}
