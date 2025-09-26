/**
 * Time constants to avoid magic numbers throughout the application
 */
export const TIME_CONSTANTS = {
  SECONDS_PER_MINUTE: 60,
  MS_PER_SECOND: 1000,
  HOURS_PER_DAY: 24,
  MINUTES_PER_HOUR: 60,
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
