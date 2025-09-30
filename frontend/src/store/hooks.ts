/**
 * Store Hooks & Selectors
 * Custom hooks for accessing store state and actions
 */
"use client";

import type { IUserProfile } from "@/types/ai";

import { appStore } from "./createStore";
import {
  selectCurrentQuestion,
  selectIsFirstQuestion,
  selectIsLastQuestion,
  selectQuestionProgress,
  selectFormattedTime,
} from "./slices/practiceSlice";
import type { AppStore, IStreakData } from "./types";

// === MAIN STORE HOOK ===
export const useAppStore = appStore;

// === USER HOOKS ===
export const useUser = (): {
  profile: IUserProfile | null;
  setProfile: (profile: IUserProfile) => void;
  clearProfile: () => void;
} => {
  const profile = useAppStore((state) => state.userProfile);
  const setProfile = useAppStore((state) => state.setUserProfile);
  const clearProfile = useAppStore((state) => state.clearUserProfile);

  return {
    profile,
    setProfile,
    clearProfile,
  };
};

// === PRACTICE HOOKS ===
export const usePractice = (): {
  // State
  isActive: boolean;
  isComplete: boolean;
  progress: number;
  currentQuestion: ReturnType<typeof selectCurrentQuestion>;
  questionProgress: ReturnType<typeof selectQuestionProgress>;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  currentDraft: string;
  timeElapsed: number;
  formattedTime: string;

  // Actions
  startSession: AppStore["startSession"];
  endSession: AppStore["endSession"];
  nextQuestion: AppStore["nextQuestion"];
  goToQuestion: AppStore["goToQuestion"];
  updateDraft: AppStore["updateDraft"];
  saveAnswer: AppStore["saveAnswer"];
  submitAnswer: AppStore["submitAnswer"];
} => {
  const state = useAppStore((state) => ({
    isActive: state.isActive,
    isComplete: state.isComplete,
    progress: state.progress,
    currentQuestion: selectCurrentQuestion(state),
    questionProgress: selectQuestionProgress(state),
    isFirstQuestion: selectIsFirstQuestion(state),
    isLastQuestion: selectIsLastQuestion(state),
    currentDraft: state.currentDraft,
    timeElapsed: state.timeElapsed,
  }));

  const actions = useAppStore((state) => ({
    startSession: state.startSession,
    endSession: state.endSession,
    nextQuestion: state.nextQuestion,
    goToQuestion: state.goToQuestion,
    updateDraft: state.updateDraft,
    saveAnswer: state.saveAnswer,
    submitAnswer: state.submitAnswer,
  }));

  const formattedTime = selectFormattedTime(state.timeElapsed);

  return {
    ...state,
    formattedTime,
    ...actions,
  };
};

// === RESULTS HOOKS ===
export const useResults = (): {
  results: AppStore["assessmentResults"];
  addResult: AppStore["addResult"];
  getRecent: AppStore["getRecentResults"];
} => {
  const results = useAppStore((state) => state.assessmentResults);
  const addResult = useAppStore((state) => state.addResult);
  const getRecent = useAppStore((state) => state.getRecentResults);

  return {
    results,
    addResult,
    getRecent,
  };
};

// === STREAK HOOKS ===
export const useStreak = (): {
  streak: IStreakData;
  recordActivity: () => void;
  getStreakData: () => IStreakData;
} => {
  const streak = useAppStore((state) => state.streak);
  const recordActivity = useAppStore((state) => state.recordActivity);
  const getStreakData = useAppStore((state) => state.getStreakData);

  return {
    streak,
    recordActivity,
    getStreakData,
  };
};

// === TIMER HOOK ===
export const useTimer = (): {
  timeElapsed: number;
  timeRemaining: number | null;
  formattedElapsed: string;
  formattedRemaining: string | null;
} => {
  const timeElapsed = useAppStore((state) => state.timeElapsed);
  const timeRemaining = useAppStore((state) => state.timeRemaining);

  const formattedElapsed = selectFormattedTime(timeElapsed);
  const formattedRemaining =
    timeRemaining !== null ? selectFormattedTime(timeRemaining) : null;

  return {
    timeElapsed,
    timeRemaining,
    formattedElapsed,
    formattedRemaining,
  };
};

// === NAVIGATION HOOK ===
export const useNavigation = (): {
  canGoBack: boolean;
  canGoForward: boolean;
  currentIndex: number;
  totalQuestions: number;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
} => {
  const currentIndex = useAppStore((state) => state.currentIndex);
  const totalQuestions = useAppStore((state) => state.questions.length);
  const goToQuestion = useAppStore((state) => state.goToQuestion);
  const nextQuestion = useAppStore((state) => state.nextQuestion);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < totalQuestions - 1;

  return {
    canGoBack,
    canGoForward,
    currentIndex,
    totalQuestions,
    goToQuestion,
    nextQuestion,
  };
};
