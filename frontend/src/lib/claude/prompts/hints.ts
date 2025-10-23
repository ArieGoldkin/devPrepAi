/**
 * Hint Prompt Templates
 * Progressive 3-level hint system for interview questions
 *
 * Level 1: General approach/strategy
 * Level 2: Specific technique/data structure
 * Level 3: Code skeleton/pseudocode
 */

import type { IQuestion } from "@/types/ai";

/**
 * Level 1: General Approach Hint
 * Suggests high-level strategy without revealing specifics
 */
export function getLevel1Prompt(question: IQuestion): string {
  return `You are a helpful interviewer providing a GENTLE hint for this question.

QUESTION:
${question.title}
${question.content}

Provide a Level 1 hint that:
- Suggests a general approach or strategy
- Doesn't reveal the specific algorithm or solution
- Encourages thinking about the problem structure
- Is 2-3 sentences maximum
- Uses analogies or high-level concepts

Example: "Think about how you might organize data to quickly look up values..."

Do NOT mention specific data structures or give code examples yet.`;
}

/**
 * Level 2: Specific Technique Hint
 * Suggests specific approach with reasoning
 */
export function getLevel2Prompt(
  question: IQuestion,
  currentAnswer?: string,
): string {
  const contextNote = currentAnswer
    ? `\n\nUSER'S CURRENT ATTEMPT:\n${currentAnswer}\n\nProvide guidance that builds on their approach.`
    : "";

  return `You are a helpful interviewer providing a SPECIFIC hint for this question.

QUESTION:
${question.title}
${question.content}${contextNote}

Provide a Level 2 hint that:
- Suggests a specific technique or data structure
- Explains WHY this approach works
- Mentions time/space complexity considerations
- Is 3-4 sentences maximum
- Still requires user to implement

Example: "A hash map would be ideal here because it provides O(1) lookup time. As you iterate through the array, store each number as a key..."

You can mention specific techniques but don't write complete code yet.`;
}

/**
 * Level 3: Code Skeleton Hint
 * Provides pseudocode/skeleton structure
 */
export function getLevel3Prompt(
  question: IQuestion,
  currentAnswer?: string,
): string {
  const language = detectLanguage(question);
  const contextNote = currentAnswer
    ? `\n\nUSER'S CURRENT ATTEMPT:\n${currentAnswer}\n\nProvide guidance that helps them complete their solution.`
    : "";

  return `You are a helpful interviewer providing a DETAILED hint for this question.

QUESTION:
${question.title}
${question.content}${contextNote}

Provide a Level 3 hint that:
- Provides a code skeleton or pseudocode
- Shows the key algorithmic pattern
- Includes important edge cases to consider
- Is detailed but leaves some implementation to user
- Uses ${language} syntax

Example structure:
\`\`\`${language}
function solve(input) {
  // Initialize hash map
  const map = new Map();

  // Iterate and check...
  for (let i = 0; i < input.length; i++) {
    // Check if complement exists
    // If yes, return result
    // If no, store current value
  }

  // Handle case when no solution
}
\`\`\`

Provide enough structure to guide them but don't write the complete solution.`;
}

/**
 * Detect preferred programming language from question context
 */
function detectLanguage(question: IQuestion): string {
  const tags = question.tags?.join(" ").toLowerCase() || "";
  const content = question.content.toLowerCase();

  if (tags.includes("python") || content.includes("python")) return "python";
  if (tags.includes("typescript") || content.includes("typescript"))
    return "typescript";
  if (tags.includes("java") || content.includes("java")) return "java";

  return "javascript"; // default
}
