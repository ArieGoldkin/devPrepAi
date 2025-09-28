import { useCallback } from "react";

interface IQuestion {
  id: string;
}

interface IKeyboardShortcutsParams {
  hasAnswered: boolean;
  draftAnswer: string;
  currentQuestion: IQuestion | null;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  handleSubmitAnswer: () => void;
  handleAutoSave: (answer: string) => void;
  handlePrevious: () => void;
  handleNext: () => void;
}

interface IKeyboardShortcutsReturn {
  handleKeyboardShortcuts: (event: KeyboardEvent) => void;
}

export function useKeyboardShortcuts({
  hasAnswered,
  draftAnswer,
  currentQuestion,
  isFirstQuestion,
  isLastQuestion,
  handleSubmitAnswer,
  handleAutoSave,
  handlePrevious,
  handleNext,
}: IKeyboardShortcutsParams): IKeyboardShortcutsReturn {
  const handleSubmitShortcut = useCallback((event: KeyboardEvent): void => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      if (!hasAnswered && draftAnswer.trim() !== "") {
        handleSubmitAnswer();
      }
    }
  }, [hasAnswered, draftAnswer, handleSubmitAnswer]);

  const handleSaveShortcut = useCallback((event: KeyboardEvent): void => {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault();
      if (currentQuestion !== null && currentQuestion !== undefined && draftAnswer.trim() !== "") {
        handleAutoSave(draftAnswer);
      }
    }
  }, [currentQuestion, draftAnswer, handleAutoSave]);

  const handleHintShortcut = useCallback((event: KeyboardEvent): void => {
    if ((event.ctrlKey || event.metaKey) && event.key === "/") {
      event.preventDefault();
      const hintElement = document.querySelector('[data-testid="hint-system"]');
      if (hintElement instanceof HTMLElement) {
        hintElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleNavigationShortcuts = useCallback((event: KeyboardEvent): void => {
    const activeElement = document.activeElement as HTMLElement;
    const isInputFocused = activeElement?.tagName === "INPUT" ||
                          activeElement?.tagName === "TEXTAREA" ||
                          activeElement?.contentEditable === "true";
    if (!isInputFocused) {
      if (event.key === "ArrowLeft" && !isFirstQuestion) {
        event.preventDefault();
        handlePrevious();
      }
      if (event.key === "ArrowRight" && !isLastQuestion) {
        event.preventDefault();
        handleNext();
      }
    }
  }, [isFirstQuestion, isLastQuestion, handlePrevious, handleNext]);

  const handleKeyboardShortcuts = useCallback((event: KeyboardEvent): void => {
    handleSubmitShortcut(event);
    handleSaveShortcut(event);
    handleHintShortcut(event);
    handleNavigationShortcuts(event);
  }, [handleSubmitShortcut, handleSaveShortcut, handleHintShortcut, handleNavigationShortcuts]);

  return { handleKeyboardShortcuts };
}
