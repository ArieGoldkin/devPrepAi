import { TIME_CONSTANTS } from "@lib/store/constants";

export function formatTimeSpent(seconds: number): string {
  const minutes = Math.floor(seconds / TIME_CONSTANTS.SECONDS_PER_MINUTE);
  const remainingSeconds = seconds % TIME_CONSTANTS.SECONDS_PER_MINUTE;
  return minutes > 0
    ? `${minutes}m ${remainingSeconds}s`
    : `${remainingSeconds}s`;
}