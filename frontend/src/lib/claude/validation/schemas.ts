/**
 * Zod Validation Schemas
 * Type-safe validation for Claude API requests
 *
 * Provides runtime validation for API endpoints to ensure data integrity
 * and provide clear error messages for invalid requests.
 */
import { z } from "zod";

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

const VALIDATION_LIMITS = {
  MAX_QUESTIONS_PER_REQUEST: 50,
  MAX_ANSWER_LENGTH: 50000,
  MAX_CONCEPT_LENGTH: 500,
} as const;

// ============================================================================
// USER PROFILE SCHEMAS
// ============================================================================

/**
 * Interview type validation
 */
export const InterviewTypeSchema = z.enum([
  "frontend",
  "backend",
  "fullstack",
  "mobile",
  "devops",
  "ml",
  "data",
  "other",
]);

/**
 * Experience level validation
 */
export const ExperienceLevelSchema = z.enum([
  "junior",
  "mid",
  "senior",
  "lead",
  "staff",
]);

/**
 * User profile validation schema
 */
export const UserProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  interviewType: InterviewTypeSchema,
  experienceLevel: ExperienceLevelSchema,
  focusAreas: z.array(z.string()).min(1, "At least one focus area required"),
  targetCompanies: z.array(z.string()).optional(),
  preparationGoals: z.string().optional(),
});

// ============================================================================
// QUESTION SCHEMAS
// ============================================================================

/**
 * Question type validation
 */
export const QuestionTypeSchema = z.enum([
  "coding",
  "system-design",
  "behavioral",
  "conceptual",
]);

/**
 * Question difficulty validation (1-10 scale)
 */
export const DifficultySchema = z
  .number()
  .int()
  .min(1, "Difficulty must be at least 1")
  .max(10, "Difficulty must be at most 10");

// ============================================================================
// API REQUEST SCHEMAS
// ============================================================================

/**
 * Generate Questions Request Schema
 *
 * Validates requests to the question generation endpoint
 *
 * @example
 * ```typescript
 * const request = GenerateQuestionsRequestSchema.parse({
 *   profile: userProfile,
 *   count: 5,
 *   difficulty: 5,
 *   type: "coding"
 * });
 * ```
 */
export const GenerateQuestionsRequestSchema = z.object({
  profile: UserProfileSchema,
  count: z
    .number()
    .int()
    .min(1, "Must generate at least 1 question")
    .max(
      VALIDATION_LIMITS.MAX_QUESTIONS_PER_REQUEST,
      `Cannot generate more than ${VALIDATION_LIMITS.MAX_QUESTIONS_PER_REQUEST} questions at once`,
    ),
  difficulty: DifficultySchema,
  type: QuestionTypeSchema,
});

/**
 * Evaluate Answer Request Schema
 *
 * Validates requests to the answer evaluation endpoint
 */
export const EvaluateAnswerRequestSchema = z.object({
  question: z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    type: QuestionTypeSchema,
    difficulty: DifficultySchema,
    // Other fields are optional for evaluation
  }),
  answer: z
    .string()
    .min(1, "Answer cannot be empty")
    .max(
      VALIDATION_LIMITS.MAX_ANSWER_LENGTH,
      `Answer is too long (max ${VALIDATION_LIMITS.MAX_ANSWER_LENGTH.toLocaleString()} characters)`,
    ),
});

/**
 * Explain Concept Request Schema
 *
 * Validates requests to the concept explanation endpoint
 */
export const ExplainConceptRequestSchema = z.object({
  concept: z
    .string()
    .min(1, "Concept cannot be empty")
    .max(
      VALIDATION_LIMITS.MAX_CONCEPT_LENGTH,
      `Concept description too long (max ${VALIDATION_LIMITS.MAX_CONCEPT_LENGTH} characters)`,
    ),
  userLevel: ExperienceLevelSchema,
  includeExamples: z.boolean().default(true),
});

/**
 * Request Hint Schema
 *
 * Validates requests to the hint generation endpoint (for Task 3.3)
 *
 * @example
 * ```typescript
 * const request = RequestHintSchema.parse({
 *   questionId: "q-123",
 *   hintLevel: 1,
 *   currentAnswer: "My partial solution..."
 * });
 * ```
 */
export const RequestHintSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
  hintLevel: z
    .number()
    .int()
    .min(1, "Hint level must be at least 1")
    .max(3, "Maximum 3 hint levels available"),
  currentAnswer: z.string().optional(),
  previousHints: z.array(z.string()).optional().default([]),
});

// ============================================================================
// TYPE INFERENCE
// ============================================================================

// Export inferred types for use in TypeScript
export type GenerateQuestionsRequest = z.infer<
  typeof GenerateQuestionsRequestSchema
>;
export type EvaluateAnswerRequest = z.infer<typeof EvaluateAnswerRequestSchema>;
export type ExplainConceptRequest = z.infer<typeof ExplainConceptRequestSchema>;
export type RequestHint = z.infer<typeof RequestHintSchema>;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate and parse request with detailed error messages
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Parsed data if valid, throws with detailed errors if invalid
 *
 * @example
 * ```typescript
 * try {
 *   const validRequest = validateRequest(GenerateQuestionsRequestSchema, body);
 *   // Use validRequest...
 * } catch (error) {
 *   return NextResponse.json({ error: error.message }, { status: 400 });
 * }
 * ```
 */
export function validateRequest<T extends z.ZodType>(
  schema: T,
  data: unknown,
): z.infer<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map(
      (err: z.ZodIssue) =>
        ({
          path: err.path.join("."),
          message: err.message,
        }) as const,
    );

    throw new Error(
      `Validation failed: ${errors.map((e: { path: string; message: string }) => `${e.path}: ${e.message}`).join(", ")}`,
    );
  }

  return result.data;
}

/**
 * Check if data matches schema without throwing
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns true if valid, false otherwise
 */
export function isValidRequest<T extends z.ZodType>(
  schema: T,
  data: unknown,
): data is z.infer<T> {
  return schema.safeParse(data).success;
}
