/**
 * Time Utilities
 * Centralized time constants, conversions, and formatting functions
 */

// =============================================================================
// Core Time Constants
// =============================================================================

export const MS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MINUTES_PER_HOUR = 60;

// Additional timing constants
export const SECONDS_THRESHOLD = 30; // Threshold for time formatting
export const MINUTES_PER_QUESTION_DEFAULT = 30; // Default minutes per question
export const MINUTES_PER_QUESTION_MAX = 60; // Maximum minutes per question
export const HOURS_PER_DAY = 24;
export const DAYS_PER_WEEK = 7;

// Derived Constants
export const MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
export const MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;
export const MS_PER_DAY = MS_PER_HOUR * HOURS_PER_DAY;
export const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
export const SECONDS_PER_DAY = SECONDS_PER_HOUR * HOURS_PER_DAY;

// Legacy TIME_CONSTANTS for backwards compatibility
export const TIME_CONSTANTS = {
  SECONDS_PER_MINUTE,
  MS_PER_SECOND,
  HOURS_PER_DAY,
  MINUTES_PER_HOUR,
  SECONDS_PER_HOUR,
  SECONDS_PER_DAY,
} as const;

// =============================================================================
// Timeout and Interval Values (in milliseconds)
// =============================================================================

export const TIMEOUTS = {
  INSTANT: 0,
  SHORT: 50,
  MEDIUM: 300,
  LONG: 1000,
  EXTRA_LONG: 5000,
  DEFAULT: 30000, // 30 seconds
  REQUEST: 30000, // 30 seconds for API requests
} as const;

export const INTERVALS = {
  AUTO_SAVE: 30000, // 30 seconds
  AUTO_SAVE_DELAY: 2000, // 2 seconds
  TYPING_DEBOUNCE: 1000, // 1 second
  SEARCH_DEBOUNCE: 300, // 300ms
  RESIZE_DEBOUNCE: 150, // 150ms
  TIMER: 1000, // 1 second for timers
} as const;

// =============================================================================
// Assessment Timing Constants
// =============================================================================

export const ASSESSMENT_TIMING = {
  DEFAULT_QUESTION_TIME: MINUTES_PER_QUESTION_DEFAULT * SECONDS_PER_MINUTE, // 30 minutes
  MIN_QUESTION_TIME: 5 * SECONDS_PER_MINUTE, // 5 minutes
  MAX_QUESTION_TIME: MINUTES_PER_QUESTION_MAX * SECONDS_PER_MINUTE, // 60 minutes
  HINT_TIMING_THRESHOLD: 2 * SECONDS_PER_MINUTE, // 2 minutes
  WARNING_TIME: 5 * SECONDS_PER_MINUTE, // 5 minutes warning
  TIME_WARNING_THRESHOLD: 300, // 5 minutes in seconds (for useTimer)
} as const;

// =============================================================================
// Animation Durations (in milliseconds)
// =============================================================================

export const ANIMATION_DURATION = {
  INSTANT: 0,
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// =============================================================================
// Conversion Utility Functions
// =============================================================================

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

export function msToHours(ms: number): number {
  return Math.floor(ms / MS_PER_HOUR);
}

// =============================================================================
// Time Formatting Functions
// =============================================================================

/**
 * Format seconds into MM:SS format
 * @param seconds - Number of seconds
 * @returns Formatted time string (e.g., "05:30")
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const remainingSeconds = seconds % SECONDS_PER_MINUTE;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Format seconds into a human-readable duration (e.g., "5m 30s" or "30s")
 * @param seconds - Number of seconds
 * @returns Formatted duration string
 */
export function formatTimeSpent(seconds: number): string {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const remainingSeconds = seconds % SECONDS_PER_MINUTE;
  return minutes > 0
    ? `${minutes}m ${remainingSeconds}s`
    : `${remainingSeconds}s`;
}

/**
 * Format milliseconds into a human-readable duration
 * @param ms - Number of milliseconds
 * @returns Formatted duration string (e.g., "1.5s", "2m", "1h")
 */
export function formatDuration(ms: number): string {
  if (ms < MS_PER_SECOND) return `${ms}ms`;
  if (ms < MS_PER_MINUTE) return `${(ms / MS_PER_SECOND).toFixed(1)}s`;
  if (ms < MS_PER_HOUR) return `${Math.floor(ms / MS_PER_MINUTE)}m`;
  return `${Math.floor(ms / MS_PER_HOUR)}h`;
}

/**
 * Format time with minutes and seconds (e.g., "2:30")
 * Used for question timers and assessment displays
 * @param seconds - Number of seconds
 * @returns Formatted time string
 */
export function formatQuestionTime(seconds: number): string {
  const mins = Math.floor(seconds / SECONDS_PER_MINUTE);
  const secs = seconds % SECONDS_PER_MINUTE;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// =============================================================================
// Time Checking Utilities
// =============================================================================

/**
 * Check if time is low (under warning threshold)
 * @param timeLeft - Time remaining in seconds
 * @returns True if time is low
 */
export function isTimeLow(timeLeft: number): boolean {
  return timeLeft > 0 && timeLeft < ASSESSMENT_TIMING.TIME_WARNING_THRESHOLD;
}

/**
 * Check if time is critical (under 10% of total)
 * @param timeLeft - Time remaining in seconds
 * @param totalTime - Total time available in seconds
 * @returns True if time is critical
 */
export function isTimeCritical(timeLeft: number, totalTime: number): boolean {
  const percentage = (timeLeft / totalTime) * 100;
  return percentage <= 10;
}

// =============================================================================
// Type Exports
// =============================================================================

export type TimeoutKey = keyof typeof TIMEOUTS;
export type IntervalKey = keyof typeof INTERVALS;
export type AnimationKey = keyof typeof ANIMATION_DURATION;
export type AssessmentTimingKey = keyof typeof ASSESSMENT_TIMING;