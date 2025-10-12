import React from "react";

import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

export function ColorsAndComponents(): React.JSX.Element {
  return (
    <section className="mb-16">
      <h2 className="text-headline mb-8">Colors & Components</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Primary Colors</CardTitle>
            <CardDescription>Main brand colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-primary rounded-full"></div>
                <span className="text-sm font-mono">#5b6cf8</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-secondary rounded-full"></div>
                <span className="text-sm font-mono">#8b5cf6</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-accent rounded-full"></div>
                <span className="text-sm font-mono">#0ea5e9</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>Different button styles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="default">Default</Button>
              <Button variant="brand">Brand</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Colors</CardTitle>
            <CardDescription>Semantic colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-success rounded-full"></div>
                <span className="text-sm font-mono">Success</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-warning rounded-full"></div>
                <span className="text-sm font-mono">Warning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-error rounded-full"></div>
                <span className="text-sm font-mono">Error</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
