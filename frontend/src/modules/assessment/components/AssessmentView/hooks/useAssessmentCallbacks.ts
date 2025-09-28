import { useCallback } from "react";

import type { IQuestion, IAssessmentResults } from "@/types/ai";

import { canSubmitAnswer } from "./assessmentHandlerUtils";

interface IUseAssessmentCallbacksProps {
  currentQuestion: IQuestion | null;
  draftAnswer: string;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  submitAnswer: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeAssessment: () => IAssessmentResults;
  addResult: (result: IAssessmentResults) => void;
  clearTimers: () => void;
  setCurrentAnswer: (answer: string) => void;
  setHasAnswered: (hasAnswered: boolean) => void;
  setDraftAnswer: (answer: string) => void;
  onComplete: (() => void) | undefined;
}

interface IUseAssessmentCallbacksReturn {
  handleAnswerChange: (value: string) => void;
  handleDraftChange: (value: string) => void;
  handleSubmitAnswer: () => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleTimeUp: () => void;
}

export function useAssessmentCallbacks({
  currentQuestion,
  draftAnswer,
  hasAnswered,
  isLastQuestion,
  isFirstQuestion,
  submitAnswer,
  nextQuestion,
  previousQuestion,
  completeAssessment,
  addResult,
  clearTimers,
  setCurrentAnswer,
  setHasAnswered,
  setDraftAnswer,
  onComplete,
}: IUseAssessmentCallbacksProps): IUseAssessmentCallbacksReturn {
  const handleAnswerChange = useCallback(
    (value: string): void => {
      setCurrentAnswer(value);
    },
    [setCurrentAnswer],
  );

  const handleDraftChange = useCallback(
    (value: string): void => {
      setDraftAnswer(value);
    },
    [setDraftAnswer],
  );

  const handleSubmitAnswer = useCallback((): void => {
    if (!currentQuestion || !canSubmitAnswer(currentQuestion, draftAnswer)) return;
    const finalAnswer = draftAnswer.trim();
    submitAnswer(currentQuestion.id, finalAnswer);
    setCurrentAnswer(finalAnswer);
    setHasAnswered(true);
    clearTimers();
  }, [
    currentQuestion,
    draftAnswer,
    submitAnswer,
    clearTimers,
    setCurrentAnswer,
    setHasAnswered,
  ]);

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
  }, [
    hasAnswered,
    draftAnswer,
    isLastQuestion,
    nextQuestion,
    handleSubmitAnswer,
    handleComplete,
    setHasAnswered,
  ]);

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
  }, [draftAnswer, hasAnswered, handleSubmitAnswer, handleComplete]);

  return {
    handleAnswerChange,
    handleDraftChange,
    handleSubmitAnswer,
    handleNext,
    handlePrevious,
    handleTimeUp,
  };
}