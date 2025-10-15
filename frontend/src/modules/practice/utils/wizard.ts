import type { WizardStep } from "../components/PracticeWizard/constants";

/**
 * Step labels for the practice wizard in display order
 */
export const STEP_LABELS = ["Welcome", "Profile", "Setup", "Ready"] as const;

/**
 * Maps a wizard step to its numeric position (1-indexed)
 */
export function getStepNumber(currentStep: WizardStep): number {
  switch (currentStep) {
    case "welcome":
      return 1;
    case "profile":
      return 2;
    case "setup":
      return 3;
    case "ready":
      return 4;
    default:
      return 1;
  }
}

/**
 * Returns the appropriate neon glow CSS class for a step number
 */
export function getStepGlowClass(stepNumber: number): string {
  switch (stepNumber) {
    case 1:
      return "neon-glow"; // Purple
    case 2:
      return "neon-glow-pink"; // Pink
    case 3:
      return "neon-glow-blue"; // Cyan
    case 4:
      return "neon-glow-green"; // Green
    default:
      return "neon-glow";
  }
}
