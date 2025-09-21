import {
  ArrowRight,
  Brain,
  Code2,
  Target,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactElement } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function HeroSection(): ReactElement {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />

      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                Leverage AI to practice coding challenges, system design questions, and behavioral scenarios tailored to your target role.
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
                <span className="text-sm text-muted-foreground">Instant Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand-primary" />
                <span className="text-sm text-muted-foreground">Track Progress</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-8">
              <div className="grid grid-cols-2 gap-4">
                <Card className="card-feature">
                  <CardContent className="pt-6">
                    <Code2 className="h-8 w-8 text-primary mb-2" />
                    <div className="text-2xl font-bold">500+</div>
                    <p className="text-xs text-muted-foreground">Practice Questions</p>
                  </CardContent>
                </Card>
                <Card className="card-feature">
                  <CardContent className="pt-6">
                    <Brain className="h-8 w-8 text-accent mb-2" />
                    <div className="text-2xl font-bold">AI</div>
                    <p className="text-xs text-muted-foreground">Powered Analysis</p>
                  </CardContent>
                </Card>
                <Card className="card-feature">
                  <CardContent className="pt-6">
                    <Target className="h-8 w-8 text-secondary mb-2" />
                    <div className="text-2xl font-bold">95%</div>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </CardContent>
                </Card>
                <Card className="card-feature">
                  <CardContent className="pt-6">
                    <Users className="h-8 w-8 text-brand-success mb-2" />
                    <div className="text-2xl font-bold">10k+</div>
                    <p className="text-xs text-muted-foreground">Active Users</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-secondary/20 to-primary/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}