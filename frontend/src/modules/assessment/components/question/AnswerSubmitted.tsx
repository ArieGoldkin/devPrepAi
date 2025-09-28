import React from "react";

import { formatTimeSpent } from "../utils/timeUtils";

interface IAnswerSubmittedProps {
  answerTimeSpent: number;
}

export function AnswerSubmitted({ answerTimeSpent }: IAnswerSubmittedProps): React.JSX.Element {
  return (
    <div className="mt-4 p-3 bg-brand-success/10 border border-brand-success/30 rounded-lg animate-fade-in">
      <div className="flex items-center text-brand-success">
        <span className="font-medium text-body">Answer submitted!</span>
        <span className="ml-2 text-caption">
          Time spent: {formatTimeSpent(answerTimeSpent)}
        </span>
      </div>
    </div>
  );
}