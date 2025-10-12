import type { StateCreator } from "zustand";

import type { IUserProfile } from "@/types/ai";
import type { IUserState, IUserActions } from "@/types/store";

type UserSlice = IUserState & IUserActions;

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set,
) => ({
  userProfile: null,

  setUserProfile: (profile: IUserProfile): void =>
    set({ userProfile: profile }),

  clearUserProfile: (): void => set({ userProfile: null }),
});

// Selectors
export const selectUserProfile = (state: IUserState): IUserProfile | null =>
  state.userProfile;
