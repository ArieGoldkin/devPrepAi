"use client";

import React, { useEffect } from "react";

import { AnswerInput } from "@shared/ui/AnswerInput";
import { GradientBackground } from "@shared/ui/GradientBackground";
import { cn } from "@shared/utils/cn";
import { useAppStore } from "@store";

import { useAssessment } from "../hooks/useAssessment";
import { useRequestHint } from "../hooks/useRequestHint";

import { EmptyState } from "./EmptyState";
import { QuestionCardSection } from "./QuestionCardSection";
import {
  HintButton,
  HintDisplay,
  HintsCard,
  QuestionPanel,
} from "./QuestionPanel";
import { SplitScreenContainer } from "./SplitScreenContainer";
import { StatusBar } from "./StatusBar";

interface IAssessmentLayoutProps {
  onComplete?: () => void;
  className?: string;
}

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
    isEvaluating,
    handlePrevious,
    handleNext,
    handleSubmit,
    handleAnswerChange,
  } = useAssessment();

  // Get timer state and actions from store (Task 1.5)
  const { startTimer, stopTimer } = useAppStore();

  // Hint system integration (Task 3.3-3.6)
  const {
    requestHint,
    isLoading: isHintLoading,
    canRequestMore,
  } = useRequestHint(currentQuestion?.id || "");

  // Use store actions to get hints (avoids Map re-render issues)
  const getHintsForQuestion = useAppStore((state) => state.getHintsForQuestion);
  const getHintsUsedCount = useAppStore((state) => state.getHintsUsedCount);

  // Get hint data for current question
  const questionId = currentQuestion?.id || "";
  const hints = getHintsForQuestion(questionId);
  const hintsUsedCount = getHintsUsedCount(questionId);

  // Handle hint request
  const handleRequestHint = (): void => {
    if (currentQuestion && canRequestMore) {
      requestHint(currentQuestion, currentAnswer);
    }
  };

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
    <GradientBackground className={cn("h-screen flex flex-col", className)}>
      {/* StatusBar: Complete control panel with navigation, progress, and timer */}
      <StatusBar
        currentQuestion={currentIndex + 1}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
        progress={progress}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        isEvaluating={isEvaluating}
        hasAnswer={hasAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={() => void handleSubmit()}
      />

      {/*
        Main content area: ALWAYS 100% of available height (viewport - StatusBar)
        - flex-1: Takes all remaining vertical space in flex container
        - min-h-0: Allows flexbox children to shrink below content size
        - overflow-hidden: Prevents page-level scrolling, locks content to viewport
        - This creates the height constraint foundation for all scrolling
      */}
      <main className="flex-1 min-h-0 p-4 overflow-hidden">
        <SplitScreenContainer
          questionPanel={
            <QuestionPanel>
              {/* Question card section - natural size only, no grow/shrink */}
              <div className="flex-none max-h-[65%] overflow-y-auto overflow-x-hidden">
                <QuestionCardSection
                  question={currentQuestion}
                  questionNumber={currentIndex + 1}
                />
              </div>

              {/* Hint system section - constrained to max 60vh to never exceed viewport */}
              <div className="flex-1 min-h-0 max-h-[56vh] flex flex-col overflow-hidden">
                <HintsCard hintsUsed={hintsUsedCount} maxHints={3}>
                  <HintButton
                    onClick={handleRequestHint}
                    isLoading={isHintLoading}
                    hintsUsed={hintsUsedCount}
                    maxHints={3}
                  />

                  {/* Display all hints */}
                  {hints.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {hints.map((hint) => (
                        <HintDisplay
                          key={`${hint.questionId}-${hint.level}`}
                          hint={hint}
                        />
                      ))}
                    </div>
                  )}
                </HintsCard>
              </div>
            </QuestionPanel>
          }
          answerPanel={
            <div className="h-full flex flex-col">
              <AnswerInput
                question={currentQuestion}
                value={currentAnswer}
                onChange={handleAnswerChange}
                disabled={false}
                autoFocus={true}
                placeholder="// Write your solution here..."
              />
            </div>
          }
        />
      </main>
    </GradientBackground>
  );
}
