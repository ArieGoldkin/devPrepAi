import type * as React from "react";
import { useState } from "react";

import type { IQuestion } from "@/types/ai";
import { Button } from "@components/ui/button";

import { QuestionCard } from "./QuestionCard";

interface IQuestionListProps {
  questions: IQuestion[];
  currentIndex?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onQuestionChange?: (index: number) => void | undefined;
}

const EmptyState = ({ message }: { message: string }): React.ReactElement => (
  <div className="flex items-center justify-center py-12">
    <p className="text-muted-foreground">{message}</p>
  </div>
);

const getIndicatorClass = (index: number, activeIndex: number): string => {
  const baseClass = "w-2 h-2 rounded-full transition-colors";
  if (index === activeIndex) return `${baseClass} bg-primary`;
  if (index < activeIndex) return `${baseClass} bg-primary/50`;
  return `${baseClass} bg-muted`;
};

const QuestionIndicator = ({
  questions,
  activeIndex,
  onQuestionChange,
  setLocalIndex,
}: {
  questions: IQuestion[];
  activeIndex: number;
  onQuestionChange?: (index: number) => void | undefined;
  setLocalIndex: (index: number) => void;
}): React.ReactElement => {
  const handleQuestionClick = (index: number): void => {
    if (onQuestionChange) {
      onQuestionChange(index);
    } else {
      setLocalIndex(index);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Question {activeIndex + 1} of {questions.length}
      </div>
      <div className="flex gap-1">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleQuestionClick(index)}
            className={getIndicatorClass(index, activeIndex)}
            aria-label={`Go to question ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const NavigationButtons = ({
  activeIndex,
  questionsLength,
  onPrevious,
  onNext,
}: {
  activeIndex: number;
  questionsLength: number;
  onPrevious: () => void;
  onNext: () => void;
}): React.ReactElement => {
  const shouldShowCounter = questionsLength > 1;

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={activeIndex === 0}
      >
        Previous
      </Button>
      <div className="text-xs text-muted-foreground">
        {shouldShowCounter && `${activeIndex + 1} / ${questionsLength}`}
      </div>
      <Button
        variant="outline"
        onClick={onNext}
        disabled={activeIndex === questionsLength - 1}
      >
        Next
      </Button>
    </div>
  );
};

export function QuestionList({
  questions,
  currentIndex = 0,
  onNext,
  onPrevious,
  onQuestionChange,
}: IQuestionListProps): React.ReactElement {
  const [localIndex, setLocalIndex] = useState(currentIndex);

  // Use controlled index if provided, otherwise use local state
  const activeIndex = onQuestionChange ? currentIndex : localIndex;

  const handleNext = (): void => {
    if (onNext && onQuestionChange) {
      onNext();
    } else {
      setLocalIndex(Math.min(activeIndex + 1, questions.length - 1));
    }
  };

  const handlePrevious = (): void => {
    if (onPrevious && onQuestionChange) {
      onPrevious();
    } else {
      setLocalIndex(Math.max(activeIndex - 1, 0));
    }
  };

  if (!questions?.length) {
    return <EmptyState message="No questions available" />;
  }

  const currentQuestion = questions[activeIndex];
  if (!currentQuestion) {
    return <EmptyState message="Question not found" />;
  }

  return (
    <div className="space-y-6">
      {/* @ts-expect-error TypeScript exactOptionalPropertyTypes is too strict here */}
      <QuestionIndicator
        questions={questions}
        activeIndex={activeIndex}
        onQuestionChange={onQuestionChange}
        setLocalIndex={setLocalIndex}
      />

      <QuestionCard question={currentQuestion} />

      <NavigationButtons
        activeIndex={activeIndex}
        questionsLength={questions.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
