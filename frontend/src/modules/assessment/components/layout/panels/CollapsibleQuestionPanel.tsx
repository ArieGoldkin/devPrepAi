"use client";

import React from "react";

import type { IQuestion } from "@/types/ai";
import { cn } from "@shared/utils/cn";

import { HintSystem } from "../../hints/HintSystem";

import QuestionPanel from "./QuestionPanel";

interface ICollapsibleQuestionPanelProps {
  question: IQuestion;
  isCollapsed: boolean;
  onExpandClick: () => void;
}

export function CollapsibleQuestionPanel({
  question,
  isCollapsed,
}: ICollapsibleQuestionPanelProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "bg-background border-r overflow-y-auto transition-all duration-300",
        isCollapsed ? "w-0" : "w-2/5"
      )}
    >
      {!isCollapsed && (
        <div className="h-full p-6">
          <div className="space-y-6">
            <QuestionPanel question={question} />
            <HintSystem
              question={question}
              questionId={question.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
