"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { AssessmentLayout } from "@modules/assessment/components/AssessmentLayout";
import { ErrorBoundary } from "@shared/ui";
import { LoadingSpinner } from "@shared/ui/loading-spinner";
import { useAppStore } from "@store";

export default function AssessmentPage(): React.JSX.Element {
  const router = useRouter();
  const { questions, isActive, assessmentResults } = useAppStore();
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    const hasNoQuestions = questions.length === 0;
    const isNotActive = isActive === false;

    if (isNotActive && hasNoQuestions) {
      router.push("/practice");
    }
  }, [isActive, questions.length, router]);

  const handleAssessmentComplete = async (): Promise<void> => {
    const hasResults = assessmentResults?.length ?? 0;
    if (hasResults === 0) return;

    setIsEvaluating(true);

    try {
      // For now, just redirect to results without additional evaluation
      // TODO: Implement proper assessment evaluation if needed
      router.push("/results");
    } catch (error) {
      console.error("Failed to evaluate assessment:", error);
      router.push("/results");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRedirectToResults = (): void => {
    router.push("/results");
  };

  const hasNoQuestions = questions.length === 0;
  const isNotActive = isActive === false;

  if (isNotActive && hasNoQuestions) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isEvaluating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <LoadingSpinner />
        <h2 className="text-xl font-semibold">Evaluating Your Responses...</h2>
        <p className="text-gray-600 text-center max-w-md">
          Our AI is analyzing your answers and preparing detailed feedback. This
          may take a moment.
        </p>
      </div>
    );
  }

  const hasQuestions = questions.length > 0;
  const onCompleteHandler = hasQuestions
    ? handleAssessmentComplete
    : handleRedirectToResults;

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error("Assessment component error:", { error, errorInfo });
      }}
    >
      <AssessmentLayout onComplete={onCompleteHandler} />
    </ErrorBoundary>
  );
}
