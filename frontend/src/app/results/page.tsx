"use client";

import React, { useEffect, useState } from "react";

import type { IAssessmentResults } from "@/types/ai";
import { ResultsDisplay } from "@modules/results/components/ResultsDisplay";
import { AppLayout } from "@shared/components/layout/AppLayout";
import { useAppStore } from "@store";

export default function ResultsPage(): React.JSX.Element {
  const { getRecentResults } = useAppStore();
  const [results, setResults] = useState<IAssessmentResults[]>([]);

  useEffect(() => {
    const recentResults = getRecentResults();
    setResults(recentResults);
  }, [getRecentResults]);

  // Get the most recent assessment results (or undefined if none)
  const mostRecentResults = results.length > 0 ? results[0] : undefined;

  return (
    <AppLayout>
      <ResultsDisplay assessmentResults={mostRecentResults} />
    </AppLayout>
  );
}
