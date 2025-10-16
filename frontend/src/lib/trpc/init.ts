/**
 * tRPC Initialization
 * Core tRPC setup with context typing
 */
import { initTRPC } from "@trpc/server";

import type { Context } from "./context";

/**
 * Initialize tRPC with context
 * This creates the base building blocks for all tRPC functionality
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure builders
 */
export const router = t.router;
export const publicProcedure = t.procedure;
