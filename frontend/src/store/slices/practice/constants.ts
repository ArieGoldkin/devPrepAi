/**
 * Practice Slice Constants
 * Initial state and default settings for practice sessions
 */
import type {
  IPracticeState,
  IPracticeSettings,
  IPracticeMetrics,
} from "@/types/store";

import { DEFAULT_QUESTION_TIME } from "../../constants";

export const DEFAULT_SETTINGS: IPracticeSettings = {
  mode: "practice",
  timeLimit: null,
  questionTimeLimit: DEFAULT_QUESTION_TIME,
  allowSkip: true,
  allowHints: true,
  autoSave: true,
};

export const INITIAL_METRICS: IPracticeMetrics = {
  questionsAttempted: 0,
  questionsCompleted: 0,
  correctAnswers: 0,
  totalTimeSpent: 0,
  averageTimePerQuestion: 0,
};

export const initialPracticeState: IPracticeState = {
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
  isPaused: false,
  startedAt: null,
  completedAt: null,

  // Timer Management (Task 1.4)
  sessionStartTime: null,
  timerInterval: null,

  // Settings & Metrics
  settings: DEFAULT_SETTINGS,
  metrics: INITIAL_METRICS,
};
