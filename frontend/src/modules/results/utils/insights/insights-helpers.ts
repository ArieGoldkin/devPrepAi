/**
 * Learning Insights Helpers - Phase 4: Learning Insights Tab
 */

import type { IHint, IQuestionResult } from "@/types/ai/assessment";

import { THRESHOLDS } from "./insights-constants";

export function getDifficultyLevel(
  difficulty: number,
): "easy" | "medium" | "hard" {
  if (difficulty <= THRESHOLDS.DIFFICULTY_EASY_MAX) return "easy";
  if (difficulty <= THRESHOLDS.DIFFICULTY_MEDIUM_MAX) return "medium";
  return "hard";
}

export function calculateDifficultyBreakdown(questions: IQuestionResult[]): {
  easy: number;
  medium: number;
  hard: number;
} {
  const breakdown = { easy: 0, medium: 0, hard: 0 };
  const count = { easy: 0, medium: 0, hard: 0 };

  questions.forEach((q) => {
    const level = getDifficultyLevel(q.question.difficulty);
    breakdown[level] += q.feedback?.score ?? 0;
    count[level] += 1;
  });

  Object.keys(breakdown).forEach((k) => {
    const key = k as keyof typeof breakdown;
    breakdown[key] =
      count[key] > 0 ? Math.round(breakdown[key] / count[key]) : 0;
  });

  return breakdown;
}

export function identifyAreas(
  avgScore: number,
  hintsPerQuestion: number,
  difficultyBreakdown: { easy: number; medium: number; hard: number },
): { strong: string[]; weak: string[] } {
  const strong: string[] = [];
  const weak: string[] = [];

  if (avgScore >= THRESHOLDS.SCORE_HIGH) strong.push("overall-performance");
  if (hintsPerQuestion < THRESHOLDS.HINTS_LOW)
    strong.push("independent-solving");
  if (difficultyBreakdown.easy >= THRESHOLDS.SCORE_HIGH)
    strong.push("fundamentals");
  if (difficultyBreakdown.hard < THRESHOLDS.SCORE_MEDIUM)
    weak.push("advanced-concepts");
  if (avgScore < THRESHOLDS.SCORE_MEDIUM) weak.push("core-concepts");

  return { strong, weak };
}

export function analyzeHintPatterns(hints: Map<string, IHint[]>): {
  level1: number;
  level2: number;
  level3: number;
} {
  const patterns = { level1: 0, level2: 0, level3: 0 };

  hints.forEach((qHints) => {
    qHints.forEach((h) => {
      if (h.level === 1) patterns.level1++;
      else if (h.level === 2) patterns.level2++;
      else if (h.level === 3) patterns.level3++;
    });
  });

  return patterns;
}
