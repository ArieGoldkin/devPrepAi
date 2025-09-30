/**
 * React Query Client - Barrel Export
 * Pre-configured QueryClient optimized for DevPrep AI
 */

// Main client instance
export { queryClient, default as client } from "./client";

// Configuration constants and utilities
export {
  CACHE_TIMES,
  HTTP_STATUS,
  RETRY_LIMITS,
  RETRY_DELAYS,
  isRateLimited,
  isServerError,
} from "./config";

// Utility functions
export {
  customRetryLogic,
  customRetryDelay,
  mutationRetryLogic,
  handleQueryError,
  handleMutationError,
} from "./defaults";

// Types
export type { ApiError } from "./config";
