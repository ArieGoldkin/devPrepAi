/**
 * AI Router
 * Contains all Claude AI-related tRPC procedures
 *
 * Endpoints:
 * - generateQuestions (Phase 2) ✅
 * - evaluateAnswer (Phase 3) - TODO
 * - explainConcept (Phase 3) - TODO
 */
import type { IGenerateQuestionsRequest } from "@/types/ai";
import { generateQuestions } from "@lib/claude/services/question-service";

import { publicProcedure, router } from "../init";
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
});
