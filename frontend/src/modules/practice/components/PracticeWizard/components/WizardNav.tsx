import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

import { Button } from "@shared/ui/button";
import { Progress } from "@shared/ui/progress";

interface IWizardNavProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onContinue: () => void;
  canProceed: boolean;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

export function WizardNav({
  currentStep,
  totalSteps,
  onBack,
  onContinue,
  canProceed,
  isFirstStep = false,
  isLastStep = false,
}: IWizardNavProps): React.JSX.Element {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Grid Layout: Back Button | Progress Bar | Continue Button */}
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 items-center">
        {/* Back Button */}
        <div className="flex justify-start">
          {!isFirstStep && (
            <Button
              onClick={onBack}
              variant="outline"
              className="btn-glass"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
        </div>

        {/* Progress Bar with Step Counter */}
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Progress
              value={progressPercentage}
              className="h-2 bg-glass-surface backdrop-blur-xl"
            />
            <div className="absolute inset-0 rounded-full neon-glow pointer-events-none opacity-50" />
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <Button
            onClick={onContinue}
            disabled={!canProceed}
            className="btn-primary-glass"
            size="sm"
          >
            {isLastStep ? "Start" : "Continue"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
