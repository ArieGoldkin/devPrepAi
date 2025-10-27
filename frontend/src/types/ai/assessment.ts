/**
 * Assessment Types
 * Types for assessment results and question evaluation
 */
import type { IAnswerFeedback } from "./api";
import type { IQuestion } from "./questions";

/**
 * Hint data structure
 * Represents a single hint requested during practice
 */
export interface IHint {
  questionId: string;
  level: number; // 1, 2, or 3
  content: string;
  requestedAt: string;
}

// Assessment results types
export interface IQuestionResult {
  question: IQuestion;
  userAnswer: string;
  feedback: IAnswerFeedback;
  timeSpent: number; // in seconds
  hintsUsed?: IHint[]; // Hints requested for this question (Phase 4 addition)
}

export interface IAssessmentResults {
  questions: IQuestionResult[];
  totalTimeSpent: number; // in seconds
  totalTimeAllocated: number; // in seconds
  completedAt: string;
  metrics?: {
    averageScore: number;
    difficultyBreakdown: { [key: string]: number };
  }; // Pre-calculated metrics (Phase 4 addition)
}
