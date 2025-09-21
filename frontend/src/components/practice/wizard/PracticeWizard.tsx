import React, { useState } from "react";

import type { InterviewType } from "@/types/ai";

import type { WizardStep, PracticeSettings } from "./constants";
import { FocusStep } from "./FocusStep";
import { ProfileStep } from "./ProfileStep";
import { ReadyStep } from "./ReadyStep";
import { SettingsStep } from "./SettingsStep";
import { StepIndicator } from "./StepIndicator";
import { WelcomeStep } from "./WelcomeStep";
import { WizardNavigation } from "./WizardNavigation";

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
        {currentStep === "focus" && (
          <FocusStep
            onNext={handleNext}
            onBack={handleBack}
            selectedInterviewType={selectedInterviewType}
            onTechnologiesChange={handleTechnologiesChange}
            selectedTechnologies={selectedTechnologies}
          />
        )}
        {currentStep === "settings" && (
          <SettingsStep
            settings={practiceSettings}
            onSettingsChange={onSettingsChange}
            onNext={handleNext}
            onBack={handleBack}
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
