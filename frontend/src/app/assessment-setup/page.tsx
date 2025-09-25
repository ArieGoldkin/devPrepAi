"use client";

import { useRouter } from "next/navigation";
import type React from "react";

import AssessmentSetup from "@components/features/assessment/AssessmentSetup";
import type { IAssessmentSettings } from "@components/features/assessment/AssessmentSetup";

export default function AssessmentSetupPage(): React.JSX.Element {
  const router = useRouter();

  const handleComplete = (_settings: IAssessmentSettings) => {
    // Navigate to assessment page after settings are saved
    router.push("/assessment");
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <AssessmentSetup onComplete={handleComplete} onBack={handleBack} />
      </div>
    </div>
  );
}
