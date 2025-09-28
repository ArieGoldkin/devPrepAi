import type { IQuestion } from "@/types/ai";

import type { IQuestionAnswer } from "./types";

const ACCURACY_MULTIPLIER = 10;

interface IMetrics {
  questionsCompleted: number;
  accuracy: number;
  totalTimeSpent: number;
}

interface IQuestionProgress {
  current: number;
  total: number;
  percentage: number;
}

interface IStoreState {
  questionAnswers: IQuestionAnswer[];
  totalHintPenalty: number;
  currentQuestionIndex: number;
  sessionQuestions: IQuestion[];
  metrics: IMetrics;
}

export const createUtilityActions = (set: (partial: Partial<IStoreState>) => void, get: () => IStoreState): {
  calculateMetrics: () => void;
  getQuestionProgress: () => IQuestionProgress;
} => ({
  calculateMetrics: (): void => {
    const state = get();
    const answered = state.questionAnswers.filter((qa: IQuestionAnswer) => qa.feedback);
    const score = answered.reduce(
      (sum: number, qa: IQuestionAnswer) => sum + (qa.feedback?.score ?? 0),
      0,
    );
    const timeSpent = state.questionAnswers.reduce(
      (sum: number, qa: IQuestionAnswer) => sum + qa.timeSpent,
      0,
    );
    // Include hint penalties in the accuracy calculation
    const adjustedScore = Math.max(0, score - state.totalHintPenalty);
    set({
      metrics: {
        questionsCompleted: answered.length,
        accuracy:
          answered.length > 0
            ? (adjustedScore / answered.length) * ACCURACY_MULTIPLIER
            : 0,
        totalTimeSpent: timeSpent,
      },
    });
  },
  getQuestionProgress: (): IQuestionProgress => {
    const state = get();
    const current = state.currentQuestionIndex + 1;
    const total = state.sessionQuestions.length;
    const percentage = total > 0 ? (current / total) * 100 : 0;
    return { current, total, percentage };
  },
});
