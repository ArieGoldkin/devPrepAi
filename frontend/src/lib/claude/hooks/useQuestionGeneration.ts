/**
 * Question Generation Hooks
 * Handles generating interview questions with Claude AI
 */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  IGenerateQuestionsRequest,
  IGenerateQuestionsResponse,
  IAPIResponse,
} from "@/types/ai";
import { createClaudeQueryKey } from "@lib/query";

import { apiClient } from "../client";

// Cache timing constants for questions
const CACHE_TIME = {
  QUESTIONS_STALE: 600000, // 10 minutes
  QUESTIONS_GC: 1800000, // 30 minutes
} as const;

/**
 * Hook for generating interview questions
 *
 * Features:
 * - 10-minute caching to avoid regenerating same questions
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

// Question-specific utility functions
export const questionUtils = {
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
