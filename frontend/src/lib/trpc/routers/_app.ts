/**
 * Root tRPC Router
 * Combines all sub-routers into the main application router
 *
 * This is the single source of truth for all tRPC endpoints.
 * The AppRouter type is auto-exported and used by the client for type inference.
 */
import { router } from "../init";

import { aiRouter } from "./ai";

/**
 * Application router
 * All sub-routers are mounted here
 */
export const appRouter = router({
  ai: aiRouter,
  // Future routers can be added here:
  // user: userRouter,
  // analytics: analyticsRouter,
});

/**
 * Export AppRouter type
 * This type is used by tRPC client for end-to-end type safety
 */
export type AppRouter = typeof appRouter;
