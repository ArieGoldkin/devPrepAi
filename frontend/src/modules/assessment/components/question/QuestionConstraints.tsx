import React from "react";

import type { IQuestion } from "@/types/ai";

interface IQuestionConstraintsProps {
  constraints: IQuestion["constraints"];
}

export function QuestionConstraints({ constraints }: IQuestionConstraintsProps): React.JSX.Element | null {
  if (!constraints || constraints.length === 0) {
    return null;
  }

  return (
    <div className="bg-amber-50 p-4 rounded-lg mb-4">
      <h4 className="font-medium mb-2 text-body">Constraints:</h4>
      <ul className="list-disc list-inside space-y-1">
        {constraints.map((constraint, index) => (
          <li key={index} className="text-body">
            {constraint}
          </li>
        ))}
      </ul>
    </div>
  );
}