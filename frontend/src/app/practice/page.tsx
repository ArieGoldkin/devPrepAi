"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import type { InterviewType, IGenerateQuestionsRequest } from "@/types/ai";
import { useGenerateQuestionsMutation } from "@lib/claude/hooks";
import {
  PracticeWizard,
  type WizardStep,
  type PracticeSettings,
} from "@modules/practice/components/PracticeWizard";
import { AppLayout } from "@shared/components/layout/AppLayout";
import { ErrorBoundary } from "@shared/ui";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { useAppStore } from "@store";

export default function PracticePage(): React.JSX.Element {
  const router = useRouter();
  const { userProfile, startSession, recordActivity } = useAppStore();
  const [error, setError] = useState("");
  // Always start at "welcome" step to prevent SSR/client hydration mismatch
  // The wizard component handles navigation based on userProfile state
  const [currentStep, setCurrentStep] = useState<WizardStep>("welcome");
  const [selectedInterviewType, setSelectedInterviewType] =
    useState<InterviewType | null>(null);
  const [practiceSettings, setPracticeSettings] = useState<PracticeSettings>({
    duration: 30,
    questionCount: 5,
    difficulty: "medium",
    focusAreas: [],
  });

  const { mutateAsync: generateQuestions, isPending: loading } =
    useGenerateQuestionsMutation();

  const handleGenerateQuestions = async (): Promise<void> => {
    if (!userProfile) {
      setError("Please complete your profile first");
      return;
    }

    setError("");

    try {
      const request: IGenerateQuestionsRequest = {
        profile: userProfile,
        count: practiceSettings.questionCount,
        difficulty: 5,
        type: userProfile.interviewType,
      };

      const response = await generateQuestions(request);

      if (!response.success || (response.data?.questions.length ?? 0) === 0) {
        throw new Error(response.error ?? "No questions generated");
      }

      const SECONDS_PER_MINUTE = 60;
      startSession(response.data.questions, {
        mode: "practice" as const,
        timeLimit: practiceSettings.duration * SECONDS_PER_MINUTE,
        allowSkip: true,
        allowHints: true,
      });

      recordActivity();
      router.push("/assessment");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate questions";
      setError(`Failed to generate practice questions: ${errorMessage}`);
    }
  };

  return (
    <AppLayout>
      <div className="container-xl py-8">
        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <ErrorMessage message={error} onDismiss={() => setError("")} />
          </div>
        )}

        {/* Practice Wizard */}
        <ErrorBoundary
          onError={(error, errorInfo) => {
            console.error("Practice wizard error:", { error, errorInfo });
          }}
        >
          <PracticeWizard
            currentStep={currentStep}
            userProfile={userProfile}
            practiceSettings={practiceSettings}
            selectedInterviewType={selectedInterviewType}
            loading={loading}
            onStepChange={setCurrentStep}
            onSettingsChange={setPracticeSettings}
            onInterviewTypeSelect={setSelectedInterviewType}
            onStart={handleGenerateQuestions}
          />
        </ErrorBoundary>
      </div>
    </AppLayout>
  );
}
