/**
 * Practice Slice Helper Functions
 * Utility functions for answer management and progress calculation
 */
import type { IPracticeAnswer } from "@/types/store";

/**
 * Create a practice answer object
 */
export function createPracticeAnswer(
  questionId: string,
  answer: string,
  timeSpent: number,
  isSubmitted: boolean,
): IPracticeAnswer {
  return {
    questionId,
    answer,
    submittedAt: isSubmitted ? new Date().toISOString() : null,
    timeSpent,
  };
}

/**
 * Calculate the number of submitted answers
 */
export function countSubmittedAnswers(
  answers: Map<string, IPracticeAnswer>,
): number {
  return Array.from(answers.values()).filter((a) => a.submittedAt !== null)
    .length;
}

/**
 * Calculate progress percentage based on answered questions
 */
export function calculateProgressPercentage(
  answeredCount: number,
  totalQuestions: number,
): number {
  if (totalQuestions === 0) return 0;
  return Math.round((answeredCount / totalQuestions) * 100);
}
