/**
 * StatusBar Component
 * Top-level status bar showing progress and elapsed time during assessment
 * Features glassmorphism design with sticky positioning
 */

import React from "react";

import { ProgressDots } from "./ProgressDots";
import { Timer } from "./Timer";

export interface IStatusBarProps {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number | null; // in seconds, null for unlimited
}

/**
 * StatusBar Container Component
 * Displays progress dots and timer at top of assessment page
 * Stays visible when scrolling with glassmorphism styling
 */
export function StatusBar({
  currentQuestion,
  totalQuestions,
  timeRemaining,
}: IStatusBarProps): React.JSX.Element {
  return (
    <div className="sticky top-0 z-[100] bg-dark-primary/95 border-b border-purple-500/30 backdrop-blur-xl shadow-glow-purple">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Progress indicator with animated dots */}
        <ProgressDots current={currentQuestion} total={totalQuestions} />

        {/* Countdown timer */}
        <Timer timeRemaining={timeRemaining} />
      </div>
    </div>
  );
}
