"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { AssessmentView } from "@components/features/assessment/AssessmentView";
import { AppLayout } from "@components/layout/AppLayout";
import { ErrorBoundary } from "@components/shared";
import { LoadingSpinner } from "@components/ui/loading-spinner";
import { useAppStore } from "@store/useAppStore";

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
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner />
          </div>
        </div>
      </AppLayout>
    );
  }

  if (isEvaluating) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <LoadingSpinner />
            <h2 className="text-xl font-semibold">
              Evaluating Your Responses...
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              Our AI is analyzing your answers and preparing detailed feedback.
              This may take a moment.
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const hasQuestions = questions.length > 0;
  const onCompleteHandler = hasQuestions
    ? handleAssessmentComplete
    : handleRedirectToResults;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Assessment</h1>
        <ErrorBoundary
          onError={(error, errorInfo) => {
            console.error("Assessment component error:", { error, errorInfo });
          }}
        >
          <AssessmentView onComplete={onCompleteHandler} />
        </ErrorBoundary>
      </div>
    </AppLayout>
  );
}
