/**
 * Unified Practice Slice
 * Combines assessment, questions, and session functionality
 * Aligned with clean, minimal UI design
 */
import type { StateCreator } from "zustand";

import type {
  IPracticeState,
  IPracticeActions,
  IPracticeAnswer,
} from "@/types/store";

import {
  DEFAULT_SETTINGS,
  INITIAL_METRICS,
  initialPracticeState,
} from "./constants";

// === SLICE CREATOR ===
type PracticeSlice = IPracticeState & IPracticeActions;

export const createPracticeSlice: StateCreator<
  PracticeSlice,
  [],
  [],
  PracticeSlice
> = (set, get) => ({
  ...initialPracticeState,

  // Session Lifecycle
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

  // Navigation
  goToQuestion: (index): void => {
    const state = get();
    if (index >= 0 && index < state.questions.length) {
      // Save current draft before navigating
      if (state.currentDraft && state.settings.autoSave) {
        get().saveAnswer();
      }

      // Load saved answer for target question if exists
      const targetQuestion = state.questions[index];
      const savedAnswer = targetQuestion
        ? state.savedAnswers.get(targetQuestion.id)
        : null;

      set({
        currentIndex: index,
        currentDraft: savedAnswer?.answer ?? "",
        progress: get().calculateProgress(),
      });
    }
  },

  nextQuestion: (): void => {
    const state = get();
    get().goToQuestion(state.currentIndex + 1);
  },

  // Answer Management
  updateDraft: (content): void => {
    set({ currentDraft: content });
  },

  saveAnswer: (): void => {
    const state = get();
    const currentQuestion = state.questions[state.currentIndex];
    if (!currentQuestion || !state.currentDraft) return;

    const answer: IPracticeAnswer = {
      questionId: currentQuestion.id,
      answer: state.currentDraft,
      submittedAt: null, // not submitted yet, just saved
      timeSpent: state.timeElapsed,
    };

    set((state: PracticeSlice) => {
      const newAnswers = new Map(state.savedAnswers);
      newAnswers.set(currentQuestion.id, answer);
      return {
        savedAnswers: newAnswers,
        progress: get().calculateProgress(),
      };
    });
  },

  submitAnswer: (): void => {
    const state = get();
    const currentQuestion = state.questions[state.currentIndex];
    if (!currentQuestion || !state.currentDraft) return;

    const answer: IPracticeAnswer = {
      questionId: currentQuestion.id,
      answer: state.currentDraft,
      submittedAt: new Date().toISOString(),
      timeSpent: state.timeElapsed,
    };

    set((state: PracticeSlice) => {
      const newAnswers = new Map(state.savedAnswers);
      newAnswers.set(currentQuestion.id, answer);

      const questionsCompleted = Array.from(newAnswers.values()).filter(
        (a: IPracticeAnswer) => a.submittedAt !== null,
      ).length;

      return {
        savedAnswers: newAnswers,
        progress: get().calculateProgress(),
        metrics: {
          ...state.metrics,
          questionsCompleted,
          questionsAttempted: newAnswers.size,
        },
      };
    });

    // Auto-advance if not last question
    if (state.currentIndex < state.questions.length - 1) {
      get().nextQuestion();
    }
  },

  // Progress Calculation
  calculateProgress: (): number => {
    const state = get();
    if (state.questions.length === 0) return 0;

    const answeredCount = state.savedAnswers.size;
    const totalQuestions = state.questions.length;

    return Math.round((answeredCount / totalQuestions) * 100);
  },
});

// Re-export selectors for backward compatibility
export {
  selectCurrentQuestion,
  selectIsFirstQuestion,
  selectIsLastQuestion,
  selectQuestionProgress,
  selectFormattedTime,
} from "./selectors";
