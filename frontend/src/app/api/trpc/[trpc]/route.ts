/**
 * tRPC API Route Handler
 * Next.js 15 App Router integration for tRPC
 *
 * This route handles all tRPC requests at /api/trpc/*
 * It bridges the tRPC router with Next.js API routes.
 */
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createContext } from "@lib/trpc/context";
import { appRouter } from "@lib/trpc/routers/_app";

/**
 * tRPC request handler
 * Processes both GET and POST requests
 *
 * @param req - Next.js Request object
 * @returns Response with tRPC data or error
 */
const handler = (req: Request): Promise<Response> =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

/**
 * Export handlers for Next.js App Router
 * Supports both GET (queries) and POST (mutations)
 */
export { handler as GET, handler as POST };
