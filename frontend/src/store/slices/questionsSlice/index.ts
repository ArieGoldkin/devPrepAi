import type { StateCreator } from "zustand";

import type { IQuestion } from "@/types/ai";

import { createQuestionsActions } from "./actions";
import { initialState } from "./types";
import type {
  IQuestionsState,
  IQuestionsActions,
  IQuestionAnswer,
} from "./types";

// Export types
export type {
  IQuestionsState,
  IQuestionsActions,
  IQuestionAnswer,
  IHintUsage,
  IPerformanceMetrics,
} from "./types";

// === SLICE CREATOR ===
export const createQuestionsSlice: StateCreator<
  IQuestionsState & IQuestionsActions,
  [],
  [],
  IQuestionsState & IQuestionsActions
> = (...args) => ({
  ...initialState,
  ...createQuestionsActions(...args),
});

// === SELECTORS ===
export const selectCurrentQuestion = (
  state: IQuestionsState,
): IQuestion | null =>
  state.sessionQuestions[state.currentQuestionIndex] ?? null;

export const selectCurrentAnswer = (
  state: IQuestionsState,
): IQuestionAnswer | null => {
  const currentQuestion = selectCurrentQuestion(state);
  if (!currentQuestion) return null;
  return (
    state.questionAnswers.find((qa) => qa.questionId === currentQuestion.id) ??
    null
  );
};
