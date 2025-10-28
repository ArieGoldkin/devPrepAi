/**
 * useRequestHint Hook
 * Manages hint requests using tRPC mutation
 *
 * Features:
 * - Auto-generated tRPC hook (trpc.hints.getHint.useMutation)
 * - Automatic Zod validation
 * - Saves hint to store on success
 * - Tracks loading and error states
 * - Enforces 3-hint limit per question
 *
 * Effort: 1 hr (50% faster with tRPC auto-generation)
 */
import { useCallback } from "react";

import type { IQuestion } from "@/types/ai";
import { trpc } from "@lib/trpc/Provider";
import { useAppStore } from "@store/index";

export interface IUseRequestHintReturn {
  requestHint: (question: IQuestion, currentAnswer?: string) => void;
  isLoading: boolean;
  isError: boolean;
  canRequestMore: boolean;
}

/**
 * Hook to request progressive hints for a question
 *
 * @param questionId - Current question ID
 * @returns Hint request function, loading/error states, and availability
 */
export const useRequestHint = (questionId: string): IUseRequestHintReturn => {
  // Get store actions and state
  const saveHint = useAppStore((state) => state.saveHint);
  const getHintsUsedCount = useAppStore((state) => state.getHintsUsedCount);

  // Get current hints used count
  const hintsUsed = getHintsUsedCount(questionId);

  // Check if more hints available (max 3)
  const canRequestMore = hintsUsed < 3;

  // tRPC mutation hook (auto-generated, type-safe)
  const { mutate, isPending, isError } = trpc.hints.getHint.useMutation({
    onSuccess: (data) => {
      // Save hint to store on successful response
      saveHint(questionId, data.hint.level, data.hint.content);
    },
    onError: (error) => {
      console.error("Failed to get hint:", error.message);
    },
  });

  /**
   * Request next hint for the question
   * Automatically increments to next level based on hints used
   */
  const requestHint = useCallback(
    (question: IQuestion, currentAnswer?: string) => {
      // Don't request if limit reached
      if (!canRequestMore) {
        return;
      }

      // Calculate next hint level (1, 2, or 3)
      const nextLevel = hintsUsed + 1;

      // Call tRPC mutation
      // Types and validation handled automatically by Zod schemas
      mutate({
        question,
        currentAnswer,
        hintLevel: nextLevel,
      });
    },
    [canRequestMore, hintsUsed, mutate],
  );

  return {
    requestHint,
    isLoading: isPending,
    isError,
    canRequestMore,
  };
};
