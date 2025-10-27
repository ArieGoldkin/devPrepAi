/**
 * Editor Preferences Actions
 * Phase B: Language switching and editor configuration
 */
import type { StateCreator } from "zustand";

import type { IPracticeState, IPracticeActions } from "@/types/store";
import type { TCodeLanguage } from "@modules/assessment/components/AnswerPanel/types";

type PracticeSlice = IPracticeState & IPracticeActions;
type SetFn = Parameters<StateCreator<PracticeSlice>>[0];
type GetFn = Parameters<StateCreator<PracticeSlice>>[1];

export const createEditorActions = (
  set: SetFn,
  _get: GetFn,
): Pick<IPracticeActions, "setLanguage" | "toggleAutocomplete"> => ({
  setLanguage: (language: TCodeLanguage): void => {
    set({ currentLanguage: language });
  },

  toggleAutocomplete: (): void => {
    set((state: PracticeSlice) => ({
      autocompleteEnabled: !state.autocompleteEnabled,
    }));
  },
});
