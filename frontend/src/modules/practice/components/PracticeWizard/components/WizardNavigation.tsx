import type { WizardStep } from "../constants";

interface IWizardNavigationProps {
  currentStep: WizardStep;
  onStepChange: (step: WizardStep) => void;
}

export function WizardNavigation({
  currentStep,
  onStepChange,
}: IWizardNavigationProps): {
  handleNext: () => void;
  handleBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
} {
  const handleNext = (): void => {
    switch (currentStep) {
      case "welcome":
        onStepChange("profile");
        break;
      case "profile":
        onStepChange("setup");
        break;
      case "setup":
        onStepChange("ready");
        break;
      default:
        break;
    }
  };

  const handleBack = (): void => {
    switch (currentStep) {
      case "profile":
        onStepChange("welcome");
        break;
      case "setup":
        onStepChange("profile");
        break;
      case "ready":
        onStepChange("setup");
        break;
      default:
        break;
    }
  };

  const canGoNext = currentStep !== "ready";
  const canGoBack = currentStep !== "welcome";

  return {
    handleNext,
    handleBack,
    canGoNext,
    canGoBack,
  };
}
