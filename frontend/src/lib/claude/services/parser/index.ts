/**
 * JSON Parser Service
 * Main parser combining strategies and validation
 */
import type { IQuestion } from "@/types/ai";

import { tryPrimaryParsing, trySecondaryParsing } from "./strategies";

/**
 * Parse Claude API response with multiple fallback strategies
 */
export function parseClaudeResponse(textContent: string): {
  questions: IQuestion[];
} {
  // Try primary parsing
  const primaryResult = tryPrimaryParsing(textContent);
  if (primaryResult) return primaryResult;

  // Try secondary parsing (extract from questions array)
  const secondaryResult = trySecondaryParsing(textContent);
  if (secondaryResult) return secondaryResult;

  // Return empty if all strategies fail
  throw new Error("Failed to parse AI response");
}

// Re-export validation functions
export { validateQuestions } from "./validator";

// Re-export parsing strategies
export { tryPrimaryParsing, trySecondaryParsing } from "./strategies";
