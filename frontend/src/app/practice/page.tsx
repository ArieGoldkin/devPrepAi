"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import type { InterviewType } from "@/types/ai";
import { generatePracticeQuestions } from "@lib/claude/services/ai";
import {
  PracticeWizard,
  TOTAL_STEPS,
  PROGRESS_MULTIPLIER,
  type WizardStep,
  type PracticeSettings,
} from "@modules/practice/components/PracticeWizard";
import { AppLayout } from "@shared/components/layout/AppLayout";
import { ErrorBoundary } from "@shared/ui";
import { ErrorMessage } from "@shared/ui/ErrorMessage";
import { Progress } from "@shared/ui/progress";
import { useAppStore } from "@store";

export default function PracticePage(): React.JSX.Element {
  const router = useRouter();
  const { userProfile, startSession, recordActivity } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState<WizardStep>("welcome");
  const [selectedInterviewType, setSelectedInterviewType] =
    useState<InterviewType | null>(null);
  const [practiceSettings, setPracticeSettings] = useState<PracticeSettings>({
    duration: 30,
    questionCount: 5,
    difficulty: "medium",
    focusAreas: [],
  });

  useEffect(() => {
    if (!userProfile && currentStep !== "welcome") {
      setCurrentStep("profile");
    }
  }, [userProfile, currentStep]);

  const handleGenerateQuestions = async (): Promise<void> => {
    if (!userProfile) {
      setError("Please complete your profile first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const questions = await generatePracticeQuestions(userProfile);

      if (questions.length === 0) {
        throw new Error("No questions could be generated. Please try again.");
      }

      const SECONDS_PER_MINUTE = 60;
      const sessionSettings = {
        mode: "practice" as const,
        timeLimit: practiceSettings.duration * SECONDS_PER_MINUTE,
        allowSkip: true,
        allowHints: true,
      };

      startSession(questions, sessionSettings);
      recordActivity();
      router.push("/assessment");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to generate questions";
      setError(`Failed to generate practice questions: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const getStepNumber = (): number => {
    switch (currentStep) {
      case "welcome":
        return 1;
      case "profile":
        return 2;
      case "focus":
        return 3;
      case "settings":
        return 4;
      case "ready":
        return 5;
      default:
        return 1;
    }
  };

  return (
    <AppLayout>
      <div className="container-xl py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <Progress
            value={(getStepNumber() / TOTAL_STEPS) * PROGRESS_MULTIPLIER}
            className="h-1 max-w-2xl mx-auto"
          />
        </div>

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
