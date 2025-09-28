"use client";

import { AlertTriangle } from "lucide-react";
import React from "react";

import { HINT_TIMING_THRESHOLD, DEFAULT_QUESTION_TIME } from "@shared/constants/ui-constants";

interface IHintTimingWarningProps {
  timeRemaining: number;
  hintsDisabled: boolean;
  formatTime: (seconds: number) => string;
}


export function HintTimingWarning({
  timeRemaining,
  hintsDisabled,
  formatTime,
}: IHintTimingWarningProps): React.JSX.Element | null {
  if (!hintsDisabled) {
    return null;
  }

  const totalTime = DEFAULT_QUESTION_TIME;
  const timeElapsed = totalTime - timeRemaining;

  return (
    <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <AlertTriangle className="h-4 w-4 text-blue-600" />
      <p className="text-sm text-blue-700">
        Hints will be available after {formatTime(HINT_TIMING_THRESHOLD - timeElapsed)}
        to encourage independent thinking.
      </p>
    </div>
  );
}
