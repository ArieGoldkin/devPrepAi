import type { IQuestion } from "@/types/ai";

// Language detection based on question content
export const detectLanguage = (question: IQuestion): "javascript" | "typescript" | "python" => {
  const content = question.content.toLowerCase();

  if (content.includes("python") || content.includes("django") || content.includes("flask")) {
    return "python";
  }

  if (content.includes("typescript") || content.includes("tsx") || content.includes("interface")) {
    return "typescript";
  }

  return "javascript";
};

// Text analysis utilities
export const getCharacterCount = (text: string): number => text.length;
export const getLineCount = (text: string): number => text.split('\n').length;
export const getWordCount = (text: string): number =>
  text.trim().split(/\s+/).filter(word => word.length > 0).length;

// Syntax validation for code (basic)
export const validateSyntax = (code: string, isCoding: boolean): string[] => {
  const errors: string[] = [];

  if (!isCoding || !code.trim()) return errors;

  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;
  const openBrackets = (code.match(/\[/g) || []).length;
  const closeBrackets = (code.match(/\]/g) || []).length;

  if (openBraces !== closeBraces) {
    errors.push("Mismatched curly braces");
  }
  if (openParens !== closeParens) {
    errors.push("Mismatched parentheses");
  }
  if (openBrackets !== closeBrackets) {
    errors.push("Mismatched square brackets");
  }

  return errors;
};

// Constants
export const AUTO_SAVE_DELAY = 2000;
export const MAX_TEXT_LENGTH = 2000;