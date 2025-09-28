/**
 * Content Limits and Thresholds
 * Maximum lengths, thresholds, and limits for various content types
 */

// Text Content Limits (in characters)
export const TEXT_LIMITS = {
  DEFAULT_MAX_LENGTH: 2000,
  ANSWER_MAX_LENGTH: 2000,
  FEEDBACK_MAX_LENGTH: 500,
  QUESTION_TITLE_MAX: 200,
  TAG_MAX_LENGTH: 30,
  USERNAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 100,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
} as const;

// Display Limits
export const DISPLAY_LIMITS = {
  ANSWER_PREVIEW_LENGTH: 150,
  FEEDBACK_PREVIEW_LENGTH: 100,
  MAX_VISIBLE_TAGS: 2,
  MAX_VISIBLE_QUESTIONS: 10,
  RESULTS_PER_PAGE: 10,
  MAX_HINT_LEVELS: 4,
} as const;

// UI Component Limits
export const UI_LIMITS = {
  MIN_TEXTAREA_HEIGHT: 32, // pixels
  MAX_TEXTAREA_HEIGHT: 600, // pixels
  MIN_EDITOR_HEIGHT: 200, // pixels
  MAX_EDITOR_HEIGHT: 600, // pixels
  MAX_MODAL_WIDTH: 800, // pixels
  MAX_DROPDOWN_ITEMS: 50,
} as const;

// Percentage and Score Thresholds
export const THRESHOLDS = {
  // Score thresholds (0-100)
  EXCELLENT_SCORE: 80,
  GOOD_SCORE: 60,
  PASS_SCORE: 50,
  FAIL_SCORE: 40,

  // Difficulty thresholds (1-10)
  EASY_MIN: 1,
  EASY_MAX: 3,
  MEDIUM_MIN: 4,
  MEDIUM_MAX: 7,
  HARD_MIN: 8,
  HARD_MAX: 10,

  // Progress thresholds (0-1)
  HIGH_PROGRESS: 0.9,
  MEDIUM_PROGRESS: 0.6,
  LOW_PROGRESS: 0.3,

  // Performance thresholds
  HIGH_PERCENTAGE_THRESHOLD: 0.9,
  MEDIUM_PERCENTAGE_THRESHOLD: 0.6,
  LOW_PERCENTAGE_THRESHOLD: 0.3,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5,
  DEFAULT_PAGE: 1,
} as const;

// File Size Constants
const BYTES_PER_KB = 1024;
const BYTES_PER_MB = BYTES_PER_KB * BYTES_PER_KB;

// File Size Limits (in bytes)
export const FILE_LIMITS = {
  MAX_UPLOAD_SIZE: 5 * BYTES_PER_MB, // 5MB
  MAX_IMAGE_SIZE: 2 * BYTES_PER_MB, // 2MB
  MAX_DOCUMENT_SIZE: 10 * BYTES_PER_MB, // 10MB
} as const;

// Helper Functions
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

export function isWithinLimit(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function getScoreLabel(score: number): string {
  if (score >= THRESHOLDS.EXCELLENT_SCORE) return "Excellent";
  if (score >= THRESHOLDS.GOOD_SCORE) return "Good";
  if (score >= THRESHOLDS.PASS_SCORE) return "Pass";
  return "Needs Improvement";
}

export function getScoreColor(score: number): string {
  if (score >= THRESHOLDS.EXCELLENT_SCORE) return "text-green-600";
  if (score >= THRESHOLDS.GOOD_SCORE) return "text-blue-600";
  if (score >= THRESHOLDS.PASS_SCORE) return "text-yellow-600";
  return "text-red-600";
}

export function getDifficultyFromThreshold(value: number): string {
  if (value <= THRESHOLDS.EASY_MAX) return "Easy";
  if (value <= THRESHOLDS.MEDIUM_MAX) return "Medium";
  return "Hard";
}

// Type exports
export type TextLimitKey = keyof typeof TEXT_LIMITS;
export type DisplayLimitKey = keyof typeof DISPLAY_LIMITS;
export type ThresholdKey = keyof typeof THRESHOLDS;
export type ScoreLabel = "Excellent" | "Good" | "Pass" | "Needs Improvement";