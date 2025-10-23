/**
 * JSON Utilities for Claude Response Parsing
 * Handles JSON extraction and cleaning from LLM responses
 */

/**
 * Regex pattern to remove control characters from JSON strings
 * Matches ASCII control characters (0x00-0x1F) and C1 control characters (0x7F-0x9F)
 */
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_REGEX = new RegExp("[\u0000-\u001F\u007F-\u009F]", "g");

/**
 * Extract JSON from markdown code blocks
 */
export function extractJsonFromMarkdown(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return match?.[1] ?? text;
}

/**
 * Extract valid JSON by matching brackets
 */
export function extractValidJsonBrackets(text: string): string {
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
 */
export function cleanJsonText(text: string): string {
  return text
    .trim()
    .replace(CONTROL_CHARS_REGEX, "")
    .replace(/,\s*([}\]])/g, "$1")
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\");
}
