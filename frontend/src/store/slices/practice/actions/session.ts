/**
 * Session Lifecycle Actions
 * Handles session start and end logic
 */
import type { StateCreator } from "zustand";

import type {
  IAssessmentResults,
  IQuestionResult,
} from "@/types/ai/assessment";
import type {
  IPracticeState,
  IPracticeActions,
  IResultsActions,
} from "@/types/store";

import { DEFAULT_SETTINGS, INITIAL_METRICS } from "../constants";

type PracticeSlice = IPracticeState & IPracticeActions;
type SetFn = Parameters<StateCreator<PracticeSlice>>[0];
type GetFn = Parameters<StateCreator<PracticeSlice>>[1];

export const createSessionActions = (
  set: SetFn,
  get: GetFn,
): Pick<IPracticeActions, "startSession" | "endSession"> => ({
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

    // Aggregate assessment results from saved answers
    const questionResults: IQuestionResult[] = [];
    state.savedAnswers.forEach((answer, questionId) => {
      const question = state.questions.find((q) => q.id === questionId);
      if (question !== undefined && answer.feedback !== undefined) {
        questionResults.push({
          question,
          userAnswer: answer.answer,
          feedback: answer.feedback,
          timeSpent: answer.timeSpent,
        });
      }
    });

    // Create assessment results object
    const assessmentResults: IAssessmentResults = {
      questions: questionResults,
      totalTimeSpent,
      totalTimeAllocated: state.settings.timeLimit ?? 0,
      completedAt,
    };

    // Save results to results store if we have evaluated questions
    if (questionResults.length > 0) {
      // Access addResult from the combined store
      const combinedStore = get() as PracticeSlice & IResultsActions;
      if (typeof combinedStore.addResult === "function") {
        combinedStore.addResult(assessmentResults);
      }
    }

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
});
