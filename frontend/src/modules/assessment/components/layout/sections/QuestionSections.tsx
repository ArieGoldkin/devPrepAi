"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";

import { LegacyQuestionSections } from "./LegacyQuestionSections";
import { QuestionSectionRenderer } from "./QuestionSectionRenderer";
import { parseQuestionSections, hasLegacyData } from "./questionSectionUtils";

interface IQuestionSectionsProps {
  question: IQuestion;
  onSectionToggle: (section: string, isOpen: boolean) => void;
}

export function QuestionSections({
  question,
  onSectionToggle,
}: IQuestionSectionsProps): React.JSX.Element {
  const sections = question.sections || [];
  const { contextSection, examplesSection, constraintsSection, edgeCasesSection } =
    parseQuestionSections(question);

  const showLegacyFallback = hasLegacyData(sections, question);

  return (
    <div className="space-y-3">
      <QuestionSectionRenderer
        contextSection={contextSection}
        examplesSection={examplesSection}
        constraintsSection={constraintsSection}
        edgeCasesSection={edgeCasesSection}
        onSectionToggle={onSectionToggle}
      />

      {/* Legacy Fallback Sections */}
      {showLegacyFallback && <LegacyQuestionSections question={question} />}
    </div>
  );
}