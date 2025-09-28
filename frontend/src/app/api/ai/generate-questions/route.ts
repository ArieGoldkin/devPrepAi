/**
 * API Route: Generate Questions
 * Simplified orchestration using extracted services
 */

import type { NextResponse , NextRequest } from "next/server";

import type {
  IGenerateQuestionsRequest,
  IGenerateQuestionsResponse,
} from "@/types/ai";
import { generateQuestions } from "@lib/claude/services/question-service";
import { HTTP_BAD_REQUEST, HTTP_SERVER_ERROR } from "@shared/constants/http";
import {
  createErrorResponse,
  createSuccessResponse,
  validateRequestBody,
} from "@shared/utils/api-errors";

/**
 * POST /api/ai/generate-questions
 * Generate interview questions based on user profile
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body: IGenerateQuestionsRequest = await request.json();

    // Validate required fields
    const validation = validateRequestBody<IGenerateQuestionsRequest>(body, [
      "profile",
      "count",
      "difficulty",
      "type",
    ]);

    if (!validation.valid) {
      return createErrorResponse(
        new Error(validation.error),
        HTTP_BAD_REQUEST,
        { questions: [], totalGenerated: 0 }
      );
    }

    // Generate questions using the service
    const response = await generateQuestions(body);

    // Return success response
    return createSuccessResponse<IGenerateQuestionsResponse>(response);
  } catch (error) {
    // Return error response
    return createErrorResponse<IGenerateQuestionsResponse>(
      error,
      HTTP_SERVER_ERROR,
      { questions: [], totalGenerated: 0 }
    );
  }
}
