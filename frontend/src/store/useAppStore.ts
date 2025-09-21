"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IUserProfile } from "@/types/ai";

import {
  createAssessmentSlice,
  type IAssessmentState,
  type IAssessmentActions,
} from "./slices/assessmentSlice";
import {
  createResultsSlice,
  type IResultsState,
  type IResultsActions,
} from "./slices/resultsSlice";
import {
  createStreakSlice,
  type IStreakState,
  type IStreakActions,
} from "./slices/streakSlice";
import {
  createUserSlice,
  type IUserState,
  type IUserActions,
} from "./slices/userSlice";

// === COMBINED TYPES ===
export interface IAppState
  extends IUserState,
    IAssessmentState,
    IResultsState,
    IStreakState {}

export interface IAppActions
  extends IUserActions,
    IAssessmentActions,
    IResultsActions,
    IStreakActions {}

// === STORE ===
export const useAppStore = create<IAppState & IAppActions>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createAssessmentSlice(...args),
      ...createResultsSlice(...args),
      ...createStreakSlice(...args),
    }),
    {
      name: "devprep-app-store",
      partialize: (state) => ({
        userProfile: state.userProfile,
        assessmentResults: state.assessmentResults,
        streak: state.streak,
        // Don't persist active assessment state
      }),
    },
  ),
);

// === SELECTORS ===
export const useUserProfile = (): IUserProfile | null =>
  useAppStore((state) => state.userProfile);

export const useAssessmentState = (): IAssessmentState =>
  useAppStore((state) => ({
    questions: state.questions,
    currentQuestionIndex: state.currentQuestionIndex,
    answers: state.answers,
    timeRemaining: state.timeRemaining,
    isActive: state.isActive,
    startedAt: state.startedAt,
    settings: state.settings,
  }));

export const useAssessmentActions = (): Pick<
  IAppActions,
  | "startAssessment"
  | "submitAnswer"
  | "nextQuestion"
  | "completeAssessment"
  | "resetAssessment"
  | "updateTimer"
> =>
  useAppStore((state) => ({
    startAssessment: state.startAssessment,
    submitAnswer: state.submitAnswer,
    nextQuestion: state.nextQuestion,
    completeAssessment: state.completeAssessment,
    resetAssessment: state.resetAssessment,
    updateTimer: state.updateTimer,
  }));

export const useStreak = (): IAppState["streak"] =>
  useAppStore((state) => state.streak);

export const useStreakActions = (): Pick<
  IAppActions,
  "recordActivity" | "getStreakData"
> =>
  useAppStore((state) => ({
    recordActivity: state.recordActivity,
    getStreakData: state.getStreakData,
  }));

export const useResultsActions = (): Pick<
  IAppActions,
  "addResult" | "getRecentResults"
> =>
  useAppStore((state) => ({
    addResult: state.addResult,
    getRecentResults: state.getRecentResults,
  }));
