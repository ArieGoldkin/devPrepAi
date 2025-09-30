import type { StateCreator } from "zustand";

import type { IUserProfile } from "@/types/ai";

export interface IUserState {
  userProfile: IUserProfile | null;
}

export interface IUserActions {
  setUserProfile: (profile: IUserProfile) => void;
  clearUserProfile: () => void;
}

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
