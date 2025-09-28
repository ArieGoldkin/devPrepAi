/**
 * Store Type Definitions
 * Centralized types for Zustand store slices and state management
 */

import type {
  IQuestion,
  IUserProfile,
  IAssessmentResults,
  IAnswerFeedback,
  IProgressiveDisclosureState,
} from "./ai";

// ============================================
// Assessment Slice Types
// ============================================
export interface IAssessmentAnswer {
  questionId: string;
  answer: string;
  timeSpent: number;
  answeredAt: string;
}

export interface IAssessmentSettings {
  duration: number; // minutes
  questionCount: number;
  autoSubmit: boolean;
}

export interface IAssessmentState {
  questions: IQuestion[];
  currentQuestionIndex: number;
  answers: IAssessmentAnswer[];
  timeRemaining: number;
  isActive: boolean;
  startedAt: string | null;
  settings: IAssessmentSettings;
}

export interface IAssessmentActions {
  startAssessment: (
    questions: IQuestion[],
    settings?: Partial<IAssessmentSettings>,
  ) => void;
  submitAssessmentAnswer: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeAssessment: () => IAssessmentResults;
  resetAssessment: () => void;
  setTimeRemaining: (time: number) => void;
}

// ============================================
// Questions Slice Types
// ============================================
export interface IQuestionState {
  id: string;
  question: IQuestion;
  userAnswer: string;
  feedback: IAnswerFeedback | null;
  hintsUsed: number;
  timeSpent: number;
  isCompleted: boolean;
  disclosureState: IProgressiveDisclosureState | null;
}

export interface IQuestionsState {
  currentQuestions: IQuestion[];
  questionStates: Map<string, IQuestionState>;
  disclosureState: IProgressiveDisclosureState[];
  loadingQuestions: boolean;
  error: string | null;
}

export interface IQuestionsActions {
  setQuestions: (questions: IQuestion[]) => void;
  updateQuestionState: (questionId: string, updates: Partial<IQuestionState>) => void;
  submitAnswer: (questionId: string, answer: string) => Promise<void>;
  useHint: (questionId: string) => void;
  toggleDisclosure: (questionId: string, section: string) => void;
  clearQuestions: () => void;
}

// ============================================
// User Slice Types
// ============================================
export interface IUserState {
  profile: IUserProfile | null;
  isAuthenticated: boolean;
  preferences: {
    theme: "light" | "dark" | "system";
    emailNotifications: boolean;
    soundEffects: boolean;
  };
}

export interface IUserActions {
  setProfile: (profile: IUserProfile) => void;
  updateProfile: (updates: Partial<IUserProfile>) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  updatePreferences: (preferences: Partial<IUserState["preferences"]>) => void;
  logout: () => void;
}

// ============================================
// Results Slice Types
// ============================================
export interface IResultsState {
  results: IAssessmentResults[];
  currentResult: IAssessmentResults | null;
  statistics: {
    totalAssessments: number;
    averageScore: number;
    totalTimeSpent: number;
    strongestCategory: string | null;
    weakestCategory: string | null;
  };
}

export interface IResultsActions {
  addResult: (result: IAssessmentResults) => void;
  setCurrentResult: (result: IAssessmentResults | null) => void;
  updateStatistics: () => void;
  clearResults: () => void;
  exportResults: (format: "json" | "csv" | "pdf") => void;
}

// ============================================
// Streak Slice Types
// ============================================
export interface IStreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  totalDaysActive: number;
  streakHistory: Array<{
    date: string;
    completed: boolean;
  }>;
}

export interface IStreakState extends IStreakData {
  isLoading: boolean;
}

export interface IStreakActions {
  markDayComplete: () => void;
  updateStreak: () => void;
  resetStreak: () => void;
  loadStreakHistory: () => Promise<void>;
}

// ============================================
// Combined App Store Types
// ============================================
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

// ============================================
// Store Helper Types
// ============================================
export type StoreSlice<T> = T;

export type StateSelector<T> = (state: IAppState) => T;

export type ActionSelector<T> = (actions: IAppActions) => T;

// Persistence configuration type
export interface IPersistConfig {
  name: string;
  version: number;
  partialize?: (state: IAppState) => Partial<IAppState>;
  migrate?: (persistedState: unknown, version: number) => IAppState;
}

// ============================================
// Store Constants Types
// ============================================
export interface IStoreConstants {
  TIME_CONSTANTS: {
    MS_PER_SECOND: number;
    SECONDS_PER_MINUTE: number;
    ASSESSMENT_DURATION_MINUTES: number;
  };
  ASSESSMENT_DEFAULTS: {
    QUESTION_COUNT: number;
    DURATION_MINUTES: number;
    AUTO_SUBMIT: boolean;
  };
  RESULTS_LIMIT: number;
}