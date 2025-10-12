import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

import { Button } from "@shared/ui/button";

export function CTASection(): ReactElement {
  return (
    <section className="py-20 border-t">
      <div className="container-md">
        <div className="glass-card relative p-8 md:p-12 text-center overflow-hidden rounded-2xl">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-brand-secondary/20 to-brand-accent/20 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 space-y-6">
            {/* Icon with gradient background and glow */}
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 backdrop-blur neon-glow">
              <Zap className="h-8 w-8 text-white icon-glow" />
            </div>

            {/* Headline with strong glow */}
            <div className="space-y-2">
              <h3 className="text-headline text-white text-glow-strong">
                Ready to Ace Your Interview?
              </h3>
              <p className="text-lg text-white/90 max-w-xl mx-auto">
                Join thousands of developers who&apos;ve successfully prepared
                with DevPrep AI
              </p>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/practice">
                <Button size="lg" className="btn-primary-glass">
                  Start Free Practice
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" className="btn-glass text-white">
                  View Demo First
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
