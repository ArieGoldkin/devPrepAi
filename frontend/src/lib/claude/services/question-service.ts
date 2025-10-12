/**
 * Question Service
 * Orchestrates question generation with Claude API or test mode
 */

import Anthropic from "@anthropic-ai/sdk";

import type {
  IGenerateQuestionsRequest,
  IGenerateQuestionsResponse,
  IQuestion,
} from "@/types/ai";
import {
  generateTestQuestions,
  generateFallbackQuestion,
} from "@shared/mocks/question-generator";

import { buildQuestionsPrompt } from "./ai-prompts";
import { parseClaudeResponse, validateQuestions } from "./parser";

const GENERATION_MAX_TOKENS = 4000;
const DEFAULT_TEMPERATURE = 0.7;

/**
 * Generate questions based on request and environment
 */
export async function generateQuestions(
  request: IGenerateQuestionsRequest,
): Promise<IGenerateQuestionsResponse> {
  // Check for test mode
  if (shouldUseTestMode()) {
    console.warn("Using test mode - returning test questions");
    const questions = generateTestQuestions(request);
    return { questions, totalGenerated: questions.length };
  }

  // Use Claude API
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "[QuestionService] Starting question generation with Claude API",
    );
    console.warn("[QuestionService] Request:", {
      count: request.count,
      type: request.type,
      difficulty: request.difficulty,
    });
  }

  try {
    const startTime = Date.now();
    const questions = await generateWithClaude(request);
    const duration = Date.now() - startTime;
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[QuestionService] Generated ${questions.length} questions in ${duration}ms`,
      );
    }
    return { questions, totalGenerated: questions.length };
  } catch (error) {
    console.error("[QuestionService] Claude API error, using fallback:", error);
    return generateFallbackResponse();
  }
}

/**
 * Check if test mode should be used
 */
function shouldUseTestMode(): boolean {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  return process.env["USE_TEST_MODE"] === "true" || !apiKey;
}

/**
 * Generate questions using Claude API
 */
async function generateWithClaude(
  request: IGenerateQuestionsRequest,
): Promise<IQuestion[]> {
  const client = getClaudeClient();
  const prompt = buildQuestionsPrompt(request);

  const response = await client.messages.create({
    model:
      process.env["NEXT_PUBLIC_ANTHROPIC_MODEL"] || "claude-3-5-sonnet-latest",
    max_tokens: GENERATION_MAX_TOKENS,
    temperature: DEFAULT_TEMPERATURE,
    messages: [{ role: "user", content: prompt }],
  });

  const textContent = extractTextContent(response);
  const parsed = parseClaudeResponse(textContent);
  const validated = validateQuestions(parsed.questions, {
    type: request.type,
    difficulty: request.difficulty,
  });

  return validated.slice(0, request.count);
}

/**
 * Get Claude client instance
 */
function getClaudeClient(): Anthropic {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }
  return new Anthropic({ apiKey });
}

/**
 * Extract text content from Claude response
 */
interface IClaudeResponse {
  content?: Array<{
    type: string;
    text?: string;
  }>;
}

function extractTextContent(response: unknown): string {
  const res = response as IClaudeResponse;
  const content = res.content?.[0];
  if (content?.type === "text" && content.text) {
    return content.text;
  }
  throw new Error("No text content in Claude response");
}
/**
 * Generate fallback response when API fails
 */
function generateFallbackResponse(): IGenerateQuestionsResponse {
  return {
    questions: [generateFallbackQuestion()],
    totalGenerated: 1,
  };
}
