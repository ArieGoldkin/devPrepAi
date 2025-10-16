"use client";

/**
 * tRPC React Provider
 * Integrates tRPC with TanStack Query (React Query)
 *
 * This provider wraps the existing QueryClient from lib/query
 * so both old and new APIs share the same cache during migration.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";

import type { AppRouter } from "./routers/_app";

/**
 * Create tRPC React hooks
 * This provides type-safe hooks for all procedures
 */
export const trpc = createTRPCReact<AppRouter>();

const STALE_TIME_SECONDS = 60;
const MILLISECONDS_PER_SECOND = 1000;
const STALE_TIME_MS = STALE_TIME_SECONDS * MILLISECONDS_PER_SECOND;

/**
 * Create QueryClient factory
 * Follows Next.js 15 App Router best practices for SSR
 */
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: STALE_TIME_MS,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: reuse existing client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

/**
 * tRPC Provider Component
 * Wraps your app with tRPC + React Query
 *
 * @param children - React children to wrap
 */
export function TRPCProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          // Optional: Add headers, credentials, etc.
          // headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
