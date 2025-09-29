"use client";

import React from "react";

import { AnswerInput } from "@shared/ui/AnswerInput";
import { QuestionCard } from "@shared/ui/QuestionCard";

import { AssessmentActions } from "../AssessmentActions";
import { AssessmentHeader } from "../AssessmentHeader";
import { TopBar } from "../TopBar";

import { useAccessibility } from "./hooks/useAccessibility";
import { useAssessmentHandlers } from "./hooks/useAssessmentHandlers";
import { useKeyboardEvents } from "./hooks/useKeyboardEvents";
import { useNavigation } from "./hooks/useNavigation";

// Simple empty state component
const EmptyQuestionState = (): React.JSX.Element => (
  <div className="flex items-center justify-center min-h-[400px]">
    <p className="text-muted-foreground">No questions available</p>
  </div>
);

interface IAssessmentViewProps {
  onComplete?: () => void;
}

export function AssessmentView({
  onComplete,
}: IAssessmentViewProps): React.JSX.Element {
  const {
    questions,
    currentQuestion,
    currentQuestionIndex,
    currentAnswer,
    hasAnswered,
    isLastQuestion,
    isFirstQuestion,
    answers,
    draftAnswer,
    handleDraftChange,
    handleSubmitAnswer,
    handleNext,
    handlePrevious,
    handleTimeUp,
    handleAutoSave,
    handleKeyboardShortcuts,
    getQuestionType,
  } = useAssessmentHandlers(onComplete);

  // Initialize hooks
  useKeyboardEvents({ handleKeyboardShortcuts });
  useAccessibility();

  useNavigation({
    isLastQuestion,
    isFirstQuestion,
    handleNext,
    handlePrevious,
  });

  if (!currentQuestion) {
    return <EmptyQuestionState />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Unified Top Bar */}
      <TopBar
        currentAnswer={draftAnswer}
        onAutoSave={() => handleAutoSave(draftAnswer)}
        questionType={getQuestionType()}
        onTimeUp={handleTimeUp}
        currentIndex={currentQuestionIndex}
        totalQuestions={questions.length}
      />

      {/* Main content area */}
      <div className="flex-1 overflow-hidden pt-4">
        <div className="h-full flex flex-col space-y-6 animate-fade-in">
          {/* Assessment Header - now without timer */}
          <AssessmentHeader
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />

          {/* Question Display */}
          <div className="flex-1 overflow-hidden space-y-6">
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              showDifficulty={true}
              showTags={true}
              showExamples={true}
            />
            <AnswerInput
              question={currentQuestion}
              value={draftAnswer}
              onChange={handleDraftChange}
              placeholder="Enter your answer here..."
            />
          </div>

          {/* Assessment Actions - Hidden on mobile for coding questions to avoid duplication */}
          <div className="block md:block lg:block">
            <AssessmentActions
              answersCount={answers.length}
              totalQuestions={questions.length}
              hasAnswered={hasAnswered}
              isLastQuestion={isLastQuestion}
              currentAnswer={currentAnswer}
              onSubmitAnswer={handleSubmitAnswer}
              onNext={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
