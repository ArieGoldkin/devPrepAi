/**
 * DevPrep AI - Simple AI Service
 * Client-side service that communicates with API routes
 */

import { apiClient } from "../lib/api-client";
import type {
  IGenerateQuestionsRequest,
  IGenerateQuestionsResponse,
  IEvaluateAnswerRequest,
  IEvaluateAnswerResponse,
  IExplainConceptRequest,
  IExplainConceptResponse,
  IAPIResponse,
} from "../types/ai";

class AIService {
  constructor() {
    // No longer needs API key configuration - handled server-side
  }

  async generateQuestions(
    request: IGenerateQuestionsRequest,
  ): Promise<IAPIResponse<IGenerateQuestionsResponse>> {
    try {
      return await apiClient.generateQuestions(request);
    } catch (error) {
      console.error("Generate questions error:", error);
      return {
        data: { questions: [], totalGenerated: 0 },
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async evaluateAnswer(
    request: IEvaluateAnswerRequest,
  ): Promise<IAPIResponse<IEvaluateAnswerResponse>> {
    try {
      return await apiClient.evaluateAnswer(request);
    } catch (error) {
      console.error("Evaluate answer error:", error);
      return {
        data: {
          feedback: {
            score: 0,
            strengths: [],
            improvements: [],
            suggestions: [],
            overallFeedback: "Unable to evaluate answer",
          },
          success: false,
        },
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async explainConcept(
    request: IExplainConceptRequest,
  ): Promise<IAPIResponse<IExplainConceptResponse>> {
    try {
      return await apiClient.explainConcept(request);
    } catch (error) {
      console.error("Explain concept error:", error);
      return {
        data: {
          explanation: {
            concept: request.concept,
            explanation: "Unable to generate explanation",
            examples: [],
            keyPoints: [],
            relatedConcepts: [],
          },
          success: false,
        },
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const aiService = new AIService();

// Export convenience functions for backward compatibility
export const generatePracticeQuestions = async (
  profile: IGenerateQuestionsRequest["profile"],
): Promise<IGenerateQuestionsResponse["questions"]> => {
  const response = await aiService.generateQuestions({
    profile,
    count: 5, // Default count
    difficulty: 5, // Default difficulty
    type: profile.interviewType, // Use interview type directly as it matches
  });

  if (!response.success || response.data === undefined) {
    throw new Error(response.error ?? "Failed to generate questions");
  }
  return response.data.questions;
};

export const evaluateAssessment = async (
  request: IEvaluateAnswerRequest,
): Promise<IAPIResponse<IEvaluateAnswerResponse>> =>
  aiService.evaluateAnswer(request);
