/**
 * Error Handling Utilities
 * Centralized error handling functions and standardized error messages
 */

import { NextResponse } from "next/server";

import type { IAPIResponse } from "@/types/ai";

// Error Types and Interfaces

export interface IErrorDetails {
  code?: string;
  message: string;
  details?: Record<string, unknown> | undefined;
  timestamp?: Date;
}

export interface IAssessmentError extends IErrorDetails {
  questionId?: string;
  questionIndex?: number;
  userAction?: string;
}

// Error Constants

export const ERROR_CODES = {
  // API Errors
  INVALID_REQUEST: "INVALID_REQUEST",
  MISSING_FIELDS: "MISSING_FIELDS",
  CLAUDE_API_ERROR: "CLAUDE_API_ERROR",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  // Assessment Errors
  QUESTION_NOT_FOUND: "QUESTION_NOT_FOUND",
  SUBMISSION_FAILED: "SUBMISSION_FAILED",
  AUTO_SAVE_FAILED: "AUTO_SAVE_FAILED",
  TIMER_ERROR: "TIMER_ERROR",
  // General Errors
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_REQUEST]: "Invalid request format",
  [ERROR_CODES.MISSING_FIELDS]: "Required fields are missing",
  [ERROR_CODES.CLAUDE_API_ERROR]: "AI service is temporarily unavailable",
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: "Too many requests. Please try again later",
  [ERROR_CODES.QUESTION_NOT_FOUND]: "Question not found",
  [ERROR_CODES.SUBMISSION_FAILED]: "Failed to submit answer. Please try again",
  [ERROR_CODES.AUTO_SAVE_FAILED]: "Auto-save failed. Your progress may not be saved",
  [ERROR_CODES.TIMER_ERROR]: "Timer error occurred",
  [ERROR_CODES.UNKNOWN_ERROR]: "An unexpected error occurred",
  [ERROR_CODES.NETWORK_ERROR]: "Network connection error",
} as const;

// API Error Handling

/**
 * Create a standardized error response for API routes
 */
export function createErrorResponse<T>(
  error: unknown,
  status: number = 500,
  defaultData: T,
  code?: string
): NextResponse {
  const errorCode = code || ERROR_CODES.UNKNOWN_ERROR;
  const message = error instanceof Error ? error.message : ERROR_MESSAGES[errorCode as keyof typeof ERROR_MESSAGES];

  console.error(`API Error [${errorCode}]:`, error);

  return NextResponse.json(
    {
      data: defaultData,
      success: false,
      error: message,
      code: errorCode,
      timestamp: new Date().toISOString(),
    } as IAPIResponse<T>,
    { status }
  );
}

/**
 * Create a success response for API routes
 */
export function createSuccessResponse<T>(data: T): NextResponse {
  return NextResponse.json({
    data,
    success: true,
    timestamp: new Date().toISOString(),
  } as IAPIResponse<T>);
}

// Assessment Error Handling
// Error mapping for assessment errors
const ERROR_KEYWORDS_MAP = [
  { keywords: ["question not found"], code: ERROR_CODES.QUESTION_NOT_FOUND },
  { keywords: ["submit"], code: ERROR_CODES.SUBMISSION_FAILED },
  { keywords: ["auto-save", "autosave"], code: ERROR_CODES.AUTO_SAVE_FAILED },
  { keywords: ["timer"], code: ERROR_CODES.TIMER_ERROR },
] as const;

export function handleAssessmentError(
  error: unknown,
  context: {
    questionId?: string;
    questionIndex?: number;
    userAction?: string;
  } = {}
): IAssessmentError {
  const baseError: IAssessmentError = {
    code: ERROR_CODES.UNKNOWN_ERROR,
    message: ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR],
    timestamp: new Date(),
    ...context,
  };

  if (error instanceof Error) {
    baseError.message = error.message;

    // Find matching error type
    const match = ERROR_KEYWORDS_MAP.find(({ keywords }) =>
      keywords.some(keyword => error.message.includes(keyword))
    );

    if (match) {
      baseError.code = match.code;
      baseError.message = ERROR_MESSAGES[match.code];
    }
  }

  console.error("Assessment Error:", baseError);
  return baseError;
}

/**
 * Handle API and network errors
 */
export function handleAPIError(error: unknown, type: 'network' | 'claude' = 'network'): IErrorDetails {
  console.error(`${type === 'claude' ? 'Claude API' : 'Network'} Error:`, error);

  let code: keyof typeof ERROR_CODES = type === 'claude' ? 'CLAUDE_API_ERROR' : 'NETWORK_ERROR';
  let message: string = ERROR_MESSAGES[ERROR_CODES[code]];

  // Check for rate limiting in Claude API errors
  if (type === 'claude' && error instanceof Error) {
    if (error.message.includes("rate limit") || error.message.includes("429")) {
      code = 'RATE_LIMIT_EXCEEDED';
      message = ERROR_MESSAGES[ERROR_CODES[code]];
    }
  }

  return {
    code: ERROR_CODES[code],
    message,
    timestamp: new Date(),
    details: error instanceof Error ? { originalMessage: error.message } : undefined,
  };
}

// Legacy exports for backward compatibility
export const handleNetworkError = (error: unknown): IErrorDetails => handleAPIError(error, 'network');
export const handleClaudeAPIError = (error: unknown): IErrorDetails => handleAPIError(error, 'claude');

// Type Guards

export function isAssessmentError(error: unknown): error is IAssessmentError {
  return typeof error === 'object' && error !== null && 'questionId' in error;
}

export function isAPIError(error: unknown): error is IErrorDetails {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
}

// Type Exports

export type ErrorCode = keyof typeof ERROR_CODES;
export type ErrorMessage = keyof typeof ERROR_MESSAGES;