/**
 * Validation Utilities for Claude Response Parsing
 * Handles question validation and normalization
 */

import type { IQuestion } from "@/types/ai";

const DEFAULT_TIME_ESTIMATE = 30;

type IQuestionFieldMap = Record<string, unknown>;

/**
 * Check if value exists (not null or undefined)
 */
function hasValue(value: unknown): boolean {
  return value !== null && value !== undefined;
}

/**
 * Get valid question type or fallback to default
 */
export function getValidType(
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
export function getOptionalProperties(
  item: IQuestionFieldMap,
): Partial<IQuestion> {
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
export function createValidatedQuestion(
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
