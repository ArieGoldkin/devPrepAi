"use client";

import React from "react";

import { AnswerInput } from "@shared/ui/AnswerInput";
import { QuestionCard } from "@shared/ui/QuestionCard";
import { cn } from "@shared/utils/cn";

import { NavigationBar } from "../NavigationBar";
import { ProgressHeader } from "../ProgressHeader";

import { EmptyState } from "./components/EmptyState";
import { LoadingState } from "./components/LoadingState";
import { useAssessmentNavigation } from "./hooks/useAssessmentNavigation";
import { useAssessmentState } from "./hooks/useAssessmentState";

interface IAssessmentLayoutProps {
  onComplete?: () => void;
  className?: string;
}

export function AssessmentLayout({
  onComplete,
  className,
}: IAssessmentLayoutProps): React.JSX.Element {
  // Get all state from custom hook
  const {
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
    setCurrentAnswer,
    setHasUnsavedChanges,
    submitAnswer,
    nextQuestion,
    completeAssessment,
  } = useAssessmentState();

  // Get navigation handlers from custom hook
  const {
    handlePrevious,
    handleNext,
    handleSubmitAssessment,
    handleExit,
    handleAnswerChange,
  } = useAssessmentNavigation({
    currentQuestionIndex,
    hasUnsavedChanges,
    currentAnswer,
    currentQuestion,
    isLastQuestion,
    submitAnswer,
    nextQuestion,
    completeAssessment,
    onComplete,
  });

  // Empty state
  if (!isActive || questions.length === 0) {
    return <EmptyState />;
  }

  // Loading state
  if (!currentQuestion) {
    return <LoadingState />;
  }

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <ProgressHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining ?? 0}
        onExit={handleExit}
      />

      <main className="pt-24 pb-24">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="space-y-8 animate-fade-in">
            <QuestionCard
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              question={currentQuestion}
              showDifficulty={true}
              showTags={true}
              showExamples={true}
            />

            <AnswerInput
              question={currentQuestion}
              value={currentAnswer}
              onChange={(value) => handleAnswerChange(value, setCurrentAnswer, setHasUnsavedChanges)}
              disabled={false}
              autoFocus={true}
            />
          </div>
        </div>
      </main>

      <NavigationBar
        currentQuestion={answers.length}
        totalQuestions={questions.length}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        hasAnswer={currentAnswer.trim().length > 0}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmitAssessment={handleSubmitAssessment}
      />
    </div>
  );
}