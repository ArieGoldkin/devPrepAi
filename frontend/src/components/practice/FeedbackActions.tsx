import type React from "react";

import { Button } from "@components/ui/button";

interface IFeedbackActionsProps {
  onTryAgain: () => void;
  onNext: () => void;
  onFinish: () => void;
  isLastQuestion: boolean;
}

export const FeedbackActions = ({
  onTryAgain,
  onNext,
  onFinish,
  isLastQuestion,
}: IFeedbackActionsProps): React.ReactElement => (
  <div className="flex gap-2 justify-center pt-4 animate-fade-in">
    <Button onClick={onTryAgain} variant="outline" size="sm">
      Try Again
    </Button>
    {isLastQuestion ? (
      <Button onClick={onFinish} size="sm" variant="accent">
        Finish Practice
      </Button>
    ) : (
      <Button onClick={onNext} size="sm" variant="accent">
        Next Question
      </Button>
    )}
  </div>
);
