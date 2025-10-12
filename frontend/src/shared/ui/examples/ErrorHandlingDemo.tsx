import React from "react";

import { ErrorBoundary } from "@shared/ui";
import { Button } from "@shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

const ThrowErrorComponent = (): React.JSX.Element => {
  const [shouldThrow, setShouldThrow] = React.useState(false);

  if (shouldThrow) {
    throw new Error("This is a test error for the design system");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Boundary Test</CardTitle>
        <CardDescription>Test error handling</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body text-muted-foreground mb-4">
          Click the button below to trigger an error and see how the error
          boundary handles it.
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShouldThrow(true)}
        >
          Trigger Error
        </Button>
      </CardContent>
    </Card>
  );
};

export function ErrorHandlingDemo(): React.JSX.Element {
  return (
    <section className="mb-16">
      <h2 className="text-headline mb-8">Error Handling</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ErrorBoundary>
          <ThrowErrorComponent />
        </ErrorBoundary>

        <Card>
          <CardHeader>
            <CardTitle>Error States</CardTitle>
            <CardDescription>Different error displays</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded">
                <p className="text-sm text-destructive">
                  Network error: Unable to connect to server
                </p>
              </div>
              <div className="p-3 bg-brand-warning/10 border border-brand-warning/20 rounded">
                <p className="text-sm text-brand-warning">
                  Warning: Your session will expire in 5 minutes
                </p>
              </div>
              <div className="p-3 bg-brand-success/10 border border-brand-success/20 rounded">
                <p className="text-sm text-brand-success">
                  Success: Your answer has been saved
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
