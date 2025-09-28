import { useCallback, useEffect, useState, useRef } from "react";

import { useAppStore } from "@lib/store/useAppStore";

import { AUTO_SAVE_DELAY } from "./answerAreaUtils";

interface IUseAnswerAutoSaveReturn {
  hasUnsavedChanges: boolean;
  lastAutoSaved: Date | null;
  isSaving: boolean;
  handleChange: (questionId: string, newValue: string, originalOnChange: (value: string) => void) => void;
  handleManualSave: (questionId: string) => void;
}

export function useAnswerAutoSave(): IUseAnswerAutoSaveReturn {
  const updateDraft = useAppStore((state) => state.updateDraft);
  const autoSave = useAppStore((state) => state.autoSave);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastAutoSaved, setLastAutoSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAutoSave = useCallback((questionId: string) => {
    setIsSaving(true);
    try {
      autoSave(questionId);
      setLastAutoSaved(new Date());
      setHasUnsavedChanges(false);
    } finally {
      setIsSaving(false);
    }
  }, [autoSave]);

  const handleChange = useCallback((
    questionId: string,
    newValue: string,
    originalOnChange: (value: string) => void,
  ) => {
    originalOnChange(newValue);
    updateDraft(questionId, newValue);
    setHasUnsavedChanges(true);

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(() => {
      void triggerAutoSave(questionId);
    }, AUTO_SAVE_DELAY);
  }, [updateDraft, triggerAutoSave]);

  const handleManualSave = useCallback((questionId: string) => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    void triggerAutoSave(questionId);
  }, [triggerAutoSave]);

  // Cleanup timer on unmount
  useEffect(() => () => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
  }, []);

  return {
    hasUnsavedChanges,
    lastAutoSaved,
    isSaving,
    handleChange,
    handleManualSave,
  };
}
