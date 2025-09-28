"use client";

import { ChevronRight, Settings } from "lucide-react";
import React, { useState } from "react";

import type { SessionMode, ISessionSettings } from "@/lib/store/slices/sessionSlice";
import { Button } from "@shared/ui/button";

import { ProgressIndicator } from './components/ProgressIndicator';
import { DifficultyStep } from './steps/DifficultyStep';
import { ModeSelectionStep } from './steps/ModeSelectionStep';
import { ReviewStep } from './steps/ReviewStep';
import { SettingsStep } from './steps/SettingsStep';

interface ISessionSetupProps {
  onStart: (settings: Partial<ISessionSettings>) => void;
  onCancel?: () => void;
  defaultMode?: SessionMode;
}

type SetupStep = "mode" | "difficulty" | "settings" | "ready";

export function SessionSetup({
  onStart,
  onCancel,
  defaultMode = "practice",
}: ISessionSetupProps): React.JSX.Element {
  const [currentStep, setCurrentStep] = useState<SetupStep>("mode");
  const [settings, setSettings] = useState<Partial<ISessionSettings>>({
    mode: defaultMode,
    questionCount: 5,
    difficulty: 5,
    duration: 30,
    allowHints: true,
    allowSkip: true,
    autoSave: true,
    showTimer: false,
    autoSubmit: false,
  });

  const steps: SetupStep[] = ["mode", "difficulty", "settings", "ready"];
  const stepIndex = steps.indexOf(currentStep);

  const handleNext = (): void => {
    if (stepIndex < steps.length - 1) {
      const nextStep = steps[stepIndex + 1];
      if (nextStep) {
        setCurrentStep(nextStep);
      }
    }
  };

  const handleBack = (): void => {
    if (stepIndex > 0) {
      const prevStep = steps[stepIndex - 1];
      if (prevStep) {
        setCurrentStep(prevStep);
      }
    }
  };

  const handleStart = (): void => {
    onStart(settings);
  };

  const updateSettings = (updates: Partial<ISessionSettings>): void => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const renderCurrentStep = (): React.JSX.Element | null => {
    switch (currentStep) {
      case "mode":
        return <ModeSelectionStep settings={settings} onUpdate={updateSettings} />;
      case "difficulty":
        return <DifficultyStep settings={settings} onUpdate={updateSettings} />;
      case "settings":
        return <SettingsStep settings={settings} onUpdate={updateSettings} />;
      case "ready":
        return <ReviewStep settings={settings} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <ProgressIndicator steps={steps} currentStep={stepIndex} />
      {renderCurrentStep()}

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={stepIndex > 0 ? handleBack : onCancel}
        >
          {stepIndex > 0 ? "Back" : "Cancel"}
        </Button>

        {currentStep !== "ready" ? (
          <Button onClick={handleNext} className="gap-2">
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleStart} className="gap-2">
            <Settings className="w-4 h-4" />
            Start Session
          </Button>
        )}
      </div>
    </div>
  );
}