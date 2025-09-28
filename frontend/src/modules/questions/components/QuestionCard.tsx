import React from "react";

import type { IQuestion } from "@/types/ai";
import { QuestionDisplay } from "@shared/ui/UnifiedQuestion";

interface IQuestionCardProps {
  question: IQuestion;
  onClick?: () => void;
}

export function QuestionCard({
  question,
  onClick,
}: IQuestionCardProps): React.ReactElement {
  return (
    <div onClick={onClick} className={onClick ? "cursor-pointer" : ""}>
      <QuestionDisplay
        question={question}
        variant="compact"
        showDifficulty={true}
        showType={true}
        showTags={true}
      />
    </div>
  );
}