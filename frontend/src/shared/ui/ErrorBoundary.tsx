import React, { Component, type ReactNode } from "react";

import { ErrorFallback } from "./ErrorFallback";

interface IErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  errorBoundaryStack?: string;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: IErrorInfo | null;
  errorType: "network" | "component" | "api" | "unknown";
  retryCount: number;
}

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: IErrorInfo) => void;
  maxRetries?: number;
  showDetails?: boolean;
}

/**
 * Production-ready ErrorBoundary component for catching and handling React errors
 *
 * Features:
 * - Beautiful fallback UI matching design system
 * - Retry mechanism with exponential backoff
 * - Different error types with appropriate messages
 * - Detailed error logging
 * - Accessibility compliant
 */
export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  private retryTimeouts: number[] = [];

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: "unknown",
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<IErrorBoundaryState> {
    const errorType = ErrorBoundary.categorizeError(error);
    return {
      hasError: true,
      error,
      errorType,
    };
  }

  override componentDidCatch(error: Error, errorInfo: IErrorInfo): void {
    this.setState({ errorInfo });

    // Log detailed error information
    console.error("🚨 ErrorBoundary caught an error", {
      error,
      errorInfo,
      componentStack: errorInfo.componentStack,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, send to error tracking service
    if (process.env.NODE_ENV === "production") {
      // Example: Send to error tracking service
      // errorTracker.captureException(error, { extra: errorInfo });
    }
  }

  override componentWillUnmount(): void {
    // Clear any pending retry timeouts
    this.retryTimeouts.forEach(clearTimeout);
  }

  private static categorizeError(
    error: Error,
  ): IErrorBoundaryState["errorType"] {
    const message = error.message.toLowerCase();

    if (message.includes("network") || message.includes("fetch")) {
      return "network";
    }
    if (message.includes("api") || message.includes("server")) {
      return "api";
    }
    if (message.includes("chunk") || message.includes("loading")) {
      return "network";
    }

    return "component";
  }

  private handleRetry = (): void => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount >= maxRetries) {
      return;
    }

    // Exponential backoff: 1s, 2s, 4s
    const DELAY_MULTIPLIER = 1000;
    const delay = Math.pow(2, retryCount) * DELAY_MULTIPLIER;

    const timeoutId = window.setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: retryCount + 1,
      });
    }, delay);

    this.retryTimeouts.push(timeoutId);
  };

  private handleGoHome = (): void => {
    window.location.href = "/";
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      const { fallback, showDetails = false, maxRetries = 3 } = this.props;
      const { error, errorType, retryCount } = this.state;

      if (fallback !== undefined) {
        return fallback;
      }

      return (
        <ErrorFallback
          error={error}
          errorType={errorType}
          retryCount={retryCount}
          maxRetries={maxRetries}
          showDetails={showDetails}
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * HOC wrapper for ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  wrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<IErrorBoundaryProps, "children">,
): React.ComponentType<P> {
  const Component = wrappedComponent;
  const WithErrorBoundaryComponent = (props: P): React.JSX.Element => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WithErrorBoundaryComponent;
}
