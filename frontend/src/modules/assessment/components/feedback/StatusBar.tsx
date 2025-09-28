"use client";

import React from "react";

import { useAppStore } from "@lib/store/useAppStore";
import { MOBILE_BREAKPOINT } from "@shared/constants/ui-constants";
import { Badge } from "@shared/ui/badge";
import { Card, CardContent } from "@shared/ui/card";

import { AutoSaveIndicator } from "./components/AutoSaveIndicator";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts";
import { TimeDisplay } from "./components/TimeDisplay";
import { ValidationIndicator } from "./components/ValidationIndicator";
import { useStatusBarState } from "./hooks/useStatusBarState";

interface IStatusBarProps {
  currentAnswer: string;
  onAutoSave?: (answer: string) => void;
  questionType?: "behavioral" | "system-design" | "coding" | "conceptual";
  className?: string;
}

export function StatusBar({
  currentAnswer,
  onAutoSave,
  questionType = "conceptual",
  className = "",
}: IStatusBarProps): React.JSX.Element {
  const { timeRemaining, hintUsage } = useAppStore();

  const hookParams = {
    currentAnswer,
    questionType,
    ...(onAutoSave && { onAutoSave }),
  };

  const {
    autoSaveStatus,
    validationStatus,
    isOnline,
    lastSaveTime,
  } = useStatusBarState(hookParams);

  // Calculate total hint penalty
  const totalHintPenalty = hintUsage.reduce((total, usage) => total + usage.scorePenalty, 0);

  // Determine if mobile view
  const isMobile = typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

  return (
    <Card className={`border-border ${className}`}>
      <CardContent className="p-4">
        <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-4"}`}>
          {/* Time Display */}
          <div className="flex items-center space-x-2">
            <TimeDisplay
              timeRemaining={timeRemaining}
            />
          </div>

          {/* Auto Save Status */}
          <div className="flex items-center space-x-2">
            <AutoSaveIndicator
              status={autoSaveStatus}
              lastSaveTime={lastSaveTime}
              isOnline={isOnline}
            />
          </div>

          {/* Validation Status */}
          <div className="flex items-center space-x-2">
            <ValidationIndicator
              status={validationStatus}
              questionType={questionType}
            />
          </div>

          {/* Hints & Shortcuts */}
          <div className="flex items-center justify-between space-x-2">
            {totalHintPenalty > 0 && (
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                -{totalHintPenalty} pts
              </Badge>
            )}
            <KeyboardShortcuts />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
