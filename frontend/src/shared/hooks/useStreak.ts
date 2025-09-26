"use client";

import { useCallback } from "react";

import { useLocalStorage } from "./useLocalStorage";

interface IStreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
}

const STREAK_STORAGE_KEY = "devprep-streak";

const initialStreakData: IStreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
};

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0] || "";
}

function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0] || "";
}

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MILLISECONDS_PER_DAY =
  MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY;

function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / MILLISECONDS_PER_DAY);
}

function calculateNewStreak(
  prevData: IStreakData,
  today: string,
  yesterday: string,
): number {
  const isFirstActivity = !prevData.lastActivityDate;
  const isContinuousStreak = prevData.lastActivityDate === yesterday;
  const daysSinceLastActivity = prevData.lastActivityDate
    ? daysBetween(prevData.lastActivityDate, today)
    : 0;

  let newCurrentStreak = 1;
  if (!isFirstActivity && daysSinceLastActivity <= 1 && isContinuousStreak) {
    newCurrentStreak = prevData.currentStreak + 1;
  }
  return newCurrentStreak;
}

export function useStreak(): {
  recordActivity: () => void;
  getStreakData: () => IStreakData;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
} {
  const [streakData, setStreakData] = useLocalStorage<IStreakData>(
    STREAK_STORAGE_KEY,
    initialStreakData,
  );

  const recordActivity = useCallback(() => {
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    setStreakData((prevData) => {
      if (prevData.lastActivityDate === today) return prevData;

      const newCurrentStreak = calculateNewStreak(prevData, today, yesterday);

      return {
        currentStreak: newCurrentStreak,
        longestStreak: Math.max(prevData.longestStreak, newCurrentStreak),
        lastActivityDate: today,
      };
    });
  }, [setStreakData]);

  const getStreakData = useCallback((): IStreakData => {
    const today = getTodayDateString();
    const shouldResetStreak = Boolean(
      streakData.lastActivityDate &&
        streakData.lastActivityDate !== today &&
        daysBetween(streakData.lastActivityDate, today) > 1,
    );

    if (shouldResetStreak) {
      const resetData = { ...streakData, currentStreak: 0 };
      setStreakData(resetData);
      return resetData;
    }

    return streakData;
  }, [streakData, setStreakData]);

  return {
    recordActivity,
    getStreakData,
    ...getStreakData(),
  };
}
