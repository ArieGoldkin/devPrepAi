import type { IAnswerFeedback } from "@/types/ai";

import type { IQuestionAnswer } from "./types";

interface IStoreState {
  questionAnswers: IQuestionAnswer[];
}

export const createAnswerActions = (set: (partial: Partial<IStoreState>) => void, get: () => IStoreState): {
  submitAnswer: (questionId: string, answer: string) => void;
  updateAnswerFeedback: (questionId: string, feedback: IAnswerFeedback) => void;
} => ({
  submitAnswer: (questionId: string, answer: string): void => {
    const state = get();
    const existingAnswerIndex = state.questionAnswers.findIndex(
      (qa: IQuestionAnswer) => qa.questionId === questionId,
    );
    const newAnswer: IQuestionAnswer = {
      questionId,
      answer,
      submittedAt: new Date().toISOString(),
      timeSpent: 0,
    };
    if (existingAnswerIndex >= 0) {
      const updatedAnswers = [...state.questionAnswers];
      updatedAnswers[existingAnswerIndex] = newAnswer;
      set({ questionAnswers: updatedAnswers });
    } else {
      set({ questionAnswers: [...state.questionAnswers, newAnswer] });
    }
  },
  updateAnswerFeedback: (questionId: string, feedback: IAnswerFeedback): void => {
    const state = get();
    const answerIndex = state.questionAnswers.findIndex(
      (qa: IQuestionAnswer) => qa.questionId === questionId,
    );
    if (answerIndex >= 0) {
      const updatedAnswers = [...state.questionAnswers];
      const existingAnswer = updatedAnswers[answerIndex];
      if (existingAnswer) {
        updatedAnswers[answerIndex] = { ...existingAnswer, feedback };
        set({ questionAnswers: updatedAnswers });
      }
    }
  },
});
