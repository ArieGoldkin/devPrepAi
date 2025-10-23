/**
 * Navigation Actions
 * Handles question navigation logic
 */
import type { StateCreator } from "zustand";

import type { IPracticeState, IPracticeActions } from "@/types/store";

type PracticeSlice = IPracticeState & IPracticeActions;
type SetFn = Parameters<StateCreator<PracticeSlice>>[0];
type GetFn = Parameters<StateCreator<PracticeSlice>>[1];

export const createNavigationActions = (
  set: SetFn,
  get: GetFn,
): Pick<IPracticeActions, "goToQuestion" | "nextQuestion"> => ({
  goToQuestion: (index): void => {
    const state = get();
    if (index >= 0 && index < state.questions.length) {
      // Save current draft before navigating
      if (state.currentDraft && state.settings.autoSave) {
        get().saveAnswer();
      }

      // Load saved answer for target question if exists
      const targetQuestion = state.questions[index];
      const savedAnswer = targetQuestion
        ? state.savedAnswers.get(targetQuestion.id)
        : null;

      set({
        currentIndex: index,
        currentDraft: savedAnswer?.answer ?? "",
        progress: get().calculateProgress(),
      });
    }
  },

  nextQuestion: (): void => {
    const state = get();
    get().goToQuestion(state.currentIndex + 1);
  },
});
