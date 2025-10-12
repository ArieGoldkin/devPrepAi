/**
 * React Query Client Instance
 * Pre-configured QueryClient optimized for DevPrep AI and Claude API
 */
import { QueryClient, MutationCache, QueryCache } from "@tanstack/react-query";

import { CACHE_TIMES } from "./config";
import {
  customRetryLogic,
  customRetryDelay,
  mutationRetryLogic,
  handleQueryError,
  handleMutationError,
} from "./defaults";

/**
 * Pre-configured QueryClient instance optimized for DevPrep AI
 *
 * Key optimizations:
 * - 5-minute staleTime: Prevents unnecessary API calls for fresh data
 * - 10-minute gcTime: Keeps cached data longer for cost savings
 * - Disabled refetchOnWindowFocus: Prevents expensive API calls on tab switching
 * - Smart retry logic: Handles Claude AI rate limits gracefully
 * - Mutation defaults: Optimized for POST requests to Claude AI
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache Configuration - Optimized for expensive Claude AI calls
      staleTime: CACHE_TIMES.STALE_TIME, // 5 minutes - data stays fresh, reducing API calls
      gcTime: CACHE_TIMES.GC_TIME, // 10 minutes - keep in memory longer for cost savings

      // Refetch Configuration - Minimize unnecessary API calls
      refetchOnWindowFocus: false, // Don't refetch on tab switch (saves API costs)
      refetchOnMount: true, // Only refetch if data is stale
      refetchOnReconnect: true, // Refetch on network reconnection
      refetchInterval: false, // No automatic polling for expensive APIs

      // Retry Configuration - Handle Claude AI limitations gracefully
      retry: customRetryLogic,
      retryDelay: customRetryDelay,

      // Network timeout for slow Claude AI responses
      networkMode: "online", // Only run queries when online

      // Placeholder data to improve UX during loading
      placeholderData: undefined, // Can be customized per query
    },
    mutations: {
      // Mutation Configuration - Optimized for Claude AI POST requests
      retry: mutationRetryLogic,
      retryDelay: customRetryDelay,

      // Network mode for mutations
      networkMode: "online",
    },
  },

  // Global error handling
  queryCache: new QueryCache({
    onError: handleQueryError,
  }),
  mutationCache: new MutationCache({
    onError: handleMutationError,
  }),
});

export default queryClient;
