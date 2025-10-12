import React from "react";

import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

export function InteractiveCards(): React.JSX.Element {
  return (
    <section className="mb-16">
      <h2 className="text-headline mb-8">Interactive Cards</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-brand transition-shadow">
          <CardHeader>
            <CardTitle>Practice Session</CardTitle>
            <CardDescription>Start a coding practice session</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body text-muted-foreground mb-4">
              Practice coding interviews with AI-generated questions
            </p>
            <Button variant="brand" size="sm">
              Start Practice
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-brand transition-shadow">
          <CardHeader>
            <CardTitle>Assessment Mode</CardTitle>
            <CardDescription>Take a timed coding assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body text-muted-foreground mb-4">
              Evaluate your skills with structured assessments
            </p>
            <Button variant="outline" size="sm">
              Take Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
