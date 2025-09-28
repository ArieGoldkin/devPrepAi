/**
 * Validation helper functions for questions
 */

interface IQuestionInput {
  id?: unknown;
  title?: unknown;
  content?: unknown;
  type?: unknown;
  difficulty?: unknown;
  category?: unknown;
  hints?: unknown;
  solution?: unknown;
  timeEstimate?: unknown;
  tags?: unknown;
}

const RANDOM_STRING_LENGTH = 36;
const SUBSTRING_START = 2;
const SUBSTRING_END = 9;
const DEFAULT_TIME_ESTIMATE = 15;
const MAX_TIME_ESTIMATE = 60;

export function validateQuestionId(question: IQuestionInput): string {
  return typeof question.id === "string" && question.id.trim() !== ""
    ? question.id
    : `q_${Date.now()}_${Math.random().toString(RANDOM_STRING_LENGTH).substring(SUBSTRING_START, SUBSTRING_END)}`;
}

export function validateQuestionTitle(question: IQuestionInput): string {
  return typeof question.title === "string" && question.title.trim() !== ""
    ? question.title
    : "Untitled Question";
}

export function validateQuestionContent(question: IQuestionInput): string {
  return typeof question.content === "string" && question.content.trim() !== ""
    ? question.content
    : "No content provided";
}

export function validateQuestionType(question: IQuestionInput): "coding" | "conceptual" | "behavioral" | "system-design" {
  const validTypes = ["coding", "conceptual", "behavioral", "system-design"] as const;
  return validTypes.includes(question.type as "coding" | "conceptual" | "behavioral" | "system-design") ? question.type as "coding" | "conceptual" | "behavioral" | "system-design" : "conceptual";
}

export function validateQuestionDifficulty(question: IQuestionInput): number {
  const difficulty = typeof question.difficulty === "number" ? question.difficulty : 3;
  return Math.max(1, Math.min(5, difficulty));
}

export function validateQuestionCategory(question: IQuestionInput): string {
  return typeof question.category === "string" && question.category.trim() !== ""
    ? question.category
    : "General";
}

export function validateQuestionHints(question: IQuestionInput): string[] {
  return Array.isArray(question.hints)
    ? question.hints.filter((hint: unknown) => typeof hint === "string" && hint.trim() !== "")
    : [];
}

export function validateQuestionSolution(question: IQuestionInput): string {
  return typeof question.solution === "string" && question.solution.trim() !== ""
    ? question.solution
    : "";
}

export function validateQuestionTimeEstimate(question: IQuestionInput): number {
  const timeEstimate = typeof question.timeEstimate === "number"
    ? question.timeEstimate
    : DEFAULT_TIME_ESTIMATE; // Default time estimate
  return Math.max(1, Math.min(MAX_TIME_ESTIMATE, timeEstimate));
}

export function validateQuestionTags(question: IQuestionInput): string[] {
  return Array.isArray(question.tags)
    ? question.tags.filter((tag: unknown) => typeof tag === "string" && tag.trim() !== "")
    : [];
}

export function getTimestamps(): { createdAt: string; updatedAt: string } {
  const now = new Date().toISOString();
  return {
    createdAt: now,
    updatedAt: now,
  };
}
