import { Save, Wifi, WifiOff } from "lucide-react";
import React from "react";

import { MS_PER_SECOND, SECONDS_PER_MINUTE } from "@shared/constants/time";
import { Badge } from "@shared/ui/badge";

import type { AutoSaveStatus } from "./utils/autoSaveUtils";
import { getAutoSaveStatusColor, getAutoSaveStatusText } from "./utils/autoSaveUtils";

interface IAutoSaveIndicatorProps {
  status: AutoSaveStatus;
  isOnline: boolean;
  lastSaveTime?: number | undefined;
}

export function AutoSaveIndicator({
  status,
  isOnline,
  lastSaveTime,
}: IAutoSaveIndicatorProps): React.JSX.Element {
  const formatLastSaveTime = (): string => {
    if (lastSaveTime === null || lastSaveTime === undefined) return "";
    const now = Date.now();
    const secondsAgo = Math.floor((now - lastSaveTime) / MS_PER_SECOND);

    if (secondsAgo < SECONDS_PER_MINUTE) return `${secondsAgo}s ago`;
    const minutesAgo = Math.floor(secondsAgo / SECONDS_PER_MINUTE);
    return `${minutesAgo}m ago`;
  };

  const getStatusIcon = (): React.JSX.Element => {
    if (!isOnline) {
      return <WifiOff className="w-4 h-4 text-red-600" />;
    }

    if (status === "saving") {
      return <Save className="w-4 h-4 text-blue-600 animate-pulse" />;
    }

    return <Wifi className="w-4 h-4 text-green-600" />;
  };

  const getStatusText = (): string => {
    if (!isOnline) return "Offline";

    const baseText = getAutoSaveStatusText(status);
    const timeText = formatLastSaveTime();

    return timeText ? `${baseText} (${timeText})` : baseText;
  };

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-2 px-3 py-1 ${getAutoSaveStatusColor(status)}`}
    >
      {getStatusIcon()}
      <span className="text-sm font-medium">{getStatusText()}</span>
    </Badge>
  );
}