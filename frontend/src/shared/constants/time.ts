/**
 * Time Constants
 * Time-related constants and conversion utilities
 */

// Time Conversion Constants
export const MS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MINUTES_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;
export const DAYS_PER_WEEK = 7;

// Derived Conversion Constants
export const MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
export const MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;
export const MS_PER_DAY = MS_PER_HOUR * HOURS_PER_DAY;
export const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
export const SECONDS_PER_DAY = SECONDS_PER_HOUR * HOURS_PER_DAY;

// Timeout Values (in milliseconds)
export const TIMEOUTS = {
  INSTANT: 0,
  SHORT: 50,
  MEDIUM: 300,
  LONG: 1000,
  EXTRA_LONG: 5000,
  DEFAULT: 30000, // 30 seconds
  REQUEST: 30000, // 30 seconds for API requests
} as const;

// Auto-save and Debounce Intervals (in milliseconds)
export const INTERVALS = {
  AUTO_SAVE: 30000, // 30 seconds
  AUTO_SAVE_DELAY: 2000, // 2 seconds
  TYPING_DEBOUNCE: 1000, // 1 second
  SEARCH_DEBOUNCE: 300, // 300ms
  RESIZE_DEBOUNCE: 150, // 150ms
} as const;

// Question and Assessment Timing Constants (in minutes)
const DEFAULT_QUESTION_MINUTES = 30;
const MIN_QUESTION_MINUTES = 5;
const MAX_QUESTION_MINUTES = 60;
const HINT_TIMING_MINUTES = 2;
const WARNING_MINUTES = 5;

// Question and Assessment Timing (in seconds)
export const ASSESSMENT_TIMING = {
  DEFAULT_QUESTION_TIME: DEFAULT_QUESTION_MINUTES * SECONDS_PER_MINUTE, // 30 minutes
  MIN_QUESTION_TIME: MIN_QUESTION_MINUTES * SECONDS_PER_MINUTE, // 5 minutes
  MAX_QUESTION_TIME: MAX_QUESTION_MINUTES * SECONDS_PER_MINUTE, // 60 minutes
  HINT_TIMING_THRESHOLD: HINT_TIMING_MINUTES * SECONDS_PER_MINUTE, // 2 minutes
  WARNING_TIME: WARNING_MINUTES * SECONDS_PER_MINUTE, // 5 minutes warning
} as const;

// Animation and Transition Durations (in milliseconds)
export const ANIMATION_DURATION = {
  INSTANT: 0,
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// Utility Functions
export function secondsToMs(seconds: number): number {
  return seconds * MS_PER_SECOND;
}

export function msToSeconds(ms: number): number {
  return Math.floor(ms / MS_PER_SECOND);
}

export function minutesToMs(minutes: number): number {
  return minutes * MS_PER_MINUTE;
}

export function msToMinutes(ms: number): number {
  return Math.floor(ms / MS_PER_MINUTE);
}

export function hoursToMs(hours: number): number {
  return hours * MS_PER_HOUR;
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const remainingSeconds = seconds % SECONDS_PER_MINUTE;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatDuration(ms: number): string {
  if (ms < MS_PER_SECOND) return `${ms}ms`;
  if (ms < MS_PER_MINUTE) return `${(ms / MS_PER_SECOND).toFixed(1)}s`;
  if (ms < MS_PER_HOUR) return `${Math.floor(ms / MS_PER_MINUTE)}m`;
  return `${Math.floor(ms / MS_PER_HOUR)}h`;
}

// Type exports
export type TimeoutKey = keyof typeof TIMEOUTS;
export type IntervalKey = keyof typeof INTERVALS;
export type AnimationKey = keyof typeof ANIMATION_DURATION;