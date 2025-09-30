/**
 * Store Creation
 * Configures and creates the Zustand store with all slices
 */
"use client";

import { create } from "zustand";
import type { StoreApi, UseBoundStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { STORE_NAME } from "./constants";
import { createPracticeSlice } from "./slices/practiceSlice";
import { createResultsSlice } from "./slices/resultsSlice";
import { createStreakSlice } from "./slices/streakSlice";
import { createUserSlice } from "./slices/userSlice";
import type { AppStore } from "./types";

/**
 * Create the main application store
 * Combines all slices with persistence
 */
export const createAppStore = (): UseBoundStore<StoreApi<AppStore>> =>
  create<AppStore>()(
    persist(
      (set, get, api) =>
        ({
          // User slice
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(createUserSlice as any)(set, get, api),
          // Practice slice (unified)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(createPracticeSlice as any)(set, get, api),
          // Results slice
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(createResultsSlice as any)(set, get, api),
          // Streak slice
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(createStreakSlice as any)(set, get, api),
        }) as AppStore,
      {
        name: STORE_NAME,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          // Persist user data
          userProfile: state.userProfile,

          // Persist results history
          assessmentResults: state.assessmentResults,

          // Persist streak data
          streak: state.streak,

          // Persist practice session if active (for resume)
          ...(state.isActive &&
            !state.isComplete && {
              sessionId: state.sessionId,
              questions: state.questions,
              currentIndex: state.currentIndex,
              savedAnswers: Array.from(state.savedAnswers.entries()),
              timeElapsed: state.timeElapsed,
              startedAt: state.startedAt,
              settings: state.settings,
            }),
        }),
        onRehydrateStorage: () => (state) => {
          // Convert savedAnswers back to Map after rehydration
          if (state && Array.isArray(state.savedAnswers)) {
            // eslint-disable-next-line no-param-reassign
            state.savedAnswers = new Map(state.savedAnswers);
          }
        },
      },
    ),
  );

// Create the store instance
export const appStore = createAppStore();
