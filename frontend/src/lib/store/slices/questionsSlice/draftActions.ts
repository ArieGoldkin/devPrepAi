import type { IDraftAnswer, IProgressiveDisclosure } from "./types";

interface IStoreState {
  draftAnswers: IDraftAnswer[];
  disclosureState: IProgressiveDisclosure[];
}

export const createDraftActions = (set: (partial: Partial<IStoreState>) => void, get: () => IStoreState): {
  updateDraft: (questionId: string, draft: string) => void;
  autoSave: (questionId: string) => void;
  toggleDisclosure: (questionId: string, section: string) => void;
} => ({
  updateDraft: (questionId: string, draft: string): void => {
    const state = get();
    const existingDraftIndex = state.draftAnswers.findIndex(
      (da: IDraftAnswer) => da.questionId === questionId,
    );
    const newDraft: IDraftAnswer = {
      questionId,
      draft,
      updatedAt: new Date().toISOString(),
      autoSaved: false,
    };
    if (existingDraftIndex >= 0) {
      const updatedDrafts = [...state.draftAnswers];
      updatedDrafts[existingDraftIndex] = newDraft;
      set({ draftAnswers: updatedDrafts });
    } else {
      set({ draftAnswers: [...state.draftAnswers, newDraft] });
    }
  },
  autoSave: (questionId: string): void => {
    const state = get();
    const draftIndex = state.draftAnswers.findIndex(
      (da: IDraftAnswer) => da.questionId === questionId,
    );
    if (draftIndex >= 0) {
      const updatedDrafts = [...state.draftAnswers];
      const draft = updatedDrafts[draftIndex];
      if (draft) {
        // Save to localStorage
        const draftKey = `assessment_draft_${questionId}`;
        localStorage.setItem(draftKey, JSON.stringify(draft));
        // Update autoSaved flag
        updatedDrafts[draftIndex] = { ...draft, autoSaved: true };
        set({ draftAnswers: updatedDrafts });
      }
    }
  },
  toggleDisclosure: (questionId: string, section: string): void => {
    const state = get();
    const existingIndex = state.disclosureState.findIndex(
      (ds: IProgressiveDisclosure) => ds.questionId === questionId,
    );
    if (existingIndex >= 0) {
      const updatedDisclosure = [...state.disclosureState];
      const existing = updatedDisclosure[existingIndex];
      if (existing) {
        const expandedSections = existing.expandedSections.includes(section)
          ? existing.expandedSections.filter((s: string) => s !== section)
          : [...existing.expandedSections, section];
        updatedDisclosure[existingIndex] = {
          ...existing,
          expandedSections,
        };
        set({ disclosureState: updatedDisclosure });
      }
    } else {
      const newDisclosure: IProgressiveDisclosure = {
        questionId,
        expandedSections: [section],
      };
      set({ disclosureState: [...state.disclosureState, newDisclosure] });
    }
  },
});
