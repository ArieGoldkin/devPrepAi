/**
 * Timer Component
 * Displays time remaining (countdown) in MM:SS format with clock icon
 * Uses monospace font for consistent alignment
 */

import { Clock } from "lucide-react";
import React from "react";

export interface ITimerProps {
  timeRemaining: number | null; // in seconds, null for unlimited
}

// Time conversion constants
const SECONDS_PER_MINUTE = 60;
const MIN_DIGITS = 2;

/**
 * Format seconds into MM:SS format
 * @param seconds - Total seconds remaining
 * @returns Formatted string (e.g., "5:03", "15:42", "24:31")
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / SECONDS_PER_MINUTE);
  const secs = seconds % SECONDS_PER_MINUTE;
  return `${mins}:${secs.toString().padStart(MIN_DIGITS, "0")}`;
}

/**
 * Timer Component
 * Displays countdown timer with clock icon
 * Shows time remaining or "∞" for unlimited time
 * Updates every second via parent component
 */
export function Timer({ timeRemaining }: ITimerProps): React.JSX.Element {
  const displayTime = timeRemaining !== null ? formatTime(timeRemaining) : "∞";

  return (
    <div className="flex items-center gap-2 text-purple-300">
      <Clock className="w-4 h-4" />
      <span className="text-sm font-mono font-medium">{displayTime}</span>
    </div>
  );
}
