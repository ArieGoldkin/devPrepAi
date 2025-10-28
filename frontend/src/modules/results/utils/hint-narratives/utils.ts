/**
 * Utility Functions for Hint Narratives
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

import type { IQuestionResult } from "@/types/ai/assessment";

import { SCORE_THRESHOLDS, DIFFICULTY_THRESHOLDS } from "./constants";

/**
 * Generate performance note based on score
 * @param score - Question score (0-100)
 * @returns Performance description
 */
export function getPerformanceNote(score: number): string {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) {
    return "Clean implementation from the start";
  } else if (score >= SCORE_THRESHOLDS.GOOD) {
    return "Quickly applied pattern and solved efficiently";
  } else if (score >= SCORE_THRESHOLDS.FAIR) {
    return "Successfully completed after guidance";
  } else {
    return "Good learning opportunity";
  }
}

/**
 * Get weak area based on question type and difficulty
 * @param question - Question result object
 * @returns Area to review
 */
export function getWeakArea(question: IQuestionResult): string {
  const difficulty = question.question.difficulty;
  const type = question.question.type;

  if (type === "coding") {
    if (difficulty >= DIFFICULTY_THRESHOLDS.HARD) {
      return "advanced algorithm";
    } else if (difficulty >= DIFFICULTY_THRESHOLDS.MEDIUM) {
      return "algorithm";
    }
    return "basic programming";
  } else if (type === "system-design") {
    return "system design";
  } else {
    return "conceptual";
  }
}

/**
 * Get difficulty label for narrative text
 * @param difficulty - Numeric difficulty (1-10)
 * @returns Human-readable label
 */
export function getDifficultyLabel(difficulty: number): string {
  if (difficulty >= DIFFICULTY_THRESHOLDS.HARD) return "hard";
  if (difficulty >= DIFFICULTY_THRESHOLDS.MEDIUM) return "medium";
  return "easy";
}
