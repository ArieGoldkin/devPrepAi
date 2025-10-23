"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import type { InterviewType } from "@/types/ai";
import { trpc } from "@lib/trpc/Provider";
import {
  PracticeWizard,
  type WizardStep,
  type PracticeSettings,
} from "@modules/practice/components/PracticeWizard";
import { AppLayout } from "@shared/components/layout/AppLayout";
import { ErrorBoundary } from "@shared/ui";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { useAppStore } from "@store";

const SECONDS_PER_MINUTE = 60;

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

  // tRPC mutation hook - auto-generated with type safety
  const { mutateAsync: generateQuestions, isPending: loading } =
    trpc.ai.generateQuestions.useMutation();

  const handleGenerateQuestions = async (): Promise<void> => {
    if (!userProfile) {
      setError("Please complete your profile first");
      return;
    }

    setError("");

    try {
      // tRPC automatically validates input with Zod schemas
      const response = await generateQuestions({
        profile: userProfile,
        count: practiceSettings.questionCount,
        difficulty: 5,
        type: userProfile.interviewType,
      });

      // tRPC returns data directly (no .success wrapper)
      if (response.questions.length === 0) {
        throw new Error("No questions generated");
      }

      startSession(response.questions, {
        mode: "practice" as const,
        timeLimit: practiceSettings.duration * SECONDS_PER_MINUTE,
        allowSkip: true,
        allowHints: true,
      });

      recordActivity();
      router.push("/assessment");
    } catch (err) {
      // tRPC errors are thrown, not returned in response.error
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
