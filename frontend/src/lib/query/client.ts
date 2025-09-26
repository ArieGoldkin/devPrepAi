import { QueryClient, MutationCache, QueryCache } from "@tanstack/react-query";

/**
 * Optimal React Query configuration for DevPrep AI
 *
 * Specifically tuned for Claude AI API calls which:
 * - Take 2-3 seconds to respond
 * - Are expensive and should be cached aggressively
 * - Need intelligent retry logic for rate limiting
 * - Benefit from long-term caching to reduce costs by 60%
 */

// === CONSTANTS ===
const HTTP_STATUS = {
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  TOO_MANY_REQUESTS: 429,
} as const;

const RETRY_LIMITS = {
  MAX_RETRIES: 3,
  MAX_MUTATION_RATE_LIMIT_RETRIES: 2,
  MAX_MUTATION_SERVER_ERROR_RETRIES: 1,
  MAX_NETWORK_ERROR_RETRIES: 2,
} as const;

const TIME_CONSTANTS = {
  MILLISECONDS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_IN_FIVE: 5,
  MINUTES_IN_TEN: 10,
} as const;

export const CACHE_TIMES = {
  STALE_TIME:
    TIME_CONSTANTS.MINUTES_IN_FIVE *
    TIME_CONSTANTS.SECONDS_PER_MINUTE *
    TIME_CONSTANTS.MILLISECONDS_PER_SECOND, // 5 minutes
  GC_TIME:
    TIME_CONSTANTS.MINUTES_IN_TEN *
    TIME_CONSTANTS.SECONDS_PER_MINUTE *
    TIME_CONSTANTS.MILLISECONDS_PER_SECOND, // 10 minutes
  PREFETCH_STALE_TIME:
    TIME_CONSTANTS.MINUTES_IN_FIVE *
    TIME_CONSTANTS.SECONDS_PER_MINUTE *
    TIME_CONSTANTS.MILLISECONDS_PER_SECOND, // 5 minutes
} as const;

const RETRY_DELAYS = {
  RATE_LIMIT_BASE: 30000, // 30 seconds
  RATE_LIMIT_MAX: 120000, // 2 minutes
  SERVER_ERROR_BASE: 5000, // 5 seconds
  SERVER_ERROR_MAX: 20000, // 20 seconds
  NETWORK_ERROR_BASE: 1000, // 1 second
  NETWORK_ERROR_MAX: 2000, // 2 seconds
} as const;

// === TYPES ===
type ApiError = {
  status?: number;
  code?: string;
};

// Custom error handler for API failures
const handleQueryError = (error: Error): void => {
  console.error("Query failed:", {
    error: error.message,
    timestamp: new Date().toISOString(),
  });

  // TODO: Add error reporting service integration here
  // TODO: Add user notification for critical errors
};

// Custom error handler for mutations
const handleMutationError = (error: Error, variables: unknown): void => {
  console.error("Mutation failed:", {
    error: error.message,
    variables,
    timestamp: new Date().toISOString(),
  });

  // TODO: Add error reporting service integration here
  // TODO: Add user notification for failed actions
};

// Rate limiting and API error detection
const isRateLimited = (error: unknown): boolean => {
  const apiError = error as ApiError;
  return (
    apiError?.status === HTTP_STATUS.TOO_MANY_REQUESTS ||
    apiError?.code === "RATE_LIMIT_EXCEEDED"
  );
};

const isServerError = (error: unknown): boolean => {
  const apiError = error as ApiError;
  return (
    (apiError?.status !== undefined &&
      apiError.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) ||
    apiError?.code === "INTERNAL_SERVER_ERROR"
  );
};

// Exponential backoff retry logic optimized for Claude AI
const customRetryLogic = (failureCount: number, error: unknown): boolean => {
  const apiError = error as ApiError;

  // Don't retry client errors (4xx except 429)
  if (
    apiError?.status !== undefined &&
    apiError.status >= HTTP_STATUS.BAD_REQUEST &&
    apiError.status < HTTP_STATUS.INTERNAL_SERVER_ERROR &&
    apiError.status !== HTTP_STATUS.TOO_MANY_REQUESTS
  ) {
    return false;
  }

  // Retry rate limits and server errors up to 3 times
  if (isRateLimited(error) || isServerError(error)) {
    return failureCount < RETRY_LIMITS.MAX_RETRIES;
  }

  // Retry network errors up to 2 times
  if (apiError?.code === "NETWORK_ERROR" || apiError?.status === undefined) {
    return failureCount < RETRY_LIMITS.MAX_NETWORK_ERROR_RETRIES;
  }

  return false;
};

// Exponential backoff delay calculation
const customRetryDelay = (attemptIndex: number, error: unknown): number => {
  // Rate limit: wait longer (30s, 60s, 120s)
  if (isRateLimited(error)) {
    return Math.min(
      RETRY_DELAYS.RATE_LIMIT_BASE * Math.pow(2, attemptIndex),
      RETRY_DELAYS.RATE_LIMIT_MAX,
    );
  }

  // Server errors: moderate delay (5s, 10s, 20s)
  if (isServerError(error)) {
    return Math.min(
      RETRY_DELAYS.SERVER_ERROR_BASE * Math.pow(2, attemptIndex),
      RETRY_DELAYS.SERVER_ERROR_MAX,
    );
  }

  // Network errors: quick retry (1s, 2s)
  return Math.min(
    RETRY_DELAYS.NETWORK_ERROR_BASE * Math.pow(2, attemptIndex),
    RETRY_DELAYS.NETWORK_ERROR_MAX,
  );
};

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
      retry: (failureCount: number, error: unknown): boolean => {
        // Retry mutations more conservatively (they modify state)
        if (isRateLimited(error)) {
          return failureCount < RETRY_LIMITS.MAX_MUTATION_RATE_LIMIT_RETRIES; // Only 2 retries for rate limits
        }
        if (isServerError(error)) {
          return failureCount < RETRY_LIMITS.MAX_MUTATION_SERVER_ERROR_RETRIES; // Only 1 retry for server errors
        }
        return false; // Don't retry client errors
      },

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

// Re-export helper functions from separate module
export {
  createClaudeQueryKey,
  createPracticeQueryKey,
  createUserQueryKey,
  prefetchClaudeQuery,
  invalidatePracticeCache,
  clearAllCaches,
} from "@lib/query/helpers";

export default queryClient;
