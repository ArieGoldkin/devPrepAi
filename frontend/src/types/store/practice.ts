/**
 * Practice Store Types
 */
import type { IQuestion, IAnswerFeedback } from "@/types/ai";

// Modes & Difficulty
export type PracticeMode = "practice" | "assessment" | "mock";
export type QuestionType = "coding" | "conceptual" | "system-design";
export type Difficulty = "easy" | "medium" | "hard";

// Interfaces
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

  // Session State
  startedAt: string | null;
  completedAt: string | null;
  isPaused: boolean;
  isActive: boolean;
  isComplete: boolean;

  // Settings
  settings: IPracticeSettings;
  metrics: IPracticeMetrics;
}

export interface IPracticeActions {
  // Session lifecycle
  startSession: (
    questions: IQuestion[],
    settings?: Partial<IPracticeSettings>,
  ) => void;
  endSession: () => void;

  // Navigation
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;

  // Answer management
  updateDraft: (content: string) => void;
  saveAnswer: () => void;
  submitAnswer: () => void;

  // Progress
  calculateProgress: () => number;
}
