/**
 * AI Router
 * Contains all Claude AI-related tRPC procedures
 *
 * Endpoints:
 * - hello (test procedure)
 * - generateQuestions (Phase 2) ✅
 * - evaluateAnswer (Phase 3)
 * - explainConcept (Phase 3)
 */
import type { IGenerateQuestionsRequest } from "@/types/ai";
import { generateQuestions } from "@lib/claude/services/question-service";

import { publicProcedure, router } from "../init";
import { helloInputSchema, helloOutputSchema } from "../schemas/hello.schema";
import {
  generateQuestionsInputSchema,
  generateQuestionsOutputSchema,
} from "../schemas/question.schema";

/**
 * AI-related procedures
 */
export const aiRouter = router({
  /**
   * Test procedure: Hello World
   * Validates tRPC setup with type-safe input/output
   */
  hello: publicProcedure
    .input(helloInputSchema)
    .output(helloOutputSchema)
    .query(async ({ input }) => ({
      message: `Hello, ${input.name}! tRPC is working correctly! 🎉`,
      timestamp: new Date().toISOString(),
    })),

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
});
