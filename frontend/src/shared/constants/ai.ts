/**
 * AI Service Configuration Constants
 * Business logic constants for interview prep platform
 *
 * NOTE: Model configuration, temperature, and token limits have been
 * moved to lib/claude/config.ts for centralized management.
 * Import from there: import { getClaudeConfig } from '@lib/claude/config'
 */

// Scoring Configuration
export const SCORING = {
  MAX_SCORE: 100,
  EXCELLENT_THRESHOLD: 80,
  GOOD_THRESHOLD: 60,
  PASS_THRESHOLD: 50,
  ACCURACY_MULTIPLIER: 10,
} as const;

// Question Difficulty Levels
export const DIFFICULTY = {
  EASY_MIN: 1,
  EASY_MAX: 3,
  MEDIUM_MIN: 4,
  MEDIUM_MAX: 6,
  HARD_MIN: 7,
  HARD_MAX: 10,
} as const;

// Default Question Configuration
export const QUESTION_DEFAULTS = {
  COUNT: 10,
  TIME_ESTIMATE: 15, // minutes
  MAX_TIME_ESTIMATE: 60, // minutes
  DIFFICULTY: 5, // medium
} as const;

// Helper function to get difficulty label
export function getDifficultyLabel(difficulty: number): string {
  if (difficulty <= DIFFICULTY.EASY_MAX) return "Easy";
  if (difficulty <= DIFFICULTY.MEDIUM_MAX) return "Medium";
  return "Hard";
}

// Type exports for type safety
export type DifficultyLevel = "Easy" | "Medium" | "Hard";
