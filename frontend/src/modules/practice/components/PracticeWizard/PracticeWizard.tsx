import React from "react";

import type { InterviewType } from "@/types/ai";
import { getStepNumber } from "@modules/practice/utils";

import { WizardNav } from "./components/WizardNav";
import { WizardNavigation } from "./components/WizardNavigation";
import type { WizardStep, PracticeSettings } from "./constants";
import { TOTAL_STEPS } from "./constants";
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

  const currentStepNumber = getStepNumber(currentStep);
  const canProceed = selectedInterviewType !== null;

  return (
    <>
      <WizardNav
        currentStep={currentStepNumber}
        totalSteps={TOTAL_STEPS}
        onBack={handleBack}
        onContinue={handleNext}
        canProceed={canProceed}
        isFirstStep={currentStep === "welcome"}
        isLastStep={currentStep === "ready"}
      />

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
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h2 className="gradient-text text-2xl font-bold mb-4">
              Complete Setup (Coming Soon)
            </h2>
            <p className="text-gray-300">
              This step will consolidate focus areas and settings configuration.
            </p>
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
