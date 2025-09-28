"use client";

import React from "react";

import { useAppStore } from "@lib/store/useAppStore";

import { useCountdown } from "./hooks/useCountdown";

interface ITimerProps {
  onTimeUp?: () => void;
  className?: string;
}

export function Timer({
  onTimeUp,
  className = "",
}: ITimerProps): React.JSX.Element {
  const { timeRemaining: storeTimeRemaining } = useAppStore();

  const { formattedTime, colorClass } = useCountdown({
    initialTime: storeTimeRemaining,
    onTimeUp: onTimeUp || (() => {}),
  });

  // Extract just the minutes and seconds for the compact display
  const parts = formattedTime.split(":");
  const minutes = parts[1] || "00";
  const seconds = parts[2] || "00";
  const displayTime = `${minutes}:${seconds}`;

  return (
    <div
      className={`font-mono text-headline font-bold ${colorClass} ${className}`}
    >
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
        <span>{displayTime}</span>
      </div>
      <div className="text-caption text-gray-500 mt-1">
        {parseInt(minutes, 10)}m {parseInt(seconds, 10)}s remaining
      </div>
    </div>
  );
}
