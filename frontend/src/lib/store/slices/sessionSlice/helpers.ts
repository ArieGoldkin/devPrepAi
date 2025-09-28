import { MILLISECONDS_PER_SECOND, DEFAULT_SETTINGS, INITIAL_METRICS } from "./constants";
import type { ISessionAnswer, ISessionMetrics, ISessionState } from "./types";

export const createEmptyAnswer = (questionId: string): ISessionAnswer => ({
  questionId,
  answer: "",
  draft: "",
  submittedAt: null,
  timeSpent: 0,
  hintsUsed: [],
  autoSaved: false,
  lastSavedAt: null,
});

export const calculateTimeSpent = (startedAt: string | null): number => {
  if (!startedAt) return 0;
  return Math.floor((Date.now() - new Date(startedAt).getTime()) / MILLISECONDS_PER_SECOND);
};

export const updateMetrics = (
  metrics: ISessionMetrics,
  timeSpent: number
): ISessionMetrics => ({
  ...metrics,
  questionsCompleted: metrics.questionsCompleted + 1,
  totalTimeSpent: metrics.totalTimeSpent + timeSpent,
  averageTimePerQuestion:
    (metrics.totalTimeSpent + timeSpent) / (metrics.questionsCompleted + 1),
});

export const createInitialState = (): Partial<ISessionState> => ({
  sessionId: null,
  mode: "practice",
  questions: [],
  currentQuestionIndex: 0,
  answers: new Map(),
  isActive: false,
  isCompleted: false,
  isPaused: false,
  startedAt: null,
  completedAt: null,
  pausedAt: null,
  timeRemaining: null,
  settings: DEFAULT_SETTINGS,
  metrics: INITIAL_METRICS,
});