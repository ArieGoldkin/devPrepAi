/**
 * React Query - Main Export
 * Centralized exports for React Query configuration and utilities
 */

// Re-export everything from client
export * from "./client";

// Re-export helper functions
export {
  createClaudeQueryKey,
  createPracticeQueryKey,
  createUserQueryKey,
  prefetchClaudeQuery,
  invalidatePracticeCache,
  clearAllCaches,
} from "./helpers";
