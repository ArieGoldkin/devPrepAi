import type { IQuestionSection , IQuestion, IGenerateQuestionsRequest } from "@/types/ai";
/**
 * Question Generator for Testing
 * Generates mock questions for development and testing
 */


/**
 * Generate test questions based on request parameters
 */
export function generateTestQuestions(request: IGenerateQuestionsRequest): IQuestion[] {
  const questions: IQuestion[] = [];
  const currentDate = new Date().toISOString();

  for (let i = 0; i < request.count; i++) {
    questions.push(createTestQuestion(i, request, currentDate));
  }

  return questions;
}

/**
 * Create a single test question
 */
function createTestQuestion(
  index: number,
  request: IGenerateQuestionsRequest,
  timestamp: string
): IQuestion {
  const questionType = request.type === "coding" ? "Algorithm Challenge" : "System Design";
  const category = request.type === "coding" ? "Algorithms" : "Architecture";
  const subcategory = request.type === "coding" ? "Arrays" : "Microservices";

  return {
    id: `test-q-${Date.now()}-${index}`,
    title: `${questionType} ${index + 1}`,
    content: generateContent(request),
    type: request.type,
    difficulty: request.difficulty,
    category,
    subcategory,
    hints: generateHints(),
    solution: "This is a sample solution for testing purposes.",
    timeEstimate: 30,
    tags: request.profile.technologies.slice(0, 3),
    sections: generateSections(),
    expectedLanguage: getExpectedLanguage(request.profile.roleFocus),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

/**
 * Generate question content based on profile
 */
function generateContent(request: IGenerateQuestionsRequest): string {
  const { type, profile } = request;
  return `This is a test ${type} question for ${profile.roleFocus} developers with ${profile.experienceLevel} experience.`;
}

/**
 * Generate progressive hints
 */
function generateHints(): string[] {
  return [
    "Start by understanding the problem",
    "Think about edge cases",
    "Consider time complexity",
    "Review your solution",
  ];
}

/**
 * Generate question sections for Phase II
 */
function generateSections(): IQuestionSection[] {
  return [
    {
      type: "examples" as const,
      title: "Examples",
      content: "<pre>Input: [1, 2, 3]\nOutput: [3, 2, 1]</pre><pre>Input: []\nOutput: []</pre>",
      priority: "high" as const,
    },
    {
      type: "context" as const,
      title: "Context",
      content: "This problem tests your understanding of fundamental concepts.",
      priority: "medium" as const,
    },
    {
      type: "constraints" as const,
      title: "Constraints",
      content: "• Array length: 0 <= n <= 10^5\n• Time complexity: O(n)\n• Space complexity: O(1)",
      priority: "medium" as const,
    },
    {
      type: "edge-cases" as const,
      title: "Edge Cases",
      content: "• Empty input\n• Single element\n• Duplicate values",
      priority: "low" as const,
    },
  ];
}

/**
 * Get expected language based on role focus
 */
function getExpectedLanguage(roleFocus: string): string {
  const languageMap: Record<string, string> = {
    frontend: "javascript",
    backend: "python",
    fullstack: "typescript",
    mobile: "swift",
    devops: "bash",
  };
  return languageMap[roleFocus] || "javascript";
}

/**
 * Generate a fallback question for error scenarios
 */
export function generateFallbackQuestion(): IQuestion {
  return {
    id: `fallback-${Date.now()}`,
    title: "Array Manipulation",
    content: "Write a function that reverses an array in place without using built-in reverse methods.",
    type: "coding",
    difficulty: 5,
    category: "Algorithms",
    hints: generateHints(),
    solution: "Use two pointers from start and end, swap elements while moving pointers toward center",
    timeEstimate: 15,
    tags: ["arrays", "algorithms", "two-pointers"],
    sections: generateSections(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}