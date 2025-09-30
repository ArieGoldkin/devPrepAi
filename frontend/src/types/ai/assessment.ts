/**
 * Assessment Types
 * Types for assessment results and question evaluation
 */
import type { IAnswerFeedback } from "./api";
import type { IQuestion } from "./questions";

// Assessment results types
export interface IQuestionResult {
  question: IQuestion;
  userAnswer: string;
  feedback: IAnswerFeedback;
  timeSpent: number; // in seconds
}

export interface IAssessmentResults {
  questions: IQuestionResult[];
  totalTimeSpent: number; // in seconds
  totalTimeAllocated: number; // in seconds
  completedAt: string;
}
