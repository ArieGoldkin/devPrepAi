"use client";

import { Code, AlertCircle } from "lucide-react";
import React from "react";

import type { IQuestion } from "@/types/ai";

import { CollapsibleSection } from "./CollapsibleSection";

interface ILegacyQuestionSectionsProps {
  question: IQuestion;
}

export function LegacyQuestionSections({
  question,
}: ILegacyQuestionSectionsProps): React.JSX.Element {
  return (
    <>
      {question.examples !== null && question.examples !== undefined && (
        <CollapsibleSection
          title="Examples"
          icon={<Code className="w-4 h-4" />}
          defaultOpen={true}
          priority="high"
        >
          <div className="space-y-3">
            {question.examples.map((example, index) => (
              <div key={index} className="border rounded-lg p-3 bg-muted/50">
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Input:</span>{" "}
                    <span className="text-foreground">{example.input}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Output:</span>{" "}
                    <span className="text-foreground">{example.output}</span>
                  </div>
                  {example.explanation !== null && example.explanation !== undefined && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {question.constraints !== null && question.constraints !== undefined && (
        <CollapsibleSection
          title="Constraints"
          icon={<AlertCircle className="w-4 h-4" />}
          defaultOpen={false}
          priority="medium"
        >
          <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
            {question.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}
    </>
  );
}
