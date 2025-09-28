"use client";

import React, { useState, useEffect, useCallback } from "react";

import type { IQuestion } from "@/types/ai";
import { cn } from "@shared/utils/cn";

import { HintSystem } from "../../hints/HintSystem";
import { AnswerArea } from "../editors/AnswerArea";
import { MobileNavigation } from "../navigation/MobileNavigation";
import { MobileTabs } from "../navigation/MobileTabs";
import QuestionPanel from "../panels/QuestionPanel";

interface IMobileQuestionLayoutProps {
  question: IQuestion;
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onNavigate?: (direction: "next" | "previous") => void;
  isLastQuestion?: boolean;
  isFirstQuestion?: boolean;
  className?: string;
}

export function MobileQuestionLayout({
  question,
  currentAnswer,
  onAnswerChange,
  onSubmit,
  onNavigate,
  isLastQuestion = false,
  isFirstQuestion = false,
  className,
}: IMobileQuestionLayoutProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<"question" | "answer">("question");

  const handleTabChange = useCallback((tab: "question" | "answer"): void => {
    setActiveTab(tab);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Tab") {
        e.preventDefault();
        setActiveTab((prev) => (prev === "question" ? "answer" : "question"));
      }

      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === "ArrowRight" &&
        !isLastQuestion
      ) {
        e.preventDefault();
        onNavigate?.("next");
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === "ArrowLeft" &&
        !isFirstQuestion
      ) {
        e.preventDefault();
        onNavigate?.("previous");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLastQuestion, isFirstQuestion, onNavigate]);

  const navigationProps = {
    onSubmit,
    isFirstQuestion,
    isLastQuestion,
    ...(onNavigate && { onNavigate }),
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <MobileTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex-1 overflow-hidden">
        {activeTab === "question" ? (
          <div className="h-full overflow-y-auto p-4 space-y-4">
            <QuestionPanel question={question} />
            <HintSystem question={question} questionId={question.id} />
          </div>
        ) : (
          <div className="h-full overflow-hidden">
            <AnswerArea
              question={question}
              value={currentAnswer}
              onChange={onAnswerChange}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </div>

      <MobileNavigation {...navigationProps} />
    </div>
  );
}
