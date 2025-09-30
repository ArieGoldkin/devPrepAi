/**
 * React Query Default Options
 * Retry logic and error handling optimized for Claude AI
 */
import {
  HTTP_STATUS,
  RETRY_LIMITS,
  RETRY_DELAYS,
  isRateLimited,
  isServerError,
  type ApiError,
} from "./config";

// === ERROR HANDLERS ===
export const handleQueryError = (error: Error): void => {
  console.error("Query failed:", {
    error: error.message,
    timestamp: new Date().toISOString(),
  });
  // TODO: Add error reporting service integration here
  // TODO: Add user notification for critical errors
};

export const handleMutationError = (error: Error, variables: unknown): void => {
  console.error("Mutation failed:", {
    error: error.message,
    variables,
    timestamp: new Date().toISOString(),
  });
  // TODO: Add error reporting service integration here
  // TODO: Add user notification for failed actions
};

// === RETRY LOGIC ===
export const customRetryLogic = (
  failureCount: number,
  error: unknown,
): boolean => {
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

export const customRetryDelay = (
  attemptIndex: number,
  error: unknown,
): number => {
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

// === MUTATION RETRY LOGIC ===
export const mutationRetryLogic = (
  failureCount: number,
  error: unknown,
): boolean => {
  // Retry mutations more conservatively (they modify state)
  if (isRateLimited(error)) {
    return failureCount < RETRY_LIMITS.MAX_MUTATION_RATE_LIMIT_RETRIES; // Only 2 retries for rate limits
  }
  if (isServerError(error)) {
    return failureCount < RETRY_LIMITS.MAX_MUTATION_SERVER_ERROR_RETRIES; // Only 1 retry for server errors
  }
  return false; // Don't retry client errors
};
