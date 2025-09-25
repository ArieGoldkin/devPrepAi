/**
 * API Route: Evaluate Answer
 * Server-side Claude API integration for answer evaluation
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import type {
  IEvaluateAnswerRequest,
  IEvaluateAnswerResponse,
  IAPIResponse,
} from "@/types/ai";
import { buildEvaluationPrompt } from "@services/ai-prompts";

const DEFAULT_MAX_TOKENS = 1000;
const DEFAULT_TEMPERATURE = 0.7;

// Initialize Claude client server-side
const getClaudeClient = (): Anthropic => {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }
  return new Anthropic({ apiKey });
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body: IEvaluateAnswerRequest = await request.json();

    // Validate required fields
    if (body.question === undefined || body.answer === undefined) {
      return NextResponse.json(
        {
          data: {
            feedback: {
              score: 0,
              strengths: [],
              improvements: [],
              suggestions: [],
              overallFeedback: "Missing required fields: question or answer",
            },
            success: false,
          },
          success: false,
          error: "Missing required fields: question or answer",
        } as IAPIResponse<IEvaluateAnswerResponse>,
        { status: 400 },
      );
    }

    // Initialize Claude client
    const client = getClaudeClient();

    // Build prompt
    const prompt = buildEvaluationPrompt(body);

    // Call Claude API
    const response = await client.messages.create({
      model:
        process.env["NEXT_PUBLIC_ANTHROPIC_MODEL"] ||
        "claude-3-5-sonnet-latest",
      max_tokens: DEFAULT_MAX_TOKENS,
      temperature: DEFAULT_TEMPERATURE,
      messages: [{ role: "user", content: prompt }],
    });

    // Extract text content
    const textContent =
      response.content[0]?.type === "text" ? response.content[0].text : "";

    if (!textContent) {
      throw new Error("No text content received from Claude API");
    }

    // Parse Claude response
    const parsedResponse = JSON.parse(textContent);

    // Return successful response
    return NextResponse.json({
      data: {
        feedback: parsedResponse.feedback,
        success: true,
      },
      success: true,
    } as IAPIResponse<IEvaluateAnswerResponse>);
  } catch (error) {
    console.error("Evaluate answer API error:", error);

    // Return error response
    return NextResponse.json(
      {
        data: {
          feedback: {
            score: 0,
            strengths: [],
            improvements: [],
            suggestions: [],
            overallFeedback: "Unable to evaluate answer due to server error",
          },
          success: false,
        },
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      } as IAPIResponse<IEvaluateAnswerResponse>,
      { status: 500 },
    );
  }
}
