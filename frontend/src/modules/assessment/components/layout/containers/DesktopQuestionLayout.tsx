"use client";

import React, { useState, useEffect } from "react";

import type { IQuestion } from "@/types/ai";
import { cn } from "@shared/utils/cn";

import { AnswerArea } from "../editors/AnswerArea";
import { DesktopNavigation } from "../navigation/DesktopNavigation";
import { CollapsibleQuestionPanel } from "../panels/CollapsibleQuestionPanel";
import { ResizeHandle } from "../panels/ResizeHandle";

interface IDesktopQuestionLayoutProps {
  question: IQuestion;
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onNavigate?: (direction: "next" | "previous") => void;
  isLastQuestion?: boolean;
  isFirstQuestion?: boolean;
  className?: string;
}

export function DesktopQuestionLayout({
  question,
  currentAnswer,
  onAnswerChange,
  onSubmit,
  onNavigate,
  isLastQuestion = false,
  isFirstQuestion = false,
  className,
}: IDesktopQuestionLayoutProps): React.JSX.Element {
  const [isQuestionPanelCollapsed, setIsQuestionPanelCollapsed] =
    useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
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
      <div className="flex-1 flex">
        <CollapsibleQuestionPanel
          question={question}
          isCollapsed={isQuestionPanelCollapsed}
          onExpandClick={() => setIsQuestionPanelCollapsed(false)}
        />

        <ResizeHandle />

        <div className="flex-1 flex flex-col bg-background">
          {isQuestionPanelCollapsed && (
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-b"
              onClick={() => setIsQuestionPanelCollapsed(false)}
              aria-label="Expand question panel"
            >
              Show Question Panel
            </button>
          )}
          <div className="flex-1 overflow-hidden">
            <AnswerArea
              question={question}
              value={currentAnswer}
              onChange={onAnswerChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>

      <DesktopNavigation {...navigationProps} />
    </div>
  );
}
