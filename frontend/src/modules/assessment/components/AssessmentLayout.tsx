"use client";

import React, { useEffect } from "react";

import { AnswerInput } from "@shared/ui/AnswerInput";
import { cn } from "@shared/utils/cn";
import { useAppStore } from "@store";

import { useAssessment } from "../hooks/useAssessment";

import { AssessmentHeader } from "./AssessmentHeader";
import { QuestionDisplay } from "./QuestionDisplay";
import { StatusBar } from "./StatusBar";

interface IAssessmentLayoutProps {
  onComplete?: () => void;
  className?: string;
}

// Type guard to ensure timeLimit is string | undefined (not string | undefined union)
function getTimeLimit(hasTime: boolean): string | undefined {
  return hasTime ? "15 minutes" : undefined;
}

// Empty state component
const EmptyState = (): React.JSX.Element => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-foreground">
        No Active Assessment
      </h2>
      <p className="text-muted-foreground">
        Start a new assessment to begin practicing.
      </p>
    </div>
  </div>
);

export function AssessmentLayout({
  className,
}: IAssessmentLayoutProps): React.JSX.Element {
  // Get all state and handlers from consolidated hook
  const {
    questions,
    currentQuestion,
    currentIndex,
    currentAnswer,
    progress,
    timeRemaining,
    isFirstQuestion,
    isLastQuestion,
    hasAnswer,
    isActive,
    handlePrevious,
    handleNext,
    handleSubmit,
    handleAnswerChange,
  } = useAssessment();

  // Get timer state and actions from store (Task 1.5)
  const { startTimer, stopTimer } = useAppStore();

  // Start timer on mount, stop on unmount (Task 1.5)
  useEffect(() => {
    if (isActive) {
      startTimer();
    }
    return () => {
      stopTimer();
    };
  }, [isActive, startTimer, stopTimer]);

  // Show empty state if no active assessment
  if (!isActive || questions.length === 0 || !currentQuestion) {
    return <EmptyState />;
  }

  // Calculate time limit per question (optional display)
  const timeLimit = getTimeLimit(timeRemaining > 0);

  return (
    <div className={cn("min-h-screen flex flex-col bg-background", className)}>
      {/* StatusBar with progress and timer (Task 1.5) */}
      <StatusBar
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
      />

      {/* Header with navigation and progress */}
      <AssessmentHeader
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
        progress={progress}
        timeRemaining={timeRemaining}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        hasAnswer={hasAnswer}
      />

      {/* Main content area */}
      <main className="flex-1 overflow-auto">
        {/* Question display */}
        <QuestionDisplay
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          question={currentQuestion}
          timeLimit={timeLimit}
        />

        {/* Answer input */}
        <div className="container max-w-4xl mx-auto px-6 pb-8">
          <div className="border border-border rounded-lg overflow-hidden shadow-sm">
            <AnswerInput
              question={currentQuestion}
              value={currentAnswer}
              onChange={handleAnswerChange}
              disabled={false}
              autoFocus={true}
              placeholder="// Write your solution here..."
            />
          </div>
        </div>
      </main>
    </div>
  );
}
