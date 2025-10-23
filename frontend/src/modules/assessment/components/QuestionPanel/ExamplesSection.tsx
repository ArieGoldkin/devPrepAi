import React from "react";

import type { IQuestionExample } from "@/types/ai";

interface IExamplesSectionProps {
  examples?: IQuestionExample[];
}

export const ExamplesSection: React.FC<IExamplesSectionProps> = ({
  examples,
}) => {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
        Examples
      </h4>
      <div className="space-y-3">
        {examples.map((example, index) => (
          <div
            key={index}
            className="rounded-lg p-3 space-y-2"
            style={{ backgroundColor: "rgba(120, 119, 198, 0.05)" }}
          >
            <div>
              <span className="text-xs font-bold text-gray-400">Input:</span>
              <pre className="text-[11px] font-mono text-gray-300 mt-1 whitespace-pre-wrap break-words">
                {example.input}
              </pre>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400">Output:</span>
              <pre className="text-[11px] font-mono text-gray-300 mt-1 whitespace-pre-wrap break-words">
                {example.output}
              </pre>
            </div>
            {example.explanation && (
              <div>
                <span className="text-xs font-bold text-gray-400">
                  Explanation:
                </span>
                <p className="text-[11px] font-mono text-gray-300 mt-1">
                  {example.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
