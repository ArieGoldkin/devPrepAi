/**
 * Progress Calculation Actions
 * Handles progress tracking logic
 */
import type { StateCreator } from "zustand";

import type { IPracticeState, IPracticeActions } from "@/types/store";

type PracticeSlice = IPracticeState & IPracticeActions;
type GetFn = Parameters<StateCreator<PracticeSlice>>[1];

const PERCENTAGE_MULTIPLIER = 100;

export const createProgressActions = (
  _set: unknown,
  get: GetFn,
): Pick<IPracticeActions, "calculateProgress"> => ({
  calculateProgress: (): number => {
    const state = get();
    if (state.questions.length === 0) return 0;

    const answeredCount = state.savedAnswers.size;
    const totalQuestions = state.questions.length;

    return Math.round((answeredCount / totalQuestions) * PERCENTAGE_MULTIPLIER);
  },
});
