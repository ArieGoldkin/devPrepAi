/**
 * Store Creation
 * Configures and creates the Zustand store with all slices using proper TypeScript patterns
 */
"use client";

import { create } from "zustand";
import type { StoreApi, UseBoundStore, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type {
  AppStore,
  IPracticeState,
  IPracticeActions,
  IResultsState,
  IResultsActions,
  IStreakState,
  IStreakActions,
  IUserState,
  IUserActions,
} from "@/types/store";

import { STORE_NAME } from "./constants";
import { createPracticeSlice } from "./slices/practice";
import { createResultsSlice } from "./slices/resultsSlice";
import { createStreakSlice } from "./slices/streakSlice";
import { createUserSlice } from "./slices/userSlice";

/**
 * Type-safe slice creator that properly handles the combined store type
 * Each slice needs access to the full store type for cross-slice operations
 */
type SliceCreator<T> = StateCreator<AppStore, [], [], T>;

/**
 * Create the main application store with proper TypeScript typing
 * Uses Zustand's recommended pattern for combining slices without type assertions
 */
export const createAppStore = (): UseBoundStore<StoreApi<AppStore>> =>
  create<AppStore>()(
    persist(
      (set, get, api) => {
        // Cast each slice creator to work with the full AppStore type
        const userSlice = (
          createUserSlice as SliceCreator<IUserState & IUserActions>
        )(set, get, api);
        const practiceSlice = (
          createPracticeSlice as SliceCreator<IPracticeState & IPracticeActions>
        )(set, get, api);
        const resultsSlice = (
          createResultsSlice as SliceCreator<IResultsState & IResultsActions>
        )(set, get, api);
        const streakSlice = (
          createStreakSlice as SliceCreator<IStreakState & IStreakActions>
        )(set, get, api);

        // Combine all slices into the final store
        return {
          ...userSlice,
          ...practiceSlice,
          ...resultsSlice,
          ...streakSlice,
        };
      },
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
          /**
           * Convert savedAnswers back to Map after rehydration
           * Maps cannot be JSON-serialized, so we store them as arrays during persist
           * and reconstruct them here during rehydration
           */
          if (state && Array.isArray(state.savedAnswers)) {
            // Create new state object with converted Map instead of mutating
            return {
              ...state,
              savedAnswers: new Map(
                state.savedAnswers as Array<[string, unknown]>,
              ),
            };
          }
          return state;
        },
      },
    ),
  );

// Create the store instance
export const appStore = createAppStore();
