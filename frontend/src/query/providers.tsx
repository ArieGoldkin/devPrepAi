"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

import { ErrorBoundary } from "@/components/shared";
import { queryClient } from "@/query/client";

interface IProvidersProps {
  children: ReactNode;
}

/**
 * Application providers wrapper
 *
 * Includes:
 * - ErrorBoundary for top-level error handling
 * - React Query client with optimized Claude AI settings
 * - Development tools (only in development mode)
 * - Future: Zustand persist, theme provider, etc.
 */
export function Providers({ children }: IProvidersProps): React.JSX.Element {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // In production, send to error tracking service
        console.error("App-level error caught by ErrorBoundary:", {
          error,
          errorInfo,
        });
      }}
      showDetails={process.env.NODE_ENV === "development"}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        {/* React Query DevTools - only shows in development */}
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom"
          buttonPosition="bottom-right"
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
