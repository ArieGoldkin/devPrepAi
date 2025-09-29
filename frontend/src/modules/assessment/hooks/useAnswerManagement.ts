import { useState, useEffect, useCallback } from "react";

import type { IQuestion } from "@/types/ai";
import type { IAssessmentAnswer } from "@lib/store/slices/assessmentSlice";
import type { IDraftAnswer } from "@lib/store/slices/questionsSlice/types";

// Helper function to find answer by question ID
function findAnswerByQuestionId(answers: IAssessmentAnswer[], questionId: string): IAssessmentAnswer | undefined {
  return answers.find((answer) => answer.questionId === questionId);
}

// Helper function to find draft by question ID
function findDraftByQuestionId(drafts: IDraftAnswer[], questionId: string): IDraftAnswer | undefined {
  return drafts.find((draft) => draft.questionId === questionId);
}

// Helper function to initialize answer state
function initializeAnswerState(
  currentQuestion: IQuestion | null,
  answers: IAssessmentAnswer[],
  draftAnswers: IDraftAnswer[]
): { answer: string; draft: string; hasAnswered: boolean } {
  if (!currentQuestion) {
    return { answer: "", draft: "", hasAnswered: false };
  }

  const existingAnswer = findAnswerByQuestionId(answers, currentQuestion.id);
  const existingDraft = findDraftByQuestionId(draftAnswers, currentQuestion.id);

  return {
    answer: existingAnswer?.answer || "",
    draft: existingDraft?.draft || "",
    hasAnswered: !!existingAnswer
  };
}

interface IUseAnswerManagementParams {
  currentQuestion: IQuestion | null;
  answers: IAssessmentAnswer[];
  draftAnswers: IDraftAnswer[];
  onAnswerChange?: (questionId: string, answer: string) => void;
  onDraftChange?: (questionId: string, draft: string) => void;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

interface IUseAnswerManagementReturn {
  currentAnswer: string;
  draftAnswer: string;
  hasAnswered: boolean;
  isDirty: boolean;
  isAutoSaving: boolean;
  lastSaved: Date | null;
  handleAnswerChange: (value: string) => void;
  handleDraftChange: (value: string) => void;
  handleSubmitAnswer: (answer?: string) => void;
  handleClearAnswer: () => void;
  getAnswerForQuestion: (questionId: string) => string;
  hasAnswerForQuestion: (questionId: string) => boolean;
}

/**
 * Hook for managing answer state and operations
 * Centralizes answer management logic including drafts and auto-save
 */
export function useAnswerManagement({
  currentQuestion,
  answers,
  draftAnswers,
  onAnswerChange,
  onDraftChange,
  autoSave = true,
  autoSaveDelay = 2000,
}: IUseAnswerManagementParams): IUseAnswerManagementReturn {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [draftAnswer, setDraftAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Initialize state when current question changes
  useEffect(() => {
    const state = initializeAnswerState(currentQuestion, answers, draftAnswers);
    setCurrentAnswer(state.answer);
    setDraftAnswer(state.draft);
    setHasAnswered(state.hasAnswered);
    setIsDirty(false);
  }, [currentQuestion, answers, draftAnswers]);

  // Auto-save logic
  useEffect(() => {
    if (!autoSave || !isDirty || !currentQuestion || !draftAnswer.trim()) return;

    const timeoutId = setTimeout(() => {
      setIsAutoSaving(true);
      onDraftChange?.(currentQuestion.id, draftAnswer);
      setLastSaved(new Date());
      setIsDirty(false);
      setIsAutoSaving(false);
    }, autoSaveDelay);

    return () => clearTimeout(timeoutId);
  }, [draftAnswer, isDirty, currentQuestion, onDraftChange, autoSave, autoSaveDelay]);

  // Answer handlers
  const handleAnswerChange = useCallback((value: string) => {
    setCurrentAnswer(value);
    if (currentQuestion) onAnswerChange?.(currentQuestion.id, value);
  }, [currentQuestion, onAnswerChange]);

  const handleDraftChange = useCallback((value: string) => {
    setDraftAnswer(value);
    setIsDirty(true);
  }, []);

  const handleSubmitAnswer = useCallback((answer?: string) => {
    const finalAnswer = answer || draftAnswer;
    if (!currentQuestion || !finalAnswer.trim()) return;

    setCurrentAnswer(finalAnswer);
    setHasAnswered(true);
    setIsDirty(false);
    onAnswerChange?.(currentQuestion.id, finalAnswer);
  }, [currentQuestion, draftAnswer, onAnswerChange]);

  const handleClearAnswer = useCallback(() => {
    setCurrentAnswer("");
    setDraftAnswer("");
    setHasAnswered(false);
    setIsDirty(false);

    if (currentQuestion) {
      onAnswerChange?.(currentQuestion.id, "");
      onDraftChange?.(currentQuestion.id, "");
    }
  }, [currentQuestion, onAnswerChange, onDraftChange]);

  // Utility functions
  const getAnswerForQuestion = useCallback((questionId: string): string =>
    findAnswerByQuestionId(answers, questionId)?.answer || "", [answers]);


  const hasAnswerForQuestion = useCallback((questionId: string): boolean =>
    !!(findAnswerByQuestionId(answers, questionId)?.answer.trim()), [answers]);

  return {
    currentAnswer,
    draftAnswer,
    hasAnswered,
    isDirty,
    isAutoSaving,
    lastSaved,
    handleAnswerChange,
    handleDraftChange,
    handleSubmitAnswer,
    handleClearAnswer,
    getAnswerForQuestion,
    hasAnswerForQuestion,
  };
}