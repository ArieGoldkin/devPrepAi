/**
 * Mock Evaluation Helpers
 * Score calculation and feedback generation logic for mock evaluation service
 */

/* eslint-disable max-statements, no-magic-numbers */
// Mock services intentionally use magic numbers and many statements for realistic data

import type { IAnswerFeedback } from "@/types/ai";

const SCORE_THRESHOLD_EXCELLENT = 85;
const SCORE_THRESHOLD_GOOD = 70;
const SCORE_THRESHOLD_FAIR = 50;

/**
 * Calculate mock score based on answer length and keywords
 * Simple heuristic: longer, more detailed answers score higher
 */
export function calculateMockScore(
  answer: string,
  questionType: string,
): number {
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
export function generateMockFeedback(
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
