// Constants for API timing and caching
const API_TIMEOUT = {
  QUESTION_GENERATION: 2500, // 2.5 seconds
  ANSWER_EVALUATION: 3000, // 3 seconds
  STATS_FETCH: 1000, // 1 second
} as const;

const CACHE_TIME = {
  QUESTIONS_STALE: 600000, // 10 minutes
  QUESTIONS_GC: 1800000, // 30 minutes
  EVALUATION_STALE: 120000, // 2 minutes
  EVALUATION_GC: 300000, // 5 minutes
  STATS_STALE: 300000, // 5 minutes
  STATS_GC: 3600000, // 1 hour
  REFETCH_INTERVAL: 300000, // 5 minutes
} as const;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createClaudeQueryKey,
  createPracticeQueryKey,
} from "@lib/query/client";

/**
 * Claude AI integration hooks - optimized for expensive API calls
 * @deprecated Use @api/claude/hooks instead
 */

// Types for Claude AI responses
interface IClaudeResponse {
  id: string;
  content: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

interface IQuestionGenerationRequest {
  role: string;
  level: string;
  technologies: string[];
  count: number;
}

interface IQuestionEvaluationRequest {
  question: string;
  answer: string;
  context?: Record<string, unknown>;
}

// Mock API functions - use @api/claude/client instead
const claudeApi = {
  generateQuestions: async (
    request: IQuestionGenerationRequest,
  ): Promise<IClaudeResponse> => {
    console.warn("Generating questions for:", request);
    await new Promise((resolve) =>
      setTimeout(resolve, API_TIMEOUT.QUESTION_GENERATION),
    );
    return {
      id: "mock-id",
      content: JSON.stringify({
        questions: ["Mock question 1", "Mock question 2"],
      }),
      usage: { input_tokens: 150, output_tokens: 300 },
    };
  },
  evaluateAnswer: async (
    request: IQuestionEvaluationRequest,
  ): Promise<IClaudeResponse> => {
    console.warn("Evaluating answer for:", request);
    await new Promise((resolve) =>
      setTimeout(resolve, API_TIMEOUT.ANSWER_EVALUATION),
    );
    return {
      id: "mock-id",
      content: JSON.stringify({
        score: 8,
        feedback: "Good answer with room for improvement",
      }),
      usage: { input_tokens: 200, output_tokens: 150 },
    };
  },
};

/**
 * Hook for generating interview questions with caching
 */
export function useGenerateQuestions(
  request: IQuestionGenerationRequest,
): ReturnType<typeof useQuery<IClaudeResponse, Error>> {
  return useQuery({
    queryKey: createClaudeQueryKey(
      "generate-questions",
      request as unknown as Record<string, unknown>,
    ),
    queryFn: () => claudeApi.generateQuestions(request),
    staleTime: CACHE_TIME.QUESTIONS_STALE,
    gcTime: CACHE_TIME.QUESTIONS_GC,
    enabled: Boolean(
      request.role && request.level && request.technologies.length > 0,
    ),
  });
}

/**
 * Hook for evaluating user answers
 */
export function useEvaluateAnswer(): ReturnType<
  typeof useMutation<IClaudeResponse, Error, IQuestionEvaluationRequest>
> {
  return useMutation({
    mutationFn: (request: IQuestionEvaluationRequest) =>
      claudeApi.evaluateAnswer(request),
    mutationKey: ["claude-api", "evaluate-answer"],
    onSuccess: (data, variables) => {
      console.warn("Answer evaluated successfully:", {
        questionLength: variables.question.length,
        answerLength: variables.answer.length,
        tokens: data.usage,
      });
    },
    onError: (error, variables) => {
      console.error("Failed to evaluate answer:", {
        error: error instanceof Error ? error.message : "Unknown error",
        questionLength: variables.question.length,
        answerLength: variables.answer.length,
      });
    },
  });
}

/**
 * Hook for practice session data with caching
 */
export function usePracticeSession(
  sessionId: string,
  enabled: boolean = true,
): ReturnType<typeof useQuery> {
  return useQuery({
    queryKey: createPracticeQueryKey(sessionId, "session-data"),
    queryFn: async () => {
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
    staleTime: CACHE_TIME.EVALUATION_STALE,
    gcTime: CACHE_TIME.EVALUATION_GC,
    refetchInterval: enabled ? CACHE_TIME.REFETCH_INTERVAL : false,
  });
}

/**
 * Hook for prefetching questions
 */
export function usePrefetchQuestions(): {
  prefetchQuestions: (request: IQuestionGenerationRequest) => Promise<void>;
} {
  const queryClient = useQueryClient();

  return {
    prefetchQuestions: async (request: IQuestionGenerationRequest) =>
      queryClient.prefetchQuery({
        queryKey: createClaudeQueryKey(
          "generate-questions",
          request as unknown as Record<string, unknown>,
        ),
        queryFn: () => claudeApi.generateQuestions(request),
        staleTime: CACHE_TIME.QUESTIONS_STALE,
      }),
  };
}

/**
 * Cost tracking hook
 */
export function useApiCostTracking(): ReturnType<typeof useQuery> {
  return useQuery({
    queryKey: ["api-costs", "daily"],
    queryFn: async () => ({
      inputTokens: 15000,
      outputTokens: 8000,
      estimatedCost: 2.45,
      cacheHitRate: 0.62,
    }),
    staleTime: CACHE_TIME.STATS_STALE,
    gcTime: CACHE_TIME.STATS_GC,
  });
}

// @deprecated Use @api/claude/hooks instead - this file is legacy
export const claudeQueryUtils = {
  invalidateAll: () => console.warn("Use @api/claude/hooks instead"),
  clearQuestions: () => console.warn("Use @api/claude/hooks instead"),
  preloadCommonQuestions: async () =>
    console.warn("Use @api/claude/hooks instead"),
};
