import React from "react";

/**
 * EmptyState Component
 *
 * Displays when no active assessment is available
 */
export const EmptyState = (): React.JSX.Element => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-foreground">
        No Active Assessment
      </h2>
      <p className="text-muted-foreground">
        Start a new assessment to begin practicing.
      </p>
    </div>
  </div>
);
