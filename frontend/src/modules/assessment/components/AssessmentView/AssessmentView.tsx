"use client";

import React from "react";

import { AssessmentActions } from "../AssessmentActions";
import { AssessmentHeader } from "../AssessmentHeader";
import { QuestionDisplay } from "../QuestionDisplay";
import { TopBar } from "../TopBar";

import { AccessibilityAnnouncements } from "./components/AccessibilityAnnouncements";
import { EmptyQuestionState } from "./components/EmptyQuestionState";
import { useAccessibility } from "./hooks/useAccessibility";
import { useAssessmentHandlers } from "./hooks/useAssessmentHandlers";
import { useKeyboardEvents } from "./hooks/useKeyboardEvents";
import { useNavigation } from "./hooks/useNavigation";

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
    getAnswerTimeSpent,
    getQuestionType,
  } = useAssessmentHandlers(onComplete);

  // Initialize hooks
  useKeyboardEvents({ handleKeyboardShortcuts });
  useAccessibility();

  const { handleNavigate } = useNavigation({
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
          <div className="flex-1 overflow-hidden">
            <QuestionDisplay
              question={currentQuestion}
              currentAnswer={currentAnswer}
              hasAnswered={hasAnswered}
              answerTimeSpent={getAnswerTimeSpent() ?? 0}
              onAnswerChange={handleDraftChange}
              onSubmit={handleSubmitAnswer}
              onNavigate={handleNavigate}
              isLastQuestion={isLastQuestion}
              isFirstQuestion={isFirstQuestion}
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

      {/* WCAG 2.1 AA compliance announcements */}
      <AccessibilityAnnouncements
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        hasAnswered={hasAnswered}
      />
    </div>
  );
}
