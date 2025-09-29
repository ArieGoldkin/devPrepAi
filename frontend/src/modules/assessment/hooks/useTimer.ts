import { useEffect, useState } from "react";

import {
  formatTime,
  isTimeLow,
  INTERVALS
} from "@shared/utils/time";

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
    }, INTERVALS.TIMER);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const isTimeWarning = isTimeLow(timeLeft);

  return {
    timeLeft,
    formatTime,
    isTimeLow: isTimeWarning,
  };
}
