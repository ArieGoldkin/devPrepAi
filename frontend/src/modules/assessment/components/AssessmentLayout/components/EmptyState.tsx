import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@shared/ui/button";

export function EmptyState(): React.JSX.Element {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">No Assessment Active</h2>
        <p className="text-muted-foreground">
          Please start an assessment from the home page.
        </p>
        <Button onClick={() => router.push("/")} variant="default">
          Go to Home
        </Button>
      </div>
    </div>
  );
}
