import { useRef, useCallback } from "react";

// Auto-save constants
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds
const TYPING_DEBOUNCE = 2000; // 2 seconds

interface IQuestion {
  id: string;
}

interface IAutoSaveParams {
  currentQuestion: IQuestion | null;
  autoSave: (questionId: string, answer: string) => void;
}

interface IAutoSaveReturn {
  handleAutoSave: (answer: string) => void;
  scheduleAutoSave: (answer: string) => void;
  clearTimers: () => void;
  autoSaveTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
  typingTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

export function useAutoSave({ currentQuestion, autoSave }: IAutoSaveParams): IAutoSaveReturn {
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback((): void => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
  }, []);

  const handleAutoSave = useCallback((answer: string): void => {
    if (currentQuestion === null || currentQuestion === undefined || !answer.trim()) return;
    autoSave(currentQuestion.id, answer);
  }, [currentQuestion, autoSave]);

  const scheduleAutoSave = useCallback((answer: string): void => {
    clearTimers();
    // Clear any existing typing timer
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    // Set typing debounce timer
    typingTimerRef.current = setTimeout(() => {
      handleAutoSave(answer);
    }, TYPING_DEBOUNCE);
    // Set interval timer for periodic auto-save
    autoSaveTimerRef.current = setTimeout(() => {
      handleAutoSave(answer);
    }, AUTO_SAVE_INTERVAL);
  }, [clearTimers, handleAutoSave]);

  return {
    handleAutoSave,
    scheduleAutoSave,
    clearTimers,
    autoSaveTimerRef,
    typingTimerRef,
  };
}
