// CODED BY: LUCCAS EASTMAN
"use client";

import React, { ErrorInfo, ReactNode } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"; // Using shadcn Alert

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackRender?: ({
    error,
    resetErrorBoundary,
  }: {
    error: Error;
    resetErrorBoundary: () => void;
  }) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  /**
   * Updates state when an error is caught.
   * @param {Error} error - The caught error.
   * @returns {Partial<ErrorBoundaryState>} - New state with error information.
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  /**
   * Logs error information and updates state with error details.
   * @param {Error} error - The caught error.
   * @param {ErrorInfo} errorInfo - Additional error information.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
    // Optionally, send error details to an external logging service here.
  }

  /**
   * Resets the error boundary state, allowing the component tree to re-render.
   */
  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided, else default fallback
      if (this.props.fallbackRender) {
        return this.props.fallbackRender({
          error: this.state.error as Error,
          resetErrorBoundary: this.resetErrorBoundary,
        });
      }

      return (
        <Alert variant="destructive">
          <AlertTitle>Oops! Something went wrong.</AlertTitle>
          <AlertDescription>
            An unexpected error occurred. Please try again later.
            <button
              onClick={this.resetErrorBoundary}
              className="underline ml-2"
            >
              Try to reload
            </button>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
