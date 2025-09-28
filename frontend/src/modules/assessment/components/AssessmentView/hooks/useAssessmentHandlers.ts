import { useState, useEffect } from "react";

import type { IQuestion } from "@/types/ai";
import type { IAssessmentAnswer } from "@lib/store/slices/assessmentSlice";
import type { IDraftAnswer } from "@lib/store/slices/questionsSlice/types";
import { useAppStore } from "@lib/store/useAppStore";

import {
  initializeAnswerState,
  shouldAutoSave,
  getNavigationState,
} from "./assessmentHandlerUtils";
import { useAssessmentCallbacks } from "./useAssessmentCallbacks";
import { useAutoSave } from "./useAutoSave";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";
import { useQuestionHelpers } from "./useQuestionHelpers";

interface IUseAssessmentHandlersReturn {
  questions: IQuestion[];
  currentQuestion: IQuestion | null;
  currentQuestionIndex: number;
  currentAnswer: string;
  draftAnswer: string;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  answers: IAssessmentAnswer[];
  handleAnswerChange: (value: string) => void;
  handleDraftChange: (value: string) => void;
  handleSubmitAnswer: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleTimeUp: () => void;
  handleAutoSave: (answer: string) => void;
  handleKeyboardShortcuts: (event: KeyboardEvent) => void;
  getAnswerTimeSpent: () => number | undefined;
  getQuestionType: () => "behavioral" | "system-design" | "coding" | "conceptual";
}

interface IUseAnswerStateReturn {
  currentAnswer: string;
  setCurrentAnswer: (answer: string) => void;
  draftAnswer: string;
  setDraftAnswer: (answer: string) => void;
  hasAnswered: boolean;
  setHasAnswered: (hasAnswered: boolean) => void;
}

// Extract answer management logic
function useAnswerState(
  currentQuestion: IQuestion | null,
  answers: IAssessmentAnswer[],
  draftAnswers: IDraftAnswer[],
): IUseAnswerStateReturn {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [draftAnswer, setDraftAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    // Transform IDraftAnswer[] to expected format for initializeAnswerState
    const draftAnswersForInit = draftAnswers.map((da) => ({
      questionId: da.questionId,
      draft: da.draft,
    }));
    const state = initializeAnswerState(currentQuestion, answers, draftAnswersForInit);
    setCurrentAnswer(state.currentAnswer);
    setDraftAnswer(state.draftAnswer);
    setHasAnswered(state.hasAnswered);
  }, [currentQuestion, answers, draftAnswers]);

  return {
    currentAnswer,
    setCurrentAnswer,
    draftAnswer,
    setDraftAnswer,
    hasAnswered,
    setHasAnswered,
  };
}

export function useAssessmentHandlers(
  onComplete?: () => void,
): IUseAssessmentHandlersReturn {
  const store = useAppStore();
  const { questions, currentQuestionIndex, answers, draftAnswers } = store;

  const currentQuestion = questions[currentQuestionIndex] || null;
  const { isFirstQuestion, isLastQuestion } = getNavigationState(
    currentQuestionIndex,
    questions.length,
  );

  // Use answer state management
  const answerState = useAnswerState(currentQuestion, answers, draftAnswers);

  // Initialize helper hooks
  const { handleAutoSave, scheduleAutoSave, clearTimers } = useAutoSave({
    currentQuestion,
    autoSave: (questionId: string, answer: string) => {
      store.updateDraft(questionId, answer);
      store.autoSave(questionId);
    },
  });

  const helpers = useQuestionHelpers({ currentQuestion, answers });

  // Use extracted callbacks hook
  const callbacks = useAssessmentCallbacks({
    currentQuestion,
    draftAnswer: answerState.draftAnswer,
    hasAnswered: answerState.hasAnswered,
    isLastQuestion,
    isFirstQuestion,
    submitAnswer: store.submitAnswer,
    nextQuestion: store.nextQuestion,
    previousQuestion: store.previousQuestion,
    completeAssessment: store.completeAssessment,
    addResult: store.addResult,
    clearTimers,
    setCurrentAnswer: answerState.setCurrentAnswer,
    setHasAnswered: answerState.setHasAnswered,
    setDraftAnswer: answerState.setDraftAnswer,
    onComplete,
  });

  // Auto-save effect
  useEffect(() => {
    if (!currentQuestion || !shouldAutoSave(answerState.draftAnswer, answerState.currentAnswer)) {
      return;
    }
    scheduleAutoSave(answerState.draftAnswer);
    return clearTimers;
  }, [answerState.draftAnswer, answerState.currentAnswer, currentQuestion, scheduleAutoSave, clearTimers]);

  const { handleKeyboardShortcuts } = useKeyboardShortcuts({
    hasAnswered: answerState.hasAnswered,
    draftAnswer: answerState.draftAnswer,
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
    handleSubmitAnswer: callbacks.handleSubmitAnswer,
    handleAutoSave,
    handlePrevious: callbacks.handlePrevious,
    handleNext: callbacks.handleNext,
  });

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    currentAnswer: answerState.currentAnswer,
    draftAnswer: answerState.draftAnswer,
    hasAnswered: answerState.hasAnswered,
    isLastQuestion,
    isFirstQuestion,
    answers,
    handleAnswerChange: callbacks.handleAnswerChange,
    handleDraftChange: callbacks.handleDraftChange,
    handleSubmitAnswer: callbacks.handleSubmitAnswer,
    handleNext: callbacks.handleNext,
    handlePrevious: callbacks.handlePrevious,
    handleTimeUp: callbacks.handleTimeUp,
    handleAutoSave,
    handleKeyboardShortcuts,
    getAnswerTimeSpent: helpers.getAnswerTimeSpent,
    getQuestionType: helpers.getQuestionType,
  };
}