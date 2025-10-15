"use client";

import React, { useEffect } from "react";

import { AnswerInput } from "@shared/ui/AnswerInput";
import { GradientBackground } from "@shared/ui/GradientBackground";
import { cn } from "@shared/utils/cn";
import { useAppStore } from "@store";

import { useAssessment } from "../hooks/useAssessment";

import { AssessmentHeader } from "./AssessmentHeader";
import {
  ConstraintsSection,
  ExamplesSection,
  QuestionCard,
  QuestionContent,
  QuestionHeader,
  QuestionPanel,
} from "./QuestionPanel";
import { SplitScreenContainer } from "./SplitScreenContainer";
import { StatusBar } from "./StatusBar";

interface IAssessmentLayoutProps {
  onComplete?: () => void;
  className?: string;
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

  return (
    <GradientBackground className={cn("flex flex-col", className)}>
      {/* StatusBar with progress and timer (sticky at top) */}
      <StatusBar
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
      />

      {/* Header with navigation only (no timer) */}
      <AssessmentHeader
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
        progress={progress}
        timeRemaining={null}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        hasAnswer={hasAnswer}
      />

      {/* Main content area with split-screen layout */}
      <main className="flex-1 overflow-hidden p-4">
        <SplitScreenContainer
          questionPanel={
            <QuestionPanel>
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentIndex + 1}
              >
                <QuestionHeader
                  questionNumber={currentIndex + 1}
                  difficulty={currentQuestion.difficulty}
                />
                <QuestionContent
                  title={currentQuestion.title}
                  content={currentQuestion.content}
                />
                {currentQuestion.constraints &&
                  currentQuestion.constraints.length > 0 && (
                    <ConstraintsSection
                      constraints={currentQuestion.constraints}
                    />
                  )}
                {currentQuestion.examples &&
                  currentQuestion.examples.length > 0 && (
                    <ExamplesSection examples={currentQuestion.examples} />
                  )}
              </QuestionCard>
            </QuestionPanel>
          }
          answerPanel={
            <div className="h-full flex flex-col">
              <div className="flex-1 border border-border rounded-lg overflow-hidden shadow-sm">
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
          }
        />
      </main>
    </GradientBackground>
  );
}
