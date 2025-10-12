/**
 * API Types
 * Types for API requests, responses, and Claude AI integration
 */
import type { IQuestion } from "./questions";
import type { IUserProfile } from "./user";

// Request/Response types for AI service
export interface IGenerateQuestionsRequest {
  profile: IUserProfile;
  count: number;
  difficulty: number;
  type: IQuestion["type"];
}

export interface IGenerateQuestionsResponse {
  questions: IQuestion[];
  totalGenerated: number;
}

export interface IEvaluateAnswerRequest {
  question: IQuestion;
  answer: string;
}

export interface IAnswerFeedback {
  score: number; // 0-100
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  overallFeedback: string;
  // Phase II: Include hint penalty in feedback
  hintPenalty?: number;
}

export interface IEvaluateAnswerResponse {
  feedback: IAnswerFeedback;
  success: boolean;
}

export interface IExplainConceptRequest {
  concept: string;
  userLevel: IUserProfile["experienceLevel"];
  includeExamples: boolean;
}

export interface IConceptExplanation {
  concept: string;
  explanation: string;
  examples: string[];
  keyPoints: string[];
  relatedConcepts: string[];
}

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
