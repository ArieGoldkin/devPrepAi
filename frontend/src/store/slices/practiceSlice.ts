/**
 * Unified Practice Slice
 * Combines assessment, questions, and session functionality
 * Aligned with clean, minimal UI design
 */
import type { StateCreator } from "zustand";

import type { IQuestion, IAnswerFeedback } from "@/types/ai";
import { SECONDS_PER_MINUTE } from "@shared/utils/time";

import { DEFAULT_QUESTION_TIME } from "../constants";

// === TYPES ===
export type PracticeMode = "practice" | "assessment" | "mock";
export type QuestionType = "coding" | "conceptual" | "system-design";
export type Difficulty = "easy" | "medium" | "hard";

export interface IPracticeAnswer {
  questionId: string;
  answer: string;
  submittedAt: string | null;
  timeSpent: number; // seconds
  feedback?: IAnswerFeedback;
  language?: string; // for coding questions
}

export interface IPracticeSettings {
  mode: PracticeMode;
  timeLimit: number | null; // total time in seconds, null = unlimited
  questionTimeLimit: number; // per question in minutes
  allowSkip: boolean;
  allowHints: boolean;
  autoSave: boolean;
}

export interface IPracticeMetrics {
  questionsAttempted: number;
  questionsCompleted: number;
  correctAnswers: number;
  totalTimeSpent: number;
  averageTimePerQuestion: number;
}

export interface IPracticeState {
  // Session Management
  sessionId: string | null;
  mode: PracticeMode;

  // Progress (for top bar UI)
  progress: number; // 0-100 percentage
  timeElapsed: number; // seconds
  timeRemaining: number | null; // seconds, null if no limit

  // Questions (for breadcrumb & navigation)
  questions: IQuestion[];
  currentIndex: number; // 0-based

  // Answer Management (for editor)
  currentDraft: string;
  savedAnswers: Map<string, IPracticeAnswer>;

  // Session Status
  isActive: boolean;
  isComplete: boolean;
  startedAt: string | null;
  completedAt: string | null;

  // Settings & Metrics
  settings: IPracticeSettings;
  metrics: IPracticeMetrics;
}

export interface IPracticeActions {
  // Session Lifecycle
  startSession: (
    questions: IQuestion[],
    settings?: Partial<IPracticeSettings>,
  ) => void;
  endSession: () => void;

  // Navigation
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;

  // Answer Management
  updateDraft: (content: string) => void;
  saveAnswer: () => void;
  submitAnswer: () => void;

  // Progress
  calculateProgress: () => number;
}

// === INITIAL STATE ===
const DEFAULT_SETTINGS: IPracticeSettings = {
  mode: "practice",
  timeLimit: null,
  questionTimeLimit: DEFAULT_QUESTION_TIME,
  allowSkip: true,
  allowHints: true,
  autoSave: true,
};

const INITIAL_METRICS: IPracticeMetrics = {
  questionsAttempted: 0,
  questionsCompleted: 0,
  correctAnswers: 0,
  totalTimeSpent: 0,
  averageTimePerQuestion: 0,
};

const initialState: IPracticeState = {
  // Session
  sessionId: null,
  mode: "practice",

  // Progress
  progress: 0,
  timeElapsed: 0,
  timeRemaining: null,

  // Questions
  questions: [],
  currentIndex: 0,

  // Answers
  currentDraft: "",
  savedAnswers: new Map(),

  // Status
  isActive: false,
  isComplete: false,
  startedAt: null,
  completedAt: null,

  // Settings & Metrics
  settings: DEFAULT_SETTINGS,
  metrics: INITIAL_METRICS,
};

// === SLICE CREATOR ===
type PracticeSlice = IPracticeState & IPracticeActions;

export const createPracticeSlice: StateCreator<
  PracticeSlice,
  [],
  [],
  PracticeSlice
> = (set, get) => ({
  ...initialState,

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

// === SELECTORS ===
export const selectCurrentQuestion = (
  state: IPracticeState,
): IQuestion | null => state.questions[state.currentIndex] ?? null;

export const selectIsFirstQuestion = (state: IPracticeState): boolean =>
  state.currentIndex === 0;

export const selectIsLastQuestion = (state: IPracticeState): boolean =>
  state.currentIndex === state.questions.length - 1;

export const selectQuestionProgress = (
  state: IPracticeState,
): { current: number; total: number; display: string } => ({
  current: state.currentIndex + 1,
  total: state.questions.length,
  display: `${state.currentIndex + 1} of ${state.questions.length}`,
});

export const selectFormattedTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const secs = seconds % SECONDS_PER_MINUTE;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
