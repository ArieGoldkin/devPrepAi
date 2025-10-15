/**
 * Unified Practice Slice
 * Combines assessment, questions, and session functionality
 * Aligned with clean, minimal UI design
 */
import type { StateCreator } from "zustand";

import type { IPracticeState, IPracticeActions } from "@/types/store";

import { createAnswerActions } from "./actions/answers";
import { createNavigationActions } from "./actions/navigation";
import { createProgressActions } from "./actions/progress";
import { createSessionActions } from "./actions/session";
import { createTimerActions } from "./actions/timer";
import { initialPracticeState } from "./constants";

// === SLICE CREATOR ===
type PracticeSlice = IPracticeState & IPracticeActions;

export const createPracticeSlice: StateCreator<
  PracticeSlice,
  [],
  [],
  PracticeSlice
> = (set, get) => ({
  ...initialPracticeState,

  // Compose all action groups
  ...createSessionActions(set, get),
  ...createNavigationActions(set, get),
  ...createAnswerActions(set, get),
  ...createProgressActions(set, get),
  ...createTimerActions(set, get),
});

// Re-export selectors for backward compatibility
export {
  selectCurrentQuestion,
  selectIsFirstQuestion,
  selectIsLastQuestion,
  selectQuestionProgress,
  selectFormattedTime,
} from "./selectors";
