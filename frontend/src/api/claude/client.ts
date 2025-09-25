/**
 * Claude AI Client
 * Handles direct communication with Claude AI APIs
 */

// Constants for API timing
const API_TIMEOUT = {
  QUESTION_GENERATION: 2500, // 2.5 seconds
  ANSWER_EVALUATION: 3000, // 3 seconds
  STATS_FETCH: 1000, // 1 second
} as const;

// Types for Claude AI responses
interface IClaudeResponse {
  id: string;
  content: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

interface IQuestionGenerationRequest {
  role: string;
  level: string;
  technologies: string[];
  count: number;
}

interface IQuestionEvaluationRequest {
  question: string;
  answer: string;
  context?: Record<string, unknown>;
}

/**
 * Claude API client for handling AI operations
 */
export const claudeApi = {
  generateQuestions: async (
    request: IQuestionGenerationRequest,
  ): Promise<IClaudeResponse> => {
    // TODO: Replace with actual Claude API call
    console.warn("Generating questions for:", request);
    await new Promise((resolve) =>
      setTimeout(resolve, API_TIMEOUT.QUESTION_GENERATION),
    ); // Simulate 2.5s response
    return {
      id: "mock-id",
      content: JSON.stringify({
        questions: ["Mock question 1", "Mock question 2"],
      }),
      usage: { input_tokens: 150, output_tokens: 300 },
    };
  },

  evaluateAnswer: async (
    request: IQuestionEvaluationRequest,
  ): Promise<IClaudeResponse> => {
    // TODO: Replace with actual Claude API call
    console.warn("Evaluating answer for:", request);
    await new Promise((resolve) =>
      setTimeout(resolve, API_TIMEOUT.ANSWER_EVALUATION),
    ); // Simulate 3s response
    return {
      id: "mock-id",
      content: JSON.stringify({
        score: 8,
        feedback: "Good answer with room for improvement",
      }),
      usage: { input_tokens: 200, output_tokens: 150 },
    };
  },
};

// Export types for convenience
export type {
  IClaudeResponse,
  IQuestionGenerationRequest,
  IQuestionEvaluationRequest,
};
