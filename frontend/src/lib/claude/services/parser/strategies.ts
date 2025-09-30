/**
 * JSON Parsing Strategies
 * Different approaches for parsing Claude AI responses
 */
import type { IQuestion } from "@/types/ai";

/**
 * Primary parsing strategy - handle markdown and clean JSON
 */
export function tryPrimaryParsing(
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
export function trySecondaryParsing(
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
 * Clean JSON text from common issues
 */
function cleanJsonText(text: string): string {
  return (
    text
      .trim()
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
      .replace(/,\s*([}\]])/g, "$1") // Remove trailing commas
      .replace(/\\'/g, "'") // Fix escaped quotes
      .replace(/\\\\/g, "\\")
  ); // Fix double escaping
}
