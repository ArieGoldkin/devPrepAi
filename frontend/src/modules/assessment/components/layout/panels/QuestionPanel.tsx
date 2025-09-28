"use client";

import React, { useCallback } from "react";

import { useAppStore } from "@/lib/store/useAppStore";
import { Card, CardContent } from "@/shared/ui/card";
import type { IQuestion } from "@/types/ai";
import { cn } from "@shared/utils/cn";

import { QuestionHeader } from "../sections/QuestionHeader";
import { QuestionSections } from "../sections/QuestionSections";

interface IQuestionPanelProps {
  question: IQuestion;
  className?: string;
}

export default function QuestionPanel({
  question,
  className,
}: IQuestionPanelProps): React.JSX.Element {
  const toggleDisclosure = useAppStore((state) => state.toggleDisclosure);
  const disclosureState = useAppStore((state) => state.disclosureState);

  const currentDisclosure = disclosureState.find(
    (ds) => ds.questionId === question.id
  );

  const handleSectionToggle = useCallback(
    (section: string, isOpen: boolean) => {
      if (isOpen && !currentDisclosure?.expandedSections.includes(section)) {
        toggleDisclosure(question.id, section);
      } else if (!isOpen && currentDisclosure?.expandedSections.includes(section)) {
        toggleDisclosure(question.id, section);
      }
    },
    [question.id, toggleDisclosure, currentDisclosure]
  );

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardContent className="pt-6">
          <QuestionHeader question={question} />
        </CardContent>
      </Card>

      <QuestionSections
        question={question}
        onSectionToggle={handleSectionToggle}
      />
    </div>
  );
}