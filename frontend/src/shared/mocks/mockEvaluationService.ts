/**
 * Mock Evaluation Service
 * Simulates Claude AI evaluation responses for development without API calls
 * Provides realistic, varied feedback based on answer quality heuristics
 */

/* eslint-disable max-statements, no-magic-numbers */
// Mock services intentionally use magic numbers and many statements for realistic data

import type {
  IAnswerFeedback,
  IEvaluateAnswerRequest,
  IAPIResponse,
  IEvaluateAnswerResponse,
} from "@/types/ai";

/**
 * Simulates network delay for realistic development experience
 */
const MOCK_NETWORK_DELAY_MS = 800; // 0.8 seconds
const MIN_ANSWER_LENGTH = 10;
const SCORE_THRESHOLD_EXCELLENT = 85;
const SCORE_THRESHOLD_GOOD = 70;
const SCORE_THRESHOLD_FAIR = 50;

/**
 * Calculate mock score based on answer length and keywords
 * Simple heuristic: longer, more detailed answers score higher
 */
function calculateMockScore(answer: string, questionType: string): number {
  const length = answer.trim().length;
  const wordCount = answer.trim().split(/\s+/).length;
  const hasCodeBlock = answer.includes("```") || answer.includes("function");
  const hasExamples =
    answer.includes("example") || answer.includes("for instance");

  let baseScore = 40; // Start at 40 (needs work)

  // Length bonus
  if (length > 200) baseScore += 20;
  else if (length > 100) baseScore += 15;
  else if (length > 50) baseScore += 10;

  // Word count bonus
  if (wordCount > 50) baseScore += 15;
  else if (wordCount > 30) baseScore += 10;
  else if (wordCount > 15) baseScore += 5;

  // Code examples bonus (for coding questions)
  if (questionType === "coding" && hasCodeBlock) baseScore += 15;

  // Explanation bonus
  if (hasExamples) baseScore += 10;

  // Cap at 100
  return Math.min(baseScore, 100);
}

/**
 * Generate realistic feedback based on score and question type
 */
function generateMockFeedback(
  score: number,
  questionType: string,
  _answer: string, // Reserved for future use
): IAnswerFeedback {
  const strengths: string[] = [];
  const improvements: string[] = [];
  const suggestions: string[] = [];
  let overallFeedback = "";

  if (score >= SCORE_THRESHOLD_EXCELLENT) {
    // Excellent answer (85-100)
    strengths.push(
      "Comprehensive understanding demonstrated",
      "Clear and well-structured explanation",
      "Good use of specific examples and details",
    );
    improvements.push("Consider adding more edge cases or advanced scenarios");
    suggestions.push(
      "Excellent work! To reach perfection, consider discussing trade-offs or alternative approaches",
    );
    overallFeedback =
      "Outstanding answer! You've demonstrated deep understanding and clear communication. Your explanation is thorough and well-articulated.";
  } else if (score >= SCORE_THRESHOLD_GOOD) {
    // Good answer (70-84)
    strengths.push(
      "Solid grasp of core concepts",
      "Logical flow in explanation",
    );
    improvements.push(
      "Add more specific examples to illustrate points",
      "Expand on the implications or use cases",
    );
    suggestions.push(
      "Strong answer! Deepen it by adding real-world examples or discussing common pitfalls",
    );
    overallFeedback =
      "Good answer with solid fundamentals. Your explanation shows understanding, but could be enhanced with more depth and examples.";
  } else if (score >= SCORE_THRESHOLD_FAIR) {
    // Fair answer (50-69)
    strengths.push("Basic understanding is present");
    improvements.push(
      "Explanation lacks detail and depth",
      "Missing key concepts or terminology",
      "Could benefit from concrete examples",
    );
    suggestions.push(
      "Add specific examples",
      "Explain the 'why' behind concepts, not just 'what'",
      "Include more technical details",
    );
    overallFeedback =
      "Your answer shows basic understanding but needs more development. Focus on adding depth, examples, and addressing key concepts more thoroughly.";
  } else {
    // Needs work (0-49)
    strengths.push("Attempt shows willingness to engage");
    improvements.push(
      "Answer is too brief or unclear",
      "Missing fundamental concepts",
      "Lacks structure and organization",
    );
    suggestions.push(
      "Start by defining key terms",
      "Provide step-by-step explanation",
      "Use examples to illustrate your points",
      "Review the fundamental concepts before attempting",
    );
    overallFeedback =
      "This answer needs significant development. Take time to review the core concepts and provide a more detailed, structured response with examples.";
  }

  // Add type-specific feedback
  if (questionType === "coding") {
    if (score >= SCORE_THRESHOLD_GOOD) {
      strengths.push("Code examples demonstrate practical application");
    } else {
      suggestions.push("Include working code examples with comments");
    }
  } else if (questionType === "system-design") {
    if (score >= SCORE_THRESHOLD_GOOD) {
      strengths.push("Considers scalability and trade-offs");
    } else {
      suggestions.push(
        "Discuss scalability considerations and design trade-offs",
      );
    }
  }

  return {
    score,
    strengths,
    improvements,
    suggestions,
    overallFeedback,
  };
}

/**
 * Mock evaluation function that simulates Claude API response
 * Returns realistic, varied feedback without making actual API calls
 *
 * @param request - Question and answer to evaluate
 * @returns Promise with mock evaluation response
 */
export async function mockEvaluateAnswer(
  request: IEvaluateAnswerRequest,
): Promise<IAPIResponse<IEvaluateAnswerResponse>> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, MOCK_NETWORK_DELAY_MS));

  // Validate input
  if (!request.answer || request.answer.trim().length < MIN_ANSWER_LENGTH) {
    return {
      data: {
        feedback: {
          score: 0,
          strengths: [],
          improvements: ["Answer is too short or empty"],
          suggestions: [
            "Please provide a more detailed answer (minimum 10 characters)",
          ],
          overallFeedback:
            "Your answer needs to be more substantial. Please provide a detailed response.",
        },
        success: false,
      },
      success: false,
      error: "Answer too short",
    };
  }

  // Calculate score based on answer quality
  const score = calculateMockScore(request.answer, request.question.type);

  // Generate feedback
  const feedback = generateMockFeedback(
    score,
    request.question.type,
    request.answer,
  );

  return {
    data: {
      feedback,
      success: true,
    },
    success: true,
  };
}

/**
 * Environment flag to enable/disable mock service
 * For server-side (API routes): Set USE_MOCK_API=true in .env.local
 * For client-side: Set NEXT_PUBLIC_USE_MOCK_API=true in .env.local
 */
export const shouldUseMockService = (): boolean =>
  // Check both server-side and client-side env vars
  process.env["USE_MOCK_API"] === "true" ||
  process.env["NEXT_PUBLIC_USE_MOCK_API"] === "true";
