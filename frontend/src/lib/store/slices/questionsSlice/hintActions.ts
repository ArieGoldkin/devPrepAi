import type { IHintUsage } from "./types";

// Hint penalty values for each level
const HINT_PENALTIES = {
  1: 5,
  2: 10,
  3: 15,
  4: 20,
} as const;

interface IStoreState {
  hintUsage: IHintUsage[];
  totalHintPenalty: number;
}

export const createHintActions = (set: (partial: Partial<IStoreState>) => void, get: () => IStoreState): {
  revealHint: (questionId: string, hintIndex: number) => void;
  calculateHintPenalty: () => number;
} => ({
  revealHint: (questionId: string, hintIndex: number): void => {
    const state = get();
    const existingHintIndex = state.hintUsage.findIndex(
      (hu: IHintUsage) => hu.questionId === questionId,
    );
    // Calculate penalty for this hint level (1-indexed)
    const hintLevel = hintIndex + 1;
    const penalty = HINT_PENALTIES[hintLevel as keyof typeof HINT_PENALTIES] || 0;
    if (existingHintIndex >= 0) {
      const updatedHintUsage = [...state.hintUsage];
      const existing = updatedHintUsage[existingHintIndex];
      if (existing && !existing.hintsRevealed.includes(hintIndex)) {
        const newScorePenalty = existing.scorePenalty + penalty;
        updatedHintUsage[existingHintIndex] = {
          ...existing,
          hintsRevealed: [...existing.hintsRevealed, hintIndex],
          revealedAt: [...existing.revealedAt, new Date().toISOString()],
          scorePenalty: newScorePenalty,
        };
        set({
          hintUsage: updatedHintUsage,
          totalHintPenalty: state.totalHintPenalty + penalty,
        });
      }
    } else {
      set({
        hintUsage: [
          ...state.hintUsage,
          {
            questionId,
            hintsRevealed: [hintIndex],
            revealedAt: [new Date().toISOString()],
            scorePenalty: penalty,
          },
        ],
        totalHintPenalty: state.totalHintPenalty + penalty,
      });
    }
  },
  calculateHintPenalty: (): number => {
    const state = get();
    return state.totalHintPenalty;
  },
});
