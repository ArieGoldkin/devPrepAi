import type { IQuestionsState, IQuestionsActions } from "./types";

type Get = () => IQuestionsState & IQuestionsActions;
type Set = (partial: Partial<IQuestionsState>) => void;

export const createSessionActions = (
  set: Set,
  get: Get,
): Pick<
  IQuestionsActions,
  "startQuestionSession" | "completeSession" | "resetSession"
> => ({
  startQuestionSession: (questions) => {
    set({
      sessionQuestions: questions,
      currentQuestionIndex: 0,
      questionAnswers: [],
      hintUsage: [],
      isSessionActive: true,
      isSessionCompleted: false,
      sessionStartedAt: new Date().toISOString(),
      metrics: { totalTimeSpent: 0, questionsCompleted: 0, accuracy: 0 },
    });
  },

  completeSession: () => {
    set({
      isSessionActive: false,
      isSessionCompleted: true,
    });
    get().calculateMetrics();
  },

  resetSession: () => {
    set({
      sessionQuestions: [],
      currentQuestionIndex: 0,
      questionAnswers: [],
      hintUsage: [],
      isSessionActive: false,
      isSessionCompleted: false,
      metrics: { totalTimeSpent: 0, questionsCompleted: 0, accuracy: 0 },
      sessionStartedAt: null,
    });
  },
});
