import React from "react";

import { Card, CardContent } from "@shared/ui/card";

export function EmptyState(): React.JSX.Element {
  return (
    <Card variant="outline" className="animate-fade-in">
      <CardContent className="text-center py-12">
        <h2 className="text-title font-semibold mb-4">No Results Yet</h2>
        <p className="text-body text-gray-600 mb-6">
          Complete your first assessment to see your results here.
        </p>
      </CardContent>
    </Card>
  );
}
