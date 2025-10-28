/**
 * Results Metrics Calculation Utilities - Phase 4: Overview Tab
 */
import type { IQuestionResult } from "@/types/ai/assessment";

export interface IDifficultyBreakdown {
  easy: { score: number; count: number };
  medium: { score: number; count: number };
  hard: { score: number; count: number };
}

export interface IRecommendation {
  title: string;
  message: string;
  icon: string;
}

const THRESHOLDS = {
  SCORE_EXCELLENT: 90,
  SCORE_GOOD: 75,
  SCORE_FAIR: 60,
  COMPLETION_HIGH: 80,
  COMPLETION_MEDIUM: 60,
  DIFFICULTY_EASY_MAX: 3,
  DIFFICULTY_MEDIUM_MAX: 7,
  PERCENT: 100,
} as const;

/** Calculate average score (0-100) */
export function calculateAverageScore(results: IQuestionResult[]): number {
  if (results.length === 0) return 0;
  const total = results.reduce((sum, r) => sum + (r.feedback?.score ?? 0), 0);
  return Math.round(total / results.length);
}

/** Calculate completion rate (0-100) */
export function calculateCompletionRate(results: IQuestionResult[]): number {
  if (results.length === 0) return 0;
  const completed = results.filter(
    (r) => Boolean(r.userAnswer) && r.userAnswer.trim().length > 0,
  ).length;
  return Math.round((completed / results.length) * THRESHOLDS.PERCENT);
}

/** Group results by difficulty and calculate averages */
export function groupByDifficulty(
  results: IQuestionResult[],
): IDifficultyBreakdown {
  const breakdown: IDifficultyBreakdown = {
    easy: { score: 0, count: 0 },
    medium: { score: 0, count: 0 },
    hard: { score: 0, count: 0 },
  };
  if (results.length === 0) return breakdown;

  results.forEach((r) => {
    const d = r.question.difficulty;
    let level: keyof IDifficultyBreakdown;
    if (d <= THRESHOLDS.DIFFICULTY_EASY_MAX) {
      level = "easy";
    } else if (d <= THRESHOLDS.DIFFICULTY_MEDIUM_MAX) {
      level = "medium";
    } else {
      level = "hard";
    }
    breakdown[level].score += r.feedback?.score ?? 0;
    breakdown[level].count += 1;
  });

  Object.keys(breakdown).forEach((key) => {
    const level = key as keyof IDifficultyBreakdown;
    if (breakdown[level].count > 0) {
      breakdown[level].score = Math.round(
        breakdown[level].score / breakdown[level].count,
      );
    }
  });
  return breakdown;
}

/** Calculate hint effectiveness percentage (0-100) */
export function calculateHintEffectiveness(results: IQuestionResult[]): number {
  if (results.length === 0) return 0;
  const withHints = results.filter(
    (r) => Boolean(r.hintsUsed) && (r.hintsUsed?.length ?? 0) > 0,
  );
  if (withHints.length === 0) return THRESHOLDS.PERCENT;
  const avgScore =
    withHints.reduce((sum, r) => sum + r.feedback.score, 0) / withHints.length;
  return Math.min(THRESHOLDS.PERCENT, Math.round(avgScore));
}

/** Generate recommendation based on performance */
export function generateRecommendation(
  avgScore: number,
  completion: number,
  hints: number,
): IRecommendation {
  const T = THRESHOLDS;
  if (
    avgScore >= T.SCORE_EXCELLENT &&
    completion === T.PERCENT &&
    hints === 0
  ) {
    return {
      title: "Outstanding Performance!",
      message:
        "You're ready for advanced challenges. Consider increasing difficulty or tackling system design questions.",
      icon: "🚀",
    };
  }
  if (avgScore >= T.SCORE_GOOD && completion >= T.COMPLETION_HIGH) {
    return {
      title: "Great Job!",
      message:
        "Solid understanding demonstrated. Try practicing more questions in your weaker areas.",
      icon: "⭐",
    };
  }
  if (avgScore >= T.SCORE_FAIR && completion >= T.COMPLETION_MEDIUM) {
    return {
      title: "Keep Practicing",
      message:
        "You're making progress! Focus on understanding core concepts and reviewing difficult questions.",
      icon: "💪",
    };
  }
  if (completion < T.COMPLETION_MEDIUM) {
    return {
      title: "Complete More Questions",
      message:
        "Try to finish more questions before time runs out. Practice with easier questions first.",
      icon: "🎯",
    };
  }
  return {
    title: "Review Fundamentals",
    message:
      "Take time to review basic concepts and use hints strategically to guide your learning.",
    icon: "📚",
  };
}
