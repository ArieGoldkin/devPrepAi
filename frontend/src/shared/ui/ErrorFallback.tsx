import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import React from "react";

import { Button } from "@shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

interface IErrorConfig {
  title: string;
  message: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface IErrorFallbackProps {
  error: Error | null;
  errorType: "network" | "component" | "api" | "unknown";
  retryCount: number;
  maxRetries: number;
  showDetails: boolean;
  onRetry: () => void;
  onGoHome: () => void;
}

const ERROR_MESSAGES: Record<string, IErrorConfig> = {
  network: {
    title: "Connection Problem",
    message:
      "Unable to connect to our servers. Please check your internet connection.",
    icon: AlertTriangle,
  },
  component: {
    title: "Something Went Wrong",
    message: "We encountered an unexpected error. Our team has been notified.",
    icon: Bug,
  },
  api: {
    title: "Service Unavailable",
    message:
      "Our AI service is temporarily unavailable. Please try again in a moment.",
    icon: AlertTriangle,
  },
  unknown: {
    title: "Unexpected Error",
    message: "An unexpected error occurred. Please try refreshing the page.",
    icon: Bug,
  },
};

/**
 * ErrorFallback UI component for displaying error states
 *
 * Features:
 * - Beautiful fallback UI matching design system
 * - Different error types with appropriate messages and icons
 * - Retry mechanism with remaining attempts counter
 * - Optional technical details for development
 * - Accessibility compliant
 */
export function ErrorFallback({
  error,
  errorType,
  retryCount,
  maxRetries,
  showDetails,
  onRetry,
  onGoHome,
}: IErrorFallbackProps): React.JSX.Element {
  const errorConfig = ERROR_MESSAGES[errorType] || ERROR_MESSAGES["unknown"];

  if (!errorConfig) {
    throw new Error(`Unknown error type: ${errorType}`);
  }

  const IconComponent = errorConfig.icon;
  const canRetry = retryCount < maxRetries;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <IconComponent className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl text-foreground">
            {errorConfig.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-center">
            {errorConfig.message}
          </p>

          {showDetails && error && (
            <details className="mt-4 p-3 bg-muted rounded-lg">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}

          <div className="flex flex-col gap-3">
            {canRetry && (
              <Button onClick={onRetry} variant="default" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again{" "}
                {retryCount > 0 && `(${maxRetries - retryCount} left)`}
              </Button>
            )}

            <Button onClick={onGoHome} variant="outline" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </div>

          {retryCount >= maxRetries && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Still having issues? Please{" "}
                <a
                  href="mailto:support@devprep.ai"
                  className="text-primary hover:underline"
                >
                  contact support
                </a>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
