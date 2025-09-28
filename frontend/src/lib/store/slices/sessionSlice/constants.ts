import type { ISessionSettings, ISessionMetrics } from "./types";

export const DEFAULT_DURATION_MINUTES = 60;
export const MILLISECONDS_PER_SECOND = 1000;

export const DEFAULT_SETTINGS: ISessionSettings = {
  mode: "practice",
  questionCount: 10,
  difficulty: 5,
  allowHints: true,
  allowSkip: true,
  autoSubmit: false,
  autoSave: true,
  showTimer: false,
};

export const INITIAL_METRICS: ISessionMetrics = {
  totalTimeSpent: 0,
  questionsCompleted: 0,
  questionsSkipped: 0,
  hintsUsed: 0,
  accuracy: 0,
  averageTimePerQuestion: 0,
};