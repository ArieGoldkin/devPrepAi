import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

import { Button } from "@shared/ui/button";

export function HeroContent(): ReactElement {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-card inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-gray-200">
        <div className="mr-2 h-2 w-2 rounded-full bg-green-400 animate-pulse-glow" />
        AI-Powered Interview Preparation
      </div>

      <div className="space-y-4">
        <h1 className="text-display">
          <span className="text-glow-strong">Master Your Next</span>
          <br />
          <span className="gradient-text">Technical Interview</span>
        </h1>
        <p className="text-subtitle text-muted-foreground max-w-lg">
          Leverage AI to practice coding challenges, system design questions,
          and behavioral scenarios tailored to your target role.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/practice">
          <Button size="lg" variant="accent" className="w-full sm:w-auto">
            Start Practice Session
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Link href="/demo">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Watch Demo
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-8 pt-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-brand-success" />
          <span className="text-sm text-muted-foreground">
            Instant Feedback
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-primary" />
          <span className="text-sm text-muted-foreground">Track Progress</span>
        </div>
      </div>
    </div>
  );
}
