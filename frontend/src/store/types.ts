/**
 * Store Type Definitions
 * Centralized TypeScript interfaces for the entire store
 */

// Re-export commonly used types from AI types
export type { IUserProfile } from "@/types/ai";

// Re-export slice types
export type { IUserState, IUserActions } from "./slices/userSlice";

export type {
  IPracticeState,
  IPracticeActions,
  IPracticeAnswer,
  IPracticeSettings,
  IPracticeMetrics,
  PracticeMode,
  QuestionType,
  Difficulty,
} from "./slices/practiceSlice";

export type { IResultsState, IResultsActions } from "./slices/resultsSlice";

export type {
  IStreakState,
  IStreakActions,
  IStreakData,
} from "./slices/streakSlice";

// Combined store types using intersection - importing locally to avoid circular dependency
import type { IPracticeState, IPracticeActions } from "./slices/practiceSlice";
import type { IResultsState, IResultsActions } from "./slices/resultsSlice";
import type { IStreakState, IStreakActions } from "./slices/streakSlice";
import type { IUserState, IUserActions } from "./slices/userSlice";

export type AppStore = IUserState &
  IUserActions &
  IPracticeState &
  IPracticeActions &
  IResultsState &
  IResultsActions &
  IStreakState &
  IStreakActions;
