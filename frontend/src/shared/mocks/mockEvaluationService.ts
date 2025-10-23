/**
 * Mock Evaluation Service
 * Simulates Claude AI evaluation responses for development without API calls
 * Provides realistic, varied feedback based on answer quality heuristics
 */

import type {
  IAPIResponse,
  IEvaluateAnswerRequest,
  IEvaluateAnswerResponse,
} from "@/types/ai";

import {
  calculateMockScore,
  generateMockFeedback,
} from "./mockEvaluationHelpers";

const MOCK_NETWORK_DELAY_MS = 800; // 0.8 seconds
const MIN_ANSWER_LENGTH = 10;

/**
 * Mock evaluation function that simulates Claude API response
 * Returns realistic, varied feedback without making actual API calls
 *
 * @param request - Question and answer to evaluate
 * @returns Promise with mock evaluation response
 */
export async function mockEvaluateAnswer(
  request: IEvaluateAnswerRequest,
): Promise<IAPIResponse<IEvaluateAnswerResponse>> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, MOCK_NETWORK_DELAY_MS));

  // Validate input
  if (!request.answer || request.answer.trim().length < MIN_ANSWER_LENGTH) {
    return {
      data: {
        feedback: {
          score: 0,
          strengths: [],
          improvements: ["Answer is too short or empty"],
          suggestions: [
            "Please provide a more detailed answer (minimum 10 characters)",
          ],
          overallFeedback:
            "Your answer needs to be more substantial. Please provide a detailed response.",
        },
        success: false,
      },
      success: false,
      error: "Answer too short",
    };
  }

  // Calculate score based on answer quality
  const score = calculateMockScore(request.answer, request.question.type);

  // Generate feedback
  const feedback = generateMockFeedback(
    score,
    request.question.type,
    request.answer,
  );

  return {
    data: {
      feedback,
      success: true,
    },
    success: true,
  };
}

/**
 * Environment flag to enable/disable mock service
 * For server-side (API routes): Set USE_MOCK_API=true in .env.local
 * For client-side: Set NEXT_PUBLIC_USE_MOCK_API=true in .env.local
 */
export const shouldUseMockService = (): boolean =>
  // Check both server-side and client-side env vars
  process.env["USE_MOCK_API"] === "true" ||
  process.env["NEXT_PUBLIC_USE_MOCK_API"] === "true";
