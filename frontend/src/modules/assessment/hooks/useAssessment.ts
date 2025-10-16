"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import type { IQuestion } from "@/types/ai";
import type { IPracticeAnswer } from "@/types/store/practice";
import { useEvaluateAnswer } from "@lib/claude/hooks";
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
  isEvaluating: boolean;

  // Handlers
  handlePrevious: () => void;
  handleNext: () => void;
  handleSubmit: () => Promise<void>;
  handleAnswerChange: (value: string) => void;
}

export function useAssessment(): IUseAssessmentReturn {
  const router = useRouter();

  // Initialize evaluation hook
  const { mutateAsync: evaluateAnswer, isPending: isEvaluating } =
    useEvaluateAnswer();

  // Get store state and actions - using flat structure
  const questions = useAppStore((state) => state.questions ?? []);
  const currentIndex = useAppStore((state) => state.currentIndex ?? 0);
  // Fix: Force Map conversion to handle Zustand serialization
  // When Zustand serializes state, Maps become plain objects {}
  // The ?? operator doesn't trigger for truthy {} values
  const savedAnswers = useAppStore((state) => {
    const stored = state.savedAnswers;
    // Return Map if already Map, otherwise convert object to Map
    return stored instanceof Map
      ? stored
      : new Map<string, IPracticeAnswer>(
          Object.entries(stored ?? {}) as Array<[string, IPracticeAnswer]>,
        );
  });
  const isActive = useAppStore((state) => state.isActive ?? false);
  const storeTimeRemaining = useAppStore((state) => state.timeRemaining ?? 0);
  const currentDraft = useAppStore((state) => state.currentDraft ?? "");

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
      // Add type guard for Map instance before calling .get()
      const savedAnswer: IPracticeAnswer | undefined =
        savedAnswers instanceof Map
          ? savedAnswers.get(currentQuestion.id)
          : undefined;
      // Explicit null check to satisfy @typescript-eslint/strict-boolean-expressions
      if (savedAnswer !== null && savedAnswer !== undefined) {
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
  const handleSubmit = useCallback(async () => {
    if (!hasAnswer) return;

    try {
      // Save final answer
      if (saveAnswer !== undefined && saveAnswer !== null) {
        saveAnswer();
      }

      // Evaluate the current answer
      if (currentQuestion !== null) {
        const response = await evaluateAnswer({
          question: currentQuestion,
          answer: currentAnswer,
        });

        // Save feedback to store
        if (
          response.data?.feedback !== undefined &&
          saveFeedback !== undefined &&
          saveFeedback !== null
        ) {
          saveFeedback(currentQuestion.id, response.data.feedback);
        }
      }

      // End session
      if (endSession !== undefined && endSession !== null) {
        endSession();
      }

      // Navigate to results
      router.push("/results");
    } catch (error) {
      console.error("Failed to submit assessment:", error);
      // Still navigate to results even if evaluation fails
      router.push("/results");
    }
  }, [
    hasAnswer,
    saveAnswer,
    currentQuestion,
    currentAnswer,
    evaluateAnswer,
    saveFeedback,
    endSession,
    router,
  ]);

  // Convert saved answers Map to simple Map<string, string> for return
  // Add Map instance check before forEach to prevent errors
  const answersMap = new Map<string, string>();
  if (savedAnswers instanceof Map) {
    savedAnswers.forEach((answer: IPracticeAnswer, questionId: string) => {
      answersMap.set(questionId, answer.answer);
    });
  }

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
