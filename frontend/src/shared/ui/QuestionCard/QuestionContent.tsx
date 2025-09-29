"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";

interface IQuestionContentProps {
  question: IQuestion;
  showExamples?: boolean;
}

export function QuestionContent({
  question,
  showExamples = true,
}: IQuestionContentProps): React.JSX.Element {
  return (
    <div className="space-y-4">
      {/* Question content */}
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p className="text-base leading-relaxed text-foreground">
          {question.content}
        </p>
      </div>

      {/* Constraints */}
      {question.constraints && question.constraints.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">
            Constraints:
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {question.constraints.map((constraint, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-0.5 text-primary">•</span>
                <span>{constraint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Examples */}
      {showExamples && question.examples && question.examples.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Examples:</h3>
          {question.examples.map((example, index) => (
            <div key={index} className="rounded-lg bg-muted/50 p-4 space-y-2">
              <div className="space-y-1.5 font-mono text-sm">
                <div className="flex items-start">
                  <span className="text-muted-foreground mr-2">Input:</span>
                  <span className="text-foreground">{example.input}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-muted-foreground mr-2">Output:</span>
                  <span className="text-foreground">{example.output}</span>
                </div>
              </div>
              {example.explanation && (
                <p className="text-xs text-muted-foreground mt-2">
                  {example.explanation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
