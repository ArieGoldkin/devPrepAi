"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import type { IPracticeAnswer } from "@/types/store/practice";
import { trpc } from "@lib/trpc/Provider";
import { useAppStore } from "@store";

import { useSubmitHandler } from "./handlers";
import type { IUseAssessmentReturn } from "./types";

export function useAssessment(): IUseAssessmentReturn {
  const router = useRouter();

  // Initialize evaluation hook (tRPC)
  const { mutateAsync: evaluateAnswer, isPending: isEvaluating } =
    trpc.ai.evaluateAnswer.useMutation();

  // Get store state and actions - using flat structure
  const questions = useAppStore((state) => state.questions ?? []);
  const currentIndex = useAppStore((state) => state.currentIndex ?? 0);
  const isActive = useAppStore((state) => state.isActive ?? false);
  const storeTimeRemaining = useAppStore((state) => state.timeRemaining ?? 0);

  // Store actions
  const goToQuestion = useAppStore((state) => state.goToQuestion);
  const updateDraft = useAppStore((state) => state.updateDraft);
  const saveAnswer = useAppStore((state) => state.saveAnswer);
  const saveFeedback = useAppStore((state) => state.saveFeedback);
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
      // Get values directly from store to avoid dependency issues
      const state = useAppStore.getState();
      const stored = state.savedAnswers;
      const savedAnswersMap =
        stored instanceof Map
          ? stored
          : new Map<string, IPracticeAnswer>(
              Object.entries(stored ?? {}) as Array<[string, IPracticeAnswer]>,
            );

      const savedAnswer = savedAnswersMap.get(currentQuestion.id);
      const draft = state.currentDraft ?? "";

      if (savedAnswer !== null && savedAnswer !== undefined) {
        setCurrentAnswer(savedAnswer.answer);
      } else if (draft) {
        setCurrentAnswer(draft);
      } else {
        setCurrentAnswer("");
      }
    }
  }, [currentQuestion?.id]);

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

  // Handle assessment submission - extracted to handlers.ts
  const handleSubmit = useSubmitHandler({
    hasAnswer,
    currentQuestion,
    currentAnswer,
    saveAnswer,
    evaluateAnswer,
    saveFeedback,
    endSession,
    router,
  });

  // Convert saved answers Map to simple Map<string, string> for return
  const answersMap = new Map<string, string>();
  const state = useAppStore.getState();
  const stored = state.savedAnswers;
  const savedAnswersMap =
    stored instanceof Map
      ? stored
      : new Map<string, IPracticeAnswer>(
          Object.entries(stored ?? {}) as Array<[string, IPracticeAnswer]>,
        );

  savedAnswersMap.forEach((answer: IPracticeAnswer, questionId: string) => {
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
    isEvaluating,

    // Handlers
    handlePrevious,
    handleNext,
    handleSubmit,
    handleAnswerChange,
  };
}
