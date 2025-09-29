import { useEffect, useState } from "react";

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

interface IUseTimerReturn {
  timeLeft: number;
  formatTime: (seconds: number) => string;
  isTimeLow: boolean;
}

export function useTimer(timeRemaining?: number): IUseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(timeRemaining ?? 0);

  // Timer countdown
  useEffect(() => {
    if (
      timeRemaining === undefined ||
      timeRemaining === null ||
      timeRemaining <= 0
    )
      return;

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

  const isTimeLow = timeLeft > 0 && timeLeft < TIME_WARNING_THRESHOLD;

  return {
    timeLeft,
    formatTime,
    isTimeLow,
  };
}
