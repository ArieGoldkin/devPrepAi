/**
 * StatusBar Component
 * Complete control panel with navigation, progress tracking, and timer
 * Features glassmorphism design with sticky positioning
 * Consolidates all assessment controls in one always-visible header
 */

import { ChevronLeft, Loader2 } from "lucide-react";
import React from "react";

import { Button } from "@shared/ui/button";
import { Progress } from "@shared/ui/progress";

import { ProgressDots } from "./ProgressDots";
import { Timer } from "./Timer";

export interface IStatusBarProps {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number | null; // in seconds, null for unlimited
  progress: number; // 0-100 percentage
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isEvaluating?: boolean;
  hasAnswer?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

/**
 * StatusBar Container Component
 * Complete control panel with navigation, progress, and timer
 * Layout: Question (left) | Navigation+Progress (center) | Timer (right)
 * Stays visible when scrolling with glassmorphism styling
 */
export function StatusBar({
  currentQuestion,
  totalQuestions,
  timeRemaining,
  progress,
  isFirstQuestion,
  isLastQuestion,
  isEvaluating = false,
  hasAnswer = false,
  onPrevious,
  onNext,
  onSubmit,
}: IStatusBarProps): React.JSX.Element {
  return (
    <div className="sticky top-0 z-[100] bg-dark-primary/95 border-b border-purple-500/30 backdrop-blur-xl shadow-glow-purple">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Left: Question indicator with animated dots */}
        <ProgressDots current={currentQuestion} total={totalQuestions} />

        {/* Center: Navigation controls with progress bar */}
        <div className="flex-1 flex items-center justify-center gap-3 max-w-3xl">
          {/* Previous button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="gap-1.5 text-purple-300 hover:text-white hover:bg-purple-500/20 shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {/* Progress bar with percentage */}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-xs font-medium text-purple-300 whitespace-nowrap">
              {Math.round(progress)}%
            </span>
            <Progress value={progress} className="flex-1 h-2" />
          </div>

          {/* Next/Submit button */}
          {isLastQuestion ? (
            <Button
              variant="default"
              size="sm"
              onClick={onSubmit}
              disabled={!hasAnswer || isEvaluating}
              className="gap-1.5 shrink-0 bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isEvaluating && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEvaluating ? "Evaluating..." : "Submit"}
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={onNext}
              disabled={!hasAnswer}
              className="shrink-0 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Next
            </Button>
          )}
        </div>

        {/* Right: Countdown timer */}
        <Timer timeRemaining={timeRemaining} />
      </div>
    </div>
  );
}
