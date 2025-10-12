/**
 * UI Constants
 * Contains all magic numbers used throughout the application
 */

// Base time constants
const SECONDS_IN_MINUTE = 60;
const HINT_TIMING_MINUTES = 2;
const DEFAULT_QUESTION_MINUTES = 30;

export const UI_CONSTANTS = {
  // Responsive Breakpoints
  MOBILE_BREAKPOINT: 768,

  // Time-related constants (in seconds)
  SECONDS_PER_MINUTE: SECONDS_IN_MINUTE,
  HINT_TIMING_THRESHOLD: HINT_TIMING_MINUTES * SECONDS_IN_MINUTE, // 2 minutes in seconds
  DEFAULT_QUESTION_TIME: DEFAULT_QUESTION_MINUTES * SECONDS_IN_MINUTE, // 30 minutes in seconds

  // Timeout values (in milliseconds)
  SHORT_TIMEOUT: 50,
  MEDIUM_TIMEOUT: 300,
  LONG_TIMEOUT: 1000,

  // Percentage values
  HIGH_PERCENTAGE_THRESHOLD: 0.9,

  // Question/content thresholds
  DIFFICULTY_EASY_MAX: 3,
  DIFFICULTY_MEDIUM_MAX: 6,

  // Animation and transition durations (in milliseconds)
  FAST_TRANSITION: 150,
  NORMAL_TRANSITION: 300,
  SLOW_TRANSITION: 500,

  // Layout and spacing
  PADDING_SMALL: 8,
  PADDING_MEDIUM: 16,
  PADDING_LARGE: 24,

  // Z-index layers
  MODAL_Z_INDEX: 1000,
  DROPDOWN_Z_INDEX: 100,
  TOOLTIP_Z_INDEX: 50,
} as const;

// Export individual constants for convenience
export const {
  MOBILE_BREAKPOINT,
  SECONDS_PER_MINUTE,
  HINT_TIMING_THRESHOLD,
  DEFAULT_QUESTION_TIME,
  SHORT_TIMEOUT,
  MEDIUM_TIMEOUT,
  LONG_TIMEOUT,
  HIGH_PERCENTAGE_THRESHOLD,
  DIFFICULTY_EASY_MAX,
  DIFFICULTY_MEDIUM_MAX,
  FAST_TRANSITION,
  NORMAL_TRANSITION,
  SLOW_TRANSITION,
  PADDING_SMALL,
  PADDING_MEDIUM,
  PADDING_LARGE,
  MODAL_Z_INDEX,
  DROPDOWN_Z_INDEX,
  TOOLTIP_Z_INDEX,
} = UI_CONSTANTS;