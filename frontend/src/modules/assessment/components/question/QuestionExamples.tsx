import React from "react";

import type { IQuestion } from "@/types/ai";

interface IQuestionExamplesProps {
  examples: IQuestion["examples"];
}

export function QuestionExamples({ examples }: IQuestionExamplesProps): React.JSX.Element | null {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <h4 className="font-medium mb-2 text-body">Examples:</h4>
      <div className="space-y-2">
        {examples.map((example, index) => (
          <div key={index} className="text-body">
            <div>
              <strong>Input:</strong> <code>{example.input}</code>
              <br />
              <strong>Output:</strong> <code>{example.output}</code>
              {example.explanation && (
                <>
                  <br />
                  <strong>Explanation:</strong> {example.explanation}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}