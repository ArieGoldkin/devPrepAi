import React from "react";

import { LoadingSpinner } from "@shared/ui/loading-spinner";

export function LoadingState(): React.JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner />
        <h2 className="text-xl font-medium">Loading Question...</h2>
        <p className="text-sm text-muted-foreground">
          Preparing your assessment
        </p>
      </div>
    </div>
  );
}