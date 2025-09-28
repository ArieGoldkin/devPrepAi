import type { StoreApi } from "zustand";

import type { ISessionState, ISessionActions } from "../types";

import { answerActions } from "./answers";
import { lifecycleActions } from "./lifecycle";
import { navigationActions } from "./navigation";

type SessionStore = ISessionState & ISessionActions;

export const createSessionActions = (
  set: StoreApi<SessionStore>["setState"],
  get: StoreApi<SessionStore>["getState"]
): ISessionActions => ({
  ...lifecycleActions(set, get),
  ...navigationActions(set, get),
  ...answerActions(set, get),
});
