import React from "react";

import type { InterviewType } from "@/types/ai";

import { StepIndicator } from "./components/StepIndicator";
import { WizardNavigation } from "./components/WizardNavigation";
import type { WizardStep, PracticeSettings } from "./constants";
import { ProfileStep } from "./steps/ProfileStep";
import { ReadyStep } from "./steps/ReadyStep";
import { WelcomeStep } from "./steps/WelcomeStep";

interface IPracticeWizardProps {
  currentStep: WizardStep;
  userProfile: unknown;
  practiceSettings: PracticeSettings;
  selectedInterviewType: InterviewType | null;
  loading: boolean;
  onStepChange: (step: WizardStep) => void;
  onSettingsChange: (settings: PracticeSettings) => void;
  onInterviewTypeSelect: (type: InterviewType) => void;
  onStart: () => Promise<void>;
}

export function PracticeWizard({
  currentStep,
  userProfile: _userProfile,
  practiceSettings,
  selectedInterviewType,
  loading,
  onStepChange,
  onSettingsChange: _onSettingsChange,
  onInterviewTypeSelect,
  onStart,
}: IPracticeWizardProps): React.JSX.Element {
  const { handleNext, handleBack } = WizardNavigation({
    currentStep,
    onStepChange,
  });

  const handleInterviewTypeSelect = (type: InterviewType): void => {
    onInterviewTypeSelect(type);
    handleNext(); // Automatically proceed to profile step
  };

  return (
    <>
      <StepIndicator currentStep={currentStep} />

      <div className="animate-fade-in">
        {currentStep === "welcome" && (
          <WelcomeStep onNext={handleInterviewTypeSelect} />
        )}
        {currentStep === "profile" && (
          <ProfileStep
            onNext={handleNext}
            onBack={handleBack}
            selectedInterviewType={selectedInterviewType}
          />
        )}
        {currentStep === "setup" && (
          <div className="glass-card p-8">
            <h2 className="gradient-text text-2xl font-bold mb-4">
              Complete Setup (Coming Soon)
            </h2>
            <p className="text-gray-300 mb-6">
              This step will consolidate focus areas and settings configuration.
            </p>
            <div className="flex gap-4">
              <button onClick={handleBack} className="btn-glass">
                Back
              </button>
              <button onClick={handleNext} className="btn-primary-glass">
                Continue
              </button>
            </div>
          </div>
        )}
        {currentStep === "ready" && (
          <ReadyStep
            settings={practiceSettings}
            loading={loading}
            onStart={onStart}
            onBack={handleBack}
          />
        )}
      </div>
    </>
  );
}
