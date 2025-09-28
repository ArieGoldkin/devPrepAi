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
  scorePenalty: number; // Total penalty for hints used
}

// Phase II: Draft answer management for auto-save
export interface IDraftAnswer {
  questionId: string;
  draft: string;
  updatedAt: string;
  autoSaved: boolean;
}

// Phase II: Progressive disclosure state
export interface IProgressiveDisclosure {
  questionId: string;
  expandedSections: string[]; // ['context', 'examples', 'constraints', 'edge-cases']
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
  // Phase II additions
  draftAnswers: IDraftAnswer[];
  disclosureState: IProgressiveDisclosure[];
  totalHintPenalty: number;
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

  // Phase II: Draft and auto-save management
  updateDraft: (questionId: string, draft: string) => void;
  autoSave: (questionId: string) => void;

  // Phase II: Progressive disclosure
  toggleDisclosure: (questionId: string, section: string) => void;

  // Phase II: Hint penalty calculation
  calculateHintPenalty: () => number;
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
  // Phase II additions
  draftAnswers: [],
  disclosureState: [],
  totalHintPenalty: 0,
};
