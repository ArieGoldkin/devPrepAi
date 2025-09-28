import type { StoreApi } from "zustand";

import type { ISessionState, ISessionActions } from "../types";

type SessionStore = ISessionState & ISessionActions;

type NavigationActions = Pick<
  ISessionActions,
  "nextQuestion" | "previousQuestion" | "goToQuestion"
>;

export const navigationActions = (
  set: StoreApi<SessionStore>["setState"],
  get: StoreApi<SessionStore>["getState"]
): NavigationActions => ({
  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  previousQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  goToQuestion: (index: number) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) {
      set({ currentQuestionIndex: index });
    }
  },
});