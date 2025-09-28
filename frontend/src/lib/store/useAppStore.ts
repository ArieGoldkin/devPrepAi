"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IUserProfile, IQuestion } from "@/types/ai";

import {
  createAssessmentSlice,
  type IAssessmentState,
  type IAssessmentActions,
} from "./slices/assessmentSlice";
import {
  createQuestionsSlice,
  type IQuestionsState,
  type IQuestionsActions,
} from "./slices/questionsSlice";
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
    IStreakState,
    IQuestionsState {}

export interface IAppActions
  extends IUserActions,
    IAssessmentActions,
    IResultsActions,
    IStreakActions,
    IQuestionsActions {}

// === STORE ===
export const useAppStore = create<IAppState & IAppActions>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createAssessmentSlice(...args),
      ...createResultsSlice(...args),
      ...createStreakSlice(...args),
      ...createQuestionsSlice(...args),
    }),
    {
      name: "devprep-app-store",
      partialize: (state) => ({
        userProfile: state.userProfile,
        assessmentResults: state.assessmentResults,
        streak: state.streak,
        // Persist critical question session data for resume functionality
        // Only persist if session is active and not completed
        ...(state.isSessionActive &&
          !state.isSessionCompleted && {
            sessionQuestions: state.sessionQuestions,
            currentQuestionIndex: state.currentQuestionIndex,
            questionAnswers: state.questionAnswers,
            hintUsage: state.hintUsage,
            sessionStartedAt: state.sessionStartedAt,
          }),
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

// === QUESTIONS SELECTORS ===
export const useQuestionsState = (): IQuestionsState =>
  useAppStore((state) => ({
    sessionQuestions: state.sessionQuestions,
    currentQuestionIndex: state.currentQuestionIndex,
    questionAnswers: state.questionAnswers,
    hintUsage: state.hintUsage,
    isSessionActive: state.isSessionActive,
    isSessionCompleted: state.isSessionCompleted,
    metrics: state.metrics,
    sessionStartedAt: state.sessionStartedAt,
    draftAnswers: state.draftAnswers,
    disclosureState: state.disclosureState,
    totalHintPenalty: state.totalHintPenalty,
  }));

export const useQuestionsActions = (): Pick<
  IAppActions,
  | "startQuestionSession"
  | "completeSession"
  | "resetSession"
  | "goToQuestion"
  | "nextQuestion"
  | "previousQuestion"
  | "submitAnswer"
  | "updateAnswerFeedback"
  | "revealHint"
  | "calculateMetrics"
  | "getQuestionProgress"
  | "updateDraft"
  | "autoSave"
  | "toggleDisclosure"
  | "calculateHintPenalty"
> =>
  useAppStore((state) => ({
    startQuestionSession: state.startQuestionSession,
    completeSession: state.completeSession,
    resetSession: state.resetSession,
    goToQuestion: state.goToQuestion,
    nextQuestion: state.nextQuestion,
    previousQuestion: state.previousQuestion,
    submitAnswer: state.submitAnswer,
    updateAnswerFeedback: state.updateAnswerFeedback,
    revealHint: state.revealHint,
    calculateMetrics: state.calculateMetrics,
    getQuestionProgress: state.getQuestionProgress,
    updateDraft: state.updateDraft,
    autoSave: state.autoSave,
    toggleDisclosure: state.toggleDisclosure,
    calculateHintPenalty: state.calculateHintPenalty,
  }));

export const useCurrentQuestion = (): IQuestion | null =>
  useAppStore(
    (state) => state.sessionQuestions[state.currentQuestionIndex] ?? null,
  );

export const useQuestionProgress = (): {
  current: number;
  total: number;
  percentage: number;
} =>
  useAppStore((state) => {
    const current = state.currentQuestionIndex + 1;
    const total = state.sessionQuestions.length;
    const percentage = total > 0 ? (current / total) * 100 : 0;
    return { current, total, percentage };
  });
