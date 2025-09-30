/**
 * Streak Store Types
 */
export interface IStreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
}

export interface IStreakState {
  streak: IStreakData;
}

export interface IStreakActions {
  recordActivity: () => void;
  getStreakData: () => IStreakData;
}
