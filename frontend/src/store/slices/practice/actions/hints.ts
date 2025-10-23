/**
 * Hint Management Actions
 * Handles progressive hint storage and retrieval (3 levels)
 */
import type { StateCreator } from "zustand";

import type { IPracticeState, IPracticeActions } from "@/types/store";

type PracticeSlice = IPracticeState & IPracticeActions;
type SetFn = Parameters<StateCreator<PracticeSlice>>[0];
type GetFn = Parameters<StateCreator<PracticeSlice>>[1];

/**
 * Hint data structure
 * Stored per question, per level
 */
export interface IHint {
  questionId: string;
  level: number; // 1, 2, or 3
  content: string;
  requestedAt: string;
}

export const createHintActions = (
  set: SetFn,
  get: GetFn,
): Pick<
  IPracticeActions,
  "saveHint" | "getHintsForQuestion" | "getHintsUsedCount" | "clearHints"
> => ({
  /**
   * Save a hint to the store
   * Organizes hints by questionId → level → hint content
   */
  saveHint: (questionId: string, level: number, content: string): void => {
    const hint: IHint = {
      questionId,
      level,
      content,
      requestedAt: new Date().toISOString(),
    };

    set((state: PracticeSlice) => {
      const newHintsList = new Map(state.hintsList);

      // Get or create hints array for this question
      const questionHints = newHintsList.get(questionId) ?? [];

      // Check if hint at this level already exists
      const existingIndex = questionHints.findIndex((h) => h.level === level);

      if (existingIndex >= 0) {
        // Update existing hint
        questionHints[existingIndex] = hint;
      } else {
        // Add new hint
        questionHints.push(hint);
      }

      newHintsList.set(questionId, questionHints);

      // Update hints used count
      const newHintsUsed = new Map(state.hintsUsed);
      newHintsUsed.set(questionId, questionHints.length);

      return {
        hintsList: newHintsList,
        hintsUsed: newHintsUsed,
      };
    });
  },

  /**
   * Get all hints for a specific question
   * Returns hints sorted by level (1, 2, 3)
   */
  getHintsForQuestion: (questionId: string): IHint[] => {
    const state = get();
    const hints = state.hintsList.get(questionId) ?? [];

    // Sort by level to ensure consistent ordering
    return hints.sort((a, b) => a.level - b.level);
  },

  /**
   * Get count of hints used for a specific question
   * Returns 0 if no hints requested yet
   */
  getHintsUsedCount: (questionId: string): number => {
    const state = get();
    return state.hintsUsed.get(questionId) ?? 0;
  },

  /**
   * Clear all hints (typically on session end)
   * Resets both hintsList and hintsUsed maps
   */
  clearHints: (): void => {
    set({
      hintsList: new Map(),
      hintsUsed: new Map(),
    });
  },
});
