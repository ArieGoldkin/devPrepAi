/**
 * Narrative Generation Functions
 * Phase 4: Results Analytics - Hint Analytics Tab
 */

import type { IHint, IQuestionResult } from "@/types/ai/assessment";

import { getPerformanceNote, getWeakArea, getDifficultyLabel } from "./utils";

/**
 * Generate narrative for single hint usage
 * @param level - Hint level used
 * @param score - Question score
 * @returns Narrative text
 */
function generateSingleHintNarrative(level: number, score: number): string {
  const perfNote = getPerformanceNote(score);
  if (level === 1) {
    return `Started with a general approach hint. ${perfNote}.`;
  } else if (level === 2) {
    return `Used a specific technique hint to guide solution. ${perfNote}.`;
  }
  return `Needed code skeleton to structure the solution. ${perfNote}.`;
}

/**
 * Generate narrative for two hints usage
 * @param levels - Array of hint levels used
 * @param difficulty - Question difficulty
 * @returns Narrative text
 */
function generateTwoHintsNarrative(
  levels: number[],
  difficulty: number,
): string {
  const diffLabel = getDifficultyLabel(difficulty);
  const [first, second] = levels;

  if (first === 1 && second === 2) {
    return `Needed both approach and technique hints. Successfully implemented solution after understanding pattern.`;
  } else if (first === 2 && second === 3) {
    return `Challenging problem required technique and skeleton hints. Good learning opportunity for ${diffLabel} questions.`;
  } else if (first === 1 && second === 3) {
    return `Used approach and skeleton hints to build solution. Consider practicing similar ${diffLabel} problems.`;
  }
  return `Used two hints to guide the solution. ${diffLabel} problem solved with assistance.`;
}

/**
 * Generate narrative text for a question's hint usage
 * @param question - Question result with hints
 * @param hintsUsed - Array of hints used for this question
 * @returns Descriptive narrative text
 */
export function generateHintNarrative(
  question: IQuestionResult,
  hintsUsed: IHint[],
): string {
  const score = question.feedback.score;
  const hintCount = hintsUsed.length;
  const difficulty = question.question.difficulty;

  // No hints used
  if (hintCount === 0) {
    return `💪 Solved independently! No hints needed. ${getPerformanceNote(score)}.`;
  }

  // Get sorted hint levels
  const hintLevels = hintsUsed.map((h) => h.level).sort();

  // Single hint
  if (hintCount === 1 && hintLevels[0] !== undefined) {
    return generateSingleHintNarrative(hintLevels[0], score);
  }

  // Two hints
  if (hintCount === 2) {
    return generateTwoHintsNarrative(hintLevels, difficulty);
  }

  // Three hints
  if (hintCount === 3) {
    return `Used all hint levels for guidance. This shows persistence and willingness to learn. Consider reviewing ${getWeakArea(question)} concepts.`;
  }

  // Fallback
  return `Used ${hintCount} hints to complete the question. ${getPerformanceNote(score)}.`;
}
