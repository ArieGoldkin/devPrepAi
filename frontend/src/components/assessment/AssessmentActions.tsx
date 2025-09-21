import React from "react";

import { Button } from "@components/ui/button";

interface IAssessmentActionsProps {
  answersCount: number;
  totalQuestions: number;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  currentAnswer: string;
  onSubmitAnswer: () => void;
  onNext: () => void;
}

export function AssessmentActions({
  answersCount,
  totalQuestions,
  hasAnswered,
  isLastQuestion,
  currentAnswer,
  onSubmitAnswer,
  onNext,
}: IAssessmentActionsProps): React.JSX.Element {
  return (
    <div className="flex justify-between">
      <div className="text-caption text-gray-500">
        {answersCount} of {totalQuestions} questions answered
      </div>

      <div className="space-x-3">
        {!hasAnswered && (
          <Button
            onClick={onSubmitAnswer}
            disabled={!currentAnswer.trim()}
            variant="outline"
          >
            Submit Answer
          </Button>
        )}

        <Button
          onClick={onNext}
          disabled={!hasAnswered && !currentAnswer.trim()}
          variant="accent"
        >
          {isLastQuestion ? "Complete Assessment" : "Next Question"}
        </Button>
      </div>
    </div>
  );
}
