import type React from "react";

import type { IAnswerFeedback } from "@/types/ai";
import { FeedbackCard } from "@modules/results/components/feedback/FeedbackCard";

import { FeedbackActions } from "./FeedbackActions";

interface IFeedbackSectionProps {
  feedback: IAnswerFeedback;
  questionTitle: string;
  onTryAgain: () => void;
  onNext: () => void;
  onFinish: () => void;
  isLastQuestion: boolean;
}

export const FeedbackSection = ({
  feedback,
  questionTitle,
  onTryAgain,
  onNext,
  onFinish,
  isLastQuestion,
}: IFeedbackSectionProps): React.ReactElement => (
  <div className="space-y-4 animate-fade-in">
    <FeedbackCard feedback={feedback} questionTitle={questionTitle} />
    <FeedbackActions
      onTryAgain={onTryAgain}
      onNext={onNext}
      onFinish={onFinish}
      isLastQuestion={isLastQuestion}
    />
  </div>
);
