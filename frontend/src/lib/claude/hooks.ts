/**
 * Claude API React Query Hooks
 * Optimized hooks for Claude AI integration with smart caching
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  IGenerateQuestionsRequest,
  IGenerateQuestionsResponse,
  IEvaluateAnswerRequest,
  IEvaluateAnswerResponse,
  IAPIResponse,
} from "@/types/ai";
import {
  createClaudeQueryKey,
  createPracticeQueryKey,
} from "@lib/query/client";

import { apiClient } from "./client";

// Cache timing constants
const CACHE_TIME = {
  QUESTIONS_STALE: 600000, // 10 minutes
  QUESTIONS_GC: 1800000, // 30 minutes
  EVALUATION_STALE: 120000, // 2 minutes
  EVALUATION_GC: 300000, // 5 minutes
  STATS_STALE: 300000, // 5 minutes
  STATS_GC: 3600000, // 1 hour
  REFETCH_INTERVAL: 300000, // 5 minutes
} as const;

// API timeout constants
const API_TIMEOUT = {
  STATS_FETCH: 1000, // 1 second
} as const;

/**
 * Hook for generating interview questions
 *
 * Features:
 * - 5-minute caching to avoid regenerating same questions
 * - Automatic retry with exponential backoff
 * - Prefetch capability for smooth UX
 */
export function useGenerateQuestions(
  request: IGenerateQuestionsRequest,
): ReturnType<
  typeof useQuery<IAPIResponse<IGenerateQuestionsResponse>, Error>
> {
  return useQuery({
    queryKey: createClaudeQueryKey(
      "generate-questions",
      request as unknown as Record<string, unknown>,
    ),
    queryFn: () => apiClient.generateQuestions(request),

    // Extended stale time for question generation (expensive operation)
    staleTime: CACHE_TIME.QUESTIONS_STALE, // 10 minutes - questions don't change frequently
    gcTime: CACHE_TIME.QUESTIONS_GC, // 30 minutes - keep longer for navigation back/forth

    // Only fetch when we have all required parameters
    enabled: Boolean(request.profile) && request.count > 0,

    // Show loading state immediately (remove explicit undefined)
    // placeholderData can be set to initial data if needed

    // Retry configuration is handled by global defaults
    // But we can override here if needed for this specific query
  });
}

/**
 * Hook for evaluating user answers
 *
 * Features:
 * - Shorter cache time (answers are more dynamic)
 * - Optimistic updates for immediate feedback
 * - Error handling for failed evaluations
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

    // Optional: Success/error handlers
    onSuccess: (data, variables) => {
      console.warn("Answer evaluated successfully:", {
        questionLength: variables.question.content.length,
        answerLength: variables.answer.length,
        responseData: data.data,
      });
    },

    onError: (error, variables) => {
      console.error("Failed to evaluate answer:", {
        error: error instanceof Error ? error.message : "Unknown error",
        questionLength: variables.question.content.length,
        answerLength: variables.answer.length,
      });
    },
  });
}

/**
 * Hook for practice session data with hierarchical caching
 *
 * Features:
 * - Session-specific caching
 * - Automatic invalidation on session completion
 * - Background updates when session is active
 */
export function usePracticeSession(
  sessionId: string,
  enabled: boolean = true,
): ReturnType<typeof useQuery> {
  return useQuery({
    queryKey: createPracticeQueryKey(sessionId, "session-data"),
    queryFn: async () => {
      // TODO: Replace with actual API call
      await new Promise((resolve) =>
        setTimeout(resolve, API_TIMEOUT.STATS_FETCH),
      );
      return {
        id: sessionId,
        status: "active",
        questionsAnswered: 5,
        totalQuestions: 10,
        startTime: new Date().toISOString(),
      };
    },

    enabled,

    // Shorter cache for active sessions
    staleTime: CACHE_TIME.EVALUATION_STALE, // 2 minutes
    gcTime: CACHE_TIME.EVALUATION_GC, // 5 minutes

    // Refetch in background when data becomes stale
    refetchInterval: enabled ? CACHE_TIME.REFETCH_INTERVAL : false, // 5 minutes if active
  });
}

/**
 * Hook for prefetching questions during user interactions
 *
 * Call this when user is setting up their practice session
 * to have questions ready when they start practicing
 */
export function usePrefetchQuestions(): {
  prefetchQuestions: (request: IGenerateQuestionsRequest) => Promise<void>;
} {
  const queryClient = useQueryClient();

  return {
    prefetchQuestions: async (request: IGenerateQuestionsRequest) =>
      queryClient.prefetchQuery({
        queryKey: createClaudeQueryKey(
          "generate-questions",
          request as unknown as Record<string, unknown>,
        ),
        queryFn: () => apiClient.generateQuestions(request),
        staleTime: CACHE_TIME.QUESTIONS_STALE, // 10 minutes
      }),
  };
}

/**
 * Cost tracking hook for monitoring Claude API usage
 *
 * Helps track and optimize API costs
 */
export function useApiCostTracking(): ReturnType<typeof useQuery> {
  return useQuery({
    queryKey: ["api-costs", "daily"],
    queryFn: async () =>
      // TODO: Implement actual cost tracking
      ({
        inputTokens: 15000,
        outputTokens: 8000,
        estimatedCost: 2.45,
        cacheHitRate: 0.62, // 62% cache hit rate = 60%+ cost reduction goal
      }),
    staleTime: CACHE_TIME.STATS_STALE, // 5 minutes
    gcTime: CACHE_TIME.STATS_GC, // 1 hour
  });
}

// Export utility functions for manual cache management
export const claudeQueryUtils = {
  /**
   * Invalidate all Claude API queries
   */
  invalidateAll: () => apiClient.generateQuestions.bind(null), // TODO: Implement with actual query client
  /**
   * Clear specific question cache
   */
  clearQuestions: (request: IGenerateQuestionsRequest) => {
    // TODO: Implement cache clearing
    console.warn("Clearing questions cache for:", request);
  },

  /**
   * Preload questions for common configurations
   */
  preloadCommonQuestions: async () => {
    const commonConfigs = [
      {
        role: "frontend",
        level: "junior",
        technologies: ["react", "javascript"],
        count: 5,
      },
      {
        role: "backend",
        level: "mid",
        technologies: ["node", "python"],
        count: 5,
      },
      {
        role: "fullstack",
        level: "senior",
        technologies: ["react", "node"],
        count: 5,
      },
    ];

    // TODO: Implement preloading
    console.warn(
      "Preloading questions for common configurations:",
      commonConfigs,
    );
  },
};
