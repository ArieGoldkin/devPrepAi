/**
 * Hint Schemas
 * Zod schemas for progressive hint system (3 levels)
 * Used by tRPC procedures for runtime validation
 */
import { z } from "zod";

import { questionSchema } from "./question.schema";

// Constants for hint system
const MIN_HINT_LEVEL = 1;
const MAX_HINT_LEVEL = 3;

/**
 * Hint Input Schema
 * Validates request for progressive hint
 */
export const getHintInputSchema = z.object({
  question: questionSchema,
  currentAnswer: z.string().optional(),
  hintLevel: z
    .number()
    .int()
    .min(MIN_HINT_LEVEL, "Hint level must be at least 1")
    .max(MAX_HINT_LEVEL, "Maximum 3 hints available"),
});

/**
 * Hint Output Schema
 * Validates hint response from Claude AI
 */
export const getHintOutputSchema = z.object({
  hint: z.object({
    level: z.number().int().min(MIN_HINT_LEVEL).max(MAX_HINT_LEVEL),
    content: z.string().min(1, "Hint content cannot be empty"),
    hasMore: z.boolean(),
  }),
  success: z.boolean(),
});

/**
 * Inferred types (auto-generated from Zod schemas)
 */
export type GetHintInput = z.infer<typeof getHintInputSchema>;
export type GetHintOutput = z.infer<typeof getHintOutputSchema>;
