import type { StateCreator } from "zustand";
import type { IQuestion, IFeedback } from "@/types/ai";

// === TYPES ===
export interface IQuestionSession {
  id: string;
  startedAt: string;
  completedAt?: string;
  questionsViewed: number;
  hintsUsed: number;
  totalTimeSpent: number;
}

export interface IHintUsage {
  questionId: string;
  hintsRevealed: number;
  maxHints: number;
  timestamp: string;
}

export interface IQuestionInteraction {
  questionId: string;
  startedAt: string;
  completedAt?: string;
  timeSpent: number;
  hintsUsed: number;
  attempts: number;
  solved: boolean;
}

export interface IQuestionsState {
  // Current Session
  currentSession: IQuestionSession | null;
  sessionQuestions: IQuestion[]; // Questions for current session
  
  // Navigation & UI State
  currentQuestionIndex: number;
  isAnswering: boolean;
  showSolution: boolean;
  
  // Hints Management (UI state, not the hints content)
  hintUsage: Map<string, IHintUsage>;
  currentHintsRevealed: number;
  
  // User Interactions
  questionInteractions: Map<string, IQuestionInteraction>;
  currentAnswer: string;
  
  // Performance Tracking
  correctAnswers: number;
  totalAnswers: number;
  averageTimePerQuestion: number;
  
  // Adaptive Learning
  currentDifficulty: number; // 1-10
  recommendedDifficulty: number;
  topicPerformance: Map<string, number>; // topic -> success rate
  weakAreas: string[];
  strongAreas: string[];
}

export interface IQuestionsActions {
  // Session Management
  startQuestionSession: (questions: IQuestion[]) => void;
  endQuestionSession: () => void;
  
  // Navigation
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  
  // Answer Management
  setCurrentAnswer: (answer: string) => void;
  clearCurrentAnswer: () => void;
  
  // Hint System
  revealNextHint: (questionId: string, totalHints: number) => void;
  resetHints: () => void;
  getHintsRevealed: (questionId: string) => number;
  
  // Solution Display
  toggleSolution: () => void;
  showSolutionForQuestion: (questionId: string) => void;
  
  // Interaction Tracking
  startAnswering: (questionId: string) => void;
  completeQuestion: (questionId: string, solved: boolean, feedback?: IFeedback) => void;
  recordAttempt: (questionId: string) => void;
  
  // Performance & Adaptive
  updatePerformance: (isCorrect: boolean, topic: string, timeSpent: number) => void;
  calculateRecommendedDifficulty: () => number;
  identifyWeakAreas: () => string[];
  
  // Utilities
  getQuestionStats: (questionId: string) => IQuestionInteraction | undefined;
  getSessionStats: () => {
    questionsAttempted: number;
    questionsCompleted: number;
    averageHintsUsed: number;
    successRate: number;
    totalTimeSpent: number;
  };
  resetQuestionState: () => void;
}

// === INITIAL STATE ===
const initialQuestionsState: IQuestionsState = {
  currentSession: null,
  sessionQuestions: [],
  currentQuestionIndex: 0,
  isAnswering: false,
  showSolution: false,
  hintUsage: new Map(),
  currentHintsRevealed: 0,
  questionInteractions: new Map(),
  currentAnswer: "",
  correctAnswers: 0,
  totalAnswers: 0,
  averageTimePerQuestion: 0,
  currentDifficulty: 5,
  recommendedDifficulty: 5,
  topicPerformance: new Map(),
  weakAreas: [],
  strongAreas: [],
};

// === SLICE CREATOR ===
export const createQuestionsSlice: StateCreator<
  IQuestionsState & IQuestionsActions,
  [],
  [],
  IQuestionsState & IQuestionsActions
> = (set, get) => ({
  ...initialQuestionsState,

  // Session Management
  startQuestionSession: (questions: IQuestion[]): void => {
    set({
      currentSession: {
        id: crypto.randomUUID(),
        startedAt: new Date().toISOString(),
        questionsViewed: 0,
        hintsUsed: 0,
        totalTimeSpent: 0,
      },
      sessionQuestions: questions,
      currentQuestionIndex: 0,
      questionInteractions: new Map(),
      hintUsage: new Map(),
      currentAnswer: "",
      showSolution: false,
    });
  },

  endQuestionSession: (): void => {
    const state = get();
    if (state.currentSession) {
      set({
        currentSession: {
          ...state.currentSession,
          completedAt: new Date().toISOString(),
        },
      });
    }
  },

  // Navigation
  goToQuestion: (index: number): void => {
    const state = get();
    if (index >= 0 && index < state.sessionQuestions.length) {
      set({
        currentQuestionIndex: index,
        currentAnswer: "",
        currentHintsRevealed: 0,
        showSolution: false,
      });
    }
  },

  nextQuestion: (): void => {
    const state = get();
    if (state.currentQuestionIndex < state.sessionQuestions.length - 1) {
      get().goToQuestion(state.currentQuestionIndex + 1);
    }
  },

  previousQuestion: (): void => {
    const state = get();
    if (state.currentQuestionIndex > 0) {
      get().goToQuestion(state.currentQuestionIndex - 1);
    }
  },

  // Answer Management
  setCurrentAnswer: (answer: string): void => {
    set({ currentAnswer: answer });
  },

  clearCurrentAnswer: (): void => {
    set({ currentAnswer: "" });
  },

  // Hint System
  revealNextHint: (questionId: string, totalHints: number): void => {
    const state = get();
    const currentUsage = state.hintUsage.get(questionId) || {
      questionId,
      hintsRevealed: 0,
      maxHints: totalHints,
      timestamp: new Date().toISOString(),
    };

    if (currentUsage.hintsRevealed < totalHints) {
      const newUsage = {
        ...currentUsage,
        hintsRevealed: currentUsage.hintsRevealed + 1,
      };
      
      const newHintUsage = new Map(state.hintUsage);
      newHintUsage.set(questionId, newUsage);
      
      set({
        hintUsage: newHintUsage,
        currentHintsRevealed: newUsage.hintsRevealed,
      });

      // Update session stats
      if (state.currentSession) {
        set({
          currentSession: {
            ...state.currentSession,
            hintsUsed: state.currentSession.hintsUsed + 1,
          },
        });
      }
    }
  },

  resetHints: (): void => {
    set({ currentHintsRevealed: 0 });
  },

  getHintsRevealed: (questionId: string): number => {
    const state = get();
    return state.hintUsage.get(questionId)?.hintsRevealed || 0;
  },

  // Solution Display
  toggleSolution: (): void => {
    set((state) => ({ showSolution: !state.showSolution }));
  },

  showSolutionForQuestion: (questionId: string): void => {
    set({ showSolution: true });
  },

  // Interaction Tracking
  startAnswering: (questionId: string): void => {
    const state = get();
    const interaction = state.questionInteractions.get(questionId) || {
      questionId,
      startedAt: new Date().toISOString(),
      timeSpent: 0,
      hintsUsed: 0,
      attempts: 0,
      solved: false,
    };

    const newInteractions = new Map(state.questionInteractions);
    newInteractions.set(questionId, interaction);
    
    set({
      questionInteractions: newInteractions,
      isAnswering: true,
    });
  },

  completeQuestion: (questionId: string, solved: boolean, feedback?: IFeedback): void => {
    const state = get();
    const interaction = state.questionInteractions.get(questionId);
    
    if (interaction) {
      const completedInteraction = {
        ...interaction,
        completedAt: new Date().toISOString(),
        timeSpent: Date.now() - new Date(interaction.startedAt).getTime(),
        solved,
        hintsUsed: state.hintUsage.get(questionId)?.hintsRevealed || 0,
      };

      const newInteractions = new Map(state.questionInteractions);
      newInteractions.set(questionId, completedInteraction);
      
      set({
        questionInteractions: newInteractions,
        isAnswering: false,
      });

      // Update performance metrics
      if (solved) {
        set({ correctAnswers: state.correctAnswers + 1 });
      }
      set({ totalAnswers: state.totalAnswers + 1 });
    }
  },

  recordAttempt: (questionId: string): void => {
    const state = get();
    const interaction = state.questionInteractions.get(questionId);
    
    if (interaction) {
      const updatedInteraction = {
        ...interaction,
        attempts: interaction.attempts + 1,
      };

      const newInteractions = new Map(state.questionInteractions);
      newInteractions.set(questionId, updatedInteraction);
      
      set({ questionInteractions: newInteractions });
    }
  },

  // Performance & Adaptive
  updatePerformance: (isCorrect: boolean, topic: string, timeSpent: number): void => {
    const state = get();
    
    // Update topic performance
    const currentScore = state.topicPerformance.get(topic) || 0;
    const newScore = (currentScore * 0.7) + (isCorrect ? 0.3 : 0); // Weighted average
    
    const newTopicPerformance = new Map(state.topicPerformance);
    newTopicPerformance.set(topic, newScore);
    
    // Update average time
    const totalQuestions = state.totalAnswers + 1;
    const newAvgTime = 
      (state.averageTimePerQuestion * state.totalAnswers + timeSpent) / totalQuestions;
    
    set({
      topicPerformance: newTopicPerformance,
      averageTimePerQuestion: newAvgTime,
      correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
      totalAnswers: totalQuestions,
    });
    
    // Recalculate difficulty
    get().calculateRecommendedDifficulty();
  },

  calculateRecommendedDifficulty: (): number => {
    const state = get();
    const successRate = state.totalAnswers > 0 
      ? state.correctAnswers / state.totalAnswers 
      : 0.5;
    
    let newDifficulty = state.currentDifficulty;
    
    if (successRate > 0.8 && state.totalAnswers >= 5) {
      newDifficulty = Math.min(10, state.currentDifficulty + 1);
    } else if (successRate < 0.4 && state.totalAnswers >= 5) {
      newDifficulty = Math.max(1, state.currentDifficulty - 1);
    }
    
    set({ recommendedDifficulty: newDifficulty });
    return newDifficulty;
  },

  identifyWeakAreas: (): string[] => {
    const state = get();
    const weakAreas: string[] = [];
    
    state.topicPerformance.forEach((score, topic) => {
      if (score < 0.4) weakAreas.push(topic);
    });
    
    set({ weakAreas });
    return weakAreas;
  },

  // Utilities
  getQuestionStats: (questionId: string): IQuestionInteraction | undefined => {
    return get().questionInteractions.get(questionId);
  },

  getSessionStats: () => {
    const state = get();
    const interactions = Array.from(state.questionInteractions.values());
    
    return {
      questionsAttempted: interactions.length,
      questionsCompleted: interactions.filter(i => i.completedAt).length,
      averageHintsUsed: interactions.length > 0
        ? interactions.reduce((sum, i) => sum + i.hintsUsed, 0) / interactions.length
        : 0,
      successRate: state.totalAnswers > 0 
        ? (state.correctAnswers / state.totalAnswers) * 100 
        : 0,
      totalTimeSpent: interactions.reduce((sum, i) => sum + i.timeSpent, 0),
    };
  },

  resetQuestionState: (): void => {
    set(initialQuestionsState);
  },
});

// === SELECTORS ===
export const selectCurrentQuestion = (state: IQuestionsState): IQuestion | null =>
  state.sessionQuestions[state.currentQuestionIndex] || null;

export const selectQuestionProgress = (state: IQuestionsState): number =>
  state.sessionQuestions.length > 0
    ? ((state.currentQuestionIndex + 1) / state.sessionQuestions.length) * 100
    : 0;

export const selectIsLastQuestion = (state: IQuestionsState): boolean =>
  state.currentQuestionIndex === state.sessionQuestions.length - 1;

export const selectSuccessRate = (state: IQuestionsState): number =>
  state.totalAnswers > 0 
    ? (state.correctAnswers / state.totalAnswers) * 100 
    : 0;