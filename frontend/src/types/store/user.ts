/**
 * User Store Types
 */
import type { IUserProfile } from "@/types/ai";

export interface IUserState {
  userProfile: IUserProfile | null;
}

export interface IUserActions {
  setUserProfile: (profile: IUserProfile) => void;
  clearUserProfile: () => void;
}
