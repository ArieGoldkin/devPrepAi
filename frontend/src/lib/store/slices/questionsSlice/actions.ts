import type { StateCreator } from "zustand";

import { createAnswerActions } from "./answerActions";
import { createDraftActions } from "./draftActions";
import { createHintActions } from "./hintActions";
import { createNavigationActions } from "./navigationActions";
import { createSessionActions } from "./sessionActions";
import type { IQuestionsState, IQuestionsActions } from "./types";
import { createUtilityActions } from "./utilityActions";

export const createQuestionsActions: StateCreator<
  IQuestionsState & IQuestionsActions,
  [],
  [],
  IQuestionsActions
> = (set, get) => ({
  // === SESSION MANAGEMENT ===
  ...createSessionActions(set, get),

  // === NAVIGATION ===
  ...createNavigationActions(set, get),

  // === ANSWER MANAGEMENT ===
  ...createAnswerActions(set, get),

  // === HINT MANAGEMENT ===
  ...createHintActions(set, get),

  // === UTILITY ACTIONS ===
  ...createUtilityActions(set, get),

  // === DRAFT AND PROGRESSIVE DISCLOSURE ===
  ...createDraftActions(set, get),
});
