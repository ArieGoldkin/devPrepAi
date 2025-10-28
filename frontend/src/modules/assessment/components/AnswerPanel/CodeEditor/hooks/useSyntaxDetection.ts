/**
 * useSyntaxDetection Hook
 * Phase B: Detect language-specific syntax for incompatibility warnings
 *
 * Detects language-specific syntax that may break when switching languages:
 * - TypeScript: interfaces, types, generics, type annotations
 * - JavaScript: arrow functions, ES6+ features
 * - Python: def, class, indentation-based blocks
 */

import type { TCodeLanguage } from "@modules/assessment/components/AnswerPanel/types";

/**
 * Syntax patterns for each language
 */
const SYNTAX_PATTERNS = {
  typescript: {
    patterns: [
      /interface\s+\w+/, // interface declarations
      /type\s+\w+\s*=/, // type aliases
      /:\s*\w+(\[\])?(\s*\|)?/, // type annotations
      /<\w+(\s*,\s*\w+)*>/, // generics
      /\bas\s+\w+/, // type assertions
    ],
    message:
      "TypeScript-specific syntax detected (interfaces, types, generics)",
  },
  javascript: {
    patterns: [
      /=>/, // arrow functions
      /const\s+\w+\s*=/, // const declarations
      /let\s+\w+\s*=/, // let declarations
      /`[^`]*\$\{[^}]+\}[^`]*`/, // template literals with expressions
      /\.{3}\w+/, // spread operator
    ],
    message:
      "JavaScript-specific syntax detected (arrow functions, const/let, ES6+ features)",
  },
  python: {
    patterns: [
      /^\s*def\s+\w+\(/m, // function definitions
      /^\s*class\s+\w+:/m, // class definitions
      /^\s{4,}/m, // indentation (4+ spaces)
      /:\s*$/m, // colon at end of line
      /\belse:\s*$/m, // else blocks
      /\belif\s+/, // elif statements
    ],
    message:
      "Python-specific syntax detected (def, class, indentation-based blocks)",
  },
} as const;

/**
 * Result of syntax detection
 */
export interface ISyntaxDetectionResult {
  /** Whether incompatible syntax was detected */
  hasIssues: boolean;
  /** Human-readable message describing the issue */
  message: string | null;
  /** The language that was detected */
  detectedLanguage: TCodeLanguage | null;
}

/**
 * Return type for useSyntaxDetection hook
 */
interface IUseSyntaxDetectionReturn {
  detectSyntaxIssues: (
    code: string,
    newLanguage: TCodeLanguage,
    currentLanguage: TCodeLanguage,
  ) => ISyntaxDetectionResult;
  detectLanguage: (code: string, language: TCodeLanguage) => boolean;
}

/**
 * useSyntaxDetection Hook
 *
 * Detects language-specific syntax in code to warn users about
 * potential incompatibilities when switching languages.
 *
 * @example
 * const { detectSyntaxIssues } = useSyntaxDetection();
 *
 * const result = detectSyntaxIssues(code, "python");
 * if (result.hasIssues) {
 *   // Show warning modal
 * }
 */
export function useSyntaxDetection(): IUseSyntaxDetectionReturn {
  /**
   * Detect if code contains syntax from a specific language
   *
   * @param code - The code to analyze
   * @param language - The language to check for
   * @returns True if the language's syntax is detected
   */
  const detectLanguage = (code: string, language: TCodeLanguage): boolean => {
    const { patterns } = SYNTAX_PATTERNS[language];
    return patterns.some((pattern) => pattern.test(code));
  };

  /**
   * Detect syntax issues when switching to a new language
   *
   * @param code - The current code in the editor
   * @param newLanguage - The language the user wants to switch to
   * @param currentLanguage - The current editor language
   * @returns Detection result with incompatibility info
   */
  const detectSyntaxIssues = (
    code: string,
    newLanguage: TCodeLanguage,
    currentLanguage: TCodeLanguage,
  ): ISyntaxDetectionResult => {
    // No issues if code is empty
    if (!code.trim()) {
      return {
        hasIssues: false,
        message: null,
        detectedLanguage: null,
      };
    }

    // Check if code contains current language's specific syntax
    const hasCurrentLanguageSyntax = detectLanguage(code, currentLanguage);

    // If current language syntax detected, warn when switching away
    if (hasCurrentLanguageSyntax && newLanguage !== currentLanguage) {
      return {
        hasIssues: true,
        message: SYNTAX_PATTERNS[currentLanguage].message,
        detectedLanguage: currentLanguage,
      };
    }

    // Also check if code contains new language's syntax (edge case: mixed syntax)
    const hasNewLanguageSyntax = detectLanguage(code, newLanguage);

    // If new language syntax already present, no warning needed
    if (hasNewLanguageSyntax) {
      return {
        hasIssues: false,
        message: null,
        detectedLanguage: newLanguage,
      };
    }

    // No issues detected
    return {
      hasIssues: false,
      message: null,
      detectedLanguage: null,
    };
  };

  return {
    detectSyntaxIssues,
    detectLanguage,
  };
}
