"use client";

import { Info, Code, AlertCircle, Lightbulb } from "lucide-react";
import React from "react";

import type { IQuestionSection } from "@/types/ai";

import { CollapsibleSection } from "./CollapsibleSection";

interface IQuestionSectionRendererProps {
  contextSection: IQuestionSection | null | undefined;
  examplesSection: IQuestionSection | null | undefined;
  constraintsSection: IQuestionSection | null | undefined;
  edgeCasesSection: IQuestionSection | null | undefined;
  onSectionToggle: (section: string, isOpen: boolean) => void;
}

export function QuestionSectionRenderer({
  contextSection,
  examplesSection,
  constraintsSection,
  edgeCasesSection,
  onSectionToggle,
}: IQuestionSectionRendererProps): React.JSX.Element {
  return (
    <>
      {/* Context Section */}
      {contextSection !== null && contextSection !== undefined && (
        <CollapsibleSection
          title="Context"
          icon={<Info className="w-4 h-4" />}
          defaultOpen={false}
          priority="medium"
          onToggle={(isOpen) => onSectionToggle("context", isOpen)}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: contextSection.content }} />
          </div>
        </CollapsibleSection>
      )}

      {/* Examples Section */}
      {examplesSection !== null && examplesSection !== undefined && (
        <CollapsibleSection
          title="Examples"
          icon={<Code className="w-4 h-4" />}
          defaultOpen={true}
          priority="high"
          onToggle={(isOpen) => onSectionToggle("examples", isOpen)}
        >
          <div className="space-y-3">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: examplesSection.content }} />
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Constraints Section */}
      {constraintsSection !== null && constraintsSection !== undefined && (
        <CollapsibleSection
          title="Constraints"
          icon={<AlertCircle className="w-4 h-4" />}
          defaultOpen={false}
          priority="medium"
          onToggle={(isOpen) => onSectionToggle("constraints", isOpen)}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: constraintsSection.content }} />
          </div>
        </CollapsibleSection>
      )}

      {/* Edge Cases Section */}
      {edgeCasesSection !== null && edgeCasesSection !== undefined && (
        <CollapsibleSection
          title="Edge Cases"
          icon={<Lightbulb className="w-4 h-4" />}
          defaultOpen={false}
          priority="low"
          onToggle={(isOpen) => onSectionToggle("edge-cases", isOpen)}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: edgeCasesSection.content }} />
          </div>
        </CollapsibleSection>
      )}
    </>
  );
}
