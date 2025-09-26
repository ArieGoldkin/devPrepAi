import type { StateCreator } from "zustand";

import type { IAnswerFeedback } from "@/types/ai";

import { createNavigationActions } from "./navigationActions";
import { createSessionActions } from "./sessionActions";
import type {
  IQuestionsState,
  IQuestionsActions,
  IQuestionAnswer,
} from "./types";

const ACCURACY_MULTIPLIER = 10;

export const createQuestionsActions: StateCreator<
  IQuestionsState & IQuestionsActions,
  [],
  [],
  IQuestionsActions
> = (set, get) => ({
  // === SESSION MANAGEMENT ===
  ...createSessionActions(set, get),

  // === NAVIGATION ===
  ...createNavigationActions(set, get),

  // === ANSWER MANAGEMENT ===
  submitAnswer: (questionId: string, answer: string) => {
    const state = get();
    const existingAnswerIndex = state.questionAnswers.findIndex(
      (qa) => qa.questionId === questionId,
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

  updateAnswerFeedback: (questionId: string, feedback: IAnswerFeedback) => {
    const state = get();
    const answerIndex = state.questionAnswers.findIndex(
      (qa) => qa.questionId === questionId,
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

  // === HINT MANAGEMENT ===
  revealHint: (questionId: string, hintIndex: number) => {
    const state = get();
    const existingHintIndex = state.hintUsage.findIndex(
      (hu) => hu.questionId === questionId,
    );

    if (existingHintIndex >= 0) {
      const updatedHintUsage = [...state.hintUsage];
      const existing = updatedHintUsage[existingHintIndex];

      if (existing && !existing.hintsRevealed.includes(hintIndex)) {
        updatedHintUsage[existingHintIndex] = {
          ...existing,
          hintsRevealed: [...existing.hintsRevealed, hintIndex],
          revealedAt: [...existing.revealedAt, new Date().toISOString()],
        };
        set({ hintUsage: updatedHintUsage });
      }
    } else {
      set({
        hintUsage: [
          ...state.hintUsage,
          {
            questionId,
            hintsRevealed: [hintIndex],
            revealedAt: [new Date().toISOString()],
          },
        ],
      });
    }
  },

  // === UTILITY ACTIONS ===
  calculateMetrics: () => {
    const state = get();
    const answered = state.questionAnswers.filter((qa) => qa.feedback);
    const score = answered.reduce(
      (sum, qa) => sum + (qa.feedback?.score ?? 0),
      0,
    );
    const timeSpent = state.questionAnswers.reduce(
      (sum, qa) => sum + qa.timeSpent,
      0,
    );

    set({
      metrics: {
        questionsCompleted: answered.length,
        accuracy:
          answered.length > 0
            ? (score / answered.length) * ACCURACY_MULTIPLIER
            : 0,
        totalTimeSpent: timeSpent,
      },
    });
  },

  getQuestionProgress: () => {
    const state = get();
    const current = state.currentQuestionIndex + 1;
    const total = state.sessionQuestions.length;
    const percentage = total > 0 ? (current / total) * 100 : 0;
    return { current, total, percentage };
  },
});
