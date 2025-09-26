import type { IQuestion, IAnswerFeedback } from "@/types/ai";

// === TYPES ===
export interface IQuestionAnswer {
  questionId: string;
  answer: string;
  submittedAt: string;
  timeSpent: number; // in seconds
  feedback?: IAnswerFeedback;
}

export interface IHintUsage {
  questionId: string;
  hintsRevealed: number[];
  revealedAt: string[];
}

export interface IPerformanceMetrics {
  totalTimeSpent: number;
  questionsCompleted: number;
  accuracy: number; // percentage (0-100)
}

export interface IQuestionsState {
  sessionQuestions: IQuestion[];
  currentQuestionIndex: number;
  questionAnswers: IQuestionAnswer[];
  hintUsage: IHintUsage[];
  isSessionActive: boolean;
  isSessionCompleted: boolean;
  metrics: IPerformanceMetrics;
  sessionStartedAt: string | null;
}

export interface IQuestionsActions {
  // Session management
  startQuestionSession: (questions: IQuestion[]) => void;
  completeSession: () => void;
  resetSession: () => void;

  // Navigation
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;

  // Answer management
  submitAnswer: (questionId: string, answer: string) => void;
  updateAnswerFeedback: (questionId: string, feedback: IAnswerFeedback) => void;

  // Hint management
  revealHint: (questionId: string, hintIndex: number) => void;

  // Utility actions
  calculateMetrics: () => void;
  getQuestionProgress: () => {
    current: number;
    total: number;
    percentage: number;
  };
}

// === INITIAL STATE ===
export const initialState: IQuestionsState = {
  sessionQuestions: [],
  currentQuestionIndex: 0,
  questionAnswers: [],
  hintUsage: [],
  isSessionActive: false,
  isSessionCompleted: false,
  metrics: {
    totalTimeSpent: 0,
    questionsCompleted: 0,
    accuracy: 0,
  },
  sessionStartedAt: null,
};
