/**
 * React Query Configuration Constants
 * Centralized configuration for caching, timeouts, and retry logic
 */
import { MS_PER_SECOND, SECONDS_PER_MINUTE } from "@shared/utils/time";

// === HTTP STATUS CODES ===
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  TOO_MANY_REQUESTS: 429,
} as const;

// === RETRY LIMITS ===
export const RETRY_LIMITS = {
  MAX_RETRIES: 3,
  MAX_MUTATION_RATE_LIMIT_RETRIES: 2,
  MAX_MUTATION_SERVER_ERROR_RETRIES: 1,
  MAX_NETWORK_ERROR_RETRIES: 2,
} as const;

// === CACHE TIMING ===
const MINUTES_IN_FIVE = 5;
const MINUTES_IN_TEN = 10;

export const CACHE_TIMES = {
  STALE_TIME: MINUTES_IN_FIVE * SECONDS_PER_MINUTE * MS_PER_SECOND, // 5 minutes
  GC_TIME: MINUTES_IN_TEN * SECONDS_PER_MINUTE * MS_PER_SECOND, // 10 minutes
  PREFETCH_STALE_TIME: MINUTES_IN_FIVE * SECONDS_PER_MINUTE * MS_PER_SECOND, // 5 minutes
} as const;

// === RETRY DELAYS ===
export const RETRY_DELAYS = {
  RATE_LIMIT_BASE: 30000, // 30 seconds
  RATE_LIMIT_MAX: 120000, // 2 minutes
  SERVER_ERROR_BASE: 5000, // 5 seconds
  SERVER_ERROR_MAX: 20000, // 20 seconds
  NETWORK_ERROR_BASE: 1000, // 1 second
  NETWORK_ERROR_MAX: 2000, // 2 seconds
} as const;

// === TYPES ===
export type ApiError = {
  status?: number;
  code?: string;
};

// === ERROR DETECTION ===
export const isRateLimited = (error: unknown): boolean => {
  const apiError = error as ApiError;
  return (
    apiError?.status === HTTP_STATUS.TOO_MANY_REQUESTS ||
    apiError?.code === "RATE_LIMIT_EXCEEDED"
  );
};

export const isServerError = (error: unknown): boolean => {
  const apiError = error as ApiError;
  return (
    (apiError?.status !== undefined &&
      apiError.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) ||
    apiError?.code === "INTERNAL_SERVER_ERROR"
  );
};
