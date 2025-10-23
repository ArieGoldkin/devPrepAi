/**
 * API Types
 * Auto-generated from tRPC Zod schemas - Single Source of Truth
 *
 * These types are inferred from Zod schemas in @lib/trpc/schemas.
 * This ensures types cannot drift between client and server.
 *
 * Migration: Replaced manual interfaces with Zod-inferred types (Phase 4, Task 4.4)
 */
import type {
  EvaluateAnswerInput,
  EvaluateAnswerOutput,
  AnswerFeedback,
} from "@lib/trpc/schemas/evaluation.schema";
import type {
  GenerateQuestionsInput,
  GenerateQuestionsOutput,
} from "@lib/trpc/schemas/question.schema";

// ============================================================================
// Question Generation Types
// ============================================================================

/**
 * Request type for generating interview questions
 * @see {@link GenerateQuestionsInput} - Source Zod schema
 */
export type IGenerateQuestionsRequest = GenerateQuestionsInput;

/**
 * Response type for generated interview questions
 * @see {@link GenerateQuestionsOutput} - Source Zod schema
 */
export type IGenerateQuestionsResponse = GenerateQuestionsOutput;

// ============================================================================
// Answer Evaluation Types
// ============================================================================

/**
 * Request type for evaluating user answers
 * @see {@link EvaluateAnswerInput} - Source Zod schema
 */
export type IEvaluateAnswerRequest = EvaluateAnswerInput;

/**
 * Feedback data structure for evaluated answers
 * @see {@link AnswerFeedback} - Source Zod schema
 */
export type IAnswerFeedback = AnswerFeedback;

/**
 * Response type for answer evaluation
 * @see {@link EvaluateAnswerOutput} - Source Zod schema
 */
export type IEvaluateAnswerResponse = EvaluateAnswerOutput;

// ============================================================================
// Concept Explanation Types (Future Implementation)
// ============================================================================

/**
 * @deprecated Not yet implemented in tRPC
 * Placeholder for future explainConcept endpoint
 */
export interface IExplainConceptRequest {
  concept: string;
  userLevel: string;
  includeExamples: boolean;
}

/**
 * @deprecated Not yet implemented in tRPC
 * Placeholder for future explainConcept endpoint
 */
export interface IConceptExplanation {
  concept: string;
  explanation: string;
  examples: string[];
  keyPoints: string[];
  relatedConcepts: string[];
}

/**
 * @deprecated Not yet implemented in tRPC
 * Placeholder for future explainConcept endpoint
 */
export interface IExplainConceptResponse {
  explanation: IConceptExplanation;
  success: boolean;
}

// AI Service types
export interface IClaudeResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface ICompletionOptions {
  maxTokens?: number;
  temperature?: number;
}

// API response wrapper
export interface IAPIResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
