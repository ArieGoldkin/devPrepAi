/**
 * Timer Management Actions
 * Handles session timer logic with countdown
 */
import type { StateCreator } from "zustand";

import type { IPracticeState, IPracticeActions } from "@/types/store";

type PracticeSlice = IPracticeState & IPracticeActions;
type SetFn = Parameters<StateCreator<PracticeSlice>>[0];
type GetFn = Parameters<StateCreator<PracticeSlice>>[1];

const TIMER_INTERVAL_MS = 1000; // 1 second
const MS_TO_SECONDS = 1000;

export const createTimerActions = (
  set: SetFn,
  get: GetFn,
): Pick<IPracticeActions, "startTimer" | "stopTimer" | "resetTimer"> => ({
  startTimer: (): void => {
    const startTime = Date.now();
    const state = get();
    // timeLimit is already in seconds (converted in practice page)
    const initialTimeRemaining = state.settings.timeLimit;

    set({
      sessionStartTime: new Date(),
      timeRemaining: initialTimeRemaining,
    });

    const interval = setInterval(() => {
      const currentState = get();
      const elapsed = Math.floor((Date.now() - startTime) / MS_TO_SECONDS);

      set(() => ({
        timeElapsed: elapsed,
        timeRemaining:
          initialTimeRemaining !== null
            ? Math.max(0, initialTimeRemaining - elapsed)
            : null,
      }));

      // Auto-end session when time runs out
      if (initialTimeRemaining !== null && elapsed >= initialTimeRemaining) {
        currentState.stopTimer();
        currentState.endSession();
      }
    }, TIMER_INTERVAL_MS);

    set({ timerInterval: interval });
  },

  stopTimer: (): void => {
    const { timerInterval } = get();
    if (timerInterval) {
      clearInterval(timerInterval);
      set({ timerInterval: null });
    }
  },

  resetTimer: (): void => {
    get().stopTimer();
    set({ timeElapsed: 0, sessionStartTime: null });
  },
});
