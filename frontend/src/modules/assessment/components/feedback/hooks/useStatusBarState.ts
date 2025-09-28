import { useState, useEffect, useRef } from "react";

import type { AutoSaveStatus } from "../utils/autoSaveUtils";
import { AUTO_SAVE_INTERVAL, TYPING_DEBOUNCE } from "../utils/autoSaveUtils";
import type { ValidationStatus } from "../utils/validationUtils";
import { validateAnswer } from "../utils/validationUtils";

interface IUseStatusBarStateParams {
  currentAnswer: string;
  onAutoSave?: (answer: string) => void;
  questionType: "behavioral" | "system-design" | "coding" | "conceptual";
}

interface IUseStatusBarStateReturn {
  autoSaveStatus: AutoSaveStatus;
  validationStatus: ValidationStatus;
  isOnline: boolean;
  lastSaveTime: number;
}

export function useStatusBarState({
  currentAnswer,
  onAutoSave,
  questionType,
}: IUseStatusBarStateParams): IUseStatusBarStateReturn {
  const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>("saved");
  const [lastSavedAnswer, setLastSavedAnswer] = useState<string>(currentAnswer);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>("empty");

  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveTimeRef = useRef<number>(Date.now());

  // Online/offline detection
  useEffect(() => {
    const handleOnline = (): void => setIsOnline(true);
    const handleOffline = (): void => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Validation effect
  useEffect(() => {
    setValidationStatus(validateAnswer(currentAnswer, questionType));
  }, [currentAnswer, questionType]);

  // Auto-save effect
  useEffect(() => {
    if (currentAnswer === lastSavedAnswer || !currentAnswer.trim()) {
      return;
    }

    setAutoSaveStatus("typing");

    // Clear existing timers
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    // Debounced save
    typingTimerRef.current = setTimeout(() => {
      if (onAutoSave && isOnline) {
        setAutoSaveStatus("saving");
        onAutoSave(currentAnswer);
        setLastSavedAnswer(currentAnswer);
        lastSaveTimeRef.current = Date.now();
        setAutoSaveStatus("saved");
      }
    }, TYPING_DEBOUNCE);

    // Periodic save
    autoSaveTimerRef.current = setTimeout(() => {
      if (onAutoSave && isOnline && currentAnswer !== lastSavedAnswer) {
        setAutoSaveStatus("saving");
        onAutoSave(currentAnswer);
        setLastSavedAnswer(currentAnswer);
        lastSaveTimeRef.current = Date.now();
        setAutoSaveStatus("saved");
      }
    }, AUTO_SAVE_INTERVAL);

    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [currentAnswer, lastSavedAnswer, onAutoSave, isOnline]);

  return {
    autoSaveStatus,
    validationStatus,
    isOnline,
    lastSaveTime: lastSaveTimeRef.current,
  };
}
