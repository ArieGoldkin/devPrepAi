"use client";

import { Clock, Home, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Button } from "@shared/ui/button";
import Logo from "@shared/ui/logo";
import { Progress } from "@shared/ui/progress";
import { cn } from "@shared/utils/cn";

interface IProgressHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining?: number; // in seconds
  onExit?: () => void;
  className?: string;
}

// Time constants
const SECONDS_PER_MINUTE = 60;
const TIME_WARNING_THRESHOLD = 300; // 5 minutes
const TIMER_INTERVAL = 1000; // 1 second

// Format time in MM:SS
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / SECONDS_PER_MINUTE);
  const secs = seconds % SECONDS_PER_MINUTE;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export function ProgressHeader({
  currentQuestion,
  totalQuestions,
  timeRemaining,
  onExit,
  className,
}: IProgressHeaderProps): React.JSX.Element {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(timeRemaining ?? 0);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === undefined || timeRemaining === null || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, TIMER_INTERVAL);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const progress = totalQuestions > 0
    ? ((currentQuestion - 1) / totalQuestions) * 100
    : 0;

  const handleExit = (): void => {
    if (onExit) {
      onExit();
    } else {
      router.push("/");
    }
  };

  const isTimeLow = timeLeft > 0 && timeLeft < TIME_WARNING_THRESHOLD;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm",
        "border-b border-border",
        "px-6 py-4",
        "z-20",
        className
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-foreground">DevPrep</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Assessment</p>
            </div>
          </div>

          {/* Progress section */}
          <div className="flex-1 max-w-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Progress: {Math.round(progress)}%
                </span>
                {timeRemaining !== undefined && timeRemaining !== null && timeRemaining > 0 && (
                  <div
                    className={cn(
                      "flex items-center gap-1.5",
                      isTimeLow && "text-destructive"
                    )}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono font-medium">
                      {formatTime(timeLeft)}
                    </span>
                    <span className="text-xs text-muted-foreground">remaining</span>
                  </div>
                )}
              </div>
              <Progress
                value={progress}
                className={cn(
                  "h-2",
                  isTimeLow && "bg-destructive/20"
                )}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="hidden sm:flex"
              title="Go to home"
            >
              <Home className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={handleExit}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Assessment</span>
              <span className="sm:hidden">Exit</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}