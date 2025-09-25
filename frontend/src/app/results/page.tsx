"use client";

import React, { useEffect, useState } from "react";

import type { IAssessmentResults } from "@/types/ai";
import { EmptyState } from "@components/features/results/EmptyState";
import { ResultCard } from "@components/features/results/ResultCard";
import { Statistics } from "@components/features/results/Statistics";
import { AppLayout } from "@components/layout/AppLayout";
import { ErrorBoundary } from "@components/shared";
import { useAppStore } from "@store/useAppStore";

export default function ResultsPage(): React.JSX.Element {
  const { getRecentResults } = useAppStore();
  const [results, setResults] = useState<IAssessmentResults[]>([]);

  useEffect(() => {
    const recentResults = getRecentResults();
    setResults(recentResults);
  }, [getRecentResults]);

  if (results.length === 0) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Assessment Results</h1>
          <EmptyState />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Assessment Results</h1>
          <ErrorBoundary
            onError={(error, errorInfo) => {
              console.error("Statistics component error:", {
                error,
                errorInfo,
              });
            }}
          >
            <Statistics results={results} />
          </ErrorBoundary>
        </div>

        <div className="space-y-6">
          <ErrorBoundary
            onError={(error, errorInfo) => {
              console.error("Results list error:", { error, errorInfo });
            }}
          >
            {results.map((result, index) => (
              <ResultCard
                key={index}
                result={result}
                index={index}
                totalResults={results.length}
              />
            ))}
          </ErrorBoundary>
        </div>
      </div>
    </AppLayout>
  );
}
