/**
 * useLanguageSwitching Hook
 * Phase B: Orchestrates language switching with syntax validation
 *
 * Handles:
 * - Syntax incompatibility detection
 * - Warning modal state management
 * - Language switching in Zustand store
 * - Code preservation validation
 */

import { useState, useCallback } from "react";

import type { TCodeLanguage } from "@modules/assessment/components/AnswerPanel/types";
import { useAppStore } from "@store/hooks";

import { useSyntaxDetection } from "./useSyntaxDetection";

/**
 * Warning modal state
 */
interface IWarningModalState {
  open: boolean;
  newLanguage: TCodeLanguage | null;
  warningMessage: string | null;
}

/**
 * Return type for useLanguageSwitching hook
 */
interface IUseLanguageSwitchingReturn {
  currentLanguage: TCodeLanguage;
  handleLanguageChange: (newLanguage: TCodeLanguage) => void;
  warningModal: {
    open: boolean;
    currentLanguage: TCodeLanguage;
    newLanguage: TCodeLanguage;
    warningMessage: string;
    onOpenChange: (open: boolean) => void;
  };
  confirmSwitch: () => void;
  cancelSwitch: () => void;
}

/**
 * useLanguageSwitching Hook
 *
 * Manages language switching with syntax validation and warnings.
 *
 * @param currentCode - The current code in the editor
 * @returns Language switching functions and modal state
 *
 * @example
 * const { handleLanguageChange, warningModal, confirmSwitch, cancelSwitch } = useLanguageSwitching(code);
 *
 * // Triggered when user selects a language
 * handleLanguageChange("python");
 *
 * // Show warning modal if needed
 * <SyntaxWarningModal {...warningModal} onConfirm={confirmSwitch} onCancel={cancelSwitch} />
 */
export function useLanguageSwitching(
  currentCode: string,
): IUseLanguageSwitchingReturn {
  const currentLanguage = useAppStore((state) => state.currentLanguage);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const { detectSyntaxIssues } = useSyntaxDetection();

  // Warning modal state
  const [warningModal, setWarningModal] = useState<IWarningModalState>({
    open: false,
    newLanguage: null,
    warningMessage: null,
  });

  /**
   * Actually switch the language in the store
   */
  const switchLanguage = useCallback(
    (newLanguage: TCodeLanguage): void => {
      setLanguage(newLanguage);
    },
    [setLanguage],
  );

  /**
   * Handle language change request from user
   * Checks for syntax issues and shows warning modal if needed
   */
  const handleLanguageChange = useCallback(
    (newLanguage: TCodeLanguage): void => {
      // Don't switch if already on this language
      if (newLanguage === currentLanguage) {
        return;
      }

      // Check for syntax issues
      const detection = detectSyntaxIssues(
        currentCode,
        newLanguage,
        currentLanguage,
      );

      if (detection.hasIssues && detection.message) {
        // Show warning modal
        setWarningModal({
          open: true,
          newLanguage,
          warningMessage: detection.message,
        });
      } else {
        // No issues, switch immediately
        switchLanguage(newLanguage);
      }
    },
    [currentCode, currentLanguage, detectSyntaxIssues, switchLanguage],
  );

  /**
   * User confirmed the language switch despite warnings
   */
  const confirmSwitch = useCallback((): void => {
    if (warningModal.newLanguage) {
      switchLanguage(warningModal.newLanguage);
    }

    setWarningModal({
      open: false,
      newLanguage: null,
      warningMessage: null,
    });
  }, [warningModal.newLanguage, switchLanguage]);

  /**
   * User cancelled the language switch
   */
  const cancelSwitch = useCallback((): void => {
    setWarningModal({
      open: false,
      newLanguage: null,
      warningMessage: null,
    });
  }, []);

  /**
   * Close the warning modal
   */
  const closeWarningModal = useCallback((open: boolean): void => {
    if (!open) {
      setWarningModal({
        open: false,
        newLanguage: null,
        warningMessage: null,
      });
    }
  }, []);

  return {
    currentLanguage,
    handleLanguageChange,
    warningModal: {
      open: warningModal.open,
      currentLanguage,
      newLanguage: warningModal.newLanguage || currentLanguage,
      warningMessage: warningModal.warningMessage || "",
      onOpenChange: closeWarningModal,
    },
    confirmSwitch,
    cancelSwitch,
  };
}
