/**
 * Query Helper Functions for React Query
 * Provides common utilities for working with React Query and Claude AI
 */

import type { QueryClient } from "@tanstack/react-query";

// Time constants to avoid magic numbers
const TIME_CONSTANTS = {
  MINUTES_IN_FIVE: 5,
  SECONDS_PER_MINUTE: 60,
  MILLISECONDS_PER_SECOND: 1000,
} as const;

const DEFAULT_STALE_TIME =
  TIME_CONSTANTS.MINUTES_IN_FIVE *
  TIME_CONSTANTS.SECONDS_PER_MINUTE *
  TIME_CONSTANTS.MILLISECONDS_PER_SECOND;

/**
 * Generate cache key for Claude AI queries
 * Ensures consistent caching across the application
 */
export const createClaudeQueryKey = (
  endpoint: string,
  params: Record<string, unknown> = {},
): string[] => ["claude-api", endpoint, JSON.stringify(params)];

/**
 * Generate cache key for practice session queries
 * Groups related queries for efficient invalidation
 */
export const createPracticeQueryKey = (
  sessionId: string,
  type: string,
  params: Record<string, unknown> = {},
): string[] => ["practice", sessionId, type, JSON.stringify(params)];

/**
 * Generate cache key for user profile queries
 * Long-term caching for user data
 */
export const createUserQueryKey = (
  userId: string,
  type = "profile",
): string[] => ["user", userId, type];

/**
 * Prefetch pattern for Claude AI calls
 * Use this to prefetch expensive API calls during user interactions
 */
export const prefetchClaudeQuery = async (
  queryClient: QueryClient,
  queryKey: string[],
  queryFn: () => Promise<unknown>,
  staleTime = DEFAULT_STALE_TIME, // Default 5 minutes
): Promise<void> => {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime,
  });
};

/**
 * Invalidate practice session cache
 * Call this when practice sessions are completed or updated
 */
export const invalidatePracticeCache = (
  queryClient: QueryClient,
  sessionId?: string,
): Promise<void> => {
  if (sessionId) {
    return queryClient.invalidateQueries({
      queryKey: ["practice", sessionId],
    });
  }
  return queryClient.invalidateQueries({
    queryKey: ["practice"],
  });
};

/**
 * Clear all caches (useful for logout)
 */
export const clearAllCaches = (queryClient: QueryClient): void => {
  queryClient.clear();
};
