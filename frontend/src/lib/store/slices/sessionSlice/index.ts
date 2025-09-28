import type { StateCreator, StoreApi } from "zustand";

import { createSessionActions } from "./actions";
import { DEFAULT_SETTINGS, INITIAL_METRICS } from "./constants";
import type { ISessionState, ISessionActions } from "./types";

// Re-export all types
export type {
  SessionMode,
  ISessionAnswer,
  ISessionSettings,
  ISessionMetrics,
  ISessionState,
  ISessionActions,
} from "./types";

// Initial state
const initialSessionState: ISessionState = {
  sessionId: null,
  mode: "practice",
  questions: [],
  currentQuestionIndex: 0,
  answers: new Map(),
  isActive: false,
  isCompleted: false,
  isPaused: false,
  startedAt: null,
  completedAt: null,
  pausedAt: null,
  timeRemaining: null,
  settings: DEFAULT_SETTINGS,
  metrics: INITIAL_METRICS,
};

// Create the session slice
type SessionStore = ISessionState & ISessionActions;

export const createSessionSlice: StateCreator<
  SessionStore,
  [],
  [],
  SessionStore
> = (set, get) => ({
  ...initialSessionState,
  ...createSessionActions(
    set as StoreApi<SessionStore>["setState"],
    get as StoreApi<SessionStore>["getState"]
  ),
});