import { useCallback, useState } from "react";

interface IErrorBoundaryState {
  error: Error | null;
  hasError: boolean;
}

/**
 * Custom hook for programmatic error handling and integration with ErrorBoundary
 *
 * This hook allows components to:
 * - Throw errors that will be caught by ErrorBoundary
 * - Handle errors gracefully with custom logic
 * - Reset error state programmatically
 * - Track error state within components
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { throwError, error, clearError, hasError } = useErrorBoundary();
 *
 *   const handleApiCall = async () => {
 *     try {
 *       await riskyApiCall();
 *     } catch (err) {
 *       throwError(err instanceof Error ? err : new Error('API failed'));
 *     }
 *   };
 *
 *   if (hasError) {
 *     return <div>Component-level error handling</div>;
 *   }
 *
 *   return <div>Normal component content</div>;
 * }
 * ```
 */
export function useErrorBoundary(): {
  error: Error | null;
  hasError: boolean;
  throwError: (error: Error | string) => void;
  clearError: () => void;
  handleError: (error: Error, context?: Record<string, unknown>) => void;
  withErrorBoundary: <T extends unknown[], R>(
    fn: (...args: T) => Promise<R>,
  ) => (...args: T) => Promise<R | null>;
  withErrorBoundarySync: <T extends unknown[], R>(
    fn: (...args: T) => R,
  ) => (...args: T) => R | null;
} {
  const [state, setState] = useState<IErrorBoundaryState>({
    error: null,
    hasError: false,
  });

  /**
   * Throw an error that will be caught by the nearest ErrorBoundary
   * This is useful for programmatically triggering error boundaries
   */
  const throwError = useCallback((error: Error | string) => {
    const errorObject = typeof error === "string" ? new Error(error) : error;

    // Set local state first
    setState({
      error: errorObject,
      hasError: true,
    });

    // Throw the error to be caught by ErrorBoundary
    // We use setTimeout to avoid issues with React's error handling in event handlers
    setTimeout(() => {
      throw errorObject;
    }, 0);
  }, []);

  /**
   * Clear the error state
   * Useful for component-level error recovery
   */
  const clearError = useCallback(() => {
    setState({
      error: null,
      hasError: false,
    });
  }, []);

  /**
   * Handle errors gracefully without throwing to ErrorBoundary
   * Useful for non-critical errors that shouldn't crash the whole component tree
   */
  const handleError = useCallback(
    (
      error: Error | string,
      options?: {
        silent?: boolean;
        logToConsole?: boolean;
      },
    ) => {
      const errorObject = typeof error === "string" ? new Error(error) : error;
      const { silent = false, logToConsole = true } = options || {};

      setState({
        error: errorObject,
        hasError: !silent,
      });

      if (logToConsole) {
        console.error("useErrorBoundary caught error:", errorObject);
      }

      return errorObject;
    },
    [],
  );

  /**
   * Async error handler with automatic error boundary integration
   * Useful for wrapping async operations
   */
  const withErrorBoundary = useCallback(
    <T extends unknown[], R>(fn: (...args: T) => Promise<R>) =>
      async (...args: T): Promise<R | null> => {
        try {
          const result = await fn(...args);
          // Clear any previous errors on success
          if (state.hasError) {
            clearError();
          }
          return result;
        } catch (error) {
          const errorObject =
            error instanceof Error ? error : new Error(String(error));
          throwError(errorObject);
          return null;
        }
      },
    [state.hasError, clearError, throwError],
  );

  /**
   * Sync error handler with automatic error boundary integration
   * Useful for wrapping synchronous operations
   */
  const withErrorBoundarySync = useCallback(
    <T extends unknown[], R>(fn: (...args: T) => R) =>
      (...args: T): R | null => {
        try {
          const result = fn(...args);
          // Clear any previous errors on success
          if (state.hasError) {
            clearError();
          }
          return result;
        } catch (error) {
          const errorObject =
            error instanceof Error ? error : new Error(String(error));
          throwError(errorObject);
          return null;
        }
      },
    [state.hasError, clearError, throwError],
  );

  return {
    // State
    error: state.error,
    hasError: state.hasError,

    // Actions
    throwError,
    clearError,
    handleError,

    // Utilities
    withErrorBoundary,
    withErrorBoundarySync,
  };
}

/**
 * Error boundary context for sharing error state across components
 * This can be used with React Context if you need to share error state
 * across multiple components in a subtree
 */
export type UseErrorBoundaryReturn = ReturnType<typeof useErrorBoundary>;
