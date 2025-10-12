/**
 * Answer Evaluation Hooks
 * Handles evaluating user answers with Claude AI
 */
import { useMutation } from "@tanstack/react-query";

import type {
  IEvaluateAnswerRequest,
  IEvaluateAnswerResponse,
  IAPIResponse,
} from "@/types/ai";

import { apiClient } from "../client";

/**
 * Hook for evaluating user answers
 *
 * Features:
 * - Optimistic updates for immediate feedback
 * - Error handling for failed evaluations
 * - Success/error logging for debugging
 */
export function useEvaluateAnswer(): ReturnType<
  typeof useMutation<
    IAPIResponse<IEvaluateAnswerResponse>,
    Error,
    IEvaluateAnswerRequest
  >
> {
  return useMutation({
    mutationFn: (request: IEvaluateAnswerRequest) =>
      apiClient.evaluateAnswer(request),

    // Mutation options
    mutationKey: ["claude-api", "evaluate-answer"],

    // Success handler with detailed logging
    onSuccess: (data, variables) => {
      console.warn("Answer evaluated successfully:", {
        questionLength: variables.question.content.length,
        answerLength: variables.answer.length,
        responseData: data.data,
      });
    },

    // Error handler with detailed logging
    onError: (error, variables) => {
      console.error("Failed to evaluate answer:", {
        error: error instanceof Error ? error.message : "Unknown error",
        questionLength: variables.question.content.length,
        answerLength: variables.answer.length,
      });
    },
  });
}
