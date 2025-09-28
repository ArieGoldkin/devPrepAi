import React from "react";

import type { IQuestion } from "@/types/ai";
import { QuestionLayout } from "@shared/ui/UnifiedQuestion";

interface IQuestionDisplayProps {
  question: IQuestion;
  currentAnswer: string;
  hasAnswered: boolean;
  answerTimeSpent?: number;
  onAnswerChange: (value: string) => void;
  onSubmit?: () => void;
  onNavigate?: (direction: "next" | "previous" | number) => void;
  isLastQuestion?: boolean;
  isFirstQuestion?: boolean;
  currentIndex?: number;
  totalQuestions?: number;
}

export function QuestionDisplay({
  question,
  currentAnswer,
  hasAnswered,
  answerTimeSpent: _answerTimeSpent, // Prefixed with _ to indicate it's intentionally unused
  onAnswerChange,
  onSubmit,
  onNavigate,
  isLastQuestion = false,
  isFirstQuestion = false,
  currentIndex,
  totalQuestions,
}: IQuestionDisplayProps): React.JSX.Element {
  // Use unified QuestionLayout for all question types
  return (
    <QuestionLayout
      question={question}
      currentAnswer={currentAnswer}
      onAnswerChange={onAnswerChange}
      {...(hasAnswered || !onSubmit ? {} : { onSubmit })}
      {...(onNavigate ? { onNavigate } : {})}
      isFirstQuestion={isFirstQuestion}
      isLastQuestion={isLastQuestion}
      currentIndex={currentIndex}
      totalQuestions={totalQuestions}
      showHints={!hasAnswered}
      showAutoSave={true}
      variant="assessment"
      className="animate-slide-up"
    />
  );
}