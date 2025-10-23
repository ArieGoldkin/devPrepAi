/**
 * Evaluation Schemas
 * Zod schemas for answer evaluation types
 * Used by tRPC procedures for runtime validation
 */
import { z } from "zod";

import { questionSchema } from "./question.schema";

// Constants for validation rules
const MIN_SCORE = 0;
const MAX_SCORE = 100;

/**
 * Answer Feedback Schema
 * Structure returned by Claude AI for answer evaluation
 */
export const answerFeedbackSchema = z.object({
  score: z.number().min(MIN_SCORE).max(MAX_SCORE),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  suggestions: z.array(z.string()),
  overallFeedback: z.string(),
  hintPenalty: z.number().optional(),
});

/**
 * Evaluate Answer Input Schema
 * Validates request to evaluate a user's answer
 */
export const evaluateAnswerInputSchema = z.object({
  question: questionSchema,
  answer: z.string().min(1, "Answer cannot be empty"),
});

/**
 * Evaluate Answer Output Schema
 * Validates response from answer evaluation
 */
export const evaluateAnswerOutputSchema = z.object({
  feedback: answerFeedbackSchema,
  success: z.boolean(),
});

// Export inferred types
export type AnswerFeedback = z.infer<typeof answerFeedbackSchema>;
export type EvaluateAnswerInput = z.infer<typeof evaluateAnswerInputSchema>;
export type EvaluateAnswerOutput = z.infer<typeof evaluateAnswerOutputSchema>;
