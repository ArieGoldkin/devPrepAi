/**
 * Practice Slice Selectors
 * Computed values and derived state for practice sessions
 */
import type { IQuestion } from "@/types/ai";
import type { IPracticeState } from "@/types/store";
import { SECONDS_PER_MINUTE } from "@shared/utils/time";

export const selectCurrentQuestion = (
  state: IPracticeState,
): IQuestion | null => state.questions[state.currentIndex] ?? null;

export const selectIsFirstQuestion = (state: IPracticeState): boolean =>
  state.currentIndex === 0;

export const selectIsLastQuestion = (state: IPracticeState): boolean =>
  state.currentIndex === state.questions.length - 1;

export const selectQuestionProgress = (
  state: IPracticeState,
): { current: number; total: number; display: string } => ({
  current: state.currentIndex + 1,
  total: state.questions.length,
  display: `${state.currentIndex + 1} of ${state.questions.length}`,
});

export const selectFormattedTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const secs = seconds % SECONDS_PER_MINUTE;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
