import React from "react";

import type { IQuestion } from "@/types/ai";

interface IQuestionEdgeCasesProps {
  edgeCases: IQuestion["edgeCases"];
}

export function QuestionEdgeCases({ edgeCases }: IQuestionEdgeCasesProps): React.JSX.Element | null {
  if (!edgeCases || edgeCases.length === 0) {
    return null;
  }

  return (
    <div className="bg-purple-50 p-4 rounded-lg mb-4">
      <h4 className="font-medium mb-2 text-body">Edge Cases to Consider:</h4>
      <ul className="list-disc list-inside space-y-1">
        {edgeCases.map((edgeCase, index) => (
          <li key={index} className="text-body">
            {edgeCase}
          </li>
        ))}
      </ul>
    </div>
  );
}