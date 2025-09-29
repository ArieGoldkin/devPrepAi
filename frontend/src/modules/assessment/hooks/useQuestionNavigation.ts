import { useCallback } from "react";

import type { IQuestion } from "@/types/ai";

interface IUseQuestionNavigationParams {
  currentQuestionIndex: number;
  questions: IQuestion[];
  onNext: () => void;
  onPrevious: () => void;
  onJumpTo?: (index: number) => void;
}

interface IUseQuestionNavigationReturn {
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
  handleJumpTo: (index: number) => void;
  handleNavigate: (direction: "next" | "previous" | number) => void;
  getProgressPercentage: () => number;
}

/**
 * Hook for managing question navigation logic
 * Centralizes navigation state and handlers for assessments
 */
export function useQuestionNavigation({
  currentQuestionIndex,
  questions,
  onNext,
  onPrevious,
  onJumpTo,
}: IUseQuestionNavigationParams): IUseQuestionNavigationReturn {
  // Navigation state
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = !isLastQuestion;
  const canGoPrevious = !isFirstQuestion;

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (canGoNext) {
      onNext();
    }
  }, [canGoNext, onNext]);

  const handlePrevious = useCallback(() => {
    if (canGoPrevious) {
      onPrevious();
    }
  }, [canGoPrevious, onPrevious]);

  const handleJumpTo = useCallback((index: number) => {
    if (index >= 0 && index < questions.length && onJumpTo) {
      onJumpTo(index);
    }
  }, [questions.length, onJumpTo]);

  const handleNavigate = useCallback((direction: "next" | "previous" | number) => {
    if (typeof direction === "number") {
      handleJumpTo(direction);
    } else if (direction === "next") {
      handleNext();
    } else if (direction === "previous") {
      handlePrevious();
    }
  }, [handleNext, handlePrevious, handleJumpTo]);

  const getProgressPercentage = useCallback(() => {
    if (questions.length === 0) return 0;
    return Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex, questions.length]);

  return {
    isFirstQuestion,
    isLastQuestion,
    canGoNext,
    canGoPrevious,
    handleNext,
    handlePrevious,
    handleJumpTo,
    handleNavigate,
    getProgressPercentage,
  };
}