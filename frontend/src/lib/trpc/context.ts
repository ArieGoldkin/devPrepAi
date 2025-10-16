/**
 * tRPC Context
 * Creates context for each request (auth, db, etc.)
 *
 * Currently minimal for MVP. Will expand to include:
 * - User session/authentication
 * - Database connection (when added in Phase 2)
 * - Request metadata (IP, user agent, etc.)
 */

/**
 * Create context for each tRPC request
 * This function runs for every API call
 */
export async function createContext(): Promise<Record<string, never>> {
  return {
    // Future: Add user session, database connection, etc.
    // Example: { user: await getUserFromSession(), db: prisma }
  };
}

/**
 * Type inference for context
 * This type is used throughout tRPC procedures
 */
export type Context = Awaited<ReturnType<typeof createContext>>;
