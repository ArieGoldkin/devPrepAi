"use client";

import React from 'react';

import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export default function DesignSystemPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-xl py-8">
        <div className="mb-12 text-center">
          <h1 className="text-display text-gradient mb-4">
            DevPrep AI Design System
          </h1>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            A comprehensive design system with blue-purple brand colors and modern components.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-headline mb-8">Colors & Components</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="gradient">
              <CardHeader>
                <CardTitle>Brand Colors</CardTitle>
                <CardDescription>Blue-purple gradient palette</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-8 rounded-md bg-gradient-primary"></div>
                  <div className="h-8 rounded-md bg-gradient-accent"></div>
                </div>
              </CardContent>
            </Card>

            <Card variant="feature">
              <CardHeader>
                <CardTitle>Button Showcase</CardTitle>
                <CardDescription>Various button styles and variants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="accent">Gradient</Button>
                  <Button variant="outline">Outline</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-headline mb-8">Interactive Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Standard card styling</CardDescription>
              </CardHeader>
            </Card>

            <Card variant="feature">
              <CardHeader>
                <CardTitle>Feature Card</CardTitle>
                <CardDescription>Hover effects included</CardDescription>
              </CardHeader>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Brand hover colors</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <footer className="text-center py-8 border-t">
          <div className="text-body text-muted-foreground">
            DevPrep AI Design System - Modern, accessible, and developer-friendly.
          </div>
        </footer>
      </div>
    </div>
  );
}