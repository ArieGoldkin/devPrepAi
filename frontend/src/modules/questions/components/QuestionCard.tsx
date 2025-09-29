import React from "react";

import type { IQuestion } from "@/types/ai";
import { QuestionCard as SharedQuestionCard } from "@shared/ui/QuestionCard";

interface IQuestionCardProps {
  question: IQuestion;
  questionNumber?: number;
  totalQuestions?: number;
  onClick?: () => void;
}

export function QuestionCard({
  question,
  questionNumber = 1,
  totalQuestions = 1,
  onClick,
}: IQuestionCardProps): React.ReactElement {
  return (
    <div onClick={onClick} className={onClick ? "cursor-pointer" : ""}>
      <SharedQuestionCard
        question={question}
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        showDifficulty={true}
        showTags={true}
        showExamples={false}
        className="hover:shadow-lg transition-shadow"
      />
    </div>
  );
}