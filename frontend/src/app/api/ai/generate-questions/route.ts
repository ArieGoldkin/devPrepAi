/**
 * API Route: Generate Questions
 * Server-side Claude API integration for question generation
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import type {
  IGenerateQuestionsRequest,
  IGenerateQuestionsResponse,
  IAPIResponse,
} from "@/types/ai";
import { buildQuestionsPrompt } from "@lib/claude/services/ai-prompts";

const GENERATION_MAX_TOKENS = 2000;
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
    const body: IGenerateQuestionsRequest = await request.json();

    // Validate required fields
    if (
      body.profile === undefined ||
      body.count === undefined ||
      body.difficulty === undefined ||
      body.type === undefined
    ) {
      return NextResponse.json(
        {
          data: { questions: [], totalGenerated: 0 },
          success: false,
          error: "Missing required fields: profile, count, difficulty, or type",
        } as IAPIResponse<IGenerateQuestionsResponse>,
        { status: 400 },
      );
    }

    // Initialize Claude client
    const client = getClaudeClient();

    // Build prompt
    const prompt = buildQuestionsPrompt(body);

    // Call Claude API
    const response = await client.messages.create({
      model:
        process.env["NEXT_PUBLIC_ANTHROPIC_MODEL"] ||
        "claude-3-5-sonnet-latest",
      max_tokens: GENERATION_MAX_TOKENS,
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
        questions: parsedResponse.questions,
        totalGenerated: parsedResponse.questions.length,
      },
      success: true,
    } as IAPIResponse<IGenerateQuestionsResponse>);
  } catch (error) {
    console.error("Generate questions API error:", error);

    // Return error response
    return NextResponse.json(
      {
        data: { questions: [], totalGenerated: 0 },
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      } as IAPIResponse<IGenerateQuestionsResponse>,
      { status: 500 },
    );
  }
}
