"use client";

import React from "react";

import {
  ColorsAndComponents,
  InteractiveCards,
  ErrorHandlingDemo,
} from "@shared/ui/examples";

export default function DesignSystemPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-xl py-8">
        <div className="mb-12 text-center">
          <h1 className="text-display text-gradient mb-4">
            DevPrep AI Design System
          </h1>
          <p className="text-subtitle text-muted-foreground max-w-3xl mx-auto">
            A comprehensive design system with blue-purple brand colors and
            modern components.
          </p>
        </div>

        <ColorsAndComponents />
        <InteractiveCards />
        <ErrorHandlingDemo />
      </div>
    </div>
  );
}
