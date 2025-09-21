import { CheckCircle2 } from "lucide-react";
import React from "react";

import type { WizardStep } from "./constants";
import { TOTAL_STEPS } from "./constants";

interface IStepIndicatorProps {
  currentStep: WizardStep;
}

export function StepIndicator({
  currentStep,
}: IStepIndicatorProps): React.JSX.Element {
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

  const renderStepIcon = (
    stepNumber: number,
    _isActive: boolean,
    isCompleted: boolean,
  ): React.ReactNode => {
    if (isCompleted) {
      return <CheckCircle2 className="h-5 w-5" />;
    }
    return stepNumber;
  };

  const getStepClasses = (isActive: boolean, isCompleted: boolean): string => {
    if (isActive) {
      return "bg-primary text-primary-foreground shadow-md";
    }
    if (isCompleted) {
      return "bg-brand-success text-white";
    }
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
      {["Welcome", "Profile", "Focus", "Settings", "Ready"].map(
        (step, index) => {
          const stepNumber = index + 1;
          const isActive = getStepNumber() === stepNumber;
          const isCompleted = getStepNumber() > stepNumber;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                  ${getStepClasses(isActive, isCompleted)}
                `}
                >
                  {renderStepIcon(stepNumber, isActive, isCompleted)}
                </div>
                <span
                  className={`text-xs ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  {step}
                </span>
              </div>
              {index < TOTAL_STEPS - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${isCompleted ? "bg-brand-success" : "bg-muted"}`}
                />
              )}
            </React.Fragment>
          );
        },
      )}
    </div>
  );
}
