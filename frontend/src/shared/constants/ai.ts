/**
 * AI Service Configuration Constants
 * Constants for Claude AI integration and model parameters
 */

// Token Limits
export const DEFAULT_MAX_TOKENS = 1000;
export const GENERATION_MAX_TOKENS = 4000;
export const EVALUATION_MAX_TOKENS = 1000;
export const EXPLANATION_MAX_TOKENS = 1000;

// Temperature Settings (0-1, higher = more creative)
export const DEFAULT_TEMPERATURE = 0.7;
export const GENERATION_TEMPERATURE = 0.7;
export const EVALUATION_TEMPERATURE = 0.7;
export const EXPLANATION_TEMPERATURE = 0.6;

// Model Configuration
export const AI_MODEL = "claude-3-opus-20240229" as const;
export const AI_MODEL_VERSION = "2024-02-29" as const;

// Service-specific configurations
export const AI_CONFIG = {
  // Question Generation Service
  generation: {
    maxTokens: GENERATION_MAX_TOKENS,
    temperature: GENERATION_TEMPERATURE,
    model: AI_MODEL,
  },

  // Answer Evaluation Service
  evaluation: {
    maxTokens: EVALUATION_MAX_TOKENS,
    temperature: EVALUATION_TEMPERATURE,
    model: AI_MODEL,
  },

  // Concept Explanation Service
  explanation: {
    maxTokens: EXPLANATION_MAX_TOKENS,
    temperature: EXPLANATION_TEMPERATURE,
    model: AI_MODEL,
  },
} as const;

// Scoring Configuration
export const SCORING = {
  MAX_SCORE: 100,
  EXCELLENT_THRESHOLD: 80,
  GOOD_THRESHOLD: 60,
  PASS_THRESHOLD: 50,
  ACCURACY_MULTIPLIER: 10,
} as const;

// Question Difficulty Levels
export const DIFFICULTY = {
  EASY_MIN: 1,
  EASY_MAX: 3,
  MEDIUM_MIN: 4,
  MEDIUM_MAX: 6,
  HARD_MIN: 7,
  HARD_MAX: 10,
} as const;

// Default Question Configuration
export const QUESTION_DEFAULTS = {
  COUNT: 10,
  TIME_ESTIMATE: 15, // minutes
  MAX_TIME_ESTIMATE: 60, // minutes
  DIFFICULTY: 5, // medium
} as const;

// Helper function to get difficulty label
export function getDifficultyLabel(difficulty: number): string {
  if (difficulty <= DIFFICULTY.EASY_MAX) return "Easy";
  if (difficulty <= DIFFICULTY.MEDIUM_MAX) return "Medium";
  return "Hard";
}

// Type exports for type safety
export type AIServiceType = keyof typeof AI_CONFIG;
export type DifficultyLevel = "Easy" | "Medium" | "Hard";