/**
 * Session Lifecycle Actions
 * Handles session start and end logic
 */
import type { StateCreator } from "zustand";

import type { IPracticeState, IPracticeActions } from "@/types/store";

import { DEFAULT_SETTINGS, INITIAL_METRICS } from "../constants";

type PracticeSlice = IPracticeState & IPracticeActions;
type SetFn = Parameters<StateCreator<PracticeSlice>>[0];
type GetFn = Parameters<StateCreator<PracticeSlice>>[1];

export const createSessionActions = (
  set: SetFn,
  get: GetFn,
): Pick<IPracticeActions, "startSession" | "endSession"> => ({
  startSession: (questions, settings = {}): void => {
    const sessionSettings = { ...DEFAULT_SETTINGS, ...settings };
    const sessionId = `session-${Date.now()}`;

    set({
      sessionId,
      mode: sessionSettings.mode,
      questions,
      currentIndex: 0,
      progress: 0,
      timeElapsed: 0,
      timeRemaining: sessionSettings.timeLimit,
      currentDraft: "",
      savedAnswers: new Map(),
      isActive: true,
      isComplete: false,
      startedAt: new Date().toISOString(),
      completedAt: null,
      settings: sessionSettings,
      metrics: INITIAL_METRICS,
    });
  },

  endSession: (): void => {
    const state = get();
    const completedAt = new Date().toISOString();
    const totalTimeSpent = state.timeElapsed;
    const questionsCompleted = state.savedAnswers.size;

    set({
      isActive: false,
      isComplete: true,
      completedAt,
      progress: 100,
      metrics: {
        ...state.metrics,
        totalTimeSpent,
        questionsCompleted,
        questionsAttempted: questionsCompleted,
        averageTimePerQuestion:
          questionsCompleted > 0
            ? Math.floor(totalTimeSpent / questionsCompleted)
            : 0,
      },
    });
  },
});
