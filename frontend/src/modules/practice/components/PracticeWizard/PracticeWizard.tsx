import React, { useState } from "react";

import type { InterviewType } from "@/types/ai";
import { getStepNumber } from "@modules/practice/utils";

import { WizardNav } from "./components/WizardNav";
import { WizardNavigation } from "./components/WizardNavigation";
import type { WizardStep, PracticeSettings } from "./constants";
import { TOTAL_STEPS } from "./constants";
import { CompleteSetupStep } from "./steps/CompleteSetupStep";
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
  onSettingsChange,
  onInterviewTypeSelect,
  onStart,
}: IPracticeWizardProps): React.JSX.Element {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    [],
  );

  const { handleNext, handleBack } = WizardNavigation({
    currentStep,
    onStepChange,
  });

  const handleInterviewTypeSelect = (type: InterviewType): void => {
    onInterviewTypeSelect(type);
    handleNext(); // Automatically proceed to profile step
  };

  const handleTechnologiesChange = (technologies: string[]): void => {
    setSelectedTechnologies(technologies);
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
          <CompleteSetupStep
            settings={practiceSettings}
            onSettingsChange={onSettingsChange}
            selectedInterviewType={selectedInterviewType}
            selectedTechnologies={selectedTechnologies}
            onTechnologiesChange={handleTechnologiesChange}
          />
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
