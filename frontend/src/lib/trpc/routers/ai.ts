/**
 * AI Router
 * Contains all Claude AI-related tRPC procedures
 *
 * Endpoints:
 * - generateQuestions (Phase 2) ✅
 * - evaluateAnswer (Phase 3) ✅
 * - explainConcept (Phase 3) - TODO
 */
import Anthropic from "@anthropic-ai/sdk";
import { TRPCError } from "@trpc/server";

import type {
  IEvaluateAnswerRequest,
  IGenerateQuestionsRequest,
} from "@/types/ai";
import { getClaudeConfig } from "@lib/claude/config";
import { buildEvaluationPrompt } from "@lib/claude/services/ai-prompts";
import { generateQuestions } from "@lib/claude/services/question-service";
import {
  mockEvaluateAnswer,
  shouldUseMockService,
} from "@shared/mocks/mockEvaluationService";

import { publicProcedure, router } from "../init";
import {
  evaluateAnswerInputSchema,
  evaluateAnswerOutputSchema,
  type EvaluateAnswerOutput,
} from "../schemas/evaluation.schema";
import {
  generateQuestionsInputSchema,
  generateQuestionsOutputSchema,
} from "../schemas/question.schema";

/**
 * AI-related procedures
 */
export const aiRouter = router({
  /**
   * Generate Questions Procedure
   * Generate interview questions based on user profile
   *
   * @input profile, count, difficulty, type
   * @output questions array + totalGenerated count
   */
  generateQuestions: publicProcedure
    .input(generateQuestionsInputSchema)
    .output(generateQuestionsOutputSchema)
    .mutation(async ({ input }) => {
      // Use existing business logic from question-service
      // Bridge between new Zod types and old TypeScript interfaces
      const response = await generateQuestions(
        input as unknown as IGenerateQuestionsRequest,
      );

      return {
        questions: response.questions,
        totalGenerated: response.totalGenerated,
      };
    }),

  /**
   * Evaluate Answer Procedure
   * Evaluate user's answer using Claude AI
   * Supports mock mode for development
   *
   * @input question, answer
   * @output feedback (score, strengths, improvements, suggestions)
   */
  evaluateAnswer: publicProcedure
    .input(evaluateAnswerInputSchema)
    .output(evaluateAnswerOutputSchema)
    .mutation(async ({ input }): Promise<EvaluateAnswerOutput> => {
      // Use mock service if enabled (development mode)
      if (shouldUseMockService()) {
        // eslint-disable-next-line no-console -- Development-only log
        console.log("🎭 Using mock evaluation service (no API call)");
        // Mock service returns IAPIResponse<IEvaluateAnswerResponse>
        // We need to extract the data part for tRPC response
        const mockResponse = await mockEvaluateAnswer(
          input as unknown as IEvaluateAnswerRequest,
        );
        return {
          feedback: mockResponse.data.feedback,
          success: mockResponse.success,
        };
      }

      // Get centralized Claude configuration
      const config = getClaudeConfig();
      const client = new Anthropic({ apiKey: config.apiKey });

      // Build evaluation prompt
      // Bridge between new Zod types and old TypeScript interfaces
      const prompt = buildEvaluationPrompt(
        input as unknown as IEvaluateAnswerRequest,
      );

      // Call Claude API with centralized config
      const response = await client.messages.create({
        model: config.model,
        max_tokens: config.maxTokens.EVALUATION,
        temperature: config.temperature.EVALUATION,
        messages: [{ role: "user", content: prompt }],
      });

      // Extract text content
      const textContent =
        response.content[0]?.type === "text" ? response.content[0].text : "";

      if (!textContent) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No text content received from Claude API",
        });
      }

      // Parse Claude response
      const parsedResponse = JSON.parse(textContent);

      return {
        feedback: parsedResponse.feedback,
        success: true,
      };
    }),
});
