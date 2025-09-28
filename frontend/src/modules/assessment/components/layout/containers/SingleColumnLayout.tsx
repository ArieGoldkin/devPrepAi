"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";
import { cn } from "@shared/utils/cn";

import { HintSystem } from "../../hints/HintSystem";
import { AnswerArea } from "../editors/AnswerArea";
import QuestionPanel from "../panels/QuestionPanel";

interface ISingleColumnLayoutProps {
  question: IQuestion;
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onNavigate?: (direction: "next" | "previous") => void;
  isLastQuestion?: boolean;
  isFirstQuestion?: boolean;
  className?: string;
}

export function SingleColumnLayout({
  question,
  currentAnswer,
  onAnswerChange,
  onSubmit,
  className,
}: ISingleColumnLayoutProps): React.JSX.Element {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <QuestionPanel question={question} />
          <HintSystem question={question} questionId={question.id} />
          <AnswerArea
            question={question}
            value={currentAnswer}
            onChange={onAnswerChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
