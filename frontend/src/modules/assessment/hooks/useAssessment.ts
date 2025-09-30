"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import type { IQuestion } from "@/types/ai";
import { useAppStore } from "@store";

interface IUseAssessmentReturn {
  // State
  questions: IQuestion[];
  currentQuestion: IQuestion | null;
  currentIndex: number;
  currentAnswer: string;
  answers: Map<string, string>;
  progress: number;
  timeRemaining: number;

  // Flags
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  hasAnswer: boolean;
  isActive: boolean;

  // Handlers
  handlePrevious: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
  handleAnswerChange: (value: string) => void;
}

export function useAssessment(): IUseAssessmentReturn {
  const router = useRouter();

  // Get store state and actions - using flat structure
  const questions = useAppStore((state) => state.questions ?? []);
  const currentIndex = useAppStore((state) => state.currentIndex ?? 0);
  const savedAnswers = useAppStore((state) => state.savedAnswers ?? new Map());
  const isActive = useAppStore((state) => state.isActive ?? false);
  const storeTimeRemaining = useAppStore((state) => state.timeRemaining ?? 0);
  const currentDraft = useAppStore((state) => state.currentDraft ?? "");

  // Store actions
  const goToQuestion = useAppStore((state) => state.goToQuestion);
  const updateDraft = useAppStore((state) => state.updateDraft);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const endSession = useAppStore((state) => state.endSession);

  // Local state for current answer
  const [currentAnswer, setCurrentAnswer] = useState("");

  // Get current question
  const currentQuestion = questions[currentIndex] ?? null;

  // Calculate progress
  const progress =
    questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;

  // Use store time remaining directly
  const timeRemaining = storeTimeRemaining;

  // Flags
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswer = currentAnswer.trim().length > 0;

  // Load saved answer when question changes
  useEffect(() => {
    if (currentQuestion?.id) {
      const savedAnswer = savedAnswers.get(currentQuestion.id);
      if (savedAnswer) {
        setCurrentAnswer(savedAnswer.answer);
      } else if (currentDraft) {
        setCurrentAnswer(currentDraft);
      } else {
        setCurrentAnswer("");
      }
    }
  }, [currentQuestion?.id, savedAnswers, currentDraft]);

  // Handle answer change
  const handleAnswerChange = useCallback(
    (value: string) => {
      setCurrentAnswer(value);
      if (updateDraft !== undefined && updateDraft !== null) {
        updateDraft(value);
      }
    },
    [updateDraft],
  );

  // Handle previous question
  const handlePrevious = useCallback(() => {
    if (isFirstQuestion) return;

    // Save current answer before navigating
    if (saveAnswer !== undefined && saveAnswer !== null && hasAnswer) {
      saveAnswer();
    }

    // Navigate to previous question
    if (goToQuestion !== undefined && goToQuestion !== null) {
      goToQuestion(currentIndex - 1);
    }
  }, [isFirstQuestion, currentIndex, goToQuestion, saveAnswer, hasAnswer]);

  // Handle next question
  const handleNext = useCallback(() => {
    if (isLastQuestion || !hasAnswer) return;

    // Save current answer
    if (saveAnswer !== undefined && saveAnswer !== null) {
      saveAnswer();
    }

    // Navigate to next question
    if (goToQuestion !== undefined && goToQuestion !== null) {
      goToQuestion(currentIndex + 1);
    }

    // Clear local answer for next question
    setCurrentAnswer("");
  }, [isLastQuestion, hasAnswer, currentIndex, goToQuestion, saveAnswer]);

  // Handle assessment submission
  const handleSubmit = useCallback(() => {
    if (!hasAnswer) return;

    // Save final answer
    if (saveAnswer !== undefined && saveAnswer !== null) {
      saveAnswer();
    }

    // End session
    if (endSession !== undefined && endSession !== null) {
      endSession();
    }

    // Navigate to results
    router.push("/results");
  }, [hasAnswer, saveAnswer, endSession, router]);

  // Convert saved answers Map to simple Map<string, string> for return
  const answersMap = new Map<string, string>();
  savedAnswers.forEach((answer, questionId) => {
    answersMap.set(questionId, answer.answer);
  });

  return {
    // State
    questions,
    currentQuestion,
    currentIndex,
    currentAnswer,
    answers: answersMap,
    progress,
    timeRemaining,

    // Flags
    isFirstQuestion,
    isLastQuestion,
    hasAnswer,
    isActive,

    // Handlers
    handlePrevious,
    handleNext,
    handleSubmit,
    handleAnswerChange,
  };
}
