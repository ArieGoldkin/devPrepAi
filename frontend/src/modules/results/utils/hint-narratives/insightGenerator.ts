/**
 * Insight Generation Function
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

import type { IHint } from "@/types/ai/assessment";

import { INDEPENDENCE_THRESHOLDS, HEAVY_USAGE_THRESHOLD } from "./constants";
import type { IInsight } from "./types";

/**
 * Generate overall insight based on hint usage patterns
 * @param questions - All questions with hint data
 * @returns Insight object for recommendation card
 */
export function generateHintInsight(
  questions: Array<{ hintsUsed: IHint[]; score: number }>,
): IInsight {
  // Calculate metrics
  const totalQuestions = questions.length;
  const questionsWithNoHints = questions.filter(
    (q) => q.hintsUsed.length === 0,
  ).length;
  const totalHints = questions.reduce((sum, q) => sum + q.hintsUsed.length, 0);
  const hintsPerQuestion = totalQuestions > 0 ? totalHints / totalQuestions : 0;
  const independenceRate =
    totalQuestions > 0 ? (questionsWithNoHints / totalQuestions) * 100 : 0;

  // High independence (>50% no hints)
  if (independenceRate > INDEPENDENCE_THRESHOLDS.HIGH) {
    return {
      icon: "🌟",
      title: "Excellent Strategic Hint Usage!",
      message:
        "You solved most questions independently and used hints strategically when needed. This shows strong problem-solving skills and good judgment about when to seek guidance.",
    };
  }

  // Balanced usage (30-50% no hints)
  if (independenceRate >= INDEPENDENCE_THRESHOLDS.BALANCED) {
    return {
      icon: "⚖️",
      title: "Good Balance of Independence and Learning",
      message:
        "You demonstrated a healthy balance between solving problems independently and using hints for learning. Keep practicing to build more confidence in tackling problems without hints.",
    };
  }

  // Heavy hint usage (>2 hints per question on average)
  if (hintsPerQuestion > HEAVY_USAGE_THRESHOLD) {
    return {
      icon: "📚",
      title: "Focus on Core Concepts",
      message:
        "You relied heavily on hints across most questions. Consider reviewing fundamental concepts and patterns before attempting more practice problems. This will help build a stronger foundation.",
    };
  }

  // Moderate hint usage
  return {
    icon: "💡",
    title: "Learning Through Guidance",
    message:
      "You used hints consistently to guide your solutions. This is a valid learning strategy. Try to identify patterns in the hints you received to reduce dependency over time.",
  };
}
