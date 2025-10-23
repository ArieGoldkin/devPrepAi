/**
 * Hints Router
 * Contains hint-related tRPC procedures for the Smart Hints System
 *
 * Endpoints:
 * - getHint - Generate progressive hints (3 levels) for current question
 */
import Anthropic from "@anthropic-ai/sdk";
import { TRPCError } from "@trpc/server";

import type { IQuestion } from "@/types/ai";
import {
  getLevel1Prompt,
  getLevel2Prompt,
  getLevel3Prompt,
} from "@lib/claude/prompts/hints";
import { DEFAULT_TEMPERATURE } from "@shared/constants/ai";

import { publicProcedure, router } from "../init";
import {
  getHintInputSchema,
  getHintOutputSchema,
} from "../schemas/hint.schema";

/**
 * Hints-related procedures
 */
export const hintsRouter = router({
  /**
   * Get Hint Procedure
   * Generate progressive hints (3 levels) for current question
   *
   * @input question, currentAnswer, hintLevel (1-3)
   * @output hint content, level, hasMore
   */
  getHint: publicProcedure
    .input(getHintInputSchema)
    .output(getHintOutputSchema)
    .mutation(async ({ input }) => {
      const { question, currentAnswer, hintLevel } = input;

      // Initialize Claude client
      const apiKey = process.env["ANTHROPIC_API_KEY"];
      if (!apiKey) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "ANTHROPIC_API_KEY environment variable is required",
        });
      }

      const client = new Anthropic({ apiKey });

      // Generate hint using level-specific prompts
      // Bridge between Zod schema and IQuestion interface
      const hintContent = await generateHint(
        client,
        question as unknown as IQuestion,
        currentAnswer,
        hintLevel,
      );

      return {
        hint: {
          level: hintLevel,
          content: hintContent,
          hasMore: hintLevel < 3,
        },
        success: true,
      };
    }),
});

/**
 * Generate hint using Claude AI
 * Uses progressive prompt templates based on hint level
 */
async function generateHint(
  client: Anthropic,
  question: IQuestion,
  currentAnswer: string | undefined,
  hintLevel: number,
): Promise<string> {
  // Select appropriate prompt based on level
  const promptGenerators = {
    1: () => getLevel1Prompt(question),
    2: () => getLevel2Prompt(question, currentAnswer),
    3: () => getLevel3Prompt(question, currentAnswer),
  };

  const prompt = promptGenerators[hintLevel as 1 | 2 | 3]();

  // Call Claude API
  const response = await client.messages.create({
    model:
      process.env["NEXT_PUBLIC_ANTHROPIC_MODEL"] || "claude-3-5-sonnet-latest",
    max_tokens: 500, // Hints should be concise
    temperature: DEFAULT_TEMPERATURE,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
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

  return textContent;
}
