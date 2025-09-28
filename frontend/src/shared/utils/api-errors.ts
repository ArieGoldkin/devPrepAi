/**
 * API Error Handling Utilities
 * Standardized error responses and validation
 */

import { NextResponse } from "next/server";

import type { IAPIResponse } from "@/types/ai";

/**
 * Create a standardized error response
 */
export function createErrorResponse<T>(
  error: unknown,
  status: number = 500,
  defaultData: T
): NextResponse {
  const message =
    error instanceof Error ? error.message : "Unknown error occurred";

  console.error("API Error:", error);

  return NextResponse.json(
    {
      data: defaultData,
      success: false,
      error: message,
    } as IAPIResponse<T>,
    { status }
  );
}

/**
 * Create a success response
 */
export function createSuccessResponse<T>(data: T): NextResponse {
  return NextResponse.json({
    data,
    success: true,
  } as IAPIResponse<T>);
}

/**
 * Validate request body has required fields
 */
export function validateRequestBody<T>(
  body: unknown,
  requiredFields: (keyof T)[]
): { valid: boolean; error?: string } {
  if (body === null || body === undefined || typeof body !== 'object') {
    return {
      valid: false,
      error: 'Request body must be an object',
    };
  }

  const bodyObj = body as Record<string, unknown>;
  const missingFields = requiredFields.filter(
    (field) => bodyObj[field as string] === undefined
  );
  if (missingFields.length > 0) {
    return {
      valid: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    };
  }

  return { valid: true };
}
