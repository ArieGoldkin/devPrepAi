import { useEffect, useState } from "react";

import type { IQuestion } from "@/types/ai";
import type { IAssessmentAnswer } from "@/types/store";
import { useAppStore } from "@lib/store/useAppStore";

interface IAssessmentState {
  questions: IQuestion[];
  currentQuestionIndex: number;
  answers: IAssessmentAnswer[];
  timeRemaining: number | null;
  isActive: boolean;
  currentQuestion: IQuestion | null;
  currentAnswer: string;
  hasUnsavedChanges: boolean;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  setCurrentAnswer: (answer: string) => void;
  setHasUnsavedChanges: (hasChanges: boolean) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  completeAssessment: () => void;
}

export function useAssessmentState(): IAssessmentState {
  // Get assessment state from store
  const {
    questions,
    currentQuestionIndex,
    answers,
    timeRemaining,
    isActive,
    submitAnswer,
    nextQuestion,
    completeAssessment,
  } = useAppStore((state) => ({
    questions: state.questions,
    currentQuestionIndex: state.currentQuestionIndex,
    answers: state.answers,
    timeRemaining: state.timeRemaining,
    isActive: state.isActive,
    submitAnswer: state.submitAnswer,
    nextQuestion: state.nextQuestion,
    completeAssessment: state.completeAssessment,
  }));

  // Local state for current answer
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Current question
  const currentQuestion = questions[currentQuestionIndex] || null;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Check if current question has been answered
  const currentQuestionAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id
  );

  // Load saved answer when question changes
  useEffect(() => {
    if (currentQuestionAnswer) {
      setCurrentAnswer(currentQuestionAnswer.answer);
    } else {
      setCurrentAnswer("");
    }
    setHasUnsavedChanges(false);
  }, [currentQuestionIndex, currentQuestionAnswer]);

  return {
    // State
    questions,
    currentQuestionIndex,
    answers,
    timeRemaining,
    isActive,
    currentQuestion,
    currentAnswer,
    hasUnsavedChanges,
    isFirstQuestion,
    isLastQuestion,

    // Actions
    setCurrentAnswer,
    setHasUnsavedChanges,
    submitAnswer,
    nextQuestion,
    completeAssessment,
  };
}