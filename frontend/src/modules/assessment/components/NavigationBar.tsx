"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Button } from "@shared/ui/button";
import { cn } from "@shared/utils/cn";

interface INavigationBarProps {
  currentQuestion: number;
  totalQuestions: number;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  hasAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmitAssessment?: () => void;
  className?: string;
}

export function NavigationBar({
  currentQuestion,
  totalQuestions,
  isFirstQuestion,
  isLastQuestion,
  hasAnswer,
  onPrevious,
  onNext,
  onSubmitAssessment,
  className,
}: INavigationBarProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background border-t border-border",
        "px-6 py-4",
        "z-10",
        className
      )}
    >
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Previous button */}
          <Button
            variant="outline"
            size="default"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {/* Question counter */}
          <div className="text-sm font-medium text-muted-foreground">
            {currentQuestion} of {totalQuestions} questions answered
          </div>

          {/* Next/Submit button */}
          {isLastQuestion && onSubmitAssessment ? (
            <Button
              variant="default"
              size="default"
              onClick={onSubmitAssessment}
              disabled={!hasAnswer}
              className="gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90"
            >
              Submit Assessment
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="default"
              onClick={onNext}
              disabled={!hasAnswer}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}