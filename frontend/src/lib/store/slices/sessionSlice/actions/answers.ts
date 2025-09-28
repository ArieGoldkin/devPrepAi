import type { StoreApi } from "zustand";

import { createEmptyAnswer, calculateTimeSpent, updateMetrics } from "../helpers";
import type { ISessionState, ISessionActions } from "../types";

type SessionStore = ISessionState & ISessionActions;

type AnswerActions = Pick<
  ISessionActions,
  "updateDraft" | "submitAnswer" | "autoSaveAnswer" | "useHint" | "updateTimer"
>;

export const answerActions = (
  set: StoreApi<SessionStore>["setState"],
  get: StoreApi<SessionStore>["getState"]
): AnswerActions => ({
  updateDraft: (questionId: string, draft: string) => {
    const { answers } = get();
    const answer = answers.get(questionId) || createEmptyAnswer(questionId);
    answers.set(questionId, { ...answer, draft });
    set({ answers: new Map(answers) });
  },

  submitAnswer: (questionId: string, answer: string) => {
    const { answers, metrics, startedAt } = get();
    const existingAnswer = answers.get(questionId) || createEmptyAnswer(questionId);
    const timeSpent = calculateTimeSpent(startedAt);

    answers.set(questionId, {
      ...existingAnswer,
      answer,
      submittedAt: new Date().toISOString(),
      timeSpent,
    });

    set({
      answers: new Map(answers),
      metrics: updateMetrics(metrics, timeSpent),
    });
  },

  autoSaveAnswer: (questionId: string) => {
    const { answers } = get();
    const answer = answers.get(questionId);
    if (!answer) return;

    answers.set(questionId, {
      ...answer,
      answer: answer.draft,
      autoSaved: true,
      lastSavedAt: new Date().toISOString(),
    });

    set({ answers: new Map(answers) });
  },

  useHint: (questionId: string, hintIndex: number) => {
    const { answers, metrics } = get();
    const answer = answers.get(questionId) || createEmptyAnswer(questionId);

    if (!answer.hintsUsed.includes(hintIndex)) {
      answer.hintsUsed.push(hintIndex);
      answers.set(questionId, answer);
      set({
        answers: new Map(answers),
        metrics: {
          ...metrics,
          hintsUsed: metrics.hintsUsed + 1,
        },
      });
    }
  },

  updateTimer: (timeRemaining: number) => {
    set({ timeRemaining });
    if (timeRemaining <= 0 && get().settings.autoSubmit) {
      get().endSession();
    }
  },
});