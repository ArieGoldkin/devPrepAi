import type { IQuestionsState, IQuestionsActions } from "./types";

type Get = () => IQuestionsState & IQuestionsActions;
type Set = (partial: Partial<IQuestionsState>) => void;

export const createNavigationActions = (
  set: Set,
  get: Get,
): Pick<
  IQuestionsActions,
  "goToQuestion" | "nextQuestion" | "previousQuestion"
> => ({
  goToQuestion: (index: number) => {
    const state = get();
    if (index >= 0 && index < state.sessionQuestions.length) {
      set({ currentQuestionIndex: index });
    }
  },

  nextQuestion: () => {
    const state = get();
    if (state.currentQuestionIndex < state.sessionQuestions.length - 1) {
      set({ currentQuestionIndex: state.currentQuestionIndex + 1 });
    }
  },

  previousQuestion: () => {
    const state = get();
    if (state.currentQuestionIndex > 0) {
      set({ currentQuestionIndex: state.currentQuestionIndex - 1 });
    }
  },
});
