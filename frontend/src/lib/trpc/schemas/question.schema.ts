/**
 * Question Zod Schemas
 * Runtime-validated question and question-related types
 */
import { z } from "zod";

import { userProfileSchema } from "./user.schema";

const MAX_TITLE_LENGTH = 200;
const MAX_TIME_ESTIMATE_MINUTES = 180;
const MAX_QUESTIONS_PER_REQUEST = 20;

/**
 * Question type
 */
export const questionTypeSchema = z.enum([
  "behavioral",
  "system-design",
  "coding",
  "conceptual",
]);

/**
 * Question section type for progressive disclosure
 */
export const questionSectionSchema = z.object({
  type: z.enum(["context", "examples", "constraints", "edge-cases"]),
  title: z.string(),
  content: z.string(),
  priority: z.enum(["high", "medium", "low"]),
});

/**
 * Question example structure
 */
export const questionExampleSchema = z.object({
  input: z.string(),
  output: z.string(),
  explanation: z.string().optional(),
});

/**
 * Full question schema with Phase II enhancements
 */
export const questionSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(MAX_TITLE_LENGTH, "Title too long"),
  content: z.string().min(1, "Content is required"),
  type: questionTypeSchema,
  difficulty: z
    .number()
    .int()
    .min(1, "Difficulty must be at least 1")
    .max(10, "Difficulty cannot exceed 10"),
  category: z.string().min(1),
  hints: z.array(z.string()),
  solution: z.string(),
  timeEstimate: z.number().int().min(1).max(MAX_TIME_ESTIMATE_MINUTES), // 1-180 minutes
  tags: z.array(z.string()),
  createdAt: z.string(), // Relaxed: accept any string format during migration
  updatedAt: z.string(), // Relaxed: accept any string format during migration
  // Phase II additions
  sections: z.array(questionSectionSchema).optional(),
  hintLevels: z.array(z.string()).optional(),
  expectedLanguage: z.string().optional(),
  examples: z.array(questionExampleSchema).optional(),
  constraints: z.array(z.string()).optional(),
  edgeCases: z.array(z.string()).optional(),
  subcategory: z.string().optional(),
});

/**
 * Generate Questions Request Schema
 */
export const generateQuestionsInputSchema = z.object({
  profile: userProfileSchema,
  count: z
    .number()
    .int()
    .min(1, "Must generate at least 1 question")
    .max(
      MAX_QUESTIONS_PER_REQUEST,
      "Cannot generate more than 20 questions at once",
    ),
  difficulty: z
    .number()
    .int()
    .min(1, "Difficulty must be at least 1")
    .max(10, "Difficulty cannot exceed 10"),
  type: questionTypeSchema,
});

/**
 * Generate Questions Response Schema
 */
export const generateQuestionsOutputSchema = z.object({
  questions: z.array(questionSchema),
  totalGenerated: z.number().int().nonnegative(),
});

/**
 * Inferred types
 */
export type QuestionType = z.infer<typeof questionTypeSchema>;
export type QuestionSection = z.infer<typeof questionSectionSchema>;
export type QuestionExample = z.infer<typeof questionExampleSchema>;
export type Question = z.infer<typeof questionSchema>;
export type GenerateQuestionsInput = z.infer<
  typeof generateQuestionsInputSchema
>;
export type GenerateQuestionsOutput = z.infer<
  typeof generateQuestionsOutputSchema
>;
