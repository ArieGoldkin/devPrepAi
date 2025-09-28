import { Timer as TimerIcon } from "lucide-react";
import React from "react";

import { TIME_CONSTANTS } from "@lib/store/constants";
import { SECONDS_PER_MINUTE } from "@shared/constants/time";
import { Badge } from "@shared/ui/badge";

interface ITimeDisplayProps {
  timeRemaining: number;
}

export function TimeDisplay({
  timeRemaining,
}: ITimeDisplayProps): React.JSX.Element {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / TIME_CONSTANTS.SECONDS_PER_MINUTE);
    const remainingSeconds = seconds % TIME_CONSTANTS.SECONDS_PER_MINUTE;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getTimeColor = (): string => {
    const WARNING_THRESHOLD_CRITICAL = SECONDS_PER_MINUTE; // 1 minute
    const WARNING_THRESHOLD_MEDIUM = 5 * SECONDS_PER_MINUTE; // 5 minutes

    if (timeRemaining <= WARNING_THRESHOLD_CRITICAL) return "bg-red-50 text-red-700 border-red-200";
    if (timeRemaining <= WARNING_THRESHOLD_MEDIUM) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="outline"
        className={`flex items-center gap-2 px-3 py-1 ${getTimeColor()}`}
      >
        <TimerIcon className="w-4 h-4" />
        <span className="text-sm font-medium">
          {formatTime(timeRemaining)}
        </span>
      </Badge>
    </div>
  );
}