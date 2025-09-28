import React from "react";

import type { IQuestion } from "@/types/ai";

interface IQuestionContextProps {
  question: IQuestion;
}

export function QuestionContext({ question }: IQuestionContextProps): React.JSX.Element | null {
  if (!question.content || question.content === "") {
    return null;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h4 className="font-medium mb-2 text-body">Context:</h4>
      <pre className="whitespace-pre-wrap text-body">
        {question.content}
      </pre>
    </div>
  );
}