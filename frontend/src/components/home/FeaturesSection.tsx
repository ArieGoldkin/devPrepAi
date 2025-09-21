import { Brain, CheckCircle2, Code2, Target } from 'lucide-react';
import type { ReactElement } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function FeaturesSection(): ReactElement {
  return (
    <section className="py-20 border-t">
      <div className="container-xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-headline">
            Everything You Need to <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
            Comprehensive preparation tools designed by engineers who&apos;ve been through the process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="card-interactive">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>AI-Generated Questions</CardTitle>
              <CardDescription>
                Practice with questions tailored to your experience level and target role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0" />
                  Role-specific scenarios
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0" />
                  Adaptive difficulty
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0" />
                  Real interview formats
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-interactive">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Instant Feedback</CardTitle>
              <CardDescription>
                Get detailed analysis and improvement suggestions for every answer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0" />
                  Code quality review
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0" />
                  Best practices tips
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0" />
                  Performance insights
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-interactive">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your improvement with detailed analytics and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0" />
                  Performance metrics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0" />
                  Skill assessment
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0" />
                  Preparation timeline
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}