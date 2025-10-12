/**
 * API Route: Explain Concept
 * Server-side Claude API integration for concept explanations
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import type {
  IExplainConceptRequest,
  IExplainConceptResponse,
  IAPIResponse,
} from "@/types/ai";
import { buildConceptPrompt } from "@lib/claude/services/ai-prompts";
import { DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from "@shared/constants/ai";
import { HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } from "@shared/constants/http";

// Initialize Claude client server-side
const getClaudeClient = (): Anthropic => {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }
  return new Anthropic({ apiKey });
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: IExplainConceptRequest | undefined;

  try {
    // Parse request body
    body = await request.json();

    // Validate required fields
    if (!body || body.concept === undefined || body.userLevel === undefined) {
      return NextResponse.json(
        {
          data: {
            explanation: {
              concept: body?.concept || "Unknown concept",
              explanation:
                "Unable to generate explanation - missing required fields",
              examples: [],
              keyPoints: [],
              relatedConcepts: [],
            },
            success: false,
          },
          success: false,
          error: "Missing required fields: concept or userLevel",
        } as IAPIResponse<IExplainConceptResponse>,
        { status: HTTP_BAD_REQUEST },
      );
    }

    // Initialize Claude client
    const client = getClaudeClient();

    // Build prompt (body is guaranteed to be defined here due to validation above)
    const prompt = buildConceptPrompt(body as IExplainConceptRequest);

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
        explanation: parsedResponse.explanation,
        success: true,
      },
      success: true,
    } as IAPIResponse<IExplainConceptResponse>);
  } catch (error) {
    console.error("Explain concept API error:", error);

    // Return error response
    return NextResponse.json(
      {
        data: {
          explanation: {
            concept: body?.concept ?? "Unknown concept",
            explanation: "Unable to generate explanation due to server error",
            examples: [],
            keyPoints: [],
            relatedConcepts: [],
          },
          success: false,
        },
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      } as IAPIResponse<IExplainConceptResponse>,
      { status: HTTP_SERVER_ERROR },
    );
  }
}
