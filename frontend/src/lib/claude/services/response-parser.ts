/**
 * Claude API Response Parser
 * Handles parsing and validation of Claude AI responses with multiple fallback strategies
 */
import type { IQuestion } from "@/types/ai";

import {
  cleanJsonText,
  extractJsonFromMarkdown,
  extractValidJsonBrackets,
} from "./json-utils";
import { createValidatedQuestion } from "./validation-utils";

/**
 * Primary parsing strategy - handle markdown and clean JSON
 */
function tryPrimaryParsing(
  textContent: string,
): { questions: IQuestion[] } | null {
  try {
    let jsonText = extractJsonFromMarkdown(textContent);
    jsonText = extractValidJsonBrackets(jsonText);
    jsonText = cleanJsonText(jsonText);
    const parsed = JSON.parse(jsonText);
    return Array.isArray(parsed) ? { questions: parsed } : parsed;
  } catch {
    return null;
  }
}

/**
 * Secondary parsing - extract questions array directly
 */
function trySecondaryParsing(
  textContent: string,
): { questions: IQuestion[] } | null {
  try {
    // Try to extract questions array
    const questionsPattern = /"questions"\s*:\s*\[([\s\S]*?)\]/;
    const match = textContent.match(questionsPattern);
    if (
      match !== null &&
      match !== undefined &&
      match[1] !== null &&
      match[1] !== undefined
    ) {
      const arrayContent = cleanJsonText(match[1]);
      return { questions: JSON.parse(`[${arrayContent}]`) };
    }

    // Try any array structure
    const arrayMatch = textContent.match(/\[([\s\S]*?)\]/);
    if (
      arrayMatch !== null &&
      arrayMatch !== undefined &&
      arrayMatch[1] !== null &&
      arrayMatch[1] !== undefined
    ) {
      const content = cleanJsonText(arrayMatch[1].replace(/,\s*$/, ""));
      return { questions: JSON.parse(`[${content}]`) };
    }

    return null;
  } catch {
    return null;
  }
}

interface IQuestionFieldMap {
  [key: string]: unknown;
}

/**
 * Validate and normalize questions from Claude API response
 */
export function validateQuestions(
  questions: unknown[],
  defaults: Partial<IQuestion>,
): IQuestion[] {
  return questions.map((q: unknown, index: number) => {
    const item = q as IQuestionFieldMap;
    return createValidatedQuestion(item, index, defaults);
  });
}

// ============================================================================
// MAIN PARSER
// ============================================================================

/**
 * Parse Claude API response with multiple fallback strategies
 *
 * This parser handles various response formats from Claude AI:
 * 1. Markdown-wrapped JSON (```json ... ```)
 * 2. Plain JSON objects or arrays
 * 3. Nested questions arrays
 *
 * @param textContent - Raw text content from Claude API
 * @returns Parsed questions object
 * @throws Error if all parsing strategies fail
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
