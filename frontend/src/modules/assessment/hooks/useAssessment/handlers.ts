import type { useRouter } from "next/navigation";
import { useCallback } from "react";

import type { IQuestion, IAnswerFeedback } from "@/types/ai";

/**
 * Dependencies required for the submit handler
 */
export interface ISubmitHandlerDeps {
  hasAnswer: boolean;
  currentQuestion: IQuestion | null;
  currentAnswer: string;
  saveAnswer: (() => void) | undefined | null;
  evaluateAnswer: (params: {
    question: IQuestion;
    answer: string;
  }) => Promise<{ feedback: IAnswerFeedback; success: boolean }>;
  saveFeedback:
    | ((questionId: string, feedback: IAnswerFeedback) => void)
    | undefined
    | null;
  endSession: (() => void) | undefined | null;
  router: ReturnType<typeof useRouter>;
}

/**
 * Creates a memoized submit handler for the assessment.
 * Extracts the complex submission logic from the main hook.
 *
 * @param deps - Dependencies required for submission
 * @returns Memoized submit handler function
 */
export function useSubmitHandler(
  deps: ISubmitHandlerDeps,
): () => Promise<void> {
  const {
    hasAnswer,
    currentQuestion,
    currentAnswer,
    saveAnswer,
    evaluateAnswer,
    saveFeedback,
    endSession,
    router,
  } = deps;

  return useCallback(async () => {
    if (!hasAnswer) return;

    try {
      // Save final answer
      if (saveAnswer !== undefined && saveAnswer !== null) {
        saveAnswer();
      }

      // Evaluate the current answer
      if (currentQuestion !== null) {
        const response = await evaluateAnswer({
          question: currentQuestion,
          answer: currentAnswer,
        });

        // Save feedback to store
        // tRPC response is simpler: { feedback, success } instead of { data: { feedback } }
        if (
          response.feedback !== undefined &&
          saveFeedback !== undefined &&
          saveFeedback !== null
        ) {
          saveFeedback(currentQuestion.id, response.feedback);
        }
      }

      // End session
      if (endSession !== undefined && endSession !== null) {
        endSession();
      }

      // Navigate to results
      router.push("/results");
    } catch (error) {
      console.error("Failed to submit assessment:", error);
      // Still navigate to results even if evaluation fails
      router.push("/results");
    }
  }, [
    hasAnswer,
    saveAnswer,
    currentQuestion,
    currentAnswer,
    evaluateAnswer,
    saveFeedback,
    endSession,
    router,
  ]);
}
