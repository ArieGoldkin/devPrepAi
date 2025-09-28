import type { StoreApi } from "zustand";

import { DEFAULT_SETTINGS, INITIAL_METRICS, DEFAULT_DURATION_MINUTES } from "../constants";
import { createInitialState } from "../helpers";
import type { IQuestion, ISessionSettings, ISessionState, ISessionActions } from "../types";

type SessionStore = ISessionState & ISessionActions;

type LifecycleActions = Pick<
  ISessionActions,
  "startSession" | "pauseSession" | "resumeSession" | "endSession" | "resetSession"
>;

export const lifecycleActions = (
  set: StoreApi<SessionStore>["setState"],
  _get: StoreApi<SessionStore>["getState"]
): LifecycleActions => ({
  startSession: (questions: IQuestion[], settings: Partial<ISessionSettings> = {}) => {
    const sessionId = `session_${Date.now()}`;
    const mergedSettings = { ...DEFAULT_SETTINGS, ...settings };
    const duration = mergedSettings.duration !== undefined && mergedSettings.duration > 0
      ? mergedSettings.duration * DEFAULT_DURATION_MINUTES
      : null;

    set({
      sessionId,
      mode: mergedSettings.mode,
      questions,
      currentQuestionIndex: 0,
      answers: new Map(),
      isActive: true,
      isCompleted: false,
      isPaused: false,
      startedAt: new Date().toISOString(),
      completedAt: null,
      pausedAt: null,
      timeRemaining: duration,
      settings: mergedSettings,
      metrics: INITIAL_METRICS,
    });
  },

  pauseSession: () => {
    set({
      isPaused: true,
      pausedAt: new Date().toISOString(),
    });
  },

  resumeSession: () => {
    set({
      isPaused: false,
      pausedAt: null,
    });
  },

  endSession: () => {
    set({
      isActive: false,
      isCompleted: true,
      completedAt: new Date().toISOString(),
    });
  },

  resetSession: () => {
    set(createInitialState());
  },
});