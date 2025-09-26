"use client";

import React from "react";

import { AssessmentActions } from "../AssessmentActions";
import { AssessmentHeader } from "../AssessmentHeader";
import { QuestionDisplay } from "../QuestionDisplay";

import { EmptyQuestionState } from "./components/EmptyQuestionState";
import { useAssessmentHandlers } from "./hooks/useAssessmentHandlers";

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
    answers,
    handleAnswerChange,
    handleSubmitAnswer,
    handleNext,
    handleTimeUp,
    getAnswerTimeSpent,
  } = useAssessmentHandlers(onComplete);

  if (currentQuestion === null || currentQuestion === undefined) {
    return <EmptyQuestionState />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <AssessmentHeader
        currentIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        onTimeUp={handleTimeUp}
      />
      <QuestionDisplay
        question={currentQuestion}
        currentAnswer={currentAnswer}
        hasAnswered={hasAnswered}
        answerTimeSpent={getAnswerTimeSpent() ?? 0}
        onAnswerChange={handleAnswerChange}
      />
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
  );
}
