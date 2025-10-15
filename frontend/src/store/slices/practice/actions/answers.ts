/**
 * Answer Management Actions
 * Handles draft updates, saving, and submission
 */
import type { StateCreator } from "zustand";

import type {
  IPracticeState,
  IPracticeActions,
  IPracticeAnswer,
} from "@/types/store";

type PracticeSlice = IPracticeState & IPracticeActions;
type SetFn = Parameters<StateCreator<PracticeSlice>>[0];
type GetFn = Parameters<StateCreator<PracticeSlice>>[1];

export const createAnswerActions = (
  set: SetFn,
  get: GetFn,
): Pick<IPracticeActions, "updateDraft" | "saveAnswer" | "submitAnswer"> => ({
  updateDraft: (content): void => {
    set({ currentDraft: content });
  },

  saveAnswer: (): void => {
    const state = get();
    const currentQuestion = state.questions[state.currentIndex];
    if (!currentQuestion || !state.currentDraft) return;

    const answer: IPracticeAnswer = {
      questionId: currentQuestion.id,
      answer: state.currentDraft,
      submittedAt: null, // not submitted yet, just saved
      timeSpent: state.timeElapsed,
    };

    set((state: PracticeSlice) => {
      const newAnswers = new Map(state.savedAnswers);
      newAnswers.set(currentQuestion.id, answer);
      return {
        savedAnswers: newAnswers,
        progress: get().calculateProgress(),
      };
    });
  },

  submitAnswer: (): void => {
    const state = get();
    const currentQuestion = state.questions[state.currentIndex];
    if (!currentQuestion || !state.currentDraft) return;

    const answer: IPracticeAnswer = {
      questionId: currentQuestion.id,
      answer: state.currentDraft,
      submittedAt: new Date().toISOString(),
      timeSpent: state.timeElapsed,
    };

    set((state: PracticeSlice) => {
      const newAnswers = new Map(state.savedAnswers);
      newAnswers.set(currentQuestion.id, answer);

      const questionsCompleted = Array.from(newAnswers.values()).filter(
        (a: IPracticeAnswer) => a.submittedAt !== null,
      ).length;

      return {
        savedAnswers: newAnswers,
        progress: get().calculateProgress(),
        metrics: {
          ...state.metrics,
          questionsCompleted,
          questionsAttempted: newAnswers.size,
        },
      };
    });

    // Auto-advance if not last question
    if (state.currentIndex < state.questions.length - 1) {
      get().nextQuestion();
    }
  },
});
