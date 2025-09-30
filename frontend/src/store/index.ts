/**
 * Store Main Export
 * Central export point for store hooks and types
 */

// Export the main store hook
export { useAppStore } from "./hooks";

// Export specialized hooks
export {
  useUser,
  usePractice,
  useResults,
  useStreak,
  useTimer,
  useNavigation,
} from "./hooks";

// Export types
export type {
  AppStore,
  // User types
  IUserState,
  IUserActions,
  // Practice types
  IPracticeState,
  IPracticeActions,
  IPracticeAnswer,
  IPracticeSettings,
  IPracticeMetrics,
  PracticeMode,
  QuestionType,
  Difficulty,
  // Results types
  IResultsState,
  IResultsActions,
  // Streak types
  IStreakState,
  IStreakActions,
  IStreakData,
} from "./types";

// Export constants
export * from "./constants";

// Export store instance (for testing or special cases)
export { appStore } from "./createStore";
