import { useRouter } from "next/navigation";
import { useCallback } from "react";

import type { IQuestion } from "@/types/ai";
import { useAppStore } from "@lib/store/useAppStore";

interface INavigationDeps {
  currentQuestionIndex: number;
  hasUnsavedChanges: boolean;
  currentAnswer: string;
  currentQuestion: IQuestion | null;
  isLastQuestion: boolean;
  submitAnswer: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  completeAssessment: () => void;
  onComplete?: (() => void) | undefined;
}

interface INavigationHandlers {
  handlePrevious: () => void;
  handleNext: () => void;
  handleSubmitAssessment: () => void;
  handleExit: () => void;
  handleAnswerChange: (
    value: string,
    setCurrentAnswer: (v: string) => void,
    setHasUnsavedChanges: (v: boolean) => void
  ) => void;
}

export function useAssessmentNavigation({
  currentQuestionIndex,
  hasUnsavedChanges,
  currentAnswer,
  currentQuestion,
  isLastQuestion,
  submitAnswer,
  nextQuestion,
  completeAssessment,
  onComplete,
}: INavigationDeps): INavigationHandlers {
  const router = useRouter();

  // Handle navigation
  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      // Save current answer if changed
      if (hasUnsavedChanges && currentAnswer.trim().length > 0 && currentQuestion !== null) {
        submitAnswer(currentQuestion.id, currentAnswer);
      }
      // Navigate
      const newIndex = currentQuestionIndex - 1;
      useAppStore.setState({ currentQuestionIndex: newIndex });
    }
  }, [
    currentQuestionIndex,
    hasUnsavedChanges,
    currentAnswer,
    currentQuestion,
    submitAnswer,
  ]);

  const handleNext = useCallback(() => {
    if (currentQuestion !== null && currentAnswer.trim().length > 0) {
      // Submit answer
      submitAnswer(currentQuestion.id, currentAnswer);

      // Navigate to next question
      if (!isLastQuestion) {
        nextQuestion();
      }
    }
  }, [
    currentQuestion,
    currentAnswer,
    submitAnswer,
    nextQuestion,
    isLastQuestion,
  ]);

  const handleSubmitAssessment = useCallback(() => {
    if (currentQuestion !== null && currentAnswer.trim().length > 0) {
      // Submit final answer
      submitAnswer(currentQuestion.id, currentAnswer);
    }

    // Complete assessment
    completeAssessment();

    // Call completion handler
    if (onComplete) {
      onComplete();
    }

    // Navigate to results
    router.push("/results");
  }, [
    currentQuestion,
    currentAnswer,
    submitAnswer,
    completeAssessment,
    onComplete,
    router,
  ]);

  const handleExit = useCallback(() => {
    // eslint-disable-next-line no-alert
    const shouldExit = window.confirm(
      "Are you sure you want to exit the assessment? Your progress will be saved."
    );
    if (shouldExit) {
      router.push("/");
    }
  }, [router]);

  const handleAnswerChange = useCallback(
    (
      value: string,
      setCurrentAnswer: (v: string) => void,
      setHasUnsavedChanges: (v: boolean) => void
    ) => {
      setCurrentAnswer(value);
      setHasUnsavedChanges(true);
    },
    []
  );

  return {
    handlePrevious,
    handleNext,
    handleSubmitAssessment,
    handleExit,
    handleAnswerChange,
  };
}
