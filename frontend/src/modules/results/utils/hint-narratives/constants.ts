/**
 * Constants for Hint Narrative Generation
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

/**
 * Score thresholds for performance classification
 */
export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 75,
  FAIR: 60,
} as const;

/**
 * Difficulty thresholds (1-10 scale)
 */
export const DIFFICULTY_THRESHOLDS = {
  HARD: 7,
  MEDIUM: 4,
} as const;

/**
 * Independence rate thresholds (percentage)
 */
export const INDEPENDENCE_THRESHOLDS = {
  HIGH: 50,
  BALANCED: 30,
} as const;

/**
 * Heavy hint usage threshold (hints per question average)
 */
export const HEAVY_USAGE_THRESHOLD = 2;
