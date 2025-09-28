import { useState, useEffect, useCallback } from "react";

import type { IQuestion } from "@/types/ai";
import type { IAssessmentAnswer } from "@lib/store/slices/assessmentSlice";
import { useAppStore } from "@lib/store/useAppStore";

import {
  initializeAnswerState,
  shouldAutoSave,
  canSubmitAnswer,
  getNavigationState,
} from "./assessmentHandlerUtils";
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

export function useAssessmentHandlers(
  onComplete?: () => void,
): IUseAssessmentHandlersReturn {
  const {
    questions,
    currentQuestionIndex,
    answers,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    completeAssessment,
    addResult,
    updateDraft,
    autoSave,
    draftAnswers,
  } = useAppStore();

  const [currentAnswer, setCurrentAnswer] = useState("");
  const [draftAnswer, setDraftAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex] || null;
  const { isFirstQuestion, isLastQuestion } = getNavigationState(
    currentQuestionIndex,
    questions.length,
  );

  // Initialize helper hooks
  const { handleAutoSave, scheduleAutoSave, clearTimers } = useAutoSave({
    currentQuestion,
    autoSave: (questionId: string, answer: string) => {
      updateDraft(questionId, answer);
      autoSave(questionId);
    },
  });

  const { getQuestionType, getAnswerTimeSpent } = useQuestionHelpers({
    currentQuestion,
    answers,
  });

  // Load existing answer and draft when question changes
  useEffect(() => {
    const state = initializeAnswerState(currentQuestion, answers, draftAnswers);
    setCurrentAnswer(state.currentAnswer);
    setDraftAnswer(state.draftAnswer);
    setHasAnswered(state.hasAnswered);
  }, [currentQuestionIndex, answers, draftAnswers, currentQuestion]);

  // Auto-save draft answers with debouncing
  useEffect(() => {
    if (!currentQuestion) {
      return;
    }

    if (shouldAutoSave(draftAnswer, currentAnswer)) {
      scheduleAutoSave(draftAnswer);
    }

    return clearTimers;
  }, [draftAnswer, currentAnswer, currentQuestion, scheduleAutoSave, clearTimers]);

  const handleAnswerChange = useCallback((value: string): void => {
    setCurrentAnswer(value);
  }, []);

  const handleDraftChange = useCallback((value: string): void => {
    setDraftAnswer(value);
  }, []);

  const handleSubmitAnswer = useCallback((): void => {
    if (!currentQuestion || !canSubmitAnswer(currentQuestion, draftAnswer)) return;

    const finalAnswer = draftAnswer.trim();
    submitAnswer(currentQuestion.id, finalAnswer);
    setCurrentAnswer(finalAnswer);
    setHasAnswered(true);
    clearTimers();
  }, [currentQuestion, draftAnswer, submitAnswer, clearTimers, setCurrentAnswer, setHasAnswered]);

  const handleComplete = useCallback((): void => {
    const result = completeAssessment();
    addResult(result);
    onComplete?.();
  }, [completeAssessment, addResult, onComplete]);
  const handleNext = useCallback((): void => {
    if (!hasAnswered && draftAnswer.trim() !== "") {
      handleSubmitAnswer();
    }

    if (isLastQuestion) {
      handleComplete();
    } else {
      nextQuestion();
      setHasAnswered(false);
    }
  }, [hasAnswered, draftAnswer, isLastQuestion, nextQuestion, completeAssessment, addResult, onComplete, currentQuestion, submitAnswer, clearTimers, setCurrentAnswer, setHasAnswered]);

  const handlePrevious = useCallback((): void => {
    if (!isFirstQuestion) {
      previousQuestion();
    }
  }, [isFirstQuestion, previousQuestion]);

  const handleTimeUp = useCallback((): void => {
    if (draftAnswer.trim() !== "" && !hasAnswered) {
      handleSubmitAnswer();
    }
    handleComplete();
  }, [draftAnswer, hasAnswered, completeAssessment, addResult, onComplete, currentQuestion, submitAnswer, clearTimers, setCurrentAnswer, setHasAnswered]);

  const { handleKeyboardShortcuts } = useKeyboardShortcuts({
    hasAnswered,
    draftAnswer,
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
    handleSubmitAnswer,
    handleAutoSave,
    handlePrevious,
    handleNext,
  });

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    currentAnswer,
    draftAnswer,
    hasAnswered,
    isLastQuestion,
    isFirstQuestion,
    answers,
    handleAnswerChange,
    handleDraftChange,
    handleSubmitAnswer,
    handleNext,
    handlePrevious,
    handleTimeUp,
    handleAutoSave,
    handleKeyboardShortcuts,
    getAnswerTimeSpent,
    getQuestionType,
  };
}