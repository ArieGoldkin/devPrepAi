/**
 * Claude API Response Parser
 * Handles parsing and validation of Claude AI responses with multiple fallback strategies
 *
 * Consolidated from parser/index.ts, parser/strategies.ts, parser/validator.ts
 */
import type { IQuestion } from "@/types/ai";
import { ASSESSMENT_DEFAULTS } from "@store/constants";

// ============================================================================
// PARSING STRATEGIES
// ============================================================================

/**
 * Regex pattern to remove control characters from JSON strings
 * Matches ASCII control characters (0x00-0x1F) and C1 control characters (0x7F-0x9F)
 * These characters can appear in LLM responses but are invalid in JSON strings
 *
 * eslint-disable-next-line is required here because:
 * - Control characters are intentionally matched for security/sanitization
 * - LLM responses may contain these invalid JSON characters
 * - This regex cleans them before JSON.parse() to prevent parsing errors
 */
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_REGEX = new RegExp("[\u0000-\u001F\u007F-\u009F]", "g");

/**
 * Extract JSON from markdown code blocks
 */
function extractJsonFromMarkdown(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return match?.[1] ?? text;
}

/**
 * Extract valid JSON by matching brackets
 */
function extractValidJsonBrackets(text: string): string {
  const match = text.match(/(\{|\[)[\s\S]*/);
  if (match === null || match === undefined) return text;

  const startChar = match[0][0];
  const endChar = startChar === "{" ? "}" : "]";
  let depth = 0;
  let endIndex = -1;

  for (let i = 0; i < match[0].length; i++) {
    if (match[0][i] === startChar) depth++;
    if (match[0][i] === endChar) {
      depth--;
      if (depth === 0) {
        endIndex = i;
        break;
      }
    }
  }

  return endIndex > -1 ? match[0].substring(0, endIndex + 1) : text;
}

/**
 * Clean JSON text from common issues in Claude API responses
 *
 * Removes control characters, trailing commas, and fixes escaped quotes
 * that can appear in LLM-generated JSON
 */
function cleanJsonText(text: string): string {
  return text
    .trim()
    .replace(CONTROL_CHARS_REGEX, "") // Remove control characters using pre-compiled regex
    .replace(/,\s*([}\]])/g, "$1") // Remove trailing commas
    .replace(/\\'/g, "'") // Fix escaped quotes
    .replace(/\\\\/g, "\\"); // Fix double escaping
}

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

// ============================================================================
// VALIDATION
// ============================================================================

const DEFAULT_TIME_ESTIMATE = ASSESSMENT_DEFAULTS.duration; // Default question time estimate in minutes

interface IQuestionFieldMap {
  [key: string]: unknown;
}

/**
 * Check if value exists (not null or undefined)
 */
function hasValue(value: unknown): boolean {
  return value !== null && value !== undefined;
}

/**
 * Get valid question type or fallback to default
 */
function getValidType(
  type: unknown,
  defaultType?: IQuestion["type"],
): IQuestion["type"] {
  const validTypes = [
    "coding",
    "system-design",
    "behavioral",
    "conceptual",
  ] as const;
  if (
    typeof type === "string" &&
    validTypes.includes(type as (typeof validTypes)[number])
  ) {
    return type as IQuestion["type"];
  }
  return defaultType ?? "coding";
}

/**
 * Get optional properties that should only be included if they have values
 */
function getOptionalProperties(item: IQuestionFieldMap): Partial<IQuestion> {
  const optional: Partial<IQuestion> = {};

  if (hasValue(item["subcategory"])) {
    optional.subcategory = String(item["subcategory"]);
  }

  if (hasValue(item["expectedLanguage"])) {
    optional.expectedLanguage = String(item["expectedLanguage"]);
  }

  return optional;
}

/**
 * Create validated question from raw item
 */
function createValidatedQuestion(
  item: IQuestionFieldMap,
  index: number,
  defaults: Partial<IQuestion>,
): IQuestion {
  const currentTime = new Date().toISOString();

  return {
    id: String(item["id"] ?? `q-${Date.now()}-${index}`),
    title: String(item["title"] ?? "Interview Question"),
    content: String(item["content"] ?? "Please solve this problem"),
    type: getValidType(item["type"], defaults.type),
    difficulty: Number(item["difficulty"] ?? defaults.difficulty ?? 5),
    category: String(item["category"] ?? "General"),
    hints: Array.isArray(item["hints"]) ? item["hints"] : [],
    solution: String(item["solution"] ?? "Solution not provided"),
    timeEstimate: Number(item["timeEstimate"] ?? DEFAULT_TIME_ESTIMATE),
    tags: Array.isArray(item["tags"]) ? item["tags"] : [],
    sections: Array.isArray(item["sections"]) ? item["sections"] : [],
    createdAt: String(item["createdAt"] ?? currentTime),
    updatedAt: String(item["updatedAt"] ?? currentTime),
    ...getOptionalProperties(item),
  };
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
