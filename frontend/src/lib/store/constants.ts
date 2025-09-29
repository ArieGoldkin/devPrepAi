/**
 * Time constants to avoid magic numbers throughout the application
 * Re-exported from centralized time utilities
 */
import {
  SECONDS_PER_MINUTE,
  MS_PER_SECOND,
  HOURS_PER_DAY,
  MINUTES_PER_HOUR,
} from "@shared/utils/time";

export const TIME_CONSTANTS = {
  SECONDS_PER_MINUTE,
  MS_PER_SECOND,
  HOURS_PER_DAY,
  MINUTES_PER_HOUR,
} as const;

/**
 * Default assessment settings
 */
export const ASSESSMENT_DEFAULTS = {
  duration: 30,
  questionCount: 5,
  autoSubmit: true,
} as const;

export const RESULTS_LIMIT = 10;

/**
 * UI thresholds and percentages
 */
export const UI_THRESHOLDS = {
  TIME_WARNING_PERCENT: 25,
  TIME_CRITICAL_PERCENT: 10,
} as const;
