import type { IQuestion, IAnswerFeedback } from "@/types/ai";

// Re-export types that are used in other files
export type { IQuestion, IAnswerFeedback };

export type SessionMode = "practice" | "assessment" | "mock-interview";

export interface ISessionAnswer {
  questionId: string;
  answer: string;
  draft: string;
  submittedAt: string | null;
  timeSpent: number;
  feedback?: IAnswerFeedback;
  hintsUsed: number[];
  autoSaved: boolean;
  lastSavedAt: string | null;
}

export interface ISessionSettings {
  mode: SessionMode;
  duration?: number;
  questionCount: number;
  difficulty: number;
  allowHints: boolean;
  allowSkip: boolean;
  autoSubmit: boolean;
  autoSave: boolean;
  showTimer: boolean;
}

export interface ISessionMetrics {
  totalTimeSpent: number;
  questionsCompleted: number;
  questionsSkipped: number;
  hintsUsed: number;
  accuracy: number;
  averageTimePerQuestion: number;
}

export interface ISessionState {
  sessionId: string | null;
  mode: SessionMode;
  questions: IQuestion[];
  currentQuestionIndex: number;
  answers: Map<string, ISessionAnswer>;
  isActive: boolean;
  isCompleted: boolean;
  isPaused: boolean;
  startedAt: string | null;
  completedAt: string | null;
  pausedAt: string | null;
  timeRemaining: number | null;
  settings: ISessionSettings;
  metrics: ISessionMetrics;
}

export interface ISessionActions {
  // Session lifecycle
  startSession: (questions: IQuestion[], settings?: Partial<ISessionSettings>) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => void;
  resetSession: () => void;

  // Navigation
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;

  // Answer management
  updateDraft: (questionId: string, draft: string) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  autoSaveAnswer: (questionId: string) => void;

  // Hints and timer
  useHint: (questionId: string, hintIndex: number) => void;
  updateTimer: (timeRemaining: number) => void;
}