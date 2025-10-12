"use client";

import { ChevronLeft, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@shared/ui/button";
import { Progress } from "@shared/ui/progress";
import { cn } from "@shared/utils/cn";

interface IAssessmentHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number; // 0-100
  timeRemaining?: number | null; // in seconds
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  hasAnswer?: boolean;
  className?: string;
}

// Time formatting constants
const SECONDS_PER_MINUTE = 60;
const PAD_LENGTH = 2;
const PAD_CHAR = "0";
const LOW_TIME_THRESHOLD = 300; // 5 minutes
const TIMER_INTERVAL = 1000;

// Helper: Format seconds as MM:SS
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / SECONDS_PER_MINUTE);
  const secs = seconds % SECONDS_PER_MINUTE;
  return `${mins}:${secs.toString().padStart(PAD_LENGTH, PAD_CHAR)}`;
}

// Helper: Check if time is defined and positive
function hasValidTime(time?: number | null): boolean {
  return time !== undefined && time !== null && time > 0;
}

// Sub-component: Timer Display
interface ITimerDisplayProps {
  timeLeft: number;
  isTimeLow: boolean;
}

function TimerDisplay({
  timeLeft,
  isTimeLow,
}: ITimerDisplayProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm font-medium whitespace-nowrap",
        isTimeLow && "text-destructive",
      )}
    >
      <Clock className="w-4 h-4" />
      {formatTime(timeLeft)}
    </div>
  );
}

export function AssessmentHeader({
  progress,
  timeRemaining,
  isFirstQuestion,
  isLastQuestion,
  onPrevious,
  onNext,
  onSubmit,
  hasAnswer = false,
  className,
}: IAssessmentHeaderProps): React.JSX.Element {
  const [timeLeft, setTimeLeft] = useState(timeRemaining ?? 0);

  // Timer countdown effect
  useEffect(() => {
    if (!hasValidTime(timeRemaining)) return;

    setTimeLeft(timeRemaining as number);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, TIMER_INTERVAL);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const isTimeLow = timeLeft > 0 && timeLeft < LOW_TIME_THRESHOLD;

  return (
    <header
      className={cn(
        "border-b border-border bg-background",
        "sticky top-0 z-50",
        className,
      )}
    >
      <div className="container max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Previous button */}
          <Button
            variant="ghost"
            size="default"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="gap-2 min-w-[100px]"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {/* Progress + Timer */}
          <div className="flex-1 flex items-center justify-center gap-6">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              {Math.round(progress)}% complete
            </span>

            <Progress value={progress} className="w-full max-w-xs h-2" />

            {hasValidTime(timeRemaining) && (
              <TimerDisplay timeLeft={timeLeft} isTimeLow={isTimeLow} />
            )}
          </div>

          {/* Submit/Next button */}
          {isLastQuestion ? (
            <Button
              variant="default"
              size="default"
              onClick={onSubmit}
              disabled={!hasAnswer}
              className="min-w-[100px]"
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="default"
              size="default"
              onClick={onNext}
              disabled={!hasAnswer}
              className="min-w-[100px]"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
