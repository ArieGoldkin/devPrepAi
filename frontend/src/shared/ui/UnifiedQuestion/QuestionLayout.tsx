"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import type { IQuestion } from "@/types/ai";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/utils/cn";

import { AnswerInput } from "./AnswerInput";
import { HintPanel } from "./HintPanel";
import { QuestionDisplay } from "./QuestionDisplay";

// Progress dots component
function ProgressDots({ total, current }: { total: number; current: number }): React.JSX.Element {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, idx) => {
        let colorClass = "bg-muted";
        if (idx === current) colorClass = "bg-primary";
        else if (idx < current) colorClass = "bg-primary/50";
        return (
          <div
            key={idx}
            className={cn("w-2 h-2 rounded-full transition-colors", colorClass)}
          />
        );
      })}
    </div>
  );
}

// Navigation controls component
function NavigationControls({
  onNavigate,
  onSubmit,
  isFirstQuestion,
  isLastQuestion,
  currentAnswer,
}: {
  onNavigate?: ((direction: "next" | "previous" | number) => void) | undefined;
  onSubmit?: (() => void) | undefined;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  currentAnswer: string;
}): React.JSX.Element | null {
  if (!onNavigate && !onSubmit) return null;

  return (
    <div className="flex items-center justify-between pt-4 border-t">
      {onNavigate ? (
        <Button
          variant="outline"
          onClick={() => onNavigate("previous")}
          disabled={isFirstQuestion}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
      ) : (
        <div />
      )}
      <div className="flex gap-2">
        {onSubmit && (
          <Button
            variant="default"
            onClick={onSubmit}
            disabled={!currentAnswer.trim()}
          >
            {isLastQuestion ? "Submit Assessment" : "Submit Answer"}
          </Button>
        )}
        {onNavigate && !isLastQuestion && (
          <Button
            variant="outline"
            onClick={() => onNavigate("next")}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

interface IQuestionLayoutProps {
  // Question data
  question: IQuestion;
  currentAnswer: string;
  onAnswerChange: (value: string) => void;

  // Navigation
  onSubmit?: () => void;
  onNavigate?: (direction: "next" | "previous" | number) => void;
  isFirstQuestion?: boolean;
  isLastQuestion?: boolean;
  currentIndex?: number | undefined;
  totalQuestions?: number | undefined;

  // Features
  showHints?: boolean;
  showAutoSave?: boolean;
  autoSaveStatus?: "idle" | "saving" | "saved" | "error" | "typing";
  isOnline?: boolean;
  lastSaveTime?: number | undefined;
  onHintUsed?: (hintIndex: number) => void;

  // Layout
  variant?: "default" | "assessment" | "practice" | "compact";
  className?: string;
}

// Progress section component
function ProgressSection({
  totalQuestions,
  currentIndex
}: {
  totalQuestions?: number | undefined;
  currentIndex?: number | undefined;
}): React.JSX.Element | null {
  if (totalQuestions === undefined || totalQuestions === 0 || currentIndex === undefined) {
    return null;
  }
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>
        Question {currentIndex + 1} of {totalQuestions}
      </span>
      <ProgressDots total={totalQuestions} current={currentIndex} />
    </div>
  );
}

export function QuestionLayout(props: IQuestionLayoutProps): React.JSX.Element {
  const {
    question, currentAnswer, onAnswerChange, onSubmit, onNavigate,
    isFirstQuestion = false, isLastQuestion = false, currentIndex,
    totalQuestions, showHints = true, showAutoSave = false,
    autoSaveStatus = "idle", isOnline = true, lastSaveTime,
    onHintUsed, variant = "default", className = ""
  } = props;
  const isAssessment = variant === "assessment";
  const hasHints = showHints === true && question.hints !== undefined && question.hints.length > 0;

  return (
    <div className={cn("space-y-6", className)}>
      <ProgressSection totalQuestions={totalQuestions} currentIndex={currentIndex} />
      <QuestionDisplay
        question={question}
        variant={variant === "compact" ? "compact" : "default"}
        showDifficulty={!isAssessment}
        showType={true}
        showTags={variant === "practice"}
      />
      {hasHints && (
        <HintPanel
          hints={question.hints!}
          onHintUsed={onHintUsed}
          maxHints={isAssessment ? 2 : 3}
          showWarning={isAssessment}
        />
      )}
      <AnswerInput
        question={question}
        value={currentAnswer}
        onChange={onAnswerChange}
        {...(onSubmit ? { onSubmit } : {})}
        showAutoSave={showAutoSave}
        autoSaveStatus={autoSaveStatus}
        isOnline={isOnline}
        lastSaveTime={lastSaveTime ?? 0}
      />
      <NavigationControls
        onNavigate={onNavigate}
        onSubmit={onSubmit}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        currentAnswer={currentAnswer}
      />
    </div>
  );
}