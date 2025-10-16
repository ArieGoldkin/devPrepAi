/**
 * Hello World Schema
 * Test schema for validating tRPC setup
 */
import { z } from "zod";

const MAX_NAME_LENGTH = 50;

/**
 * Input schema for hello procedure
 */
export const helloInputSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(MAX_NAME_LENGTH, "Name too long"),
});

/**
 * Output schema for hello procedure
 */
export const helloOutputSchema = z.object({
  message: z.string(),
  timestamp: z.string(),
});

/**
 * Inferred types
 */
export type HelloInput = z.infer<typeof helloInputSchema>;
export type HelloOutput = z.infer<typeof helloOutputSchema>;
