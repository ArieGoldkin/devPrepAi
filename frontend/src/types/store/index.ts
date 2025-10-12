/**
 * Store Types
 * Central export for all store-related types
 */
import type { IPracticeState, IPracticeActions } from "./practice";
import type { IResultsState, IResultsActions } from "./results";
import type { IStreakState, IStreakActions } from "./streak";
import type { IUserState, IUserActions } from "./user";

// Export all types from each slice
export type { IUserState, IUserActions } from "./user";

export type {
  IPracticeState,
  IPracticeActions,
  IPracticeAnswer,
  IPracticeSettings,
  IPracticeMetrics,
  PracticeMode,
  QuestionType,
  Difficulty,
} from "./practice";

export type { IResultsState, IResultsActions } from "./results";

export type { IStreakState, IStreakActions, IStreakData } from "./streak";

// Combined store type
export type AppStore = IUserState &
  IUserActions &
  IPracticeState &
  IPracticeActions &
  IResultsState &
  IResultsActions &
  IStreakState &
  IStreakActions;
