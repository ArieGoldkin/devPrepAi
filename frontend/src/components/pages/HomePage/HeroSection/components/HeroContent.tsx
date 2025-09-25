import { ArrowRight, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

import { Button } from "@components/ui/button";

export function HeroContent(): ReactElement {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
        <Sparkles className="mr-2 h-3.5 w-3.5" />
        AI-Powered Interview Prep
      </div>

      <div className="space-y-4">
        <h1 className="text-display">
          Master Your Next
          <span className="text-gradient"> Technical Interview</span>
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
